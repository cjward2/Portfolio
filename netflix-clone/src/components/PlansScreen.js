import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import ClipLoader from "react-spinners/ClipLoader";
import db from '../firebase';
import { stripe_key } from '../config';
import './PlansScreen.css';

const PlansScreen = () => {
    const [products, setProducts] = useState([]);
    //Pull user state from store
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,

                })
            })
        })
    }, [user.uid])

    //Fetch products from firestore when component mounts
    useEffect(() => {
        setLoading(false);
        //Pull products collection where active is true
        db.collection('products')
        .where('active', '==', true)
        .get().then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });

            setProducts(products);
        });
    }, []);

    //console.log(products);
    //console.log(subscription);

    //Checkout function for onClick
    const loadCheckout = async (priceId) => {
        setLoading(true);
        const docRef = await db.collection('customers')
        .doc(user.uid).collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin, //send user back to subscriptions screen if successfull or canceled
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } =  snap.data();

            if(error) {
                //Show an error to customer 
                alert(`An error occured: ${ error.message }`)
            }
            if(sessionId) {
                //We have a session, lets redirect to checkout
                //Init Stripe

                const stripe = await loadStripe(stripe_key);

                stripe.redirectToCheckout({ sessionId });
            }

        })
    };

    //Conditonally display loading spinner
    if(loading) {
        return (
            <div className="plansScreen__spinner">
                <ClipLoader color="#e50914" size={125}/>
            </div>
            
        )
    } 

    if(!loading) {
        return (
            <div className="plansScreen">
               { subscription && <p>Renewal date: { new Date(subscription?.current_period_end * 1000).toLocaleDateString() }</p>} 
                {/* object.entries to get array of key value pairs from object, then map through and destructure array */}
                { Object.entries(products).map(([productId, productData]) => {
                    //add some logic to check if users subscription is active..
                    const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                    return (
                        <div key={ productId } className={`${ isCurrentPackage && "plansScreen__plan--disabled" } plansScreen__plan`}>
                            <div className="plansScreen__info">
                                <h5>{ productData.name }</h5>
                                <h6>{ productData.description }</h6>
                            </div>
                            <button onClick={ () => !isCurrentPackage && loadCheckout(productData.prices.priceId) }>
                                { isCurrentPackage ? 'Current Package' : 'Subscribe' }
                            </button>
                        </div>
                    )
                }) }
            
            </div>
        )
    }
    
}

export default PlansScreen
