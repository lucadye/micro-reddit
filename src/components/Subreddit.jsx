import styles from '../styles/subreddits.module.css';
import { useDispatch } from 'react-redux';
import { resetSelected } from '../store/subredditsSlice';

export default function Subreddit({data, i, removeSub, selected, setSelectedSub}) {
  const dispatch = useDispatch();
  function clickHandler() {
    if (selected) {
      dispatch(resetSelected());
      return;
    }
    setSelectedSub(data);
  }
  let className = styles.subreddit;
  if (selected) {
    className += ' ' + styles.selected;
  }
  return (<div className={className}>
    {data.icon && (<img
      alt=''
      className={styles.icon}
      src={data.icon}
    />)}
    <a
      onClick={clickHandler}
      className={styles.subredditName}
      href='#'
      >{data.name}
    </a>
    <button
      className={styles.removeButton}
      onClick={()=>{
        removeSub(i);
        dispatch(resetSelected());
      }}
      >x
    </button>
  </div>);
}
