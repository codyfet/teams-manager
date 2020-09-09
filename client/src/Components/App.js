import React, {Fragment} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Routes} from "../Routes/Routes";
import {Header} from "./Header";

export const App = () => {
    return (
        <Fragment>
            <Router>
                <Header />
                <Routes />
            </Router>
        </Fragment>
    );
};
