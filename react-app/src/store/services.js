const LOAD_SERVICE = "services/LOAD_SERVICE"
const UNLOAD_SERVICE = "services/UNLOAD_SERVICE"

export const GetService = (id) => async dispatch => {

    const response = await fetch(`/api/services/${id}/`)
    if (response.ok) {
        const currentService = await response.json();
        dispatch(loadService(currentService))
    }
}

const loadService = service => ({
    type: LOAD_SERVICE,
    service
})

const initialState = {

    current: null,
    serviceLoaded: null,
    commentsLoaded: null
}


export const UnloadService = () => ({
    type: UNLOAD_SERVICE
})

export default function reducer(state = initialState, { service, type }) {
    switch (type) {
        case LOAD_SERVICE:
            return {
                current: {
                    ...service,
                    comments: {
                        ...service.comments
                    }
                },
                serviceLoaded:true
            }
        case UNLOAD_SERVICE:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
