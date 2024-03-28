import request from "@/utils/request"

/**
 * 获取分类方法
 * @returns
 */
export const getCategory = () => {
    return request({
        url:'/list?modules=chinaDayListNew'
    })
}
