
import{Link} from 'react-router-dom'
import { useAppSelector } from '../hooks'
 


export default function Products(){
  const {productItems,loading}=useAppSelector((store)=>store.products)
   let productElements: JSX.Element[] | undefined 
  console.log(loading)
   if(loading){
    return(
      <h3>loading...</h3>
      )
   }
  
  if(productItems){
   productElements= productItems.map((item)=>(
    <div className="product-containers" key={item.id}>
      <Link to={`/products/${item.id}`}>
      <img src={item.images} alt={item.title}/>
      <h3>{item.title}</h3> 

      </Link>

    </div> 
  ))}

  return(
    <div className="product-container">
    <h1> Clothes</h1>
    {productElements}
    </div>

  )
}