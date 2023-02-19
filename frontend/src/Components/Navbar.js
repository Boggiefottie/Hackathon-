import React, { useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './Navbar.css'
import AnimatedRoutes from './AnimatedRoutes'
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ethers } from "ethers";
// import {ConnectButton} from 'web3uikit'


function Navbar() {
  const [address, setAddress] = useState("")
  const [connectionStatus, setConnectionStatus] = useState("Connect")

  const handleConnect = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({ method: "eth_requestAccounts" })

      console.log("connected")
      setAddress(account[0])
      setConnectionStatus("Connected")
    }
    else {
      window.alert("Install a Wallet")
    }
  }


  return (

    <div>
      <Router>
        <nav>
          <div class="Navbar">
            <div>
              <Link to="/">
                <img src='Assets\Pioneers-logo6.png' class="Logo" />
              </Link>
            </div>
            <div class="Search-div">
              <i class="fas fa-search" id="Search-icon"></i>
              <input type='text' placeholder='Search' class="Search"></input>
            </div>
            <div class="Home" title='Home'>
              <Link to="/" class="Home-btn-link"><button class="Home-btn"><i class="fa-solid fa-house"></i></button></Link>
            </div>
            <div class="Contact" title='Contact'>
              <Link to="/Contact"><button class="Contact-btn"><i class="fa-solid fa-phone"></i></button></Link>
            </div>
            <div class="About" title='About'>
              <Link to="/About">
                <button class="About-btn"><i class="fa-solid fa-circle-info"></i></button>
              </Link>
            </div>

            <div class="Shop" title='Shop'>
              <Link to="/Shop"><button class="Shop-btn"><i class="fa-solid fa-bag-shopping"></i></button></Link>
            </div>
            <div class="Cart" title='Cart'>
              <Link to="/Cart">
                <button class="Cart-btn">
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </Link>
            </div>
            <div class="Login">
              <button class="Login-btn">
                <i class="fas fa-sign-in-alt"></i>
              </button>
              <button onClick={handleConnect} >
                {connectionStatus}
              </button>
              <div class="Login-Content">
                <a ><Link to="/Login"><button class="SignIn-btn">Login</button></Link></a>
                <a ><Link to="/SignUp"><button class="SignUp-btn">SignUp</button></Link></a>
              </div>
            </div>
          </div>
          {/* <ConnectButton moralisAuth= {false}></ConnectButton> */}
        </nav>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default Navbar 
