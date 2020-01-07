//@flow
import React, {useState} from 'react';
import { useMutation } from 'urql';
import Loading from './Loading';
import Alert from './Alert';
import {
  Redirect
} from 'react-router-dom'

const SignUpQuery = `
mutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}`;

const SignUp = () => {

  const [res, executeMutation] = useMutation(SignUpQuery);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  //'bob@prisma.io' <- valid username
  //'secret43'      <- valid password

  const args = {email, password, name};

  const handleClick = () => executeMutation(args);

  const log = response => {
    if(response != undefined){
      setSuccess(true)
      console.log('jwt: ' + response.signup.token)      
    }
  }

  if(success)
    return <Redirect to='/'></Redirect>

  // if(res.error)
  //   return 'oh no ' + res.error

  return (    
    <form className="pa3 pa5-ns">
      {res.fetching ? <Loading/> : <span>{log(res.data)}</span>}
      <div className="pl0 measure center">
        <span className="sm-text text-left rs-text">username</span>
        <input id="r-email" autoComplete="off" className="wish-input rs-text mg-1" type="text" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-describedby="r-email-desc"/>
        <span className="sm-text text-left rs-text">name</span>
        <input id="r-name" autoComplete="off" className="wish-input rs-text mg-1" type="text" 
        value={name}
        onChange={e => setName(e.target.value)}
        aria-describedby="name-desc"/>
        <span className="sm-text text-left rs-text">password</span>
        <input id="r-password" autoComplete="off" className="wish-input rs-text mg-1" type="password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-describedby="name-desc"/>
          <span className="sm-text text-left rs-text">confirm password</span>
        <input id="r-confirm-password" autoComplete="off" className="wish-input rs-text mg-1" type="password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-describedby="name-desc"/>
        <div className="">
            <div className="input-btn-bg prime" onClick={handleClick}><i className="fas fa-user-plus"></i></div>
            {/* <a className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={handleClick}><i className="fas fa-sign-in-alt"></i></a> */}
          </div>
          {res.error && <Alert message={res.error}/>}
      </div>
  </form>
  );
};

export default SignUp;