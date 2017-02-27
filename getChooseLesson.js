/**
 * Created by Administrator on 2017/2/14.
 */
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
function getChooseLesson(xh,password){
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
                var action='getChooseLesson';
                if(action==="getChooseLesson"){
                    if($('.top').eq(0).find('li').find('a').attr('href')) {
                        url=$('.top').eq(0).find('li').find('a').attr('href').split('&');
                        xm=url[1].slice(3);
                        gnmkdm=url[2].slice(7);
                        url='/'+str[1]+'/'+url[0].split('?')[0];
                        //console.log(url,lessonRefer);
                        chooseLesson(url,lessonRefer);
                    }
                    else {
                        console.log('账号密码错误');
                        var data={state:'fail'};
                        return data;
                    }
                }
            })
    }
    function chooseLesson(url,refer){
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
                var form1=$('#xsyxxxk_form');
                var form=form1.find('input');

                var __EVENTTARGET=form.eq(0).attr('value');
                var __EVENTARGUMENT=form.eq(1).attr('value');
                var choose__VIEWSTATE=form.eq(2).attr('value').split('+').join('%2B').split('=').join('%3D').split('/').join('%2F');
                var sendrefer='/'+str+'/'+form1.attr('action').split("?")[1];
                var sendurl='/'+str+'/'+form1.attr('action');

                //sendChoose(sendurl,sendrefer,__EVENTTARGET,__EVENTARGUMENT,choose__VIEWSTATE);
                //console.log(__EVENTTARGET+'|||'+__EVENTARGUMENT+'||'+choose__VIEWSTATE);
                var chooseData=$('#kcmcGrid').find('tr');
                var item={},items=[],i=0;
                chooseData.map(function(){
                    item={
                        "lessonId": $(this).find('td').eq(0).find('input').attr('name'),
                        "lessonName": $(this).find('td').eq(2).text(),
                        "lessonTime":$(this).find('td').eq(5).text(),
                        "lessonSite": $(this).find('td').eq(6).text(),
                        "lessonCredit": $(this).find('td').eq(7).text(),
                        "lessonNumber": $(this).find('td').eq(12).text()
                    };
                    if(i!==0){
                        items.push(item);
                    }
                    i++;
                });
                var data={chooseLesson:items,__EVENTTARGET:__EVENTTARGET,__EVENTARGUMENT:__EVENTARGUMENT,choose__VIEWSTATE:choose__VIEWSTATE,sendrefer:sendrefer,sendurl:sendurl};
                console.log(data);
                return data;
            })
    }
}
module .exports=getChooseLesson;