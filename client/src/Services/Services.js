import axios from "axios";
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

/**
 * Возвращает данные пользователя.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function getTeams() {
    return axios.get("/api/teams");
}

/**
 * Возвращает данные пользователя.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function updateTeam(param) {
    return axios.put("/api/teams", param);
}

/**
 * Возвращает данные пользователя.
 *
 * @param {object} data Данные, введённые пользователем (логин/пароль).
 */
export function getEmployees() {
    return axios.get("/api/employees");
}

export function createPositionLoad(positionId, param) {
    // PUT /positions/{posId}/load - редактировать загрузку относительно позиции (объект в теле запроса)
    return axios.post(`/api/positions/${positionId}/load`, param);
}

export function deletePositionLoad(positionId, loadId) {
    // PUT /positions/{posId}/load - редактировать загрузку относительно позиции (объект в теле запроса)
    return axios.delete(`/api/positions/${positionId}/load/${loadId}`);
}

export function updatePositionLoad(positionId, param) {
    // PUT /positions/{posId}/load - редактировать загрузку относительно позиции (объект в теле запроса)
    return axios.put(`/api/positions/${positionId}/load`, param);
}
