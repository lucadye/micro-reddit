import PostInfo from './PostInfo';
import HtmlContent from './HtmlContent';
import Media from './Media'
import CommentContainer from '../containers/CommentContainer'

import styles from '../styles/post.module.css';

export default function Post ({index, postData: {
  title,
  body,
  author,
  timeAgo,
  upvotes,
  permalink,
  commentCount,
  media,
  subreddit
}}) {
  return (
    <article className={styles.post}>
      <h2
        className={styles.postTitle}
        aria-label='Post Title'>
        {title}
      </h2>
      <ul className={styles.postInfoContainer} aria-label='Post Info'>
        <PostInfo key='0' text={(
          <span className={styles.infoBelowTitle}>{author}, {timeAgo}, on r/{subreddit}</span>
        )}/>
        <PostInfo key='1' text={(
          <span aria-label='Up-votes'>{upvotes}</span>
        )}/>
        <PostInfo key='2' text={(
          <span aria-label='Comments'>{commentCount}</span>
        )}/>
        <PostInfo key='3' text={(<a
            className={styles.hideLink}
            aria-label='Permalink'
            target='_blank'
            rel='noreferrer'
            href={'https://www.reddit.com'+permalink}
            >View on reddit.com
        </a>)}/>
      </ul>
      <div className={styles.postContent}>
        {media && <Media style={styles.media} media={media}/>}
        {body && <HtmlContent content={body} style={styles.postBody}/>}
      </div>
      <CommentContainer index={index} url={permalink} permalink={permalink}/>
    </article>
  );
}
