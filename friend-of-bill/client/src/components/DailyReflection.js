import { useEffect, useState } from 'react';
import { setMsg } from '../features/messageSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { makeRequest } from '../util';
import './DailyReflection.css';

const DailyReflection = () => {
    const dailyReflectionInitialState = {
        title: "",
        pageNumber: "",
        paragraph1: "",
        paragraph2: ""
    }

    const [dailyReflection, setDailyReflection] = useState(dailyReflectionInitialState);
    const dispatch = useDispatch();
    //Bring in user info from store
    const user = useSelector(selectUser);
    //Run use Effect when component mounts
    useEffect(() => {
        const getRequest = async () => {
            try {
                const data = await makeRequest('/api/dailyReflection');
                setDailyReflection({ 
                    title: data.dailyReflectionTitle,
                    pageNumber: data.dailyReflectionPageNumber,
                    paragraph1: data.dailyReflectionP1,
                    paragraph2: data.dailyReflectionP2
                 });
            } catch(error) {
                dispatch(setMsg({ msg: `Something went wrong when grabbing today's daily reflection. Please try again later.`, err: true }));
            }
        }
        if(user.id !== undefined) {
            getRequest();
        }
    }, []);

    return (
        <div className="dailyReflection">
            <div className="dashboard__daily-reflection-container">
                    {/* I only want to display a daily reviews if they are actually coming back from backend. Im too reliant on a third paty website to potentially not send anything and break the app if this check isnt present */}
                    { dailyReflection.paragraph1 && (
                        <>
                        <h2 className='dailyReflection-header'>Here is today's daily reflection:</h2>
                        <p className='dailyReflection__title'>{ dailyReflection.title }</p>
                        {/* There is parts of the text from paragraph1 that I dont want like the disclaimer */}
                        <p className="dailyReflection__p1">{ dailyReflection.paragraph1.substr(0, dailyReflection.paragraph1.length - 390) }</p>
                        <p className="dailyReflection__pageNum">{ dailyReflection.pageNumber }</p>
                        <p className="dailyReflection__p2">{ dailyReflection.paragraph2 }</p>
                        </>
                    ) }
                    
                </div>
        </div>
    )
}

export default DailyReflection
