import React from 'react';
import '../css/App.css';
import theme from './AppStyles.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from "./pages/Home";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/Cameron_Jacobson_Portfolio/Resume" />
                    <Redirect exact from="/Cameron_Jacobson_Portfolio" to="/Cameron_Jacobson_Portfolio/Resume" />
                    <Route exact path="/Cameron_Jacobson_Portfolio/:page?" render={props => <Home {...props}/>}/>
                </Switch>
            </Router>
        </ThemeProvider>

    );
}

export default App;
