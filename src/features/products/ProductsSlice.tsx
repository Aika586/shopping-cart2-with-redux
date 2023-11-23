import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

type Product={
 id:number,
 title:string,
 images:string[], 
}

type CartItems=Product &{price:number,description:string,quantity:number}

type Products={
  productItems:Product[]|null,
  productItem:null|Product & {price:number,description:string,quantity:number},
  CartItems:CartItems[]
  total:number,
  loading:'idle' | 'loading' | 'succeeded' | 'failed'
} 

const initialState:Products={
  productItems:null,
  productItem:null,
  CartItems:[],
  total:0,
  loading:"idle"
}

export const getProducts=createAsyncThunk(
  'cart/products',async()=>{
    try{
    const response=await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=15',{mode:"cors"});
    const data=await response.json() 
    return data as Product[]
  }
    catch(error){console.log(error)}
    
  }
)



const cartSlice=createSlice({
  name:"cart",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
  builder.addCase(getProducts.pending, (state)=>{
    state.loading="loading"
  }),
  builder.addCase(getProducts.fulfilled, (state,action)=>{
    state.loading='succeeded'
    state.productItems=action.payload||null
  }),

  builder.addCase(getProducts.rejected, (state)=>{
    state.loading="failed"
  })
  
  }

})

export default cartSlice.reducer

