
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout';
import { Login } from './Component/Login';
import { Register } from './Component/Register';
// import { Notfound } from './Component/Notfound';
import { Home } from './Component/Home';
import ParticlesComponent from './Component/Particles';


let routers= createHashRouter([
  {path:'/',element:<Layout/> ,children:[
    {index:true,element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'home',element:<Home/>},
    {path:'*',element:<Login/> }
  ] }
]);



function App() {

  
  
  return <>
      <ParticlesComponent/>
      <RouterProvider router={routers}/>
      
  </>
      
       
    

}

export default App;
