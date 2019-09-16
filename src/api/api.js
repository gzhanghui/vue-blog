import axios from 'axios'
import qs from 'qs'
// import { Util } from "../common/js/util";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export function getNoteList(page, order_by, author) {
    const url = '/api/noteList';
    const params = {
        page: page || 1,
        order_by: order_by || 'shared_at',
        author: author || '49a3c41a50ab'
    };

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
    };
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
    };
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
        'captcha[validation][challenge]': captcha["geetest_challenge"],
        'captcha[validation][gt]': captcha.gt,
        'captcha[validation][validate]': captcha.geetest_validate,
        'captcha[validation][seccode]': captcha[`geetest_seccode`],
        'session[remember_me]': true
    };

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
    };
    const url = '/api/signOut';
    return axios.post(url, qs.stringify(data)).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}

export function comments(noteId,content,parent_id) {
    const url = '/api/comments';
    const params={
      content:content,parent_id:parent_id,noteId
    };
    if(params.parent_id===null){
      delete params.parent_id
    }
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}

export function getComments(noteId,page,count,author_only,order_by) {
  const url = '/api/getComments';
  const params = {
    noteId,
    page:page||1,
    count:count||10,
    author_only:author_only||false,
    order_by:order_by||'desc'
  };
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error);
  })
}

export function loginStatus(){
    const url ='/api/loginStatus';
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    }).catch((error) => {
        console.log(error);
    })
}

export function deleteComment(id) {
  const data = {
    id
  };
  const url ='/api/deleteComment';
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error);
  })
}
export function like(id,fuck) {
  const data = {
    fuck,
    id
  };
  if(!fuck){
    delete  data.fuck
  }

  const url = '/api/like';
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error);
  })

}
