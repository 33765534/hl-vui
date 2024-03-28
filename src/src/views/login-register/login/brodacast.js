// 频道名 key
const LOGIN_SUCCESS_CHANNEL = "LOGIN_SUCCESS_CHANNEL";
// 官方声明 safari 支持BroadcastChannel但是实测15.3 的版本并不支持，所以我们需要对其进行判定使用，在不支持BroadcastChannel 的浏览器中，使用localstorage
let brodacastChannel = null;
if (window.BrodacastChannel) {
  brodacastChannel = new BrodacastChannel(LOGIN_SUCCESS_CHANNEL);
}

/**
 * 等待QQ登录成功
因为QQ登录会在一个新的窗口中进行，用户扫码登录成功之后会回调《新窗口的QC.Login 第二参数cb》 ，而不会回调到原页面。
 所以我们需要在《新窗口中通知到原页面》，所以就需要涉及到JS的跨页面通讯，而跨页面通讯指的主要就是《同源页面的通讯》
同源页面的通讯方式有很多，我们这里主要介绍:
 1. BroadcastChannel->https:/ /deve Loper . mozilla. org/zh-CN/ docs/Web/ API/BroadcastChannel
2. window. onstorage:注意:该事件不在导致数据变化的当前页面触发
 
 */
/**
 * 等待回调，它将返回一个promise, 并携带对应的数据
 */
const wait = () => {
  return new Promise((resolve, reject) => {
    // 事件监听
    if (brodacastChannel) {
      // 触发 onmessage 事件回调函数
      brodacastChannel.onmessage = (event) => {
        // 此处的data就是下面发送消息send函数传入的 data
        // 改变 promise 状态
        resolve(event.data);
      };
    } else {
      // 触发 localStorage 的 setItem 事件时回调函数
      window.onstorage = (e) => {
        // 判断当前的事件名
        if (e.key === LOGIN_SUCCESS_CHANNEL) {
          // 此处的newValue就是下面发送消息send函数传入的 data
          // 改变 promise 状态
          resolve(JSON.parse(e.newValue));
        }
      };
    }
  });
};

/**
 * 发送消息
 */
const send = (data) => {
  if (brodacastChannel) {
    // 调用brodacastChannel的api 发送消息
    brodacastChannel.postMessage(data);
  } else {
    // 如果触发 localStorage.setItem 就会触发 window.onstorage回调
    localStorage.setItem(LOGIN_SUCCESS_CHANNEL, JSON.stringify(data));
  }
};
/**
 * 销毁
 */
const clear = () => {
  if (brodacastChannel) {
    brodacastChannel.close();
    brodacastChannel = null;
  } else {
    localStorage.removeItem(LOGIN_SUCCESS_CHANNEL);
  }
};

export default {
  wait,
  send,
  clear,
};
