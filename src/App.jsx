import './reset.css';
import PostContainer from './containers/PostContainer';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPosts, getPosts } from './store/postsSlice';
import { fetchSubreddit, getSubreddits, getCurrentSub } from './store/subredditsSlice';

function App() {
  const dispatch = useDispatch();

  const subreddits = useSelector(getSubreddits);
  const currentSub = useSelector(getCurrentSub);

  useEffect(()=>{
    dispatch(fetchPosts('/r/popular'));
  }, [currentSub, dispatch]);
  const page = useSelector(getPosts);

  if (page.error === 429) {
    return <h1>Too many requests!</h1>;
  }

  return (
    <div className="App">
      <main><PostContainer posts={page}/></main>
    </div>
  );
}

export default App;
