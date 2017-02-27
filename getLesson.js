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
console.log('爬虫程序开始运行......');
function getLesson(xh,password){
    "use strict";
    var gnmkdm,str,xm,xh=xh,password=password;
    getSession();
    function  getSession(){
        superagent.get('218.199.178.13'+'/default_ysdx.aspx')
            .charset('gbk')
            .redirects(0)
            .set({
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function (eer, res) {
                console.log(xh);
                var m=res.headers.location;
                if(m.split('/').length===3){
                    getView(m);
                }
                else{
                    getCookieStr(m);
                }
            })
    }
    function  getCookieStr(url){
        superagent.get('218.199.178.13'+url)
            .charset('gbk')
            .redirects(0)
            .set({
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function (eer, res) {
                var m=res.headers.location;
                getCookieStr1(m);
            })
    }
    function  getCookieStr1(url){
        superagent.get('218.199.178.13'+url)
            .charset('gbk')
            .redirects(0)
            .set({
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function (eer, res) {
                var m=res.headers.location;
                getView(m);
            })
    }
    function getView(url){
        superagent.get("218.199.178.13"+url)
            .charset('gbk')
            .set({
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function(eer,res) {
                var $=cheerio.load(res.text);
                var viewState=$('#form1').find("input").eq(0).attr('value');
                viewState=viewState.split('+').join('%2B').split('=').join('%3D').split('/').join('%2F');
                sendLogin(url,viewState);
            })
    }
    function  sendLogin(url,view){
        superagent.post( "218.199.178.13"+url)
            .type("form")
            .charset('gbk')
            .redirects(0)
            .send('__VIEWSTATE='+view)
            .send("TextBox1="+xh)
            .send('TextBox2='+password)
            .send('RadioButtonList1=%D1%A7%C9%FA')
            .send('Button1=++%B5%C7%C2%BC++')
            .set({
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function(eer,res){
                console.log("------fenjiexian");
                var url1=url.split('/');
                str=url1[1];
                url1='/'+url1[1]+'/'+'xs_main.aspx?xh='+xh;
                login(url1,url)
            })
    }
    function login(url,refer){
        superagent.get("218.199.178.13"+url)
            .charset('gbk')
            .set({
                "Referer": "http://218.199.178.13"+url,
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function(eer,res){
                var $=cheerio.load(res.text);
                var lessonRefer=url;
                var str=url.split('/');
                var action='getLesson';
                if(action==="getLesson"){
                    if($("li.top").eq(4).find("ul.sub li").eq(7).find('a').attr('href')) {
                        url = $("li.top").eq(4).find("ul.sub li").eq(7).find('a').attr('href').split('&');
                        xm = url[1].slice(3);
                        gnmkdm = url[2].slice(7);
                        url = '/' + str[1] + '/' + url[0].split('?')[0];
                        console.log(url, lessonRefer);
                        getLesson(url, lessonRefer);
                    }
                    else {
                        console.log('账号密码错误');
                        var data={state:'fail'};
                        return data;
                    }
                }
            })
    }
    function getLesson(url,refer){
        superagent.get("218.199.178.13"+url)
            .charset('gbk')
            .query({
                "xh":xh,
                "xm":xm,
                "gnmkdm":gnmkdm
            })
            .set({
                Referer:"http://218.199.178.13"+refer,
                "Host":"218.199.178.13",
                "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
            })
            .end(function(eer,res){
                var $=cheerio.load(res.text);
                var k=$('#Table6').find('tr');
                var data=[],j;
                for(var i=2;i<11;i++){
                    var m= k.eq(i).find("td");
                    j=getTdHtml(m)
                    data.push(j);
                    i++;
                }
                data={lessonData:data,state:'success'};
                return data;
            })
    }
}
function getTdHtml(m){
    var j={},td=[];
    for(var t=1;t<9;t++){
        j=m.eq(t).text();
        if(j==='&#xA0;'||j===null){
            j="";
        }
        j={"text":j};
        td.push(j);
    }
    if(td[0].text==="第一节"||td[0].text==="第五节"||td[0].text==='第九节'){
        td.shift();
    }
    return td;
}
getlesson('1402150220','1402150220');
module .exports=getLesson;