import Post from '../components/Post';
import styles from '../styles/post.module.css';

export default function PostContainer({posts}) {
  posts = posts.filter(post=>typeof post !== 'undefined');
  return (<div className={styles.postContainer}>
    {posts.map((post, key)=>{
      return (
        <Post key={key} postData={post}/>
      );
    })}
  </div>)
}
