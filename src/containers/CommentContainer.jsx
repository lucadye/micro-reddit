import { useState } from 'react';
import ReplyContainer from './ReplyContainer';
import styles from '../styles/comments.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, getComments, getCommentsByIndex } from '../store/commentsSlice';

export default function CommentContainer({permalink, url, index}) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getComments);

  const [hidden, setHidden] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  function showHandler() {
    setHidden(false);
    if (!hasLoaded) {
      dispatch(fetchComments({url, index}));
      setHasLoaded(true);
    }
  }
  function hideHandler() {
    setHidden(true);
  }

  const comments = useSelector(getCommentsByIndex(index));

  if (hidden) {
    return (
      <button
        onClick={showHandler}
        className={styles.button}
        >Show Comments
      </button>
    );
  } else if (isLoading) {
    return (
      <button
        disabled
        className={styles.button}
        >Loading Comments...
      </button>
    );
  } else {
    return (<>
      <button onClick={hideHandler} className={styles.button}>
        Hide Comments
      </button>
      <aside className={styles.commentContainer}>
        <ReplyContainer replies={comments} pinned={false}/>
      </aside>
    </>)
  }
}
