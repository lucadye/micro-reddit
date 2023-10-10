import Subreddit from '../components/Subreddit';
import SubredditForm from './SubredditForm';
import GET from '../requests';
import styles from '../styles/subreddits.module.css';

import { useState } from 'react';

export default function SubredditContainer({subs, setSubs}) {
  async function addSub(q) {
    const sub = await GET.subreddit(q);
    setSubs(prev=>{
      return [sub, ...prev];
    });
  }
  function removeSub(index) {
    setSubs(prev=>{
      return prev.filter((sub, i)=>{
        return i !== index;
      });
    });
  }

  return (<nav className={styles.subContainer}>
    <h2 className={styles.title}>Subreddits</h2>
    <SubredditForm addSub={addSub}/>
    {subs?.map((sub, i)=>{
      return (<Subreddit
        data={sub}
        key={i}
        i={i}s
        removeSub={removeSub}
      />);
    })}
  </nav>);
}
