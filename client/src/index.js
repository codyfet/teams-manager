import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "./Reducers";

import "semantic-ui-less/semantic.less";
import "./Styles/Styles";

import {App} from "./Components/App";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById("root")
);