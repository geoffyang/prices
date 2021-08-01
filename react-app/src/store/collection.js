const LOAD_COLLECTIONS = "collection/LOAD_COLLECTIONS"
const LOAD_COLLECTION = "collection/LOAD_COLLECTION"
const UPDATE_COLLECTION = "collection/UPDATE_COLLECTION"
const UNLOAD_COLLECTIONS = "collection/UNLOAD_ALL"
const UNLOAD_CURRENT_COLLECTION = "collection/UNLOAD_ONE"

const loadCollections = (collections) => ({
    type: LOAD_COLLECTIONS,
    collections: collections
})

const updateCollection = collection => ({
    type: UPDATE_COLLECTION,
    collection: collection
})


export const GetCollections = () => async (dispatch) => {
    const response = await fetch('/api/collections/')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadCollections(data))
    }
}

export const GetCollection = id => ({
    type: LOAD_COLLECTION,
    id
})

export const PostCollection = (name) => async dispatch => {
    const response = await fetch('/api/collections/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    })
    if (response.ok) {
        const newCollection = await response.json();
        dispatch(updateCollection(newCollection))
    }
}

export const UnloadCollections = ()  =>  ({
    type: UNLOAD_COLLECTIONS
})

const initialState = {
    all: {},
    current: null,
    loaded: false
}

export default function reducer(state = initialState, { type, collection, collections, id }) {
    switch (type) {
        case LOAD_COLLECTIONS:
            return {
                ...state,
                all: collections,
                loaded: true,
            }
        case LOAD_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all
                },
                loaded: true,
                current:id
            }
        case UPDATE_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all,
                    [collection.id]:collection
                },
                current: id,
                loaded:true
            }
        case UNLOAD_COLLECTIONS:
            return {
                ...initialState,
                all: {
                    ...initialState.all
                },
                current: null,
                loaded: false,
            }
        case UNLOAD_CURRENT_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all
                },
                current: null,
                loaded: true,
            }
        default:
            return state;
    }
}
