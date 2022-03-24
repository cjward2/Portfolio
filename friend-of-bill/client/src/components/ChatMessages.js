import './ChatMessages.css';

const ChatMessages = ({ user, message, img }) => {
  //If the user has no image, make sure a fallback is shown. I dont want a broken image
  const imgSrc = (img) => {
    if(img === 'null' || img === 'undefined' || !img) {
      img = '/img/avatar.png';
    }
    return img;
  }

  return (
    <div className="chat-message">
      <div className="chat-message--img">
      <img src={ imgSrc(img) } alt="Profile" />
      </div>
      <div className="chat-message--inner-container">
      <div className="chat-message__user">
        <strong>{ user }</strong>
      </div>
      <div className="chat-message__message">
        { message }
      </div>
      </div>
     
    </div>
  )
}

export default ChatMessages