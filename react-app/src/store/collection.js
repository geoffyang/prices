const LOAD_COLLECTIONS = "collections/LOAD_COLLECTIONS"
const UPDATE_COLLECTION = "collections/UPDATE_COLLECTION"
const UNLOAD_COLLECTIONS = "collections/UNLOAD_ALL"
const UNLOAD_CURRENT_COLLECTION = "collections/UNLOAD_ONE"
const REMOVE_COLLECTION = "collections/REMOVE_ONE"
const LOAD_SERVICES = 'collections/LOAD_SERVICES'
const REMOVE_SERVICE = 'collections/REMOVE_SERVICE'

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
        headers: { 'Content-Type': 'application/json' }
    })

    dispatch(removeCollection(id))
}

export const EditCollectionName = ({ name, id }) => async dispatch => {
    const response = await fetch(`/api/collections/${id}/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:name, id:id })
    })
    if (response.ok) {
        const collection = await response.json()
        dispatch(updateCollection(collection))
    }
}

export const GetServices = collectionId => async dispatch => {
    const response = await fetch(`/api/collections/${collectionId}/services/`)
    if (response.ok) {
        const services = await response.json();
        dispatch(LoadServices(services, collectionId))
    }
}

const LoadServices = (services, id) => ({
    type: LOAD_SERVICES,
    services,
    id
})

export const DeleteService = (collectionId, serviceId) => async dispatch => {
    await fetch(`/api/collections/${collectionId}/services/${serviceId}/`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })
    dispatch(removeService(serviceId))
}

const removeService = id => ({
    type: REMOVE_SERVICE,
    id
})

const initialState = {
    all: {},
    allLoaded: false,
    current: null,
    services: {},
    servicesLoaded: false,
    collectionLoaded: false
}

export default function reducer(state = initialState, { type, collection, collections, id, service, services }) {
    switch (type) {
        case LOAD_SERVICES:
            if (Object.keys(services).length > 0) {
                return {
                    ...state,
                    all: { ...state.all },
                    services: services,
                    servicesLoaded: true,
                    collectionLoaded:true,
                    current:id
                }
            }
            return {
                ...state,
                all: { ...state.all },
                services: null,
                servicesLoaded: false,
                collectionLoaded: true,
                current: id
            }
        case REMOVE_SERVICE:
            delete state.services[id]
            if (Object.keys(state.services).length > 0) {
                return {
                    ...state,
                    all: { ...state.all },
                    services: { ...state.services }
                }
            }
            return {
                ...state,
                all: { ...state.all },
                services: null,
                servicesLoaded: false,
                current: id
            }
        case LOAD_COLLECTIONS:
            return {
                ...state,
                all: collections,
                allLoaded: true,
                services: {...state.services},
            }
        case UPDATE_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all,
                    [collection.id]: collection
                },
                current: state.current,
                collectionLoaded: state.collectionLoaded
            }
        case UNLOAD_COLLECTIONS:
            return {
                all: {
                    ...state.all
                },
                current: state.current,
                allLoaded: false,
                services:{...state.services},
                collectionLoaded:state.collectionLoaded,
                servicesLoaded: state.servicesLoaded
            }
        case UNLOAD_CURRENT_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all
                },
                current: null,
                collectionLoaded: false,
            }
        case REMOVE_COLLECTION:
            if (state.current === id) {
                delete state.all[id]
                return {
                    ...state,
                    all: { ...state.all },
                    current: null,
                    collectionLoaded: false
                }
            } else {
                delete state.all[id]
                return {
                    ...state,
                    all: { ...state.all },
                }
            }

        default:
            return state;
    }
}
