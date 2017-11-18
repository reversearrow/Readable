import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {
  setSelectedPost,
  deletePost,
  upVotePost,
  downVotePost,
  editPostTitle,
  editPostBody
} from '../actions/posts'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'

const DisplayAllPosts = (props) => {
  return (props.posts.map((post) => <div key={post.id}>
    {props.editingPostId === post.id && props.displayTitleForm
      ? <EditPostTitle
          handleSubmit={props.handleEditedPostTitle}
          title={props.title}
          changeTitle={props.changeTitle}/>
      : <p className="col-md-12">{post.title}</p>
}
    {props.showBody && (props.editingPostId === post.id && props.displayBodyForm
      ? <EditPostBody
          handleSubmit={props.handleEditedPostBody}
          body={props.body}
          changeBody={props.changeBody}/>
      : <p className="col-md-12">{post.body}</p>)
}

    <p className="col-md-12">
      Comments : {props.getNumOfComments(post.id)}</p>
    <p className="col-md-12">
      Votes:{post.voteScore}
    </p>
    <p className="col-md-12">
      Author: {post.author}
    </p>
    <p className="col-md-12">
      Time: {post.timestamp}
    </p>
    {props.showMoreLink && (
      <Link to={`/${post.category}/${post.id}`}>
        <p className="col-md-12">
          More
        </p>
      </Link>
    )}
    <button className="btn btn-primary" onClick={() => props.upVotePost(post.id)}>Upvote</button>
    <button className="btn btn-warning" onClick={() => props.downVotePost(post.id)}>Downvote</button>
    <button
      className="btn btn-primary"
      onClick={() => props.renderTitleForm(post.id)}>Edit Title</button>
    {props.showBody && <button
      className="btn btn-primary"
      onClick={() => props.renderBodyForm(post.id)}>Edit Body</button>
}
    <button className="btn btn-danger" onClick={() => props.deletePost(post.id)}>Delete</button>
  </div>))
}

const EditPostTitle = (props) => {
  return (
    <form className="form-inline" id="comment-data" onSubmit={props.handleSubmit}>
      <input
        type="text"
        name="title"
        value={props.title}
        onChange={props.changeTitle}></input>
      <input type="submit" value="Submit"/>
    </form>
  )
}

const EditPostBody = (props) => {
  return (
    <form className="form-inline" id="comment-data" onSubmit={props.handleSubmit}>
      <input type="text" name="body" value={props.body} onChange={props.changeBody}></input>
      <input type="submit" value="Submit"/>
    </form>
  )
}

class Posts extends Component {
  state = {
    displayTitleForm: false,
    displayBodyForm: false,
    postTitle: '',
    postBody: '',
    editingPostId: null
  }

  renderTitleForm = (postId) => {
    if (this.state.displayTitleForm) {
      this.setState({displayTitleForm: false})
    } else {
      let title = this.getPostById(this.props.posts, postId)[0].title
      this.setState({displayTitleForm: true, postTitle: title, editingPostId: postId})
    }
  }

  renderBodyForm = (postId) => {
    if (this.state.displayBodyForm) {
      this.setState({displayBodyForm: false})
    } else {
      let body = this.getPostById(this.props.posts, postId)[0].body
      this.setState({displayBodyForm: true, postBody: body, editingPostId: postId})
    }
  }

  handleEditedPostTitle = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, {hash: true})
    this.setState({displayTitleForm: false})
    this
      .props
      .editPostTitle({id: this.state.editingPostId, title: values.title})
  }

  handleEditedPostBody = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, {hash: true})
    this.setState({displayBodyForm: false})
    this
      .props
      .editPostBody({id: this.state.editingPostId, body: values.body})
  }

  getNumOfComments = (postid) => {
    const comments = this.props.comments
    return comments.filter((comment) => comment.parentId === postid && comment.deleted === false).length
  }

  getNumOfComments = (postid) => {
    const comments = this.props.comments
    return comments.filter((comment) => comment.parentId === postid && comment.deleted === false).length
  }

  editPostTitle = (event) => {
    let value = event.target.value
    this.setState({postTitle: value})
  }

  editPostBody = (event) => {
    let value = event.target.value
    this.setState({postBody: value})
  }

  getPostsSorted = (posts, sort) => {
    switch (sort) {
      case "BY_TIMESTAMP":
        return posts
          .slice()
          .sort(sortBy('-timestamp'))
        case "BY_HIGHESTVOTE":
        return posts
          .slice()
          .sort(sortBy('-voteScore'))
        default:
        return posts
          .slice()
          .sort(sortBy('-voteScore'))
    }
  }

  getByPostsCategory = (posts, filter) => {
    //console.log(filter)
    switch (filter) {
      case 'SHOW_ALL':
        return posts.filter((post) => post.deleted === false)
      default:
        return posts.filter((post) => post.category === filter && post.deleted === false)
    }
  }

  getPostById = (posts, id) => {
    return posts.filter((post) => post.id === id && post.deleted === false)
  }

  render() {
    let posts = []
    let showBody = false
    let showMoreLink = true
    if (this.props.match.params.id) {
      let id = this.props.match.params.id
      let category = this.props.match.params.category
      posts = this.getPostById(this.getByPostsCategory(this.props.posts, category), id)
      showBody = true
      showMoreLink = false
    } else if (this.props.match.params.category) {
      let category = this.props.match.params.category
      posts = this.getPostsSorted(this.getByPostsCategory(this.props.posts, category), this.props.postsSortBy)
    } else {
      posts = this.getPostsSorted(this.getByPostsCategory(this.props.posts, 'SHOW_ALL'), this.props.postsSortBy)
    }
    return (
      <div>
        {posts.length > 0
          ? (<DisplayAllPosts
            posts={posts}
            getNumOfComments={this.getNumOfComments}
            showBody={showBody}
            showMoreLink={showMoreLink}
            upVotePost={this.props.upVotePost}
            downVotePost={this.props.downVotePost}
            renderTitleForm={this.renderTitleForm}
            renderBodyForm={this.renderBodyForm}
            deletePost={this.props.deletePost}
            displayTitleForm={this.state.displayTitleForm}
            displayBodyForm={this.state.displayBodyForm}
            editingPostId={this.state.editingPostId}
            title={this.state.postTitle}
            body={this.state.postBody}
            changeTitle={this.editPostTitle}
            changeBody={this.editPostBody}
            handleEditedPostTitle={this.handleEditedPostTitle}
            handleEditedPostBody={this.handleEditedPostBody}/>)
          : <div></div>
}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {posts: state.posts, comments: state.comments, postsSortBy: state.postsSortBy}
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPost: (data) => dispatch(setSelectedPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    downVotePost: (data) => dispatch(downVotePost(data)),
    upVotePost: (data) => dispatch(upVotePost(data)),
    editPostTitle: (data) => dispatch(editPostTitle(data)),
    editPostBody: (data) => dispatch(editPostBody(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
