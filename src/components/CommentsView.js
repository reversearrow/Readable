import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api.js'
import { Link, withRouter } from 'react-router-dom';
import { addComment, deleteComment, editComment, updateCommentVotes} from '../actions/'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { v4 } from 'uuid'
import { RIETextArea } from 'riek'
import _ from 'lodash'

const DisplayAllComments = (props) => {
  return (
    props.comments.map((comment) => (
    <div key={comment.id}>
      <RIETextArea
        value={comment.body}
        change={(value) => props.editCommentBody({
          id: comment.id,
          newValue: value
        })}
        propName='body'
        validate={_.isString}
        className='col-md-12' />
      <h5> Author: {comment.author} Votes:{comment.voteScore} Time: {comment.timestamp} </h5>
      <button className ="btn btn-primary"onClick={() => props.upVoteComment(comment.id)}>Upvote</button>
      <button className="btn btn-warning" onClick={() => props.downVoteComment(comment.id)}>Downvote</button>
      <button className="btn btn-danger" onClick={() => props.deleteComment(comment.id)}>Delete Comment</button>
  </div>
  )))
}

const AddComment = (props) => {
  return (
  <form  className="form-inline" id="comment-data" onSubmit={props.handleSubmit}>
      <input type="text" name="body" placeholder="Type a comment..."></input>
      <input type="text" name="author" placeholder="author"></input>
      <input type="submit" value="Submit" />
  </form>
  )
}

class Comments extends Component {
  deleteComment = (id) => {
    API.deleteComment(id).then((comment) => (
      this.props.deleteComment({id: comment.id, deleted: comment.deleted})
    ))
  }

  editCommentBody = ({id,newValue}) => {
    API.updateComment(id,{'timestamp':Date.now(),'body':newValue.body}).then((data) =>
    this.props.editComment({
      id: data.id,
      attribute: 'BODY',
      value: data.body,
      timestamp: data.timestamp,
    }))
  }

  upVoteComment = (postid) => {
    const upVote = {'option':'upVote'}
    API.updateCommentVote(postid,upVote).then((data) => (
      this.props.updateCommentVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  downVoteComment = (postid) => {
    const downVote = {'option':'downVote'}
    API.updateCommentVote(postid,downVote).then((data) => (
      this.props.updateCommentVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv4 = v4
    const values = serializeForm(event.target, {hash: true})
    values["timestamp"] = Date.now()
    values["id"] = uuidv4()
    values["parentId"] = this.getPostById(this.props.posts,this.props.match.params.id)[0].id
    API.addComment(values).then((d) =>
      (this.props.addComment(d))
    )
  }

  filterCommentsByPost = (comments,postId) => {
    return comments.filter((comment) => comment.parentId === postId && comment.deleted === false && comment.parentDeleted === false)
  }

  getPostById = (posts,id) => {
    return posts.filter((post) => post.id === id && post.deleted === false)
  }

  render(){
    let post = this.getPostById(this.props.posts,this.props.match.params.id)
    let comments = []
    if(post.length > 0){
      comments = this.filterCommentsByPost(this.props.comments,this.props.match.params.id)
    }
    return(
      <div className="row">
        {post.length > 0  && (
          <div className="col-lg-12">
          <h3> Comments </h3>
          <DisplayAllComments
          comments = {comments}
          editCommentBody = {this.editCommentBody}
          upVoteComment = {this.upVoteComment}
          downVoteComment = {this.downVoteComment}
          deleteComment = {this.deleteComment}
        />
        <AddComment handleSubmit={this.handleSubmit}/>
        </div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    posts: state.posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    updateCommentVotes: (data) => dispatch(updateCommentVotes(data)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Comments))
