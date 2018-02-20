import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import client from './client.js';
import store from './store';
import App from './containers/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';


injectTapEventPlugin();

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>, 
    document.getElementById('root')
);
registerServiceWorker();
