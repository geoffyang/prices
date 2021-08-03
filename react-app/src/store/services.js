const LOAD_SERVICE = "services/LOAD_SERVICE"

export const GetService = (id) => async dispatch => {

    const response = await fetch(`/api/services/${id}/`)
    if (response.ok) {
        const currentService = await response.json();
        dispatch(updateService(currentService))
    }
}

const updateService = service => ({
    type: LOAD_SERVICE,
    service
})

const initialState = {
    comments: {},
    current: null,
    isLoaded: null
}

export default function reducer(state = initialState, { service, type }) {
    switch (type) {
        case LOAD_SERVICE:
            return {
                comments: { ...state.comments },
                current: service,
                isLoaded:true
            }
        default:
            return state;
    }
}
