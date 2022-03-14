import './InventoryDetail.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import InventoryForm from './InventoryForm';

const InventoryDetail = () => {
    const [inventoryDetail, setInventoryDetail] = useState({});
    const [edit, setEdit] = useState(false); //Use edit state to determine if form will be show to editinventory

    const id = useParams(); //Get id from route params to make call to backend for this specific id.
    console.log(id)
    useEffect(() => {
        fetch(`/api/inventory/${id.id}`)
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error getting endpoint`)
            }
            return res.json();
        }).then(data => {
            console.log(data);
            setInventoryDetail(data);
        }).catch(err => {
            console.log(err);
        })
           
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
                <h1 className="inventory-detail__header">Inventory Detail</h1>
                <div className="inventory-detail__who">
                   Who: { inventoryDetail.who }
                </div>
                <div className="inventory-detail__why">
                   Why: { inventoryDetail.why }
                </div>
                <div className="inventory-detail__affects">
                    This affected my:
                    <div>
                    { inventoryDetail.fear !== 'false' && 'Fear' }
                    </div>
                    <div>
                    { inventoryDetail.selfEsteem !== 'false' && 'Self-Esteem' }
                    </div>
                    <div>
                    { inventoryDetail.security !== 'false' && 'Security' }
                    </div>
                    <div>
                    { inventoryDetail.personalRelationship !== 'false' && 'Personal Relationship' }
                    </div>
                    <div>
                    { inventoryDetail.sexRelations !== 'false' && 'Sex Relations' }
                    </div>
                    <div>
                    { inventoryDetail.pride !== 'false' && 'Pride' }
                    </div>
                </div>
                <div className="inventory-detail__myPart">
                   My Part: { inventoryDetail.myPart }
                </div>
                    <button className="custom-btn btn--green" onClick={ () => setEdit(true) }>Edit</button>
            </div>
        )
    }
}

export default InventoryDetail;