const path = require('path');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const moment = require('moment');
moment.locale('zh-cn');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('components', resolve('./src/components'))
            .set('common', resolve('./src/common'))
            .set('api', resolve('./src/api'))
    },
    devServer: {

        before: function (app) {
          app.use(bodyParser.json()); //数据JSON类型
          app.use(bodyParser.urlencoded({extended: false}));
            /*登录状态*/
            app.get('/api/loginStatus', async (req, res) => {
                try {
                    const cookies = await readCookies('cookies');
                    const loginInfo = await getLoginStatus(cookies);
                    res.json(loginInfo)
                } catch (err) {
                    console.log(err);
                }
            });

            /*提交评论*/
            app.post('/api/comments', bodyParser.json(), async (req, res) => {
                try {
                    console.log(req.body);
                    let j = request.jar();
                    const cookies = await readCookies('cookies');
                    const headers = {
                        'accept': 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                        'origin': 'https: //www.jianshu.com',
                        'referer': 'https://www.jianshu.com/p/30c3c3d3a09a',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                        cookie: cookies
                    };
                    const params = req.body;
                    console.log(params);
                    const url = `https://www.jianshu.com/notes/${params.noteId}/comments`;
                    request.post({url: url, jar: j, form: req.body, headers: headers}, (error, response, data) => {
                        res.json(data)
                    })

                } catch (err) {
                    console.log(err);
                }
            });
          /*删除评论*/
          app.post('/api/deleteComment', bodyParser.json(), async (req, res) => {
            try {
              console.log(req.body);
              let j = request.jar();
              const cookies = await readCookies('cookies');
              const headers = {
                'accept': 'application/json',
                'content-type': 'application/json;charset=UTF-8',
                'origin': 'https: //www.jianshu.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                cookie: cookies
              };
              const params = req.body;
              console.log(params);
              const url = `https://www.jianshu.com/shakespeare/comments/${params.id}`;
              request.delete({url: url, jar: j, form: req.body, headers: headers}, (error, response, data) => {
                res.json(data)
              })
            } catch (err) {
              console.log(err);
            }
          });
          /*点赞评论*/
          app.post('/api/like', bodyParser.json(), async (req, res) => {
            try {
              console.log(req.body)
              let j = request.jar();
              const cookies = await readCookies('cookies');
              const headers = {
                'accept': 'application/json',
                'content-type': 'application/json;charset=UTF-8',
                'origin': 'https: //www.jianshu.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                cookie: cookies
              };
              const params = req.body;
              console.log(params);
              const url = `https://www.jianshu.com/shakespeare/comments/${params.id}/like`;
              if(params.fuck===1){
                request.post({url: url, jar: j, form: req.body, headers: headers}, (error, response, data) => {
                  if(data.trim().length===0){
                    data='like_ok'
                  }
                  res.json(data)
                })
              }else{
                request.delete({url: url, jar: j, form: req.body, headers: headers}, (error, response, data) => {
                  if(data.trim().length===0){
                    data='dislike_ok'
                  }
                  res.json(data)
                })
              }


            } catch (err) {
              console.log(err);
            }
          });
            /*获取文章列表*/
            app.get('/api/noteList', (req, res) => {
                const params = req.query;
                const url = `https://www.jianshu.com/u/${params.author}?order_by=${params.order_by}&page=${params.page}`;
                request.get({
                    url: url,
                    headers: {
                        referer: 'https://www.jianshu.com',
                        host: 'www.jianshu.com'
                    },
                },(error,response,data)=>{
                    const content = noteList(data);
                    res.json(content)
                })
            });
          /*获取评论列表*/
          app.get('/api/getComments', async (req, res) => {
            try {
              const params = req.query;
              console.log(params);
              const url=`https://www.jianshu.com/shakespeare/notes/${params.noteId}/comments?page=${params.page}&count=${params.count}&author_only=${params.author_only}&order_by=${params.order_by}`

              request.get({
                url: url
              },(error,response,data)=>{
                const _data = JSON.parse(data);
                if(_data.comments){
                  _data.comments.forEach((item)=>{
                      item.created_at = formatDate(item.created_at);
                    if(item.children.length>0){
                      item.children.forEach(time=>{
                        time.created_at =formatDate(time.created_at)
                      })
                    }
                  })
                }
                res.json(_data)
              })
            } catch (err) {
              console.log(err);
            }

          });
            /*获取文章内容*/
            app.get('/api/article', (req, res) => {
                const url = 'https://www.jianshu.com/p/' + req.query.id;
                request.get({url: url}, (error, response, body) => {
                    const $ = cheerio.load(body);
                    $('img').each(function () {
                        const src = $(this).attr('data-original-src');
                        $(this).attr('src', 'https:' + src)
                    });
                    $('.author').remove();
                    const articleHtml = $('article').html();
                    const data = {
                        data: articleHtml
                    };
                    res.json(data)
                })
            });
            /*获取验证信息，用于登录验证码验证*/
            app.get('/api/captchas', (req, res) => {
                const url = `https://www.jianshu.com/captchas/new?t=${req.query.t}`;
                request.get({
                    url: url,
                    headers: {
                        referer: 'https://www.jianshu.com',
                        host: 'www.jianshu.com'
                    }
                }, (error, response, data) => {
                    res.json(data)
                })
            });
            /* 登录 */

            app.post('/api/login', function (req, res) {
                let j = request.jar();
                request.get({url: 'https://www.jianshu.com/sign_in', jar: j}, (error, response, body) => {
                    const cookies = j.getCookieString('https://www.jianshu.com/sign_in');
                    const $ = cheerio.load(body);
                    req.body['authenticity_token'] = $('input[name="authenticity_token"]').val();
                    const headers = {
                        referer: 'https://www.jianshu.com/sign_in',
                        'content-type': 'application/x-www-form-urlencoded',
                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                        host: 'www.jianshu.com',
                        cookie: cookies
                    };
                    const url = 'https://www.jianshu.com/sessions';
                    request.post({url: url, jar: j, form: req.body, headers: headers}, async () => {
                        const cookie = j.getCookieString(url);
                        try {
                            const cookie = j.getCookieString(url);
                            const loginInfo = await getLoginStatus(cookie);
                            res.json(loginInfo)
                        } catch (err) {
                            console.log(err);
                        }
                        fs.writeFile(__dirname + '/cookies.txt', cookie, () => {
                        });
                    })
                })
            });

            /*退出*/
            app.post('/api/signOut', async (req, res) => {
                try {
                    let j = request.jar();
                    const cookies = await readCookies('cookies');
                    const headers = {
                        referer: 'https://www.jianshu.com/',
                        'content-type': 'application/x-www-form-urlencoded',
                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                        host: 'www.jianshu.com',
                        cookie: cookies
                    };
                    const url = 'https://www.jianshu.com/sign_out';
                    request.post({url: url, jar: j, form: req.body, headers: headers}, async () => {
                        try {
                            const cookie = j.getCookieString(url);
                            const loginInfo = await getLoginStatus(cookie);
                            res.json(loginInfo)
                        } catch (err) {
                            console.log(err);
                        }
                    })
                } catch (err) {
                    console.log(err);
                }
            });

        }
    },
    publicPath: ''
};

