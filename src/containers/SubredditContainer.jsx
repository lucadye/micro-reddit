import Subreddit from '../components/Subreddit';
import SubredditForm from './SubredditForm';
import styles from '../styles/subreddits.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSubreddit, removeSubreddit, setSelected,
  getSubreddits, getCurrentSub,
  isLoading, failedToLoad, clearFailure
} from '../store/subredditsSlice';

export default function SubredditContainer() {
  const dispatch = useDispatch();

  const subs = useSelector(getSubreddits);
  const selected = useSelector(getCurrentSub);

  function addSub(q) {
    dispatch(fetchSubreddit(q));
  }
  function removeSub(i) {
    dispatch(removeSubreddit(i));
  }

  function setSelectedSub(sub) {
    dispatch(setSelected(sub));
  }

  return (<nav className={styles.subContainer}>
    <h2 className={styles.title}>Subreddits</h2>
    <SubredditForm
      addSub={addSub}
      isLoading={useSelector(isLoading)}
      failedToLoad={useSelector(failedToLoad)}
      clearFailure={()=>dispatch(clearFailure)}
    />
    {subs?.map((sub, i)=>{
      return (<Subreddit
        selected={sub.url === selected.url}
        setSelectedSub={setSelectedSub}
        data={sub}
        key={i}
        i={i}
        removeSub={removeSub}
      />);
    })}
  </nav>);
}
