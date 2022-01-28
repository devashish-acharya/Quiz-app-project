import {createStore} from 'redux';

const initState = {
    user: null
}
// function that takes an action and the previous state of the application and returns the new state.
const reducer = (state = initState, action) => {
    if (action.type === 'login') {
        localStorage.setItem('JWT_PAYLOAD', action.token);
        localStorage.setItem('_ID', action._id);

        return {
            ...state, 
            user: action.user
        }
    } else if (action.type === 'set_user') {
        return {
            ...state, 
            user: action.user
        }
    } else {
        return state;
    }
}

const store = createStore(reducer);

export default store;