import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import "./ServicePage.css"
import { GetService } from "../store/services";

export default function Comments() {
    const dispatch = useDispatch();


    const comments = useSelector(state => state.services.current.comments)

    return (
        <div>
            Comments Section
            < div >
                {
                    Object.values(comments).map((c, i) => (
                        <div key={i} className={"comments-div"}>{c.comment}</div>
                    ))
                }
            </div >
        </div>
    )
}
