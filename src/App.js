
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout';
import { Login } from './Component/Login';
import { Register } from './Component/Register';
import { Home } from './Component/Home';
import ParticlesComponent from './Component/Particles';


function ProtectedRoute(props){
  if(localStorage.getItem("token")==null){
    return <Navigate to="/login" />
  
  }
  else{
    return <>{props.children}</>
  }

}

let routers= createHashRouter([
  {path:'/',element:<Layout/> ,children:[
    {index:true,element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute> },
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
