import React from 'react'
import PropTypes from 'prop-types'

const Login = ({
    username,
    password,
    handleUsername,
    handlePassword,
    handleLogin,
}) => {
    return (
        <div>
            <h1>Login to application</h1>
            <form onSubmit={handleLogin}>
                <p>Username: </p>
                <input type="text" id="username" value={username} onChange={handleUsername} />
                <p>Password: </p>
                <input type="password" id="password" value={password} onChange={handlePassword} />
                <p />
                <button id="login-button" type="submit">Login</button>
            </form>
        </div>
    )
}
Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsername: PropTypes.func.isRequired,
    handlePassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
}
export default Login
