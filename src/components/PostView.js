import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class DisplayPosts extends Component{
  render(){
  if(this.props.posts){
  return (
    <div className="row">
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
              <div className="col-md-12"> Votes:{post.voteScore} </div>
              <div className="col-md-12"> Author: {post.author} </div>
              <div className="col-md-12"> Time: {post.timestamp} </div>
              <button className ="btn btn-primary"onClick={() => this.props.upVotePost(post.id)}>Upvote</button>
              <button className="btn btn-warning" onClick={() => this.props.downVotePost(post.id)}>Downvote</button>
              <button className="btn btn-danger" onClick={() => this.props.deletePost(post.id)}>Delete Post</button>
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
