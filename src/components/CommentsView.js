import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../utils/api.js'
import {withRouter} from 'react-router-dom';
import {addNewComment, deleteComment, editComment, upVoteComment, downVoteComment} from '../actions/comments'
import serializeForm from 'form-serialize'
import {v4} from 'uuid'
import sortBy from 'sort-by'
import {RIETextArea} from 'riek'
import _ from 'lodash'

const DisplayAllComments = (props) => {
  return (props.comments.map((comment) => (
    <div key={comment.id}>
    {props.editingCommentId === comment.id && props.displayForm ?
          <EditComment
            handleSubmit={props.handleSubmit}
            body={props.body}
            change={props.change}
          />
          : <p className="col-md-12">{comment.body}</p>
        }
      <p className="col-md-12">
        Votes:{comment.voteScore}
      </p>
      <p className="col-md-12">
        Author: {comment.author}
      </p>
      <p className="col-md-12">
        Time: {comment.timestamp}
      </p>
      <button
        className="btn btn-primary"
        onClick={() => props.upVoteComment(comment.id)}>Upvote</button>
      <button
        className="btn btn-warning"
        onClick={() => props.downVoteComment(comment.id)}>Downvote</button>
        <button
          className="btn btn-primary"
          onClick={() => props.editComment(comment.id)}>Edit</button>
      <button
        className="btn btn-danger"
        onClick={() => props.deleteComment(comment.id)}>Delete</button>

    </div>
  )))
}

const AddComment = (props) => {
  return (
    <form className="form-inline" id="comment-data" onSubmit={props.handleSubmit}>
      <input type="text" name="body" placeholder="Type a comment..."></input>
      <input type="text" name="author" placeholder="author"></input>
      <input type="submit" value="Submit"/>
    </form>
  )
}

const EditComment = (props) => {
  return (
    <form className="form-inline" id="comment-data" onSubmit={props.handleSubmit} >
      <input type="text" name="body" placeholder="Edit comment..." value={props.body} onChange={props.change}></input>
      <input type="submit" value="Submit"/>
    </form>
  )
}

class Comments extends Component {
  state = {
    displayForm: false,
    commentBody: '',
    editingCommentId: null
  }

  renderForm = (commentId) => {
    if (this.state.displayForm) {
      this.setState({displayForm: false})
    } else {
      let body = this.filterCommentsById(this.props.comments,commentId)[0].body
      this.setState({
        displayForm: true,
        commentBody: body,
        editingCommentId: commentId
      })
    }
  }

  handleNewComment = (event) => {
    event.preventDefault();
    const uuidv4 = v4
    const values = serializeForm(event.target, {hash: true})
    values["timestamp"] = Date.now()
    values["id"] = uuidv4()
    values["parentId"] = this.getPostById(this.props.posts, this.props.match.params.id)[0].id
    this.props.addComment(values)
  }

  handleEditedComment = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, {hash: true})
    this.setState({
      displayForm: false
    })
    this.props.editComment({id: this.state.editingCommentId, body: values.body})
  }

  filterCommentsById = (comments, commentId) => {
    return comments.filter((comment) => comment.id === commentId && comment.deleted === false && comment.parentDeleted === false)
  }

  filterCommentsByPost = (comments, postId) => {
    return comments.filter((comment) => comment.parentId === postId && comment.deleted === false && comment.parentDeleted === false)
  }

  getPostById = (posts, id) => {
    return posts.filter((post) => post.id === id && post.deleted === false)
  }

  sortCommentsByHighScore = (comments) => {
    return comments
      .slice()
      .sort(sortBy('-voteScore'))
  }


  editComment = (event) => {
    let value = event.target.value
    this.setState({
      commentBody: value
    })
  }

  render() {
    let post = this.getPostById(this.props.posts, this.props.match.params.id)
    let comments = []
    if (post.length > 0) {
      comments = this.sortCommentsByHighScore(this.filterCommentsByPost(this.props.comments, this.props.match.params.id))
    }
    return (
      <div className="row">
        {post.length > 0 ? (
          <div className="col-lg-12">
            <h3>
              Comments
            </h3>
            <DisplayAllComments
              comments={comments}
              editComment={this.editComment}
              upVoteComment={this.props.upVoteComment}
              downVoteComment={this.props.downVoteComment}
              editComment={this.renderForm}
              deleteComment={this.props.deleteComment}
              editingCommentId={this.state.editingCommentId}
              handleSubmit={this.handleEditedComment}
              body={this.state.commentBody}
              change={this.editComment}
              displayForm = {this.state.displayForm}
              />
            <AddComment handleSubmit={this.handleNewComment}/>
          </div>
        ) :
        <h1> Post Not Found </h1>

      }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {comments: state.comments, posts: state.posts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => dispatch(addNewComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    upVoteComment: (data) => dispatch(upVoteComment(data)),
    downVoteComment: (data) => dispatch(downVoteComment(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))
