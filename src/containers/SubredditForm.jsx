import { useState } from 'react';
import styles from '../styles/subreddits.module.css';

export default function SubredditForm({addSub}) {
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
  </form>);
}
