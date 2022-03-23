import requireAuth from "../requireAuth";

const Chatroom = () => {
  return (
    <div>Chatroom</div>
  )
}

export default requireAuth(Chatroom)