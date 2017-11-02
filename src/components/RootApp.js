import React, { Component } from 'react';
import '../App.css'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import DisplayCategories from './CategoryView'
import DisplayPosts from './PostView'
import { sortPosts,filterPosts,addPost,addCategory } from '../actions/'
import * as API from '../utils/api.js'
import AddPosts from './AddPost'

class RootApp extends Component {
  componentDidMount(){
    API.getCatagories().then(catagories => catagories.map(
      (category) => (this.props.addCategory(category))
    ))
    API.getAllPosts().then(data => data.map(
      (d) => (this.props.addPost(d))
    ))
  }

  sort = (event) => {
    console.log(event.target.value)
    this.props.sortPosts(event.target.value)
  }

  render() {
    return (
      <div>

      <Route exact path="/" render={()=>(
          <div>
          <DisplayCategories categories={this.props.allCategories} filter={this.props.filter}/>
          <DisplayPosts posts={this.props.posts} sort={this.sort}/>
          <AddPosts add={this.props.addPost}/>
          </div>
        )}/>
    </div>
    );
  }
}

const getFilteredPosts = (posts,filter) => {
  console.log(filter)
  switch(filter){
    case 'SHOW_ALL':
      return posts
    default:
      return posts.filter((post) => post.category === filter)
  }
}

const mapStateToProps = (state) => {
  return {
    allCategories: state.categories,
    posts: getFilteredPosts(state.posts,state.categoriesFilter),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortPosts: (data) => dispatch(sortPosts(data)),
    filter: (data) => dispatch(filterPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    addCategory: (data) => dispatch(addCategory(data)),
  }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RootApp))
