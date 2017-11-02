import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayPosts from './PostView';

import { sortPosts,filterPosts,addPost,addCategory } from '../actions/'


function RenderCategories(props){
  if(props.categories){
  return(
    <div>
      <h3> Categories </h3>
      {
        props.categories.map((category) => (
          <div key={category.name}>
            <Link to={'/'} onClick={props.filter}><li>{category.name}</li></Link>
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
    filterPath = (e) => {
      let regexp = "(react|redux|udacity)"
      let uri = e.target.innerText.match(regexp)
        console.log(uri)
        if(uri){
          this.props.filter(uri[0])
        }
    }

   render() {
    return (
      <div>
        <RenderCategories categories={this.props.categories} filter={this.filterPath}/>
      </div>
  )}
}


export default DisplayCategories
