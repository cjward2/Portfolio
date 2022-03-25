import { Link } from 'react-router-dom';
import requireAuth from '../requireAuth';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='not-found'>
        <div className="not-found__content">
          <h1 className='not-found__title'>Waa Waa Wahhh</h1>
          <p className="not-found__desc">
          Sorry it looks like this page doesn't exist. You can return to the dashboard <Link className='not-found__desc--link' to="/dashboard">Here</Link>
          </p>
        </div> 
    </div>
  )
}

export default requireAuth(NotFound)