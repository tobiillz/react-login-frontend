import './App.css';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';

class App extends Component {

  async componentDidMount(){
    try{

      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
              <div className="container"> 
                Loading, Please wait....
              </div>
        </div>
      );
    }


    else{

      if (UserStore.IsLoggedIn){
        return (
          <div className = "app">
                <div className="container"> 
                  Welcome {UserStore.username}

                  <SubmitButton
                    text = {'Log out'}
                    disabled = {false}
                    onClick = { ()=> this.doLogout()}
                  />
                </div>
          </div>
        );
      }

      return (
        <div className="app">
          <div className="container"> 
            
            <SubmitButton
                    text = {'Log out'}
                    disabled = {false}
                    onClick = { ()=> this.doLogout()}
            />
            <LoginForm/>
            
          </div>
        </div>
      )
    }
    
  }
}

export default App;
