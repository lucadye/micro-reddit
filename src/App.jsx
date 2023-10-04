import './reset.css';
import PostContainer from './containers/PostContainer';
import GET from './requests';

const page = await GET.page('/r/popular/');

function App() {
  return (
    <div className="App">
      <main><PostContainer posts={page}/></main>
    </div>
  );
}

export default App;
