const SET_COLLECTION = "collection/SET_COLLECTION"

const setCollection = (collections) => ({
    type: SET_COLLECTION,
    collections
})

export const getCollection = () => async (dispatch) => {
    const response = await fetch('/api/collections/')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
    }
    dispatch(setCollection)

}




const initialState = {};
