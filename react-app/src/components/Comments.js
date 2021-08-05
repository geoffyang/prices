import { useState } from "react";
import { Modal } from '../context/Modal'
import { useDispatch, useSelector } from "react-redux"
import { BsTrash, BsPencil } from 'react-icons/bs';

import "./Comments.css"
import { DeleteComment, EditComment } from "../store/service";


export default function Comments() {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState("")

    const comments = useSelector(state => state.service.currentServiceObj.comments)
    const commentsLoaded = useSelector(state => state.service.commentsLoaded)

    const handleEdit = e => {
        e.preventDefault();
        dispatch(EditComment({
            comment: comment,
            id: commentId
        }))
        setComment("")
        setCommentId(null)
        setShowModal(false)
    }

    return (
        <>

            <div>
                Comments Section
                {commentsLoaded
                    ? (< div >
                        {
                            Object.values(comments).map((c, i) => (
                                <div key={i} className={"comments-div"}>
                                    <div className={"comments__text"}>
                                        {c.comment}</div>
                                    <div className={"comments__time"}>
                                        {c.display_time}</div>
                                    <BsPencil onClick={(e) => {
                                        e.stopPropagation()
                                        setShowModal(true)
                                        setCommentId(c.id)
                                    }} />
                                    <BsTrash onClick={(e) => {
                                        e.stopPropagation()
                                        dispatch(DeleteComment(c.id))
                                    }} />
                                </div>
                            ))
                        }
                    </div >
                    )
                    : <div>No comments yet</div>
                }
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleEdit} style={{ width: "100%" }}>
                        <input
                            type='text'
                            name='Edit Comment'
                            autoFocus
                            onChange={({ target: { value } }) => setComment(value)}
                            value={comment} />
                        <button type="submit">Edit</button>
                    </form>
                </Modal>
            )}
            
        </>
    )
}
