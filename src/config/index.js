export default {
  consoleLog: process.env.REACT_APP_SECRET_BUILD_TYPE === 'dev' || process.env.REACT_APP_SECRET_BUILD_TYPE === 'test',
  title: '某项目',
  baseDomain: {
    dev: '',
    test: '',
    rd: '',
    prod: ''
  },
  regex: {
    base: /[^\u4e00-\u9fa5\da-zA-Z~!@#$%^&*()_+-=[\]\\;',.{}|:"<>?/`！￥……（）——《》？、。，；‘’“”]/g,
    phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  }
};
