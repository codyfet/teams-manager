import {
    GET_EMPLOYEES_FAILURE,
    GET_EMPLOYEES_START,
    GET_EMPLOYEES_SUCCESS,
} from "../Actions/ActionTypes";

function getInitialAsyncContainer() {
    return {
        data: null,
        isLoading: false,
        error: null
    };
}

/**
 * Редюсер для узла "employees".
 */
export default function employees(state = getInitialAsyncContainer(), action) {
    switch (action.type) {
        case GET_EMPLOYEES_START:
            return {
                ...state,
                isLoading: true
            };
        case GET_EMPLOYEES_SUCCESS: {
            return {
                isLoading: false,
                data: action.payload.data.content,
                error: null
            };
        }
        case GET_EMPLOYEES_FAILURE:
            return {
                error: null,
                isLoading: false,
                data: null
            };
        default:
            return state;
    }
}
