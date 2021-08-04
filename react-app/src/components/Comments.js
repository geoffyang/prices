import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { BsTrash, BsPencil } from 'react-icons/bs';

import "./Comments.css"
import { GetService, DeleteComment } from "../store/service";

export default function Comments() {
    const dispatch = useDispatch();


    const comments = useSelector(state => state.service.currentServiceObj.comments)
    const commentsLoaded = useSelector(state => state.service.commentsLoaded)

    const editFunc = id => {
        // to do.
    }

    return (
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
                                    editFunc(c.id)
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
    )
}
