
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout';
import { Login } from './Component/Login';
import { Register } from './Component/Register';
import { Notfound } from './Component/Notfound';
import { Home } from './Component/Home';
import ParticlesComponent from './Component/Particles';
// import ParticlesBackground from './Component/ParticlesBackground';
let routers= createBrowserRouter([
  {path:'/',element:<Layout/> ,children:[
    {path:'login',element:<Login/>},
    {index:true,element:<Register/>},
    {path:'register',element:<Register/>},
    {path:'home',element:<Home/>},
    {path:'*',element:<Notfound/> }
  ] }
]);


function App() {


  
  return <>
      <ParticlesComponent/>
      <RouterProvider router={routers}/>
      
  </>
      
       
    

}

export default App;
