import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { setMsg } from '../../features/messageSlice';
import { useHistory } from "react-router-dom";

const Chatroom = () => {
    //Bring in user info from store
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
  
    //if no user is logged in, redirect them back to login page
    if (user.id === undefined) {
      dispatch(setMsg({ msg: "Please login to view this page", err: true }));
      history.push("/login");
    }
  return (
    <div>Chatroom</div>
  )
}

export default Chatroom