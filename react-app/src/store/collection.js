const LOAD_COLLECTIONS = "collection/LOAD_COLLECTIONS"
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

export const getCollections = () => async (dispatch) => {
    const response = await fetch('/api/collections/')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadCollections(data))
    }
}

export const postCollection = (name) => async dispatch => {
    const response = await fetch('/api/collections/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateCollection(data))
        return data;
    }
}

const initialState = {
    collections: {},
    current: null,
    loaded: false
}

export default function reducer(state = initialState, { type, collection, collections }) {
    let newState = {}
    switch (type) {
        case LOAD_COLLECTIONS:
            return {
                ...state,
                collections: collections,
                loaded: true,
                current: null
            }
        case UPDATE_COLLECTION:
            newState = Object.assign({}, state);
            newState["tester"] = collection;
            return newState
        case UNLOAD_COLLECTIONS:
            return {
                ...initialState,
                collections: {
                    ...initialState.collections
                },
                current: null,
                loaded: false,
            }
        default:
            return state;
    }
}
