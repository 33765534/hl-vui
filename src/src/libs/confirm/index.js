import { h, render } from "vue";
import confirmComponent from "./index.vue";
/**
 * 展示 confirm,用户只传递一个参数，那么这个参数为 content
 * @param {*} title 标题（如果用户没有传递内容，那么标题被作为内容）
 * @param {*} content 内容（如果内有 title,那么 content 会被作为第一个参数传入）
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确认按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title;
      title = "";
    }
    /**
     * 关闭按钮回调
     */
    const close = () => {
      // 3.把渲染的 vnode 去掉
      render(null, document.body);
    };
    /**
     * 取消按钮的回调
     */
    const cancelHandler = () => {
      reject(new Error("取消按钮点击"));
    };
    /**
     * 确定按钮的回调
     */
    const confirmHandler = () => {
      resolve();
    };

    // 1. 生成 vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      close,
      cancelHandler,
      confirmHandler,
    });
    // 2. render 函数来渲染
    render(vnode, document.body);
  });
};
