import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import io from 'socket.io-client';
import { makeRequest } from "../../util";
import requireAuth from "../requireAuth";
import ChatMessages from "../ChatMessages";
import './Chatroom.css';

//Initialize socket
const socket = io.connect('http://localhost:5000');

const Chatroom = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    const getRequest = async () => {
      try {
        const data = await makeRequest('/api/messages');
        setMessageList(data);
        scrollToBottom('.chatroom__container');
      } catch(error) {
        console.log(error);
      }
    }
    if(user.id !== undefined) {
      getRequest();
    }
  }, [])
  
  useEffect(() => {
    //Listen for connection
    socket.on('connect', () => console.log(`Client connected: ${socket.id}`));
   
    //Listen for disconnect
    socket.on('disconnect', (reason) =>
      console.log(`Client disconnected: ${reason}`)
    );

    //Listen for connection error
    socket.on('connect_error', (reason) =>
      console.log(`Client connect_error: ${reason}`)
    );

    socket.on('receive_message', (data) => {
      setMessageList([...messageList, {message: data.message, user: data.user, img: data.profilePic}]);
      scrollToBottom('.chatroom__container');
    });
    
  }, [messageList]);

  const scrollToBottom = element => {
    const targetEl = document.querySelector(element);
    targetEl.scrollTop = targetEl.scrollHeight;
  }

  const handleChange = event => {
    setMessage(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(message.trim().length === 0) {
      return;
    }
    socket.emit('send_message', { message, user: user.name, profilePic: user.profilePic });
    setMessage('');
  }

  return (
    <div className="chatroom">
    <div className="chatroom__content">
    <h1 className="chatroom__container--heading">
      Chatroom
      </h1>
    <div className="chatroom__container">
    { messageList.map((message, index) => (
       <ChatMessages
        key={ message._id || index }
        img={ message.img }
        user={ message.user }
        message={ message.message }
       />
     )) }
    </div>
    <form className="chatroom__form" onSubmit={ handleSubmit }>
        <input className="chatroom__form--input" placeholder="Send a message" type="text" onChange={ handleChange } value={ message }/>
        <button className="chatroom__form--btn btn--green custom-btn">Send</button>
      </form>
    </div>
    </div>
  );
}

export default requireAuth(Chatroom)