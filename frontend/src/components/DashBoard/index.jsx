import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { Link, Outlet } from 'react-router-dom'
const DashBoard = memo((props) => {
  return (
    <div>
        <ul>
          dash

            {/* 动态决定是boss, seeker
            <li><Link to={'/'}>dashboard</Link></li>  
            <li><Link to={'/chat'}>tochat</Link></li>  
            <li><Link to={'/user'}>to user</Link></li>  

            <Outlet/> */}
            <Outlet></Outlet>
        </ul>
    </div>
  )
})

DashBoard.propTypes = {}

export default DashBoard