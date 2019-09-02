const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser')
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
// const qs = require('qs')
// const querystring = require('querystring');
var moment = require('moment');
moment.locale('zh-cn')

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

        before: function(app) {
            app.post('/api/comments', bodyParser.json(), async(req, res) => {
                try {
                    console.log(req.body)
                    let j = request.jar();
                    const cookies = await readCookies('cookies');
                    const headers = {
                        'accept': 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                        'origin': 'https: //www.jianshu.com',
                        'referer': 'https://www.jianshu.com/p/30c3 c3d3a09a',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                        cookie: cookies
                    }

                    const url = 'https://www.jianshu.com/notes/46280711/comments';
                    request.post({ url: url, jar: j, form: req.body, headers: headers }, (error, reponse, data) => {
                        res.json({
                            code: 0,
                            data: data,
                            msg: 'success'
                        })
                    })

                } catch (err) {
                    console.log(err);
                }

            });
            app.get('/api/noteList', function(req, res) {
                const params = req.query;
                const url = `https://www.jianshu.com/u/${params.author}?order_by=${params.order_by}&page=${params.page}`;
                axios.get(url, {
                    headers: {
                        referer: 'https://www.jianshu.com',
                        host: 'www.jianshu.com'
                    },
                }).then((response) => {
                    const content = notelist(response.data)
                    res.json({
                        data: content,
                        msg: 'success',
                        code: 0
                    })
                }).catch((e) => {
                    console.log(e)
                })
            });



            app.get('/api/article', function(req, res) {
                const url = 'https://www.jianshu.com/p/' + req.query.id;
                request.get({ url: url }, (error, reponse, body) => {
                    const $ = cheerio.load(body);
                    $('img').each(function() {
                        const src = $(this).attr('data-original-src')
                        $(this).attr('src', 'https:' + src)
                    });
                    $('.author').remove()
                    const articleHtml = $('.article').html()
                    const data = {
                        data: articleHtml,
                        msg: 'success',
                        code: 0
                    };
                    res.json(data)
                })
            });






            app.get('/api/captchas', function(req, res) {
                const url = `https://www.jianshu.com/captchas/new?t=${ req.query.t}`;
                axios.get(url, {
                    headers: {
                        referer: 'https://www.jianshu.com',
                        host: 'www.jianshu.com'
                    }
                }).then((response) => {
                    const ret = response.data;
                    const data = {
                        data: ret,
                        msg: 'success',
                        code: 0
                    };
                    res.json(data)
                }).catch((e) => {
                    console.log(e)
                })
            });

            app.use(bodyParser.json()); //数据JSON类型
            app.use(bodyParser.urlencoded({ extended: false }));
            app.post('/api/login', function(req, res) {
                let j = request.jar();
                request.get({ url: 'https://www.jianshu.com/sign_in', jar: j }, function(error, reponse, body) {
                    const cookies = j.getCookieString('https://www.jianshu.com/sign_in');
                    const $ = cheerio.load(body);
                    req.body['authenticity_token'] = $('input[name="authenticity_token"]').val()
                    const headers = {
                        referer: 'https://www.jianshu.com/sign_in',
                        'content-type': 'application/x-www-form-urlencoded',
                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                        host: 'www.jianshu.com',
                        cookie: cookies
                    }
                    const url = 'https://www.jianshu.com/sessions';
                    request.post({ url: url, jar: j, form: req.body, headers: headers }, function() {
                        const cookie = j.getCookieString(url);
                        request.get({
                            url: 'https://www.jianshu.com/sign_in',
                            headers: { cookie: cookie }
                        }, (error, reponse, data) => {
                            const $ = cheerio.load(data)
                            let info = $('script[data-name="page-data"]').html()
                            const authenticity_token = $('meta[name="csrf-token"]').attr('content')
                            if (info) {
                                info = JSON.parse(info)
                                info.authenticity_token = authenticity_token
                            }
                            res.json({
                                code: 0,
                                data: info,
                                msg: 'success'
                            })

                        })
                        fs.writeFile(__dirname + '/cookies.txt', cookie, () => {});
                    })
                })
            });


            app.post('/api/sign_out', async(req, res) => {
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
                    }
                    const url = 'https://www.jianshu.com/sign_out';
                    request.post({ url: url, jar: j, form: req.body, headers: headers }, function() {
                        const cookie = j.getCookieString(url);
                        request.get({
                            url: 'https://www.jianshu.com',
                            headers: { cookie: cookie }
                        }, (error, reponse, data) => {
                            const $ = cheerio.load(data)
                            let info = $('script[data-name="page-data"]').html()
                            const authenticity_token = $('meta[name="csrf-token"]').attr('content')
                            if (info) {
                                info = JSON.parse(info)
                                info.authenticity_token = authenticity_token
                            }
                            res.json({
                                code: 0,
                                data: info,
                                msg: 'success'
                            })

                        })
                    })

                } catch (err) {
                    console.log(err);
                }
            });

        }
    },
    publicPath: ''
};


function notelist(res) {
    let $ = cheerio.load(res);
    let notelistData = [];
    let notelist = $('.note-list li');
    notelist.each(function() {
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
        notelistData.push(o)
    });
    return notelistData
}

function formatDate(time) {
    const delta = moment.duration(new Date() * 1).as('days') - moment.duration(new Date(time) * 1).as('days');
    if (delta > 3) {
        time = moment(time).format('YYYY年M月Do  h:mm');
    } else {
        time = moment(time).startOf('minute').fromNow();
    }
    return time
}

function getCookies(finnalLoginUrl, name) {
    return new Promise((resolve, reject) => {
        let j = request.jar();
        request.get({ url: finnalLoginUrl, jar: j }, function(error, reponse, body) {
            let cookies = j.getCookieString(finnalLoginUrl);
            fs.writeFile(__dirname + '/' + name + '.txt', cookies, (error) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(cookies);
                }
            });
        })
    })
}

function readCookies(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/' + name + '.txt', 'utf-8', function(err, data) {
            if (err) {
                console.error(err);
            } else {
                resolve(data)
            }
        });
    })
}