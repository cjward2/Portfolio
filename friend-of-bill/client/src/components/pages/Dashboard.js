import SoberDate from '../SoberDate'
import DailyReflection from '../DailyReflection'
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <SoberDate />
            <DailyReflection />
        </div>
    )
}

export default Dashboard
