import './reset.css';
import PostContainer from './containers/PostContainer';
import SubredditContainer from './containers/SubredditContainer';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPosts, getPosts } from './store/postsSlice';
import { getCurrentSub } from './store/subredditsSlice';

function App() {
  const dispatch = useDispatch();
  const currentSub = useSelector(getCurrentSub);
  useEffect(()=>{
    console.log(currentSub);
    dispatch(fetchPosts(currentSub.url));
  }, [currentSub, dispatch]);
  const page = useSelector(getPosts);

  if (page.error === 429) {
    return <h1>Too many requests!</h1>;
  }

  return (
    <main>
      <PostContainer posts={page}/>
      <SubredditContainer />
    </main>
  );
}

export default App;
