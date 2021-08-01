import { useDispatch, useSelector } from "react-redux";

export default function ShowCollection() {

    const dispatch = useDispatch();

    const collections = useSelector(state => state.all)



    return null
}
