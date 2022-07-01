import React from 'react'
import { Component } from 'react'
import CommentItem from '../CommentItem'
import './index.css'
import { v4 } from 'uuid';

const initialContainerBackgroundClassNames = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue'
];

class Comments extends Component {
    state = {
        nameInput: '',
        commentInput: '',
        commentsList: []
    }

    toggleIsLiked = id => {
        this.setState(prevState => ({
            commentsList: prevState.commentsList.map(eachComment => {
                if( id === eachComment.id){
                    return{...eachComment, isLiked: !eachComment.isLiked}
                }
                return eachComment
            })
        }))
    }

    deleteComment = commentId => {
        const {commentsList} = this.state;
        this.setState({
            commentsList: commentsList.filter(comment => comment.id !== commentId)
        })
    }

    renderCommentsList = () => {
        const {commentsList} = this.state;
         return commentsList.map(eachComment => (
            <CommentItem 
            key = {eachComment.id}
            commentDetails = {eachComment}
            toggleIsLiked={this.toggleIsLiked}
            deleteComment={this.deleteComment}
            />
         ))
    }

    onAddComment = event => {
        event.preventDefault();
        const {nameInput, commentInput} = this.state;
        if (nameInput === "" || commentInput === ""){
            alert("Please fill all fields");
            return 
        }
        const initialBackgroundColorClassName = `initialContainer ${
            initialContainerBackgroundClassNames[
                Math.ceil(Math.random() * initialContainerBackgroundClassNames.length -1)
            ]
        }`

        const newComment = {
            id: v4(),
            name: nameInput,
            comment: commentInput,
            date: new Date(),
            isLiked: false,
            initialClassName: initialBackgroundColorClassName
        }

        this.setState(prevState => ({
            commentsList: [...prevState.commentsList, newComment],
            nameInput: '',
            commentInput: '',
        }))
    }

    changeNameInput = event => {
        this.setState({
            nameInput: event.target.value
        })
    }

    onChangeCommentInput = event => {
        this.setState({
            commentInput: event.target.value
        })
    }

    

    render() {
        const { nameInput, commentInput, commentsList } = this.state;

        return (
            <>
                <div className='app-container'>
                    <div className='comments-container'>
                        <h1 className='app-heading'>Comments</h1>
                        <div className='comments-input'>
                            <form className='form' onSubmit={this.onAddComment}>
                                <p className='form-description'>Say something about our service</p>
                                <input type="text" placeholder='Your Name' className='name-input' onChange={this.changeNameInput} value={nameInput}/>
                                <textarea placeholder='Your Comment' rows="6" className='comment-input' onChange={this.onChangeCommentInput} value={commentInput}></textarea>
                                <button type='submit' className='add-button'>
                                    Add Comment
                                </button>
                            </form>
                            <img src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" alt="comments" className='image' />
                        </div>
                        <hr className='line'/>
                        <p className='heading'>
                            Comments <span>{commentsList.length}</span>
                        </p>
                        <ul className='comments-list'>{this.renderCommentsList()}</ul>
                    </div>
                </div>

            </>
        )
    }
}


export default Comments