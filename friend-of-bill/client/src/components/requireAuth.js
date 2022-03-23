import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import { setMsg } from "../features/messageSlice";

const requireAuth = ChildComponent => () => {
  //Bring in user info from store
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  if (user.id === undefined) { 
    dispatch(setMsg({ msg: "Please login to view this page", err: true }));
    history.push("/login");
}

    return (
        <ChildComponent />
    )
}


export default requireAuth;