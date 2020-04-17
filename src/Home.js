import React, {useState} from 'react'
import './stylesheets/home.css'
import './stylesheets/loginForm.css'
import { Breakpoint } from 'react-socks'
import LoginForm from "./LoginForm"

export default function Home(){
   const [login, setLogin] = useState(false)

   function handleLoginPage() {
      setLogin(() => !login)
   }
   return (
      <>
            <Breakpoint m down>
               {!login ?
                  <div className="home-mobile">
                     <div className='logo-home'>
                        <h1>TRIVIA</h1>
                        <h1>Royale</h1>
                     </div>
                     <button className='login-mobile' onClick={handleLoginPage}><h2>Log In</h2></button>
                  </div>
                  :
                  <LoginForm info={{id: "", username: "", password: ""}} {...handleLoginPage}/>
               }
            </Breakpoint>
            <Breakpoint l up>
               <div className="home">
                  <div className='logo-home'>
                     <h1>TRIVIA</h1>
                     <h1>Royale</h1>
                  </div>
                  <div className="login">
                     <LoginForm info={{id: "", username: "", password: ""}} {...handleLoginPage}/>
                  </div>
               </div>
            </Breakpoint>
      </>
   )
}
