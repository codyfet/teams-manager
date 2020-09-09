import {
    CREATE_POSITION_LOAD_FAILURE,
    CREATE_POSITION_LOAD_START,
    CREATE_POSITION_LOAD_SUCCESS,
    DELETE_POSITION_LOAD_FAILURE,
    DELETE_POSITION_LOAD_START,
    DELETE_POSITION_LOAD_SUCCESS,
    GET_TEAMS_FAILURE,
    GET_TEAMS_START,
    GET_TEAMS_SUCCESS,
    UPDATE_POSITION_LOAD_FAILURE,
    UPDATE_POSITION_LOAD_START,
    UPDATE_POSITION_LOAD_SUCCESS,
    UPDATE_TEAM_FAILURE,
    UPDATE_TEAM_START,
    UPDATE_TEAM_SUCCESS,
} from "../Actions/ActionTypes";

/**
 * Заглушка для сервиса GET /teams.
 */
const TEAMS_MOCK = [
    {
        "id": 9,
        "title": "MARS",
        "type": "PRODUCT",
        "status": "ACTIVE",
        "manager": "Andrew Managerov",
        "positions": [
            {
                "id": 1,
                "capacity": 2.0,
                "status": "OPENED",
                "dateOpened": null,
                "dateClosed": null,
                "info": {
                    "id": 4,
                    "level": "JUNIOR",
                    "role": "TESTER",
                    "stack": "Selenium"
                },
                "positionLoads": [
                    {
                        "id": 1,
                        "chargePercent": 50.0,
                        "employee": {
                            "id": 1,
                            "fio": "Vasilii Petrov",
                            "number": 2345,
                            "position": "developer",
                            "department": "IES",
                            "manager": "Andrew Managerov",
                            "spec": "BACKEND",
                            "stack": "Java 8"
                        }
                    }
                ]
            },
            {
                "id": 2,
                "capacity": 3.0,
                "status": "OPENED",
                "dateOpened": null,
                "dateClosed": null,
                "info": {
                    "id": 2,
                    "level": "MIDDLE",
                    "role": "DEVELOPER",
                    "stack": "Java 8"
                },
                "positionLoads": []
            }
        ]
    },
    {
        "id": 10,
        "title": "SATURN",
        "type": "PRODUCT",
        "status": "ACTIVE",
        "manager": "Andrew Managerov",
        "positions": []
    },
    {
        "id": 11,
        "title": "JUPITER",
        "type": "SERVICE",
        "status": "ACTIVE",
        "manager": "Andrew Managerov",
        "positions": []
    },
    {
        "id": 12,
        "title": "URANUS",
        "type": "PRODUCT",
        "status": "ACTIVE",
        "manager": "Andrew Managerov",
        "positions": []
    }
];

function getInitialAsyncContainerForTeams() {
    return {
        data: null,
        isLoading: false,
        error: null
    };
}

/**
 * Редюсер для узла "teams".
 */
export default function teams(state = getInitialAsyncContainerForTeams(), action) {
    switch (action.type) {
        case GET_TEAMS_START:
            return {
                ...state,
                isLoading: true
            };
        case GET_TEAMS_SUCCESS: {
            return {
                isLoading: false,
                data: action.payload.data.content,
                error: null
            };
        }
        case GET_TEAMS_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        case UPDATE_POSITION_LOAD_START:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_POSITION_LOAD_SUCCESS: {
            return state;
        }
        case UPDATE_POSITION_LOAD_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        case CREATE_POSITION_LOAD_START:
            return {
                ...state,
                isLoading: true
            };
        case CREATE_POSITION_LOAD_SUCCESS: {
            console.log(action.payload);
            return state;
        }
        case CREATE_POSITION_LOAD_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        case DELETE_POSITION_LOAD_START:
            return {
                ...state,
                isLoading: true
            };
        case DELETE_POSITION_LOAD_SUCCESS: {
            console.log(action.payload);
            /**
             * Реализовать логику обновления стора.
             */
            return state;
        }
        case DELETE_POSITION_LOAD_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        case UPDATE_TEAM_START:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_TEAM_SUCCESS: {
            const responseTeam = action.payload.data;
            const index = state.data.findIndex((team) => team.id === responseTeam.id);
            const newTeams = [...state.data];
            newTeams[index] = responseTeam;
            return {
                ...state,
                data: newTeams
            };
        }
        case UPDATE_TEAM_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        default:
            return state;
    }
}
