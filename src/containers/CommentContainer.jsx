import { useState } from 'react';
import GET from '../requests';
import ReplyContainer from './ReplyContainer';
import styles from '../styles/comments.module.css';

export default function CommentContainer({permalink}) {
  const [replies, setReplies] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const showHandler=async()=>{
    setHidden(false);
    if (!replies.length) {
      setIsLoading(true);
      setReplies(await GET.comments(permalink));
      setIsLoading(false);
    }
  }
  const hideHandler=async()=>{
    setHidden(true);
  }

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
        <ReplyContainer replies={replies} pinned={false}/>
      </aside>
    </>)
  }
}
