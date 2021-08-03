const LOAD_COLLECTIONS = "collection/LOAD_COLLECTIONS"
const LOAD_COLLECTION = "collection/LOAD_COLLECTION"
const UPDATE_COLLECTION = "collection/UPDATE_COLLECTION"
const UNLOAD_COLLECTIONS = "collection/UNLOAD_ALL"
const UNLOAD_CURRENT_COLLECTION = "collection/UNLOAD_ONE"
const REMOVE_COLLECTION = "collection/REMOVE_ONE"
const LOAD_SERVICES = 'services/LOAD_SERVICES'
const UPDATE_SERVICES = 'services/UPDATE_SERVICES'

const loadCollections = (collections) => ({
    type: LOAD_COLLECTIONS,
    collections: collections
})

const updateCollection = collection => ({
    type: UPDATE_COLLECTION,
    collection: collection
})

const removeCollection = id => ({
    type: REMOVE_COLLECTION,
    id
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
// to delete
// export const GetCollection = id => ({
//     type: LOAD_COLLECTION,
//     id
// })

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

export const UnloadCollections = () => ({
    type: UNLOAD_COLLECTIONS
})

export const DeleteCollection = id => async dispatch => {
    await fetch(`/api/collections/${id}/`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    })

    dispatch(removeCollection(id))
}

export const GetServices = collectionId => async dispatch => {
    const response = await fetch(`/api/collections/${collectionId}/services/`)
    if (response.ok) {
        const services = await response.json();
        console.log(">>>>>>>", services)
        dispatch(LoadServices(services, collectionId))
    }
}

const LoadServices = (services, id) => ({
    type: LOAD_SERVICES,
    services,
    id
})

const initialState = {
    all: {},
    allLoaded: false,
    current: null,
    services: {},
    servicesLoaded:false,
    singleLoaded: false
}

export default function reducer(state = initialState, { type, collection, collections, id, service, services }) {
    switch (type) {
        case LOAD_SERVICES:
            if (Object.keys(services).length > 0 ) {
                return {
                    ...state,
                    all: { ...state.all },
                    services: services,
                    servicesLoaded: true,
                    singleLoaded: true,
                    current: id
                }
            }
            return {
                ...state,
                all: { ...state.all },
                services: {},
                servicesLoaded: false,
                singleLoaded: false,
                current: id
            }
        case LOAD_COLLECTIONS:
            return {
                ...state,
                all: collections,
                allLoaded: true,
            }
        // to delete:
        // case LOAD_COLLECTION:
        //     return {
        //         ...state,
        //         all: {
        //             ...state.all
        //         },
        //         singleLoaded: true,
        //         current: id
        //     }
        case UPDATE_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all,
                    [collection.id]: collection
                },
                current: state.current,
                singleLoaded: state.singleLoaded
            }
        case UNLOAD_COLLECTIONS:
            return {
                ...initialState,
                all: {
                    ...initialState.all
                },
                current: null,
                allLoaded: false,
                singleLoaded: false
            }
        case UNLOAD_CURRENT_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all
                },
                current: null,
                singleLoaded: false,
            }
        case REMOVE_COLLECTION:
            if (state.current === id) {
                delete state.all[id]
                return {
                    ...state,
                    all: {
                        ...state.all
                    },
                    current: null,
                    singleLoaded: false
                }
            } else {
                delete state.all[id]
                return {
                    ...state,
                    all: {
                        ...state.all
                    },
                    current: state.current,
                    singleLoaded: state.singleLoaded
                }
            }
        default:
            return state;
    }
}
