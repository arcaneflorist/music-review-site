//@flow
import React, { useState } from 'react';
import { useMutation } from 'urql';
import Loading from './Loading';
import Alert from './Alert';

import { useSelector, useDispatch } from 'react-redux';

import {
  NavLink,
  Redirect
} from 'react-router-dom'

const LoginQuery = `
mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}`;

const Login = () => {
  
  const dispatch = useDispatch();
  //const { token } = useSelector();

  const [res, executeMutation] = useMutation(LoginQuery);
  const [success, setSuccess] = useState(false);
  const [_email, setEmail] = useState('');
  const [_password, setPassword] = useState('');
  //'bob@prisma.io' <- valid username
  //'secret43'      <- valid password

  const handleClick = () => executeMutation({ email: _email, password: _password });  

  const log = response => {
    if(response != undefined){
      const jwtToken = response.login.token;
      setSuccess(true)
      dispatch({
                type: 'SET_JWT_TOKEN',
                newToken: jwtToken
              })
      console.log('jwt: ' + jwtToken)      
    }
  }

  if(success)
    return <Redirect to='/'></Redirect>

  return (    
    <form className="pa3 pa5-ns">
      {res.fetching ? <Loading/> : <span>{log(res.data)}</span>}      
      
      <div className="pl0 measure center">        
      <span className="sm-text text-left rs-text">username</span>
        <input className="wish-input rs-text mg-1" placeholder="absolute@unit.com"
        type="text" 
        value={_email}
        onChange={e => setEmail(e.target.value)}
        aria-describedby="name-desc"/>                  
        <span className="sm-text text-left rs-text">password</span>
        <input id="password" className="wish-input rs-text mg-1" type="password"  placeholder="**********"
        value={_password}
        onChange={e => setPassword(e.target.value)}
        aria-describedby="name-desc"/>
        <div className="">
            <div className="input-btn-bg prime" onClick={handleClick}><i className="fas fa-sign-in-alt"></i></div>            
            {/* <a className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={handleClick}><i className="fas fa-sign-in-alt"></i></a> */}
          </div>
          <span className="sm-text text-centre rs-text">Don't have an account?   <br/>
                <NavLink
                    className="f6 fw4 hover-blue no-underline black-70 dn dib-ns pv2 lnk"
                    activeClassName="blue"
                    exact={true}
                    to="/signup"
                    title="signup">
                    Sign up
                </NavLink>
                </span>
                
                {res.error && <Alert message={res.error}/>}
        {/* <small id="name-desc" className="f6 red db mb2">{res.error && '' + res.error}</small> */}
      </div>
  </form>
  );
};

export default Login;