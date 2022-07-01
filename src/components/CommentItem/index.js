import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import {formatDistanceToNow} from 'date-fns';
import './index.css';


const CommentItem = props => {
    const { commentDetails } = props;
    const { id, name, comment, isLiked, initialClassName, date } = commentDetails;

    const postedTime = formatDistanceToNow(date)

    const initial = name ? name[0].toUpperCase() : '';

    const likeTextClassName = isLiked ? 'button active' : 'button';

    const onClickLike = () => {
        const { toggleIsLiked } = props;
        toggleIsLiked(id);
    }

    const onDeleteComment = () => {
        const {deleteComment} = props;
        deleteComment(id);
    }

    const likeElement = <FontAwesomeIcon icon={faThumbsUp} style={{height:"20px", width:"20px", color:"#0b69ff"}}/>
    const dislikeElement = <FontAwesomeIcon icon={faThumbsUp} style={{height:"20px", width:"20px", color:"#64748b"}}/>

    const likeImageUrl = isLiked ? likeElement : dislikeElement;

    return (
        <>
            <li className='comment-item'>
                <div className='comment-container'>
                    <div className={initialClassName}>
                        <p className='initial'>{initial}</p>
                    </div>
                    <div>
                        <div className='username-time-container'>
                            <p className='username'>{name}</p>
                            <p className='time'>{postedTime} ago</p>
                        </div>
                        <p className='comment'>{comment}</p>
                    </div>
                </div>
                <div className='buttons-container'>
                    <div className='like-container'>
                        {likeImageUrl}
                        <button
                            className={likeTextClassName}
                            type="buton"
                            onClick={onClickLike}
                        >
                            Like
                        </button>
                    </div>
                    <button className='button' type='button' onClick={onDeleteComment}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <hr className='comment-line' />
            </li>
        </>
    )
}

export default CommentItem;