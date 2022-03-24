import { clearMsg, selectMessage } from '../features/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import './AlertMessage.css';
import { useEffect } from 'react';

const AlertMessage = ({marginTop}) => {
  //Bring in message state from store b/c I want to dynamically display messages for the user throughout the application
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearMsg());
    }, 3000);

    //Use effect cleanup function to cancel setTimeout before component unmounts. This way if another message is promted before the other message clears, it stays for full 2.5s
    return () => {
      clearTimeout(timeout);
  };
  }, [message]);

  return (
    <div className={`alert ${message.err ? 'alert-warning' : 'alert-success'} ${marginTop && 'marginTop'} alert-dismissible fade show`} role="alert">
       { message.msg } 
  <button onClick={ () => dispatch(clearMsg())} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>

  );
};

export default AlertMessage;
