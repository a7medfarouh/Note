import React, { useState }  from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom'
import Joi from 'joi';



export function Login() {
  let baseURL = 'https://sticky-note-fe.vercel.app/';
  const [user, setUser] = useState({ 'email': '', 'password': '' });
  const [error, setError] = useState('')
  const [message, setMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  
    async function signIn(e) {
        e.preventDefault();
        // console.log("aa")
        setIsLoading(true);
        const schema = Joi.object({
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password:Joi.string().pattern(/^[A-Z]+[a-z]+[0-9]+/i).required(),
        })
        let res=schema.validate(user,{abortEarly:false});
        // console.log(res)
        if( res.error ){
            setMessage(res.error.details);
            setIsLoading(false);
        }
        else{
            let { data } = await axios.post(baseURL + 'signin', user)
            // console.log(data);
            if(data.message ==="success"){
                // console.log(data);
                // console.log(data.token);
                localStorage.setItem("token",data.token)
                localStorage.setItem("userdata",data.user._id)
                navigate('/home');
              
            }
            else{
                setError(data.message);
            
            }
            setIsLoading(false);
        }
    }
  
    function getUser(e) {
        setMessage([]);
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    function getError(key){
        for(let element of message)
         {
             if(element.context.key===key)
             {
                 return element.message;
             }
         }
         return '';
     }
  return  <>
  <div className="container my-5 py-5">
      <div className="col-md-5 m-auto text-center">
          <form onSubmit={signIn}>
          <div className="form-group">
                  <input onChange={getUser}  placeholder="Enter email" type="email" name="email" className="form-control" />
                  { getError("email").length===0?'':<div className='alert alert-danger '>{getError("email")}</div>}
              </div>
              <div className="form-group my-2">
                  <input onChange={getUser}  placeholder="Enter you password" type="password" name="password" className=" form-control" />
                  { getError("password").length===0?'':<div className='alert alert-danger '>{getError("password")}</div>}
              </div>
              <button type="submit" className={'btn btn-info w-100'+(isLoading? " disabled":"")}> {isLoading? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : 'SignIn'}  </button>

              {error && <div className="alert alert-danger mt-2">
                  {error}
              </div>}
          </form>
          
        <div  className="text-center d-flex justify-content-center align-items-center text-white py-3">
            <span className='fs-4 mx-2' >Not a member yet?  </span>
            <Link to="register" className="nav-link bg-special">  Create Account</Link>
        </div>
      </div>
  </div>
</>
}
