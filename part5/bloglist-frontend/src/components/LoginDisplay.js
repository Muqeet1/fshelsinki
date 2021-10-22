import React from 'react'
const LoginDisplay = ({ user, handleLogout }) => (
    <div>
        <p>{user.name} is logged in! </p>
        <button onClick={handleLogout}>Log Out</button>
    </div>
)
export default LoginDisplay
