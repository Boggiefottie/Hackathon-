import React,{useState} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Home from './Home'
import Shop from './Shop'
import Contact from './Contact'
import About from './About';
import Cart from './Cart';
import Inner from './Inner';
import Login from './Login';
import SignUp from './SignUp';
// import { AuthProvider } from './contexts/AuthContext';
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/Shop' element={<Shop  />} />
        <Route path='/products/:id' element={<Inner  />}/>
        <Route path='/Contact' element={<Contact  />} />
        <Route path='/About' element={<About  />} />
        <Route path='/Cart' element={<Cart  />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes