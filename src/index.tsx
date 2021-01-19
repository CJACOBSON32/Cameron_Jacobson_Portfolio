import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Database from "./components/utils/Database/Database";

// Initialize singletons
Database.getInstance();

ReactDOM.render(
    <React.StrictMode>
        <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"/>
        <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-firestore.js"/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
