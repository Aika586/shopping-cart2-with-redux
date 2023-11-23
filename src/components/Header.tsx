import { Link,Outlet } from "react-router-dom"

export default function About(){
  return(
    <>
    <header>
    <h1>Electronics KG</h1>
    <ul>
      <li><Link to='/'>About</Link></li>
      <li><Link to='products'>Products</Link></li>
      <li><Link to='shoppingCart'>Shopping Cart</Link></li>
    </ul> 
  </header>
  <Outlet/>
  </>
  
  )
}