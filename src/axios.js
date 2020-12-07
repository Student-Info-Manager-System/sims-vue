import axios from 'axios'
import router from './router'
import store from './store'
import { Dialog } from 'vant';
// 局部注册
export default {
    components: {
        [Dialog.name]: Dialog,
    },
};

axios.defaults.baseURL = "http://localhost:8888"

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(res => {
        let data = res.data;

        // console.log(data)



        if (data.code === 200) {
            return res
        } else {
            Dialog.alert({
                title: '提示',
                message: data.message,
            }).then(() => {
                // on close
            });
            return Promise.reject(data.msg)
        }
    },
    error => {
        Dialog.alert({
            title: '错误',
            message: '数据异常',
        }).then(() => {
            // on close
        });
        return Promise.reject(error.response.data)
    }
)
