import React, { Component } from 'react';
import '../App.css'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import DisplayCategories from './CategoryView'
import DisplayPosts from './PostView'
import { addPost, addCategory} from '../actions/'

class RootApp extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/" render={()=>(
          <div>
            <div>
              <DisplayCategories/>
            </div>
          </div>
        )}/>
      <Route exact path="/category/:path" render={()=>(
          <div>
            <DisplayCategories/>
          </div>
          )}/>
      </Switch>
    );
  }
}

const mapStateToProps = ({categories}) => {
  return {
    allCategories: categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    addCategory: (data) => dispatch(addCategory(data)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RootApp))
