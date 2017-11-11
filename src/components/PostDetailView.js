import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api.js'
import { getSelectedPost, addComment, deleteComment, deletePost, commentParentDeleted, editPost, editComment, updatePostVotes, updateCommentVotes} from '../actions/'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { v4 } from 'uuid'
import { RIETextArea } from 'riek'
import _ from 'lodash'


function AddComment(props){
  return (
  <form  className="form-inline" id="comment-data" onSubmit={props.handleSubmit}>
      <input type="text" name="body" placeholder="Type a comment..."></input>
      <input type="text" name="author" placeholder="author"></input>
      <input type="submit" value="Submit" />
  </form>
  )
}

class PostDetailView extends Component {
  getPath = (id) => {
    return id.slice(7,)
  }

  componentDidMount(){
    let id = this.getPath(this.props.id)
    this.props.selectedPost(id)
    API.getComments(id).then((comments) => (
      comments.map((comment) => this.props.addComment(comment))
    ))
  }

  deletePost = (id) => {
    API.deletePost(id).then((post) => (
      this.props.deletePost({id: post.id, deleted: post.deleted})
      &&
      this.props.commentParentDeleted({id: post.id, parentDeleted: post.deleted})
    ))
  }

  deleteComment = (id) => {
    API.deleteComment(id).then((comment) => (
      this.props.deleteComment({id: comment.id, deleted: comment.deleted})
    ))
  }

  editPostBody = ({id,newValue}) => {
    API.updatePost(id,{'timestamp':Date.now(),'body':newValue.body}).then((data) =>
    this.props.editPost({
      id: data.id,
      attribute: 'BODY',
      value: data.body,
      timestamp: data.timestamp,
    }))
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


  upVotePost = (postid) => {
    const upVote = {'option':'upVote'}
    API.updatePostVote(postid,upVote).then((data) => (
      this.props.updatePostVotes({id: data.id, voteScore: data.voteScore})
    ))
  }

  downVotePost = (postid) => {
    const downVote = {'option':'downVote'}
    API.updatePostVote(postid,downVote).then((data) => (
      this.props.updatePostVotes({id: data.id, voteScore: data.voteScore})
    ))
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
    values["parentId"] = this.props.post[0].id
    API.addComment(values).then((d) =>
      (this.props.addComment(d))
    )
  }

  render(){
    return(
      <div>
        {
          this.props.post.map((post) => (
            <div key={post.id}>
              <div >
                <h3 className="col-md-12"> {post.title} </h3>
              </div>
                <div className="row">
                  <RIETextArea
                    value={post.body}
                    change={(value) => this.editPostBody({
                      id: post.id,
                      newValue: value
                    })}
                    propName='body'
                    validate={_.isString}
                    className='col-md-12' />
                </div>
              <div className="row">
                  <div className="col-md-12"> Votes:{post.voteScore} </div>
                  <div className="col-md-12"> Author: {post.author} </div>
                  <div className="col-md-12"> Time: {post.timestamp} </div>
              </div>
              <div className="row">
                <button className ="btn btn-primary"onClick={() => this.upVotePost(post.id)}>Upvote</button>
                <button className="btn btn-warning" onClick={() => this.downVotePost(post.id)}>Downvote</button>
                <button className="btn btn-danger" onClick={() => this.deletePost(post.id)}>Delete Post</button>
              </div>
            </div>
          ))
        }
        <h3>All Comments</h3>
        {
          this.props.comments.map((comment) => (
            <div key={comment.id}>
              <RIETextArea
                value={comment.body}
                change={(value) => this.editCommentBody({
                  id: comment.id,
                  newValue: value
                })}
                propName='body'
                validate={_.isString}
                className='col-md-12' />
            <h5> Author: {comment.author} Votes:{comment.voteScore} Time: {comment.timestamp} </h5>
              <button className ="btn btn-primary"onClick={() => this.upVoteComment(comment.id)}>Upvote</button>
              <button className="btn btn-warning" onClick={() => this.downVoteComment(comment.id)}>Downvote</button>
              <button className="btn btn-danger" onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
          </div>
          ))
        }
        <AddComment handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

const getByPostsId = (posts,filter) => {
  switch(filter){
    default:
      return posts.filter((post) => post.id === filter && post.deleted === false)
  }
}

const sortComments = (comments, sort) => {
  switch(sort){
    case "BY_TIMESTAMP":
      return comments
    default:
      return comments.slice().sort(sortBy('-voteScore'))
  }
}

const filterComments = (comments,postId) => {
  return comments.filter((comment) => comment.parentId === postId && comment.deleted === false)
}

const mapStateToProps = (state) => {
  return {
    post: getByPostsId(state.posts,state.selectedPost),
    comments: sortComments(filterComments(state.comments,state.selectedPost),state.commentsSortBy),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPost: (data) => dispatch(getSelectedPost(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    commentParentDeleted: (data) => dispatch(commentParentDeleted(data)),
    editPost: (data) => dispatch(editPost(data)),
    editComment: (data) => dispatch(editComment(data)),
    updatePostVotes: (data) => dispatch(updatePostVotes(data)),
    updateCommentVotes: (data) => dispatch(updateCommentVotes(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView)
