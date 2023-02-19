import React, { useState, useEffect } from 'react'
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import abi from "../abi.json"


import './Shop.css'
const Shop = () => {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)
  // const [walletAddress, setwalletAddress] = useState("")
  // const [provider, setProvider] = useState(null)
  // const [mintPioneers, setMintPioneers] = useState(null)
  const [usd, setUsd] = useState(0)
  let componentMounted = true;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = await window.ethereum.request({ method: "eth_requestAccounts" })
      console.log(provider)
      const balance = await provider.getBalance("0x4C6C922a1044Bb6840B926BBD461A1DCff40bd1B")
      // console.log(ethers.utils.formatEther(balance))
      const mintPioneers = new ethers.Contract("0xEC2A9D5deDD2EdB22Fd991730a591198e149b097", abi, provider)
      console.log(mintPioneers)
      const usd = await mintPioneers.latestRoundData()
      setUsd(ethers.utils.formatEther(usd[1]) * 10000000000)
      if (componentMounted) {
        setData(await response.clone().json())
        setFilter(await response.json());
        setLoading(false);
        console.log(filter)
      }
      return () => {
        componentMounted = false;
      }
    }

    getProducts();
  }
    , [],[])





  const Loading = () => {
    return (
      <>

        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    )
  }
  const assignTokens = async (e) => {
    e.preventdefault()



  }
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  }
  const ShowProducts = () => {
    return (
      <>
        <button >Balance </button>
        <div className="buttons d-flex justify-content-center mb-5 pb-5" class="filter-container">
          <button className="btn btn-outline-dark" onClick={() => setFilter(data)} >All</button>
          <button className="btn btn-primary" >Get Balance</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")} >Men's Clothing</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")} >Women's Clothing</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")} >Jewellery</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")} >Electronics</button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4" >
                <div class="card h-100 text-center p-4 " key={product.id}>
                  <img src={product.image} class="card-img-top" alt={product.title} height="250px" width="250px" />
                  <div class="card-body">
                    <h5 class="card-title mb-0">{product.title.substring(0, 12)}....</h5>
                    <p class="card-text lead fw-bold">{product.price} PIO  </p>
                    <p class="card-text lead fw-bold">{((product.price) * 500) / usd} POI </p>
                    <Link to={`/products/${product.id}`} class="btn btn-outline-dark">Buy Now</Link>
                    {/* <button onClick={assignTokens}>Give details </button> */}
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-12">
            <h1 className="display-6 fw-bolder text-center">
              Latest Products
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default Shop