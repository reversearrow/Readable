import React, {Component} from 'react';
import {Switch, Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addCategory} from '../actions/'
import {receiveaddedComment} from '../actions/comments'
import {receiveAddedPost, sortPosts, addNewPost} from '../actions/posts'
import Posts from './PostsView'
import Comments from './CommentsView'
import * as API from '../utils/api.js'
import AddPosts from './AddPost'

const DisplayCategory = (props) => {
  const category = props.category
  return (
    <Link to={`/${category.name}`} onClick={this.filterCategories}>
      <li>{category.name}</li>
    </Link>
  )
}

const DisplayAllCategories = (props) => {
  return (
    <div>
      <h3>
        Categories
      </h3>
      {props
        .categories
        .map((category) => (
          <div key={category.name}>
            <DisplayCategory category={category}/>
          </div>
        ))
}
    </div>
  )
}

const DisplayPostSort = (props) => {
  return (
    <div>
      <h3>
        All Posts
      </h3>
      <select onChange={props.sort}>
        <option value="BY_HIGHESTVOTE">Highest Vote Score</option>
        <option value="BY_TIMESTAMP">Time</option>
      </select>
    </div>
  )
}

class RootView extends Component {
  componentDidMount() {
    API
      .getCatagories()
      .then(catagories => catagories.map((category) => (this.props.addCategory(category))))
    API
      .getAllPosts()
      .then(data => data.map((d) => (this.props.addPost(d))))
      .then(data => data.map((post) => API.getComments(post.id).then((comments) => (comments.map((comment) => (this.props.addComment(comment)))))))
  }

  sort = (event) => {
    this
      .props
      .sortPosts(event.target.value)
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
          <div>
            <DisplayAllCategories categories={this.props.categories}/>
            <DisplayPostSort sort={this.sort}/>
            <Posts/>
            <AddPosts add={this.props.addNewPost}/>
          </div>
        )}/>
        <Route
          exact
          path="/:category"
          render={() => (
          <div>
            <DisplayAllCategories categories={this.props.categories}/>
            <Posts/>
            <button><Link to="/">Root Page</Link></button>
          </div>
        )}/>
        <Route
          exact
          path="/:category/:id"
          render={() => (
          <div>
            <Posts/>
            <Comments/>
            <button><Link to="/">Root Page</Link></button>
          </div>
        )}/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {categories: state.categories, posts: state.posts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(receiveAddedPost(data)),
    addNewPost: (data) => dispatch(addNewPost(data)),
    addCategory: (data) => dispatch(addCategory(data)),
    addComment: (data) => dispatch(receiveaddedComment(data)),
    sortPosts: (data) => dispatch(sortPosts(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootView))
