import React from 'react';
import '../css/App.css';
import theme from './AppStyles.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Home from "./pages/Home";
//import {BrowserRouter as HashRouter, Switch, Route, Redirect} from 'react-router-dom';

//TODO: Implement React Router
function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/*<HashRouter>*/}
            {/*    <Switch>*/}
            {/*        <Route exact path="/:page?" render={props => <Home {...props}/>}/>*/}
            {/*    </Switch>*/}
            {/*</HashRouter>*/}
            <Home/>
        </ThemeProvider>

    );
}

export default App;
