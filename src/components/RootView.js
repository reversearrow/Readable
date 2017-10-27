import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as API from '../utils/api.js'
import { addPost, sortPosts} from '../actions/'
import { connect} from 'react-redux';
import sortBy from 'sort-by'
import { v4 } from 'uuid'
import serializeForm from 'form-serialize'


function DisplayCatagories(props){
  if(props.catagories){
    return (
      <div>
        <h3> Catagories </h3>
        {
          props.catagories.map((catagory) => (
            <div key={catagory.name}>
              <Link to={catagory.path}><li>{catagory.name}</li></Link>
            </div>
        ))
        }
      </div>
    )}
}


function DisplayAllPosts(props){
  if(props.posts){
  return (
    <div>
      <h3> Top Posts </h3>
        <select onChange={props.sort}>
          <option value="BY_HIGHESTVOTE">Highest Vote Score</option>
          <option value="BY_TIMESTAMP">Time</option>
        </select>
      {
        props.posts.map((post) => (
          <div key={post.id}>
            <Link to={post.id}>
              <li >{post.title}</li>
            </Link>
            <h5>{post.body}</h5>
          </div>
      ))
      }
    </div>
  )}
}

function AddPost(props){
  return(
    <div>
      <button onClick={props.renderForm}>AddPost</button>
    </div>
  )
}

function DisplayForm(props){
  return(
    <div>
      <form  id="user-data" onSubmit={props.handleSubmit}>
          <input type="text" name="title" placeholder="title"></input>
          <input type="text" name="body" placeholder="body"></input>
          <input type="text" name="author" placeholder="author"></input>
          <select name="catagory">
            <option>react</option>
            <option>redux</option>
            <option>udacity</option>
          </select>
          <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

class RootView extends Component {
    state = {
    catagories: [],
    displayForm: false
  }

  componentDidMount(){
    API.getCatagories().then(catagories => this.setState({ catagories }))
    API.getAllPosts().then(data => data.map(
      (d) => (this.props.dispatch(addPost(d)))
    ))
  }

  renderForm = () => {
    if(this.state.displayForm){
      this.setState({
        displayForm: false
      })}
    else{
      this.setState({
        displayForm: true
      })}
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv4 = v4
    const values = serializeForm(event.target, {hash: true})
    values["timestamp"] = Date.now()
    values["id"] = uuidv4()
    API.addPost(values).then((d) =>
      (this.props.dispatch(addPost(d)))
    )
  }

  render(){
    return (
      <div>
        <DisplayCatagories catagories={this.state.catagories}/>
        <DisplayAllPosts posts={this.props.posts}  sort={(event)=>(this.props.dispatch(sortPosts(event.target.value)))}/>
        <AddPost renderForm={this.renderForm}/>
        {this.state.displayForm && (
          <DisplayForm handleSubmit={this.handleSubmit}/>
        )}
   </div>
    )
  }
}

const mapStateToProps = (posts) => {
  return {
    posts: posts,
  }
}

export default connect(mapStateToProps)(RootView)
