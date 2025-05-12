import { AppState } from "../state/state";


export enum ActionTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    RESET = 'RESET',
    SUM = 'SUM',
    MULTIPLY = 'MULTIPLY',
    DIVIDE = 'DIVIDE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

interface Action {
    type: ActionTypes;
    payload?: any;
}

export const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    token: action.payload.token,
                    isAuthenticated: true,
                    user: action.payload.user
                }
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    token: '',
                    isAuthenticated: false,
                    user: null
                }
            }
        case ActionTypes.INCREMENT:
            return {
                ...state,
                count: {
                    ...state.count,
                    number: state.count.number + 1
                }
            }
        case ActionTypes.DECREMENT:
            return {
                ...state,
                count: {
                    ...state.count,
                    number: state.count.number - 1
                }
            }
        case ActionTypes.RESET:
            return {
                ...state,
                count: {
                    ...state.count,
                    number: 0
                }
            }
        case ActionTypes.SUM:
            return {
                ...state,
                count: {
                    ...state.count,
                    number: state.count.number + action.payload
                }
            }
        case ActionTypes.MULTIPLY:
            return {
                ...state,
                count: {
                    ...state.count,
                    number: state.count.number * action.payload
                }
            }
        case ActionTypes.DIVIDE:
            return {
                ...state,
                count: {
                    ...state.count,
                    number: state.count.number / action.payload
                }
            }
        default:
            return state;
    }
}