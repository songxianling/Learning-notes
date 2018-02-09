import wepy from 'wepy';
import util from './util';
import tip from './tip'

const wxRequest = async(url,params = {}) => {  
    tip.loading();
    let data = params || {};
    let res = await wepy.request({
        url: url,
        method: 'POST',
        data: data,
        header: { 'Content-Type': 'application/json' },
    })
    tip.loaded();
    return res; 
};
const host = 'https://apiwx.ixiangha.com/'
const wxrr = function (url,params,method='post'){
    return new Promise((resolve,reject) =>{
        let requestUrl = host + url;

        wepy.request({
            url:requestUrl,
            data:params,
            method:method,
            header: { 'Content-Type': 'application/json' },
        }).then(res => {
            if(res && res.statusCode == 200 && res.data){
                resolve(res.data)
            }else{
                reject(res)
            }
        })
              
    })
}


module.exports = {
    wxRequest,
    wxrr
}



import {
  wxRequest
} from '../utils/wxRequest';



let env = "-test" //-dev 或者 -test
const apiMall = 'https://apiwx.ixiangha.com/'

/**
 * 统一皆空定义
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
// 首页本周佳作
const getGoodList = (params) => wxRequest(apiMall+'DishMenus/Main2/Index/masterpiece',params);
// 搜索
const getSearch = (params) => wxRequest(apiMall+'DishMenus/main2/search/dish',params);

module.exports = {
  getGoodList,
  getSearch
}


// let json = await api.getGoodList(
    //   {page:that.page}
    // );