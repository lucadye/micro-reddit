import styles from '../styles/post.module.css';

export default function PostInfo ({icon, text}) {
  return (
    <li aria-label='' className={styles.postInfo}>
      {icon}
      {text}
    </li>
  );
}
