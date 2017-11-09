import React, { Component } from 'react';
import '../App.css'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import DisplayCategories from './CategoryView'
import DisplayPosts from './PostView'
import { sortPosts,filterByCategory ,addPost,addCategory,getSelectedPost, addComment } from '../actions/'
import * as API from '../utils/api.js'
import AddPosts from './AddPost'
import PostDetailView from './PostDetailView'
import sortBy from 'sort-by'

class RootApp extends Component {
  componentDidMount(){
    API.getCatagories().then(catagories => catagories.map(
      (category) => (this.props.addCategory(category))
    ))
    API.getAllPosts().then(data => data.map(
      (d) => (this.props.addPost(d))
    ))
  }

  selectID = (id) => {
    this.props.selectPost(id)
  }

  sort = (event) => {
    this.props.sortPosts(event.target.value)
  }

  render() {
    return (
      <Switch>
      <Route exact path="/" render={()=>(
        <div>
          <DisplayCategories categories={this.props.allCategories} filter={this.props.filter}/>
          <DisplayPosts posts={this.props.posts} sort={this.sort} selectID={this.selectID}/>
          <AddPosts add={this.props.addPost}/>
          </div>
        )}/>
      <Route exact path="/posts/:id" render={()=>(
          <div>
            <PostDetailView id={this.props.location.pathname}/>
          </div>
          )}/>
    </Switch>
    );
  }
}



const getByPostsCategory = (posts,filter) => {
  //console.log(filter)
  switch(filter){
    case 'SHOW_ALL':
      return posts.filter((post) => post.deleted === false)
    default:
      return posts.filter((post) => post.category === filter && post.deleted === false)
  }
}

const getPostsSorted = (posts, sort) => {
  switch(sort){
    case "BY_TIMESTAMP":
      return posts.slice().sort(sortBy('-timestamp'))
    case "BY_HIGHESTVOTE":
      return posts.slice().sort(sortBy('-voteScore'))
    default:
      return posts.slice().sort(sortBy('-voteScore'))
  }
}


const mapStateToProps = (state) => {
  return {
    allCategories: state.categories,
    posts: getPostsSorted(getByPostsCategory(state.posts,state.categoriesFilter),state.postSortMethod)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortPosts: (data) => dispatch(sortPosts(data)),
    filter: (data) => dispatch(filterByCategory(data)),
    addPost: (data) => dispatch(addPost(data)),
    addCategory: (data) => dispatch(addCategory(data)),
    selectPost: (data) => dispatch(getSelectedPost(data)),
    addComment: (data) => dispatch(addComment(data)),
  }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RootApp))
