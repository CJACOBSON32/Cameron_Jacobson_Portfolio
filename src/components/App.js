import React from 'react';
import '../App.css';
import theme from './AppStyles.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/Resume" />
                    <Route exact path="/:page?" render={props => <Home {...props}/>}/>
                </Switch>
            </Router>
        </ThemeProvider>

    );
}

export default App;
