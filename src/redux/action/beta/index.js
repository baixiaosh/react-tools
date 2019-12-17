import types from '../../types/beta';
let betaAction = {
    betaChange: () => {
        return {
            type: types.BETA_TYPE
        };
    }
};
export default betaAction;
