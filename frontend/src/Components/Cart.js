import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';

function Cart() {
  const {id}=useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    //const dispatch=useDispatch();
    //const addProduct=(product)=>{
    //    dispatch(addCart(product))
    //}
    useEffect(() => {
      const getProduct = async () =>
      {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        setProduct(await response.json());
        setLoading(false);
      }
    
     getProduct();
    }, [])
  return (
    <div>
      <h2>Your Cart</h2>
    </div>
  )
}

export default Cart