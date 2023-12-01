import { useAppSelector,useAppDispatch } from "../hooks"
import { increaseItem,decreaseItem,calculateTotals,removeItem } from "../features/products/ProductsSlice"
import{useEffect} from'react'

export default function Cart(){
  const{cartItems,total}=useAppSelector((store)=>store.products)
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(calculateTotals())
  },[cartItems])

  


  return(
    <>
    <h1>Your Cart</h1>
    {cartItems && cartItems.map((item)=>(
      <div className="product-containers" key={item.id}>
        <img src={`${item.images}`} alt={item.title} />
        <h4>{item.title}</h4>
        <p>{item.price}</p>
        <div className="button-container">
        <button onClick={
          ()=>{
            dispatch(decreaseItem(item.id))
            if(item.quantity<1){
              dispatch(removeItem(item.id))
            }
          }}
          >-</button>
        <h5>{item.quantity}</h5>
        <button onClick={()=>dispatch(increaseItem(item.id)
              )}>+</button>
        <button className="remove-btn" onClick={()=>dispatch(removeItem(item.id))}>Remove item</button>
        </div>
      </div>
    ))}
    <hr />
    <h3>Total:${total}</h3>
    </>

  )
} 