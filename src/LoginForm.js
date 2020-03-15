import React from 'react'
export default function LoginForm({info: {id, username, password}, handleLoginPage: handleLoginPage}){
   return (
      <div className="login-form">
         <form className="form-inputs">
            <h1 className="title">Log In</h1>
            <h3>Username:</h3>
            <input placeholder="Enter your username" type="text" value={username}/>
            <h3>Password:</h3>
            <input placeholder="Enter your password" type="text" value={password} /><br />
            <button><h2>Log In</h2></button>
         </form>
      </div>
   )
}
