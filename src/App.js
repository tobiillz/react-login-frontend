import './App.css';
import React, { Component } from 'react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

class App extends Component {

  async componentDidMount(){
    try{

      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        UserStore.loading = false;
        UserStore.IsLoggedIn = true;
        UserStore.username = result.username;
      }
      else{
        UserStore.loading = false;
        UserStore.IsLoggedIn = false;
      }
    }
    catch(e){
      UserStore.loading = false;
      UserStore.IsLoggedIn = false;

    }

  }

  async doLogout(){
    try{

      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        
        UserStore.IsLoggedIn = false;
        UserStore.username = '';
      }
    }

  
    catch(e){
      console.log(e)
    }
  }

  render() {
    if (UserStore.loading){
      return (
        <div className = "app">
          Newww
        </div>
      )
    }

    else{
      return (
        <div className="app">
          <div className="container"> 
          
          </div>
            <h1>Test for </h1>
            
        </div>
      )
    }
    
  }
}

export default App;
