import { useState } from 'react';

import PostContainer from './containers/PostContainer';
import SubredditContainer from './containers/SubredditContainer';

import './reset.css';

import GET from './requests';
const subsDefault = await GET.subreddits();
const pageDefault = await GET.page(subsDefault[0].url);

function App() {
  const [subs, setSubs] = useState(subsDefault);
  const [page, setPage] = useState(pageDefault);
  return (
    <main>
      <PostContainer posts={page}/>
      <SubredditContainer subs={subs} setSubs={setSubs}/>
    </main>
  );
}

export default App;
