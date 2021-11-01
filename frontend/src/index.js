import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import { createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import rootreducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(rootreducer, applyMiddleware(thunk));


const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
  
     return (
     promiseInProgress && 
      <h1>Hey some async call in progress ! </h1>
    );  
   }

ReactDOM.render(
  <Provider store={store}>
     <React.StrictMode>
    <App />
    {/* <LoadingIndicator/> */}
    <Loader color="#657EFF" background="rgba(255,255,255,0)" promiseTracker={usePromiseTracker} />
    </React.StrictMode></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
