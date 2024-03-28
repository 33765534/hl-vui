import request from "@/utils/request";
import { PEXELS_DATA } from "@/constants";

/**
 * 获取图片数据列表
 * @returns
 */
export const getPexlesList = (data) => {
  //   return request({
  //     url: "/pexels/list",
  //     params: data,
  //   });
  return PEXELS_DATA;
};

/**
 * 获取搜索提示
 * @returns
 */
export const getHint = (q) => {
  //   return request({
  //     url: "/pexels/hint",
  //     params: q,
  //   });
  return { total: 4, result: ["12304", "123", "1234"] };
};

/**
 * 获取推荐主题
 * @returns
 */
export const getThemes = () => {
  //   return request({
  //     url: "/pexels/themes"
  //   });
  return {
    themes: [
      {
        id: "food photography",
        photo:
          "https://images.pexels.com/photos/1652312/pexels-photo-1652312.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "小清新",
      },
      {
        id: "Art",
        photo:
          "https://images.pexels.com/photos/9890370/pexels-photo-9890370.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "植物",
      },
      {
        id: "Afternoon tea",
        photo:
          "https://images.pexels.com/photos/1292862/pexels-photo-1292862.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "关怀",
      },
      {
        id: "Portrait Photography",
        photo:
          "https://images.pexels.com/photos/4058223/pexels-photo-4058223.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "艺术",
      },
      {
        id: "Care",
        photo:
          "https://images.pexels.com/photos/852793/pexels-photo-852793.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "亲子",
      },
      {
        id: "cute background",
        photo:
          "https://images.pexels.com/photos/7267852/pexels-photo-7267852.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "可爱背景",
      },
      {
        id: "nature",
        photo:
          "https://images.pexels.com/photos/2127969/pexels-photo-2127969.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
        title: "壁纸",
      },
    ],
  };
};

/**
 * 获取指定图片数据
 * @returns
 */
export const getPexelsFromId = (id) => {
  //   return request({
  //     url: `/pexels${id}`
  //   });
  const [item] = PEXELS_DATA.list.filter((e) => e.id === id);
  return item;
};
