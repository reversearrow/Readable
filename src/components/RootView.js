import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as API from '../utils/api.js'
import { addPost } from '../actions/'
import { connect } from 'react-redux';
import sortBy from 'sort-by'


function DisplayCatagories(props){
  return (
    <div>
      <h3> Catagories </h3>
      {
        props.catagories.map((catagory) => (
          <Link to={`${catagory.path}`}><li key={`${catagory.name}`}>{catagory.name}</li></Link>
        ))
      }
    </div>
  )
}


function DisplayAllPosts(props){
  return (
    <div>
      <h3> Top Posts </h3>
        <select value={props.default} onChange={props.sort}>
          <option value="highvotescore">Highest Vote Score</option>
          <option value="timestamp">Time</option>
        </select>
      {
        props.posts.map((post) => (
          <div>
            <Link to={`${post.id}`}>
              <h4 key={`${post.id}`}>{post.title}</h4>
            </Link>
            <h5>{post.body}</h5>
          </div>
      ))
      }
    </div>
  )
}

class RootView extends Component {
    state = {
    catagories: [],
    posts: []
  }


  componentDidMount(){
    API.getCatagories().then(catagories => this.setState({ catagories }))
    API.getAllPosts().then(data => data.map(
      (d) => (this.props.dispatch(addPost(d)))
    ))
  }

  sortByHighScore(event){
    console.log(event.target.value)
  }

  render(){
    const defaultSort = 'highvotescore'
    return (
      <div>
        <DisplayCatagories catagories={this.state.catagories}/>
        <DisplayAllPosts posts={this.props.posts} default={"highvotescore"} sort={this.sortByHighScore}/>
      </div>
    )
  }
}

const mapStateToProps = (posts) => ({
   posts: posts
})

export default connect(mapStateToProps)(RootView)
