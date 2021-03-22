
import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './../src/pages/shop/shop.component';
import Header from './../src/components/header/header.componen';
import SignInAndSignUpPage from './../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser:null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount(){
   this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {

    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapshot =>{
        this.setState({
          currentUser:{
            id:snapshot.id,
            ...snapshot.data()
          }
        });
        console.log(this.state);
      });

    }
    else{
      this.setState({currentUser:userAuth});
    }
    
})
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App;
