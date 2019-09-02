import axios from 'axios'
import qs from 'qs'
// import { Util } from "../common/js/util";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export function getNoteList(page, order_by, author) {
    const url = '/api/noteList';
    const params = {
        page: page || 1,
        order_by: order_by || 'shared_at',
        author: author || '2c3d4f7ba0d4'
    }

    return axios.get(url, {
        params: params
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}


export function getArticle(id) {
    const url = '/api/article';
    const params = {
        id: id
    }
    return axios.get(url, {
        params: params
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}

export function captchas() {
    const url = `/api/captchas`;
    const params = {
        t: `${Date.now()}-${Math.random().toString(36).substring(3, 6)}`
    }
    return axios.get(url, {
        params: params
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}

export function login(captcha) {
    const data = {
        'utf8': '✓',
        // 'authenticity_token': UUID,
        'session[email_or_mobile_number]': '13029678009',
        'session[password]': 'hui822520',
        'session[oversea]': false,
        'captcha[validation][challenge]': captcha.geetest_challenge,
        'captcha[validation][gt]': captcha.gt,
        'captcha[validation][validate]': captcha.geetest_validate,
        'captcha[validation][seccode]': captcha.geetest_seccode,
        'session[remember_me]': true
    }
    console.log(data)
    const url = '/api/login';
    return axios.post(url, qs.stringify(data)).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })

}



export function sign_out(authenticity_token) {
    const data = {
        '_method': 'delete',
        'authenticity_token': authenticity_token
    }
    const url = '/api/sign_out';
    return axios.post(url, qs.stringify(data)).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}

export function comments(content) {
    const url = '/api/comments';
    return axios.post(url, content).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}