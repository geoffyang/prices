const LOAD_COLLECTIONS = "collections/LOAD_COLLECTIONS"
const UPDATE_COLLECTION = "collections/UPDATE_COLLECTION"
const UNLOAD_COLLECTIONS = "collections/UNLOAD_ALL"
const UNLOAD_CURRENT_COLLECTION = "collections/UNLOAD_ONE"
const REMOVE_COLLECTION = "collections/REMOVE_ONE"
const LOAD_SERVICES = 'collections/LOAD_SERVICES'
const REMOVE_SERVICE = 'collections/REMOVE_SERVICE'
const SHOW_ERROR_BOX = 'collections/SHOW_ERROR_BOX'
const REMOVE_ERROR_BOX = 'collections/REMOVE_ERROR_BOX'

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
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occured, please try again"]
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
        body: JSON.stringify({ name: name, id: id })
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

export const ShowErrorBox = () => ({
    type: SHOW_ERROR_BOX
})
export const RemoveErrorBox = () => ({
    type: REMOVE_ERROR_BOX
})

const initialState = {
    all: {},
    allLoaded: false,
    current: null,
    services: {},
    servicesLoaded: false,
    collectionLoaded: false,
    noCollectionsToDisplay: false,
    showErrors: false,
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
                    collectionLoaded: true,
                    current: id,
                    showErrors: false,
                }
            }
            return {
                ...state,
                all: { ...state.all },
                services: null,
                servicesLoaded: false,
                collectionLoaded: true,
                current: id,
                showErrors: false,
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
            if (Object.keys(collections).length === 0) {
                return {
                    ...state,
                    all: collections,
                    allLoaded: true,
                    services: { ...state.services },
                    noCollectionsToDisplay: true,
                }
            }
            return {
                ...state,
                all: collections,
                allLoaded: true,
                services: { ...state.services },
                noCollectionsToDisplay: false,
            }
        case UPDATE_COLLECTION:
            return {
                ...state,
                all: {
                    ...state.all,
                    [collection.id]: collection
                },
                current: state.current,
                collectionLoaded: state.collectionLoaded,
                noCollectionsToDisplay: false,
            }
        case UNLOAD_COLLECTIONS:
            return {
                all: {
                    ...state.all
                },
                current: state.current,
                allLoaded: false,
                services: { ...state.services },
                collectionLoaded: state.collectionLoaded,
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
                if (Object.keys(state.all).length === 0) {
                    return {
                        ...state,
                        all: { ...state.all },
                        current: null,

                        collectionLoaded: false,
                        noCollectionsToDisplay: true,
                    }
                }
                return {
                    ...state,
                    all: { ...state.all },
                    current: null,
                    collectionLoaded: false,
                    noCollectionsToDisplay: false,
                }
            } else {
                delete state.all[id]
                if (Object.keys(state.all).length === 0) {
                    return {
                        ...state,
                        all: { ...state.all },
                        noCollectionsToDisplay: true,
                    }
                }
                return {
                    ...state,
                    all: { ...state.all },
                }
            }
        case SHOW_ERROR_BOX:
            return {
                ...state,
                all: { ...state.all },
                services: { ...state.services },
                showErrors: true,
            };
        case REMOVE_ERROR_BOX:
            return {
                ...state,
                all: { ...state.all },
                services: { ...state.services },
                showErrors: false,
            };
        default:
            return state;
    }
}
