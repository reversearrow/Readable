import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class DisplayPosts extends Component{
  render(){
  if(this.props.posts){
  return (
    <div>
      <h3> Top Posts </h3>
        <select onChange={this.props.sort}>
          <option value="BY_HIGHESTVOTE">Highest Vote Score</option>
          <option value="BY_TIMESTAMP">Time</option>
        </select>
      {
        this.props.posts.map((post) => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`} onClick={() => this.props.selectID(post.id)}>
              <li>{post.title}</li>
            </Link>
            <ul>{post.body}</ul>
          </div>
      ))
      }
    </div>
  )}
  else{
    return(
      <div></div>
    )
  }
  }
}

export default DisplayPosts
