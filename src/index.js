import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import awsConfig from './amplify-config';
import SiteNav from './components/sitenav.js';
import Routes from './Router.js'
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure(awsConfig);

class App extends React.Component {
  render() {
    return (
      <div>
        <SiteNav />
        <React.StrictMode>
          <Routes />
        </React.StrictMode>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();