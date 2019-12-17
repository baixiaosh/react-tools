import dev from './api.dev';
import prod from './api.prod';
import rd from './api.rd';
import test from './api.test';

const api = {
    dev,
    prod,
    rd,
    test
};

export default api[process.env.REACT_APP_SECRET_BUILD_TYPE];
