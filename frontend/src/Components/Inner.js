import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import './Inner.css'
const Inner = () => {

    const {id}=useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const getProduct = async () =>
      {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        setProduct(await response.json());
        setLoading(false);
      }
    
     getProduct();
    })

    const Loading = ()=>
    {
        return(
            <>
            {/* <div className="col-md-6">
                <Skeleton height={400}/>
            </div>
            <div className="col-md-6" style={{lineHeight:2}}>
                <Skeleton height={50} width={300}/>
                <Skeleton height={75} />
                <Skeleton height={25} width={150}/>
                <Skeleton height={50}/>
                <Skeleton height={150}/>
                <Skeleton height={50} width={100}/>
                <Skeleton height={50} width={100} style={{marginLeft:6}}/>
            </div> */}
            </>
        )
    }
    const ShowProduct = ()=>
    {
        return(
            <>
                <div>Class</div>
            </>
        )
    }
  return (
    <div>
        <h1>Product-Info</h1>
            <div className="container">
            <div className="row">
                {loading ? <Loading />: <ShowProduct/>}
            </div>
           </div>
    </div>
  )
}

export default Inner