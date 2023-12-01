import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
type Product={
  id:number,
  title:string,
  images:string, 
}
type AddToCartPayload = {
  quantity: number;
  productItem: Product & { price: number, description: string, quantity: number };
};


type CartItems=Product &{price:number,description:string,quantity:number}

type Products={
  productItems:Product[]|null,
  productItem:null|Product & {price:number,description:string,quantity:number},
  cartItems:CartItems[]
  total:number,
  loading:boolean
  quantity:number
  cartAmount:number
} 

const initialState:Products={
  productItems:null,
  productItem:null,
  cartItems:[],
  total:0,
  loading:false,
  quantity:1,
  cartAmount:0
}

export const getProducts=createAsyncThunk(
  'cart/products',async()=>{
    try{
      const response=await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=15',{mode:"cors"});
      const data=await response.json() 
      return data 
    }
    catch(error){console.log(error)}
    
  }
  )
  
  
  export const getProductDetail=createAsyncThunk(
    'getProductDetal',async(id:string|undefined)=>{
      try{
        const resp=await fetch((`https://api.escuelajs.co/api/v1/products/${id}`))
        const data=await resp.json()
        return data
      }
      catch(error){
        console.log(error)
      }
    })
    
    
    const cartSlice=createSlice({
      name:"cart",
      initialState,
      reducers:{
        addToCart:(state,action: PayloadAction<AddToCartPayload>)=>{
         
          const { quantity, productItem } = action.payload;
          const newCartItems=[...state.cartItems]
          const productIndex=newCartItems.findIndex((item)=>item.id===productItem.id)
          if(productIndex===-1){
        newCartItems.push({...productItem,quantity})
      }else{
        newCartItems[productIndex].quantity+=quantity
       
      }
  
      state.cartItems=newCartItems
      
      
    },

    increaseItem:(state,action:PayloadAction<number>)=>{
    const cartItem=state.cartItems.find((item)=>item.id===action.payload)
    if (cartItem) {
      cartItem.quantity = cartItem.quantity + 1;
    }
    },

    decreaseItem:(state,action:PayloadAction<number>)=>{
    const cartItem=state.cartItems.find((item)=>item.id===action.payload)
    if (cartItem) {
      cartItem.quantity = cartItem.quantity - 1;
    }
    },

    calculateTotals:(state)=>{
     const amount=state.cartItems.reduce((acc,item)=>acc+item.quantity,0)
     const totalPrice=state.cartItems.reduce((total,product)=>total+product.price*product.quantity,0)
     state.cartAmount=amount
     state.total=totalPrice
    },

    removeItem:(state,action:PayloadAction<number>)=>{
      const itemId=action.payload
      state.cartItems=state.cartItems.filter((item)=>item.id!==itemId)
    }

  },
  extraReducers:(builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.productItems = action.payload || null;
      })
      .addCase(getProductDetail.fulfilled, (state, action: PayloadAction<Product & {price:number,description:string,quantity:number}>) => {
        state.productItem = action.payload || null;
      });
        builder.addMatcher(
          (action) => [getProducts.pending, getProducts.fulfilled, getProducts.rejected,
                       getProductDetail.pending, getProductDetail.fulfilled, getProductDetail.rejected].includes(action.type),
          (state,action) => {
            state.loading = action.type.endsWith('/pending');
          }
        );
    
      },
})

export const {addToCart,increaseItem,decreaseItem,calculateTotals,removeItem}=cartSlice.actions

export default cartSlice.reducer


