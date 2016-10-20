import 'whatwg-fetch';


/**
 * @description fetch封装
 * @param data {}
 * @param data = {
 *      url,
 *      type,
 *      data - 请求参数
 * }
 */
export function myFetch(data) {
    return fetch(data.url, {
        method: data.type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data)
    })
}