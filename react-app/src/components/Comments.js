import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import "./Comments.css"
import { GetService } from "../store/service";

export default function Comments() {
    const dispatch = useDispatch();


    const comments = useSelector(state => state.service.currentServiceObj.comments)
    const commentsLoaded = useSelector(state => state.service.commentsLoaded)

    return (
        <div>
            Comments Section
            {commentsLoaded

                ? (< div >
                    {
                        Object.values(comments).map((c, i) => (
                            <div key={i} className={"comments-div"}>{c.comment}</div>
                        ))
                    }
                </div >
                )
                : <div>No comments yet</div>
            }
        </div>
    )
}
