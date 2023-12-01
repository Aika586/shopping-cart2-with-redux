import { Link,Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks"

export default function About(){
  const {cartAmount}=useAppSelector((store)=>store.products)
  return(
    <>
    <header>
    <h1>Electronics KG</h1>
    <ul>
      <li><Link to='/'>About</Link></li>
      <li><Link to='products'>Products</Link></li>
      <li><Link to='shoppingCart'>Shopping Cart {cartAmount}</Link></li>
    </ul> 
  </header>
  <Outlet/>
  </>
  
  )
} 