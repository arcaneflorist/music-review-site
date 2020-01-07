import React, { useState } from 'react';

import '../Form.css';
import Alert from './Alert';

const FormHooks = () => {


    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [valid, setValid] = useState(null);

    const validateForm = () => {        
    let formArray = [...Object.values(form)];

      for ( let i = 0; i < formArray.length; i++ ) {      
        if (!formArray[i].length) {
          return false;
        }
      }
      return true;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        setValid(true);
        console.log('Success!');
      } else {
        setValid(false);
        console.log('Failure!');
      }
    };

    return (  
      <>    
      <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
        <form
          className="Form"
          onSubmit={ (e) => {
            e.preventDefault();
            handleSubmit();
          } }
           >
          <input name="firstName" onChange={e => {setForm({...Object.assign(form), firstName: e.target.value})}}/>
          <input name="lastName" onChange={e => {setForm({...form, lastName: e.target.value})}}/>
          <input name="email" onChange={e => {setForm({...form, email: e.target.value})}}/>
          <input name="password" onChange={e => {setForm({...form, password: e.target.value})}}/>
          <button className="no-padding">Submit</button>
        </form>
        
      </div>
      {valid === true && <Alert message={{message: 'Success!'}} type="success"/>}
      {valid === false && <Alert message={{message: 'Failure!'}} type="error"/>}}
      </>
    );
  };


export default FormHooks;