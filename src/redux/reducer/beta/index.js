import '../../action/beta';
import types from '../../types/beta';
const initialState = {
    text: 'Hello'
};
const indexFilter = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case types.BETA_TYPE:
            copyState.text = 'World';
            return copyState;
        default:
            return copyState;
    }
};

export default indexFilter;
