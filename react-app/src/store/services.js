const LOAD_SERVICES = "service/LOAD_SERVICES"
const LOAD_SERVICE = "service/LOAD_SERVICE"
const UPDATE_SERVICE = "service/UPDATE_SERVICE"
const UNLOAD_SERVICES = "service/UNLOAD_ALL"
const UNLOAD_CURRENT_SERVICE = "service/UNLOAD_ONE"

const loadServices = (services) => ({
    type: LOAD_SERVICES,
    services: services
})

const updateService = service => ({
    type: UPDATE_SERVICE,
    service: service
})

export const GetServices = () => async (dispatch) => {
    const response = await fetch('/api/services/')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadServices(data))
    }
}

export const GetService = id => ({
    type: LOAD_SERVICE,
    id
})

export const PostService = (name) => async dispatch => {
    const response = await fetch('/api/services/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            billing_code: null,
            cpt_code: null,
            service_description: null,
            list_price: null,
            discounted_price: null,
            domain: null,
            subdomain: null,
            hospital_id: null,
        })
    })
    if (response.ok) {
        const newService = await response.json();
        dispatch(updateService(newService))
    }
}

export const UnloadServices = () => ({
    type: UNLOAD_SERVICES
})


const initialState = {
    all: {},
    current: null,
    allLoaded: false,
    singleLoaded: false
}
export default function reducer(state = initialState, { type, services, service, id }) {
    switch (type) {
        case LOAD_SERVICES:
            return {
                ...state,
                all: services,
                allLoaded: true,
            }
        case LOAD_SERVICE:
            return {
                ...state,
                all: {
                    ...state.all
                },
                singleLoaded: true,
                current: id
            }
        case UPDATE_SERVICE:
            return {
                ...state,
                all: {
                    ...state.all,
                    [service.id]: service
                },
                current: id,
                singleLoaded: true
            }
        case UNLOAD_SERVICES:
            return {
                ...initialState,
                all: {
                    ...initialState.all
                },
                current: null,
                allLoaded: false,
                singleLoaded: false
            }
        case UNLOAD_CURRENT_SERVICE:
            return {
                ...state,
                all: {
                    ...state.all
                },
                current: null,
                singleLoaded: false,
            }
        default:
            return state;
    }
}
