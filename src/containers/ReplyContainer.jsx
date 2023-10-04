import Comment from '../components/Comment';

export default function ReplyContainer({replies, className}) {
  if (typeof replies === 'undefined') { return; }

  const pinnedReplies = replies.filter((reply)=>reply.pinned);
  replies = replies.filter((reply)=>!reply.pinned);

  return (<aside className={className}>
    <ul>{pinnedReplies.map((reply, key)=>{
      return (<Comment
        key={key}
        data={reply}
        pinned={true}
        ReplyContainer={ReplyContainer}/>
      );
    })}</ul>
    <ul>{replies.map((reply, key)=>{
      return (<Comment
        key={key}
        data={reply}
        pinned={false}
        ReplyContainer={ReplyContainer}/>
      );
    })}</ul>
  </aside>);
}
