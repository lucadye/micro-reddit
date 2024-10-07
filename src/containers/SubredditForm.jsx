import { useState } from 'react';
import styles from '../styles/subreddits.module.css';

export default function SubredditForm({addSub, isloading, failedToLoad}) {
  const [q, setQ] = useState('');
  function submitHandler(e) {
    e.preventDefault();
    if (q) {
      addSub(q);
      setQ('');
    }
  }
  function inputHandler({target}) {
    setQ(target.value);
  }
  return (<form
    className={styles.form}
    onSubmit={submitHandler}
    >
      <div className={styles.icon}/>

  return (
  <form
    className={styles.form}
    onSubmit={submitHandler}
    >
      <input
        className={styles.inputText}
        onInput={inputHandler}
        type='text'
        value={q}
        >
      </input>
      <button
        className={styles.inputButton}
        onClick={submitHandler}
        type='button'
        >+
      </button>
      <span className={styles.message}>{
        isloading ? 'Loading subreddit...'
        : failedToLoad ? 'Failed to load'
        : ''
      }</span>
  </form>);
}
