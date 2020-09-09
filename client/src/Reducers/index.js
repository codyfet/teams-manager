import {combineReducers} from "redux";
import teams from "./teams";
import employees from "./employees";

export default combineReducers({
    teams,
    employees,
});
