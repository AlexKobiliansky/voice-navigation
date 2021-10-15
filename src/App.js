import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import SpeechRecognition ,{useSpeechRecognition} from 'react-speech-recognition';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts';
import SomePage from './components/SomePage';
import Blog from './components/Blog';
import Article from './components/Article';
import {useState} from 'react';


function App() {
  const [redirectUrl, setRedirectUrl] = useState('');

  const commands = [
    {
      command: ['Go to *', 'Open *'],
      callback: (redirectPage) => setRedirectUrl(redirectPage)
    }
  ]
  const {transcript} = useSpeechRecognition({commands});

  const pages = ['home', 'about', 'contacts', 'somepage', 'blog', 'article'];
  const urls = {
    home: '/',
    about: '/about',
    contacts: '/contacts',
    somepage: '/somepage',
    blog: '/somepage',
    article: '/blog/article'
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition) return null;

  let redirect = '';

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]}/>
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/somepage">Some else</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/article">Article</Link>
        </div>

        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Route path="/contacts" component={Contacts} exact />
        <Route path="/somepage" component={SomePage} exact />
        <Route path="/blog" component={Blog} exact/>
        <Route path="/blog/article" component={Article} />

        {/*{redirect}*/}
      </BrowserRouter>
      
      <p id="transcript">
        Transcript: {transcript}
      </p>

      <button onClick={SpeechRecognition}>Start</button>
    </div>
  );
}

export default App;
