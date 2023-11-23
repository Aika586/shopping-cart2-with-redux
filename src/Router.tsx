import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import App from "./App";



export default function Router(){

  const router=createBrowserRouter([

    {
      path:"/",
      element:<App/>,
      children:[
        {index:true,element:<About/>},
        {path:"products", element:<Products/>},
        {path:"shoppingCart",element:<Cart/>}
      ]
    }
  ])

  return <RouterProvider router={router}></RouterProvider>;

}