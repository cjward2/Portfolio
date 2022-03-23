import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { selectUser } from "../../features/userSlice";
import { selectMessage, setMsg } from '../../features/messageSlice';
import { useDispatch, useSelector } from "react-redux";
import requireAuth from '../requireAuth';
import { makeRequest } from '../../util'; 

import './InventoryDetail.css';
import InventoryForm from '../InventoryForm';
import AlertMessage from '../AlertMessage';

const InventoryDetail = () => {
    const [inventoryDetail, setInventoryDetail] = useState({});
    const [edit, setEdit] = useState(false); //Use edit state to determine if form will be show to editinventory

    const dispatch = useDispatch();
    const message = useSelector(selectMessage);
    const user = useSelector(selectUser);

    //Get id from route params to make call to backend for this specific id.
    const id = useParams();
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const data = await makeRequest(`/api/inventory/${id.id}`);
                setInventoryDetail(data);
            } catch(error) {
                dispatch(setMsg({ msg: 'Something went wrong. Please try again later.', err: true }));
            }
        }
        if(user.id !== undefined) {
            fetchRequest();   
        }   
    }, []);

    if(edit) {
        return (
            //If user clicks edit button, show the inventory form component and pass down items as props so user can see them in for to edit them
            <InventoryForm
            who={inventoryDetail.who}
            why={inventoryDetail.why}
            fear={inventoryDetail.fear}
            selfEsteem={inventoryDetail.selfEsteem}
            security={inventoryDetail.security}
            personalRelationship={inventoryDetail.personalRelationship}
            sexRelations={inventoryDetail.sexRelations}
            pride={inventoryDetail.pride}
            myPart={inventoryDetail.myPart}
            id={ id.id }
            editForm={ true }
            />
        )
    } else {
        return (
            <div className="inventory-detail">
            <Link className='inventory-detail__back-link' to="/inventory">Back</Link>
            { message && <AlertMessage marginTop /> }
                <div className="inventory-detail__inner-container">
                <h1 className="inventory-detail__header">Inventory Detail</h1>
                <div className="inventory-detail__who">
                   Who: { inventoryDetail.who }
                </div>
                <div className="inventory-detail__why">
                   Why: { inventoryDetail.why }
                </div>
                <div className="inventory-detail__affects">
                    This affected my:
                    { inventoryDetail.fear !== 'false' && (
                       <div>Fear</div>
                    ) }
                    { inventoryDetail.selfEsteem !== 'false' && (
                        <div>Self-Esteem</div>
                    ) }
                    { inventoryDetail.security !== 'false' && (
                        <div>Security</div>
                    ) }
                    { inventoryDetail.personalRelationship !== 'false' && (
                        <div>Personal Relations</div>
                    ) }
                    { inventoryDetail.sexRelations !== 'false' && (
                        <div>Sex Relations</div>
                    ) }
                    { inventoryDetail.pride !== 'false' && (
                        <div>Pride</div>
                    ) }
                </div>
                { inventoryDetail.myPart }
                <div className="inventory-detail__myPart">
                   My Part: { inventoryDetail.myPart }
                </div>
                    <button className="custom-btn btn--green" onClick={ () => setEdit(true) }>Edit</button>
                    </div>
            </div>
        )
    }
}

export default requireAuth(InventoryDetail);