/*解析文章列表*/
function noteList(res) {
    let $ = cheerio.load(res);
    let noteListData = [];
    let noteList = $('.note-list li');
    noteList.each(function () {
        const o = {};
        let _this = $(this);
        const time = _this.find('.meta .time').attr('data-shared-at')
        o['noteId'] = _this.attr('data-note-id');
        o['articleId'] = _this.find('.content .title').attr('href').replace('/p/', '');
        o['title'] = _this.find('.title').text();
        o['abstract'] = _this.find('.abstract').text();
        o['read'] = _this.find('.meta a').eq(0).text();
        o['comments'] = _this.find('.meta a').eq(1).text();
        o['like'] = _this.find('.meta .ic-list-like').parent().text();
        o['time'] = formatDate(time);
        noteListData.push(o)
    });
    return noteListData
}

/*格式化时间*/
function formatDate(time) {
    const delta = moment.duration(new Date() * 1).as('days') - moment.duration(new Date(time) * 1).as('days');
    if (delta > 3) {
        time = moment(time).format('YYYY年M月Do  h:mm');
    } else {
        time = moment(time).startOf('minute').fromNow();
    }
    return time
}

/*登录状态*/
function getLoginStatus(cookies) {
    return new Promise((resolve) => {
        request.get({
            url: 'https://www.jianshu.com',
            headers: {cookie: cookies}
        }, (error, response, data) => {
            const $ = cheerio.load(data);
            let info = $('script[data-name="page-data"]').html();
            const authenticity_token = $('meta[name="csrf-token"]').attr('content')
            if (info) {
                info = JSON.parse(info);
                info.authenticity_token = authenticity_token
            }
            resolve(info)
        })
    })
}

/*读取cookie*/
function readCookies(name) {
    return new Promise((resolve) => {
        fs.readFile(__dirname + '/' + name + '.txt', 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
            } else {
                resolve(data)
            }
        });
    })
}
