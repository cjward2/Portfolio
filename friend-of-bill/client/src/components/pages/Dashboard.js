import SoberDate from '../SoberDate'
import DailyReflection from '../DailyReflection';
import requireAuth from '../requireAuth';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <SoberDate />
            <DailyReflection />
        </div>
    )
}

export default requireAuth(Dashboard)
