// @flow
import React from 'react';
import { useSelector, useStore } from 'react-redux';
import Loading from './components/Loading.js';
import Alert from './components/Alert.js';
import Wishlist from './components/Wishlist.js';

import Form from './components/Form.js';
import FormHooks from './components/FormHooks.js';

//import { useStateValue } from './AppState.js';
import { useQuery } from 'urql';

const List = ({data}) : Object => {
  return(
    <div className="pa3 pa5-ns">
      <ul className="list pl0 measure center">
     
      {data &&
            data.map(post => (
              <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30" key={post.id}>{post.title}
              <br></br>
              <a href={post.content}>{post.content}</a>              
              </li>
            ))}
      </ul>
    </div>
  )
}

const App = () => {

  const store = useStore();

  const { token } = store.getState();  

  const [result] = useQuery({
    query: `{ feed { id
                     title
                     content } }`,
  });

  // const [me] = useQuery({
  //   query: `{ me { name } }`,
  // });

  const { fetching, data, error } = result;

  if(error)    
    return <Alert message={error}/>;

  return fetching ? <Loading/> : <> 
                    { token != null && <Alert message={{message: 'Hello, nerd.'}} type="success"/> }                     
                    <Wishlist data={data.feed}/> 
                    </>;
}

export default App;