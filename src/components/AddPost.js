import React, { Component } from 'react';
import * as API from '../utils/api.js'
import { v4 } from 'uuid'
import serializeForm from 'form-serialize'


function ShowAddPostButton(props){
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
          <select name="category">
            <option>react</option>
            <option>redux</option>
            <option>udacity</option>
          </select>
          <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

class AddPosts extends Component {
    state = {
    displayForm: false
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
      (this.props.add(d))
    )
  }

  render(){
    return (
      <div>
        <ShowAddPostButton renderForm={this.renderForm}/>
        {this.state.displayForm && (
          <DisplayForm handleSubmit={this.handleSubmit}/>
        )}
      </div>
    )
  }
}



export default AddPosts
