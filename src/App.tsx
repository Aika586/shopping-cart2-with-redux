import Header from "./components/Header"
import { getProducts } from "./features/products/ProductsSlice"
import { useAppSelector, useAppDispatch } from './hooks'
import{useEffect} from 'react'


function App() {
  const{productItems}=useAppSelector((store)=>store.products)
  console.log(productItems)
  const dispatch=useAppDispatch()

  useEffect(()=>{
    dispatch(getProducts())
  },[])
  

  return (
    <>
      <Header/>
    </>
  )
}

export default App
