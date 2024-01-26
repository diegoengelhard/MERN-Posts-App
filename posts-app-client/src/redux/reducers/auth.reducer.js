const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            return { ...state, authData: action.payload, loading: false, errors: null };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
}

export default authReducer;