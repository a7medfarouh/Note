import React, { useState } from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom'
import Joi from 'joi';

export  function Register() {
  let baseURL = 'https://route-egypt-api.herokuapp.com/';
  const [user, setUser] = useState({ 'first_name': '', 'last_name': '', 'email': '', 'password': '' });
  const [error, setError] = useState('')
  const [message, setMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  async function signUp(e){
    e.preventDefault();
    setIsLoading(true);
    const schema = Joi.object({
        first_name:Joi.string().alphanum().min(3).max(10).required(),
        last_name:Joi.string().alphanum().min(3).max(10).required(),
        age:Joi.number().min(18).max(60).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().pattern(/^[A-Z]+[a-z]+[0-9]+/i).required(),
    })
    let res=schema.validate(user,{abortEarly:false});
    if( res.error ){
        setMessage(res.error.details);
        setIsLoading(false);
    }
    else{
        let { data } = await axios.post(baseURL + 'signup', user)
        

        if(data.errors){
          setError(data.message);
        }
        else{
         navigate('/login');
        
        }
        setIsLoading(false);
    }
    
    // setIsLoading(false)
    // // console.log(data);
    // if (data.message === 'success') {
    //     navigate('/login')
    // } else {
    //     setError(data.message)
    // }

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
  // console.log(user);
  return  <>
  <div className="container my-5 py-5">
      <div className="col-md-5 m-auto text-center">
          <form onSubmit={signUp}>
              <div className="form-group">
                  <input onChange={getUser}  placeholder="Enter your firstname" name="first_name" type="text" className=" form-control" />
                  { getError("first_name").length===0?'':<div className='alert alert-danger '>{getError("first_name")}</div>}
              </div>
              <div className="form-group my-2 ">
                  <input onChange={getUser} placeholder="Enter your lastname" name="last_name" type="text" className="form-control" />
                  { getError("last_name").length===0?'':<div className='alert alert-danger '>{getError("last_name")}</div>}
              </div>
              <div className="form-group">
                  <input onChange={getUser}  placeholder="Enter email" type="email" name="email" className="form-control" />
                  { getError("email").length===0?'':<div className='alert alert-danger '>{getError("email")}</div>}
              </div>
              <div className="form-group my-2">
                  <input onChange={getUser}  placeholder="Enter you password" type="password" name="password" className=" form-control" />
                  { getError("password").length===0?'':<div className='alert alert-danger '>{getError("password")}</div>}
              </div>
              <button type="submit" className={'btn btn-info w-100'+ (isLoading? " disabled":"")}> {isLoading? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : 'SignUp'}  </button>

              {error ?<div className="alert alert-danger mt-2">
                            {error}
                        </div>:""}

                
          </form>
          <div  className="text-center d-flex justify-content-center align-items-center text-white p-3">
            <span className='fs-4 mx-2' >Already a member?   </span>
            <Link to="login" className="nav-link bg-special">  LogIn</Link>
            </div>
         
      </div>
  </div>
</>
}
