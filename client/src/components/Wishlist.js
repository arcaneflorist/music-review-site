import React, { useState, useEffect } from 'react';
import WishContent from './WishContent';
import Upvote from './Upvote';
import { useMutation } from 'urql';
import Alert from './Alert';

const PostQuery = `
mutation($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
  }
}`;

const DeleteQuery = `
mutation($id: ID!){
  deletePost(id: $id){
    id 
  }
}`;

const Wishlist = ({data}) : Object => {

  const [res, postMutation] = useMutation(PostQuery);
  const [delRes, deleteMutation] = useMutation(DeleteQuery);

  const [form, setForm] = useState({
    title: '',
    content: ''
  });  
  // const [content, setContent] = useState("");
  const [appear, setAppear] = useState(true);    

  const handlePost = () => {
    if(validateForm())    
      postMutation(form)    
  }

  const validateForm = () => {        
    let formArray = [...Object.values(form)];

      for ( let i = 0; i < formArray.length; i++ ) {      
        if (!formArray[i].length) {
          return false;
        }
      }
      return true;
    };

  return(
    <div className="pa3 pa5-ns">
    {res.error && <Alert message={res.error}/>}  
    <div className="list pl0 measure center">
    <div className="rs-container">
      <input className="wish-input rs-text" onChange={(e) => {setForm({...form, title: e.target.value})}} placeholder="type your stuff here..."/>      
      <div className="input-btn prime" onClick={() => {handlePost()}}><i className="far fa-paper-plane"></i></div>
    </div>
    {
    appear &&
    <div className="rs-container">
      <textarea className="wish-input rs-text" onChange={e => {setForm({...form, content: e.target.value})}} placeholder="content here..."/>      
    </div>
    }
    </div>    
      <ul className="list pl0 measure center wishlist curvy">
      {data &&
            data.map(post => (
        <li key={post.id} className="request">
          <div className="controls">
            <div className="button expand"></div>
            <div onClick={() => {deleteMutation({id: post.id})}} className="button close"></div>
          </div>
          <WishContent title={post.title} details={post.content}/>
          <Upvote/>
        </li>
        ))}        
      </ul>
    </div>
  )
}

export default Wishlist;