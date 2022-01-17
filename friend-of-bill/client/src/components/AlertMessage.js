import React from "react";
import { clearMsg, selectMessage, setMsg } from '../features/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import './AlertMessage.css';


const AlertMessage = () => {
  //Bring in message state from store b/c I want to dynamically display messages for the user throughout the application
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  return (
    <div className={`alert ${message.err ? 'alert-warning' : 'alert-success'} alert-dismissible fade show`} role="alert">
       { message.msg } 
  <button onClick={ () => dispatch(clearMsg())} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>

  );
};

export default AlertMessage;
