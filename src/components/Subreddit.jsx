import styles from '../styles/subreddits.module.css';

export default function Subreddit({data, i, removeSub}) {
  function clickHandler() {
    removeSub(i);
  }
  return (<div className={styles.subreddit}>
    <img
      alt=''
      className={styles.icon}
      src={data.icon}
    />
    <a
      className={styles.subredditName}
      href={`https://www.reddit.com${data.url}`}
      >{data.name}
    </a>
    <button
      className={styles.removeButton}
      onClick={clickHandler}
      >X
    </button>
  </div>);
}
