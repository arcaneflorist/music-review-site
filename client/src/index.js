import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import { createStore } from 'redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider as UrqlProvider,
  subscriptionExchange,
} from 'urql';

import App from './App';
import Articles from './Articles';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Wishlist from './components/Wishlist';
import Nav from './components/Nav';

import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom'

import 'tachyons';
import './index.css';

const subscriptionClient = new SubscriptionClient(
  'ws://localhost:4001',
  {}
);
//import { StateProvider } from './AppState';

const client = createClient({
  url: 'http://localhost:4000',
  exchanges: [
    debugExchange,
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

// const initialState = {
//      token: ""
//  };
  
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_JWT_TOKEN':
        return {
            ...state,
            token: action.newToken
        };
        
        default:
        return state;
    }
};

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}>
                    <UrqlProvider value={client}>
                    <Router>                      
                    {/*<Nav/>*/}
                    <Switch>
                        <Route exact path="/" component={Articles} />
                        {/* <Route exact path="/" component={App} /> */}
                        <Route exact path="/wishlist" component={Wishlist} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route component={Login} />
                    </Switch>
                    </Router>
                    </UrqlProvider>                    
                </Provider>, document.getElementById('root'));