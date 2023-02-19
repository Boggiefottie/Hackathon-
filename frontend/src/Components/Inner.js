import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import './Inner.css'
import { ethers } from 'ethers';
import abi from "../abi.json"
const Inner = () => {

    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    // const [usd, setUsd] = useState(0)
    // const [mintPioneers, setMintPioneers] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            setProduct(await response.json());
            setLoading(false)
        }

        getProduct();
    }, [], [])

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
                </div>
            </>
        )
    }
    const handleMinting = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address ="0x56C0f07c9a945379f2243850C4A60419486933d1";
        const signer = provider.getSigner()
        console.log(provider)
        const balance = await provider.getBalance("0x4C6C922a1044Bb6840B926BBD461A1DCff40bd1B")
        // console.log(ethers.utils.formatEther(balance))
        console.log(address);
        // setMintPioneers(_mintPioneers)

        const mintPioneers = new ethers.Contract("0xEC2A9D5deDD2EdB22Fd991730a591198e149b097", abi, signer);
        const usd = await mintPioneers.latestRoundData()

        console.log(ethers.utils.formatEther(usd[1]) * 10000000000)

        await mintPioneers.mintTokens((((product.price) * 500) / (ethers.utils.formatEther(usd[1]) * 10000000000)).toString)
        
        // await mintPioneers.approve(address,  (((product.price) * 500) / (ethers.utils.formatEther(usd[1]) * 10000000000)).toString)
        // await mintPioneers.transfer(address, (((product.price) * 500) / (ethers.utils.formatEther(usd[1]) * 10000000000)).toString)
        window.alert("Tokens Minted")

    };


    const ShowProduct = () => {
        return (
            <>

                <div className="col-md-6" >
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6" >
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className="display-5" >
                        {product.title}
                    </h1>
                    <p className="lead" >
                        Rating:{product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4" >
                        PIO {product.price}
                    </h3>
                    <p className="lead" >
                        {product.description}
                    </p>
                    <button className="btn btn-outline-dark px-4 py-2" /*onClick={()=>addProduct(product)} */>
                        Add to Cart
                    </button>
                    <Link to="/cart" className="btn btn-dark ms-2 px-3 py-2 ">
                        Go to Cart
                    </Link>
                    <Link to='/mint'>
                    <button>
                        Get Tokens
                    </button>
                    </Link>
                </div>

            </>
        )
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    {loading ? <Loading /> : <ShowProduct />}
                    {/* <ShowProduct /> */}
                </div>
            </div>
        </div>
    )
}

export default Inner