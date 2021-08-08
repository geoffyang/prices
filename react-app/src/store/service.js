const LOAD_SERVICE = "service/LOAD_SERVICE"
const UNLOAD_SERVICE = "service/UNLOAD_SERVICE"
const UPDATE_COMMENT = "service/UPDATE_COMMENT"
const REMOVE_COMMENT = "service/REMOVE_COMMENT"
const SHOW_ERROR_BOX = 'service/SHOW_ERROR_BOX'
const REMOVE_ERROR_BOX = 'service/REMOVE_ERROR_BOX'
const SHOW_EDIT_ERROR_BOX = 'service/SHOW_EDIT_ERROR_BOX'
const REMOVE_EDIT_ERROR_BOX = 'service/REMOVE_EDIT_ERROR_BOX'


///////////////////// get ///////////////////////////

export const GetService = (id) => async dispatch => {
    const response = await fetch(`/api/services/${id}/`)
    if (response.ok) {
        const currentService = await response.json();
        dispatch(loadService(currentService))
    }
}

const loadService = service => {
    return ({
        type: LOAD_SERVICE,
        service
    })
}
///////////////////////////////////////////////////

export const UnloadService = () => ({
    type: UNLOAD_SERVICE
})

///////////////////// post //////////////////////////

export const PostComment = (comment, serviceId) => async dispatch => {
    const response = await fetch(`/api/services/${serviceId}/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: comment })
    })
    if (response.ok) {
        const comment = await response.json();
        dispatch(updateComment(comment))
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

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

////////////////////// delete ///////////////////////

export const DeleteComment = (id) => async dispatch => {
    await fetch(`/api/comments/${id}/`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    dispatch(removeComment(id))
}
const removeComment = id => ({
    type: REMOVE_COMMENT,
    id
})

////////////////////// edit //////////////////////////

export const EditComment = ({ comment, id }) => async dispatch => {
    const response = await fetch(`/api/comments/${id}/`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment })
    })
    if (response.ok) {
        const editedComment = await response.json()
        dispatch(updateComment(editedComment))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        } else {
            return ["An error occured, please try again"]
        }
    }
}


////////////////////// errors ////////////////////////

export const ShowErrorBox = () => ({
    type: SHOW_ERROR_BOX
})
export const RemoveErrorBox = () => ({
    type: REMOVE_ERROR_BOX
})
export const ShowEditErrorBox = () => ({
    type: SHOW_EDIT_ERROR_BOX
})
export const RemoveEditErrorBox = () => ({
    type: REMOVE_EDIT_ERROR_BOX
})



///////////////////////////////////////////////////

const initialState = {
    currentServiceObj: {
        comments: {}
    },
    serviceLoaded: null,
    commentsLoaded: null,
    showErrors: false,
    showEditErrors: false,
}

export default function reducer(state = initialState, { service, type, comment, id }) {
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
                    commentsLoaded: true,
                    showEditErrors: state.showEditErrors,
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
                ...initialState,
                currentServiceObj: {
                    comments: null
                }
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: {
                        ...state.currentServiceObj.comments,
                        [comment.id]: comment
                    }
                },
                commentsLoaded: true
            }
        case REMOVE_COMMENT:
            delete state.currentServiceObj.comments[id]
            if (Object.keys(state.currentServiceObj.comments).length > 0) {
                return {
                    ...state,
                    currentServiceObj: {
                        ...state.currentServiceObj,
                        comments: { ...state.currentServiceObj.comments }
                    },
                    commentsLoaded: true
                }
            }
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: {}
                },
                commentsLoaded: null
            }
        case SHOW_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showErrors: true,
            }
        case REMOVE_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showErrors: false,
            }
        case SHOW_EDIT_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showEditErrors: true,
            }
        case REMOVE_EDIT_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showEditErrors: false,
            }
        default:
            return state;
    }
}
