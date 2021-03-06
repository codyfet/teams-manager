import {
    CREATE_POSITION_LOAD_FAILURE,
    CREATE_POSITION_LOAD_START,
    CREATE_POSITION_LOAD_SUCCESS,
    DELETE_POSITION_LOAD_FAILURE,
    DELETE_POSITION_LOAD_START,
    DELETE_POSITION_LOAD_SUCCESS,
    GET_EMPLOYEES_FAILURE,
    GET_EMPLOYEES_START,
    GET_EMPLOYEES_SUCCESS,
    GET_TEAMS_FAILURE,
    GET_TEAMS_START,
    GET_TEAMS_SUCCESS,
    UPDATE_POSITION_LOAD_FAILURE,
    UPDATE_POSITION_LOAD_START,
    UPDATE_POSITION_LOAD_SUCCESS,
    UPDATE_TEAM_FAILURE,
    UPDATE_TEAM_START,
    UPDATE_TEAM_SUCCESS,
} from "./ActionTypes";
import {
    createPositionLoad as tryCreatePositionLoad,
    deletePositionLoad as tryDeletePositionLoad,
    getEmployees as tryGetEmployees,
    getTeams as tryGetTeams,
    updatePositionLoad as tryUpdatePositionLoad,
    updateTeam as tryUpdateTeam,
} from "../Services/Services";

/**
 * Thunk функция для выполнения ajax запроса для получения списка команд.
 */
export function getTeams() {
    return async function (dispatch) {
        dispatch({type: GET_TEAMS_START});

        try {
            const teams = await tryGetTeams();
            dispatch({type: GET_TEAMS_SUCCESS, payload: teams});
            return teams;
        } catch (error) {
            dispatch({type: GET_TEAMS_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для получения списка сотрудников.
 */
export function getEmployees() {
    return async function (dispatch) {
        dispatch({type: GET_EMPLOYEES_START});

        try {
            const employees = await tryGetEmployees();
            dispatch({type: GET_EMPLOYEES_SUCCESS, payload: employees});
            return employees;
        } catch (error) {
            dispatch({type: GET_EMPLOYEES_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для изменения команды.
 */
export function updateTeam(newTeam) {
    return async function (dispatch) {
        dispatch({type: UPDATE_TEAM_START});

        try {
            const team = await tryUpdateTeam(newTeam);
            dispatch({type: UPDATE_TEAM_SUCCESS, payload: team});
            return team;
        } catch (error) {
            dispatch({type: UPDATE_TEAM_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для изменения показателя загрузки сотрудника на конкретной позиции.
 *
 * @param {positionId} positionId Идентификатор позиции.
 * @param {Object} param Изменённый объект.
 */
export function createPositionLoad(positionId, param) {
    return async function (dispatch) {
        dispatch({type: CREATE_POSITION_LOAD_START});

        try {
            const positionLoad = await tryCreatePositionLoad(positionId, param);
            dispatch({type: CREATE_POSITION_LOAD_SUCCESS, payload: {positionLoad, positionId}});
            return positionLoad;
        } catch (error) {
            dispatch({type: CREATE_POSITION_LOAD_FAILURE, payload: error});
            throw error;
        }
    };
}

/**
 * Thunk функция для выполнения ajax запроса для изменения показателя загрузки сотрудника на конкретной позиции.
 *
 * @param {positionId} positionId Идентификатор позиции.
 * @param {positionId} loadId Идентификатор загрузки.
 */
export function deletePositionLoad(positionId, loadId) {
    return async function (dispatch) {
        dispatch({type: DELETE_POSITION_LOAD_START});

        try {
            const positionLoad = await tryDeletePositionLoad(positionId, loadId);
            dispatch({type: DELETE_POSITION_LOAD_SUCCESS, payload: loadId});
            return positionLoad;
        } catch (error) {
            dispatch({type: DELETE_POSITION_LOAD_FAILURE, payload: error});
            throw error;
        }
    };
}


/**
 * Thunk функция для выполнения ajax запроса для изменения показателя загрузки сотрудника на конкретной позиции.
 *
 * @param {positionId} positionId Идентификатор позиции.
 * @param {Object} param Изменённый объект.
 */
export function updatePositionLoad(positionId, param) {
    return async function (dispatch) {
        dispatch({type: UPDATE_POSITION_LOAD_START});

        try {
            const teams = await tryUpdatePositionLoad(positionId, param);
            dispatch({type: UPDATE_POSITION_LOAD_SUCCESS, payload: teams});
            return teams;
        } catch (error) {
            dispatch({type: UPDATE_POSITION_LOAD_FAILURE, payload: error});
            throw error;
        }
    };
}
