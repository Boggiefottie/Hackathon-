import React from 'react'
import './Home.css'
import Shop from './Shop'
function Home() {
  return (
    <div>
        <div className="Hero">
            <div class="card text-bg-dark border-0">
                <img src="/assets/bg2.jpg" class="card-img" alt="Background" height="1035px" width="100%" />
                <div class="card-img-overlay">
                    <h5 class="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                    <p class="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                    
                </div>
            </div>

        </div>
    <Shop />
    </div>
  )
}

export default Home