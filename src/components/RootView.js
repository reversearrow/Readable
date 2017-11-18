import React, {Component} from 'react';
import {Switch, Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {initCategories, initPostsAndComments} from '../actions/'
import {sortPosts, addNewPost, setSelectedPost} from '../actions/posts'
import Posts from './PostsView'
import Comments from './CommentsView'
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
    this
      .props
      .initCategories()
    this
      .props
      .initPostsAndComments()
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
            <button>
              <Link to="/">Root Page</Link>
            </button>
          </div>
        )}/>
        <Route
          exact
          path="/:category/:id"
          render={() => (
          <div>
            <Posts/>
            <Comments/>
            <button>
              <Link to="/">Root Page</Link>
            </button>
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
    addNewPost: (data) => dispatch(addNewPost(data)),
    initPostsAndComments: () => dispatch(initPostsAndComments()),
    initCategories: () => dispatch(initCategories()),
    sortPosts: (data) => dispatch(sortPosts(data)),
    selectedPost: (data) => dispatch(setSelectedPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootView))
