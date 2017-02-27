/**
 * Created by Administrator on 2017/2/14.
 */
var superagent = require('superagent');
var charset=require('superagent-charset');
charset(superagent);
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var iconv=require('iconv-lite');
var request = require("request");
function sendChoose(url,refer,__EVENTTARGET,__EVENTARGUMENT,__VIEWSTATE) {
    superagent.post("218.199.178.13" + url)
        .charset('gbk')
        .redirects(5)
        .type("form")
        .send('__EVENTTARGET='+__EVENTTARGET)
        .send('__EVENTARGUMENT='+__EVENTARGUMENT)
        .send('__VIEWSTATE='+__VIEWSTATE)
        .send('ddl_kcxz=')
        .send('ddl_ywyl=%D3%D0')
        .send('ddl_kcgs=')
        .send('ddl_sksj=')
        .send('ddl_xqbs=2')
        .send('TextBox1=')
        .send('kcmcGrid%3A_ctl2%3Axk=on')
        .send('Button1=++%CC%E1%BD%BB++')
        .set({
            Referer: "http://218.199.178.13" + refer,
            "Host": "218.199.178.13",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
        })
        .end(function (eer, res) {
            console.log(url);
            console.log(res.length);
        })
}