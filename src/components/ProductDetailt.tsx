import { useAppSelector,useAppDispatch } from '../hooks'
import{useState} from "react"
import { addToCart,calculateTotals } from '../features/products/ProductsSlice'

export default function ProductDetail(){
const {productItem,loading}=useAppSelector((store)=>store.products)
const [quantity,setQuantity]= useState(1)
const dispatch=useAppDispatch()
function incrementQuantity(){
  setQuantity(quantity+1)
 }

 function decrementQuantity(){
  if(quantity>1){
    setQuantity(quantity-1)
  }
 }

if(loading)return <h3>loading...</h3>
function handlclick(){
  if(productItem){
  dispatch(addToCart({quantity:quantity,productItem}))}
  dispatch(calculateTotals())
}

return(
  productItem && (
    <div className="product-containers">
      <img src={`${productItem.images}`} alt={productItem.title}/>
      <h2>{productItem.title}</h2>
      <p>${productItem.price}</p>
      <p>{productItem.description}</p>
      <div className="button-container">
      <button onClick={incrementQuantity}>+</button> 
      <p>{quantity}</p>
      <button onClick={decrementQuantity}>-</button>
      </div>
      <button onClick={handlclick}>Add to cart</button>
    </div>
  )
)
}


