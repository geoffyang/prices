const LOAD_SERVICE = "service/LOAD_SERVICE"
const UNLOAD_SERVICE = "service/UNLOAD_SERVICE"

///////////////////////////////////////////////////
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
///////////////////////////////////////////////////

export const UnloadService = () => ({
    type: UNLOAD_SERVICE
})

///////////////////////////////////////////////////


const initialState = {
    currentServiceObj: null,
    serviceLoaded: null,
    commentsLoaded: null
}

export default function reducer(state = initialState, { service, type }) {
    switch (type) {
        case LOAD_SERVICE:
            if (Object.keys(service.comments).length > 0) {
                return {
                    currentServiceObj: {
                        ...service,
                        comments: {
                            ...service.comments
                        }
                    },
                    serviceLoaded: true,
                    commentsLoaded: true
                }
            }
            return {
                currentServiceObj: {
                    ...service,
                    comments: null
                },
                serviceLoaded: true,
                commentsLoaded: null
            }
        case UNLOAD_SERVICE:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
