import config from 'config';
import globalCtrl from 'common/js/ctrl';
export default {
  /**
   * 序列化对象
   * @param {添加对象} data
   */
  serialize(data) {
    let paramStr = '';
    if (data) {
      paramStr = this.sortParam(data);
    }
    return paramStr;
  },
  /**
   * 排序
   */
  sortParam(data) {
    let arr = [];
    let arrIndex = 0;
    for (let key in data) {
      arr[arrIndex] = key;
      arrIndex++;
    }
    arr = arr.sort();
    let params = '';
    for (let i = 0; i < arrIndex; i++) {
      if (i === 0) {
        params += arr[i] + '=' + data[arr[i]];
      } else {
        params += '&' + arr[i] + '=' + data[arr[i]];
      }
    }
    return params;
  },
  /*获取地址栏参数
   *   eg:http://www.xxx.loc/admin/write-post.php?cid=79
   *   getUrlParams('cid')  => 79
   */
  getUrlParams(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  /**
   * 判断对象是否为空
   * @param {判断对象} obj
   */
  isEmpty(obj) {
    if (obj === undefined) {
      return true;
    } else if (obj == null) {
      return true;
    } else if (typeof obj === 'string') {
      if (this.trim(obj) === '') {
        return true;
      }
    }
    return false;
  },
  /**
   * 去空格
   * @param {字符串} str
   */
  trim(str) {
    if (typeof str !== 'string') {
      return str;
    }
    if (typeof str.trim === 'function') {
      return str.trim();
    } else {
      return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, '');
    }
  },
  //是否是微信浏览器
  weixinWap() {
    let ua = navigator.userAgent.toLowerCase();
    // console.log(ua);
    if (ua.indexOf('micromessenger') > -1) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 判断客户端是Android（1）还是IOS（2） 其他（0）
   */
  andriodOrIOS() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid ? 1 : isIOS ? 2 : 0;
  },
  /* 根据数字获取颜色 */
  randomColorByNumber(id = 1, opacity) {
    return `rgba(${Math.floor(((~~id % 256) / 100) * 256)},${Math.floor((((~~id * 50) % 256) / 100) * 256)}, ${Math.floor((((~~id * 100) % 256) / 100) * 256)}, ${opacity})`;
  },
  /* 转中文数字 */
  toNumber(params) {
    let value = `${params}`;
    let i = 1;
    let dw2 = ['', '万', '亿'];
    let dw1 = ['十', '百', '千'];
    let dw = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    //转换整数部分
    let k1 = 0; //计小单位
    let k2 = 0; //计大单位
    let sum = 0;
    let str = '';
    let len = value.length; //整数的长度
    for (i = 1; i <= len; i++) {
      let n = value.charAt(len - i); //取得某个位数上的数字
      let bn = 0;
      if (len - i - 1 >= 0) {
        bn = value.charAt(len - i - 1); //取得某个位数前一位上的数字
      }
      sum = sum + Number(n);
      if (sum !== 0) {
        str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
        if (n === '0') sum = 0;
      }
      if (len - i - 1 >= 0) {
        //在数字范围内
        if (k1 !== 3) {
          //加小单位
          if (bn !== 0) {
            str = dw1[k1].concat(str);
          }
          k1++;
        } else {
          //不加小单位，加大单位
          k1 = 0;
          let temp = str.charAt(0);
          if (temp === '万' || temp === '亿')
            //若大单位前没有数字则舍去大单位
            str = str.substr(1, str.length - 1);
          str = dw2[k2].concat(str);
          sum = 0;
        }
      }
      if (k1 === 3) {
        k2++;
      }
    }
    return str;
  },
  /**
   * 更改url链接 http(s)
   * @param {字符串} str
   * @param {是否添加到头部} unshift
   */
  parseProtocol(str, unshift) {
    return unshift ? `${window.location.protocol}${str.replace(/http(s)?:/gi, '')}` : `${str.replace(/http(s)?:/gi, window.location.protocol)}`;
  },
  /**
   * 动态添加js
   * @param {路径} src
   * @param {别名} name
   */
  innerScript(src, name, callback) {
    let script, insertBeforeEl;
    script = document.createElement('script');
    window[name] =
      window[name] ||
      (function() {
        window[name] = {};
        (window[name].args = window[name].args || []).push(arguments);
        window[name].script = script;
        return window[name];
      })();
    insertBeforeEl = document.getElementsByTagName('script')[0];
    script.charset = 'UTF-8';
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (typeof callback === 'function') {
        callback();
      }
    };
    insertBeforeEl.parentNode.insertBefore(script, insertBeforeEl);
    config.consoleLog && console.log('insert script: ', src, name, window[name]);
    return window[name].script;
  },
  hideWxMenu(callback) {
    globalCtrl.getWxSign({ url: window.location.href }).then(res => {
      if (res.state === 200) {
        window.wx.config({
          ...res.data,
          jsApiList: ['hideMenuItems', 'chooseWXPay']
        });
        window.wx.ready(() => {
          if (typeof callback === 'function') {
            callback();
          }
          window.wx.hideMenuItems({
            menuList: [
              'menuItem:share:appMessage',
              'menuItem:share:timeline',
              'menuItem:share:qq',
              'menuItem:share:weiboApp',
              'menuItem:share:facebook',
              'menuItem:share:QZone',
              'menuItem:copyUrl',
              'menuItem:openWithQQBrowser',
              'menuItem:openWithSafari'
            ]
          });
        });
      }
    });
  },
  shareConfig(title, description, url, pic) {
    if (this.weixinWap()) {
      globalCtrl.getWxSign({ url: window.location.href }).then(res => {
        if (res.state === 200) {
          window.setShareInfo({
            title,
            summary: description,
            pic,
            url,
            WXconfig: {
              swapTitleInWX: false,
              appId: res.data.appId,
              timestamp: res.data.timestamp,
              nonceStr: res.data.nonceStr,
              signature: res.data.signature
            }
          });
        }
      });
    } else {
      window.setShareInfo({
        title,
        summary: description,
        pic,
        url
      });
    }
  }
};
