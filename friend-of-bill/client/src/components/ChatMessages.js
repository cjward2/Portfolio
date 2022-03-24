import './ChatMessages.css';

const ChatMessages = ({ user, message, img }) => {
  return (
    <div className="chat-message">
      <div className="chat-message--img">
      <img src={img || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="Profile" />
      </div>
      <div className="chat-message--inner-container">
      <div className="chat-message__user">
        <strong>{user}</strong>
      </div>
      <div className="chat-message__message">
        { message }
      </div>
      </div>
     
    </div>
  )
}

export default ChatMessages