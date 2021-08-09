const LOAD_SUBDOMAIN = 'subdomains/LOAD_SUBDOMAIN'
const UNLOAD_SUBDOMAIN = 'subdomains/UNLOAD_SUBDOMAIN'


/////////////////// get //////////////////////

export const GetSubdomain = subdomain => async dispatch => {
    const response = await fetch(`/api/services/subdomains/${subdomain}/`)
    if (response.ok) {
        const services = await response.json();
        dispatch(loadSubdomain(services))
    }
}

const loadSubdomain = services => {
    return ({
        type: LOAD_SUBDOMAIN,
        services
    })
}

/////////////////// unload //////////////////////

export const UnloadSubdomain = () => {
    return ({
        type: UNLOAD_SUBDOMAIN,
    })
}

///////////////////////////////////////////////////

const initialState = {
    services: {},
    servicesLoaded: false,
}

export default function reducer(state = initialState, { type, services }) {
    switch (type) {
        case LOAD_SUBDOMAIN:
            if (Object.keys(services).length > 0) {
                return {
                    ...state,
                    services: { ...services },
                    servicesLoaded: true,
                }
            }
            return {
                ...state,
                services: {},
                servicesLoaded: false,
            }
        case UNLOAD_SUBDOMAIN:
            return {
                services: {},
                servicesLoaded: false,
            }
        default:
            return state;
    }
}
