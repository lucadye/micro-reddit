import Post from '../components/Post';
import styles from '../styles/post.module.css';

export default function PostContainer({posts}) {
  return (<div className={styles.postContainer}>
    {posts.map((post, i)=>{
      return (
        <Post key={i} index={i} postData={post}/>
      );
    })}
  </div>)
}
