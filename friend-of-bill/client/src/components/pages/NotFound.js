import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found'>
        <h1 className='not-found__title'>Waa Waa Wahhh</h1>
        <p className="not-found__desc">
        Sorry it looks like this page doesn't exist. You can return to the dashboard <Link className='not-found__desc--link' to="/dashboard">Here</Link>
        </p>
        
    </div>
  )
}

export default NotFound