import HtmlContent from './HtmlContent'
import styles from '../styles/comments.module.css';

export default function Comment({data, ReplyContainer}) {
  let title = `${data.author?data.author:'Deleted'}`;
  title += data.timeAgo ? `, ${data.timeAgo}` : '';
  return data.body && (<li>
    <ul className={styles.commentInfoContainer}>
      <h4
        className={styles.title}
        >{title}
      </h4>
      {data.upvotes && (
        <p 
          className={styles.info}
          >Upvotes: {data.upvotes}
        </p>
      )}
      {data.permalink && (
        <a
          className={styles.info}
          href={'https://www.reddit.com'+data.permalink}
          >Permalink
        </a>
      )}
    </ul>
    <HtmlContent content={data.body} style={styles.content}/>
    <ReplyContainer replies={data.replies}/>
  </li>);
}
