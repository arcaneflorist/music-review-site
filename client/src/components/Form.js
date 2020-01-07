import React, { Component } from 'react';

import '../Form.css';

class Form extends Component {
  state = {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  };


  handleFirstNameChange = (e) => {    
    this.setState({
      form: {
        ...this.state.form,
        firstName: e.target.value,
      }
    })};

  handleLastNameChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        lastName: e.target.value,
      }    
    })};

  handleEmailChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        email: e.target.value,
      },    
  })};

  handlePasswordChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        password: e.target.value,
      },    
    })};

    validateForm = () => {
    const formInputs = ['firstName', 'lastName', 'email', 'password'];

    for ( let i = 0; i < formInputs.length; i++ ) {
      const inputName = formInputs[i];

      if (!this.state.form[inputName].length) {
        return false;
      }
    }

    return true;
  };


  handleSubmit = () => {
    if (this.validateForm()) {
      console.log('Success!');
    } else {
      console.log('Failure!');
    }
  };

  render() {
    return (
      <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
        <form
          className="Form"
          onSubmit={ (e) => {
            e.preventDefault();
            this.handleSubmit();
          } }
        >
          <input name="firstName" onChange={ this.handleFirstNameChange }/>
          <input name="lastName" onChange={ this.handleLastNameChange }/>
          <input name="email" onChange={ this.handleEmailChange }/>
          <input name="password" onChange={ this.handlePasswordChange }/>
          <button className="no-padding">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;