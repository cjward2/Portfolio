import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { setInventory, selectInventory } from '../../features/inventorySlice'
import { selectMessage, setMsg } from '../../features/messageSlice';
import { useHistory, Link } from "react-router-dom";
import { makeRequest } from '../../util';
import "./Inventory.css";

//Bring in components
import InventoryForm from "../InventoryForm";
import AlertMessage from "../AlertMessage";
import DeleteConfirmation from "../DeleteConfirmation";

const Inventory = () => {
  const [inventoryId, setInventoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Bring in user info from store
  const user = useSelector(selectUser);
  const inventory = useSelector(selectInventory);
  const history = useHistory();
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  //if no user is logged in, redirect them back to login page
  if (user.id === undefined) {
    dispatch(setMsg({ msg: "Please login to view this page", err: true }));
    history.push("/login");
  }

  useEffect(() => {
      const getRequest = async () => {
        try {
          const data = await makeRequest(`/api/inventories/${user.id}`);
          //Set inventory state in store in reverse order so most recent inventory will be at top for user
          dispatch(setInventory(data.inventory.reverse()));
        } catch(error) {
          //this is where I will display message to user
          dispatch(setMsg({ msg: 'Something went wrong when grabbing your inventory. Please try again later.', err: true }));
        }
      }
      getRequest();
  }, []);

  const handleDelete = async id => {
      try {
        const data = await makeRequest(`/api/inventory/${id}`, 'DELETE', { body: JSON.stringify(user) });
        //Set inventory state in store in reverse order so most recent inventory will be at top for user
        dispatch(setInventory(data.inventory.reverse()));
        //Show sucess message to user
        dispatch(setMsg({ msg: 'Inventory sucessfully deleted!', err: false }));
      } catch(error) {
        //Show user error message
        dispatch(setMsg({ msg: 'Error deleting inventory. Please try again later.', err: true }));
      }
    setShowModal(false);
  }

  const showHideDeleteModal = (id) => {
    setInventoryId(id);
    setShowModal(!showModal);
  }

  return (
    <div className="inventory">
      { message && <AlertMessage marginTop/> }
      { showModal && <DeleteConfirmation modalVisible={ showModal } showHideDeleteModal={showHideDeleteModal} id={inventoryId} handleDelete={handleDelete} /> }
      <InventoryForm />
      <div className="inventory__card-container">
      {inventory.map(el => (
        <div key={el._id} className="inventory__card">
          <div className="inventory__who">Who: {el.who}</div>
          <div className="inventory__why">Why: {el.why}</div>
          <div className="inventory__why">My Part: {el.myPart}</div>
          <div className="inventory__btn-group">
          <Link className="inventory__detail-link" to={`/inventory/${el._id}`}>View Details</Link>
          <button onClick={ () => showHideDeleteModal(el._id) } className="btn--red inventory__delete-btn custom-btn">Delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Inventory;
