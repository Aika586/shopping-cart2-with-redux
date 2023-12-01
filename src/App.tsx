import { useParams } from "react-router-dom"
import Header from "./components/Header"
import { getProducts,getProductDetail } from "./features/products/ProductsSlice"
import {  useAppDispatch } from './hooks'
import{useEffect,useCallback} from 'react'

function App() {
  const {id}= useParams()
  const dispatch=useAppDispatch()
  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  useEffect(()=>{
    memoizedDispatch(getProducts())
  },[memoizedDispatch])

  useEffect(()=>{
    if (id) {
      memoizedDispatch(getProductDetail(id));
    }
  },[id,memoizedDispatch])
  

  return (
    <>
      <Header/>
      
    </>
  )
}

export default App
