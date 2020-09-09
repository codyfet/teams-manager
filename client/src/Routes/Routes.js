import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Teams} from "../Pages/Teams";
import {Team} from "../Pages/Team";
import {Persons} from "../Pages/Persons";

/**
 * Возвращает набор доступных роутов приложения.
 */
export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Teams} />
            <Route path="/teams" exact component={Teams} />
            <Route path="/persons" component={Persons} />
            <Route path="/team/:id" component={Team} />
            <Redirect to="/" />
        </Switch>
    );
};