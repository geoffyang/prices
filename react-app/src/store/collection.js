const LOAD_COLLECTIONS = "collection/LOAD_COLLECTIONS"
const UPDATE_COLLECTION = "collection/UPDATE_COLLECTION"


const loadCollection = (collections) => ({
    type: LOAD_COLLECTIONS,
    collections:collections
})

const updateCollection = collection => ({
    type: UPDATE_COLLECTION,
    collection:collection
})

export const getCollection = () => async (dispatch) => {
    const response = await fetch('/api/collections/')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadCollection(data))
    }
}

export const postCollection = (name) => async (dispatch) => {
    const response = await fetch('/api/collections/', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateCollection(data))
    }
}

export default function reducer(state = {}, action) {
    let newState = {}
    switch (action.type) {
        case LOAD_COLLECTIONS:
            return { collections: action.collections }
        case UPDATE_COLLECTION:
            newState = Object.assign({}, state);
            newState["tester"] = action.collection;
            return newState
        default:
            return state;

    }

}
