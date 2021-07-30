const SET_COLLECTION = "collection/SET_COLLECTION"

const setCollection = (collections) => ({
    type: SET_COLLECTION,
    collections:collections
})

export const getCollection = () => async (dispatch) => {
    const response = await fetch('/api/collections/')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(setCollection(data))
    }
}

export const addCollection = (name, user_id) => async (dispatch) => {
    const response = await fetch('/api/collections', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name, user_id
        })
    })
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_COLLECTION:
            return { collections: action.collections }
        default:
            return state;

    }

}
