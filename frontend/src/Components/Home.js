import React from 'react'
import './Home.css'
import Shop from './Shop'
function Home() {
  return (
    <div >
        <div class="Home-Page">
            <div class="card text-bg-dark border-0">
                <div class="card-img-overlay">
                    <h1 class="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h1>
                    <h3 class="card-text lead fs-2" color='white'>CHECK OUT ALL THE TRENDS</h3>
                    
                </div>
            </div>

        </div>
    <Shop />
    </div>
  )
}

export default Home