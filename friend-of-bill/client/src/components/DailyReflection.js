import { useEffect, useState } from 'react';
import './DailyReflection.css';

const DailyReflection = () => {
    const dailyReflectionInitialState = {
        title: "",
        pageNumber: "",
        paragraph1: "",
        paragraph2: ""
    }

    const [dailyReflection, setDailyReflection] = useState(dailyReflectionInitialState);

    //Run use Effect when component mounts
    useEffect(() => {
        fetch('/api/dailyReflection')
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error getting endpoint`)
            }
            return res.json();
        }).then(data => {
            setDailyReflection({ 
                title: data.dailyReflectionTitle,
                pageNumber: data.dailyReflectionPageNumber,
                paragraph1: data.dailyReflectionP1,
                paragraph2: data.dailyReflectionP2
             });
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div className="dailyReflection">
            <div className="dashboard__daily-reflection-container">
                    {/* I only want to display a daily reviews if they are actually coming back from backend. Im too reliant on a third paty website to potentially not send anything and break the app if this check isnt present */}
                    { dailyReflection.paragraph1 && (
                        <>
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
