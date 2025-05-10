
interface CountState {
    number: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    sum: (num: number) => void;
    multiply: (num: number) => void;
    divide: (num: number) => void;
}

interface AuthState {
    token: string;
    isAuthenticated: boolean | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    refreshToken: (token: string) => void;
    isLoading: boolean;
    user: any;
}

export interface AppState {
    count: CountState;
    auth: AuthState;
}


export const initialState: AppState = {
    count: {
        number: 0,
        increment: () => {},
        decrement: () => {},
        reset: () => {},
        sum: (num: number) => {},
        multiply: (num: number) => {},
        divide: (num: number) => {}
    },
    auth: {
        token: '',
        isAuthenticated: null,
        login: (email: string, password: string) => {},
        logout: () => {},
        refreshToken: (token: string) => {},
        isLoading: false,
        user: null,
    }
}