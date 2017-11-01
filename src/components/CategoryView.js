import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayPosts from './PostView';
import * as API from '../utils/api.js'
import { sortPosts,filterPosts,addPost,addCategory } from '../actions/'
import AddPosts from './AddPost'

function RenderCategories(props){
  if(props.categories){
  return(
    <div>
      <h3> Categories </h3>
      {
        props.categories.map((category) => (
          <div key={category.name}>
            <Link to={`/category/${category.path}`} onClick={props.filter}><li>{category.name}</li></Link>
          </div>
      ))
    }
    </div>
  )
  } else{
    return (
      <div></div>
    )}
}


class DisplayCategories extends Component{
  componentDidMount(){
    API.getCatagories().then(catagories => catagories.map(
      (category) => (this.props.addCategory(category))
    ))
    API.getAllPosts().then(data => data.map(
      (d) => (this.props.addPost(d))
    ))
  }

    filterPath = (e) => {
      let regexp = "(react|redux|udacity)"
      let uri = e.target.innerText.match(regexp)
        console.log(uri)
        if(uri){
          this.props.filter(uri[0])
        }
    }

    sort = (event) => {
      console.log(event.target.value)
      this.props.sortPosts(event.target.value)
    }

   render() {
    return (
      <div>
        <RenderCategories categories={this.props.allCategories} filter={this.filterPath}/>
        <DisplayPosts posts={this.props.posts} sort={this.sort}/>
        <AddPosts add={this.props.addPost}/>
      </div>
  )}
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DisplayCategories))
