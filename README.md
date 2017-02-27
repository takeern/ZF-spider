﻿#案列
# ZF-spider
正方教务爬虫
# 技术栈
 js+nodejs+Finder4
#爬坑
 -正方教务有一个开发人员登录页面（可以防止5秒刷屏），如果使用该入口，那么打开方式也会发生改变，原本的为window.open，而此入口是302重定向。
 -网上有很多教程，但是有一点没说清楚，你必须提交x-www-form-urlencoded数据。
 -正方教务系统使用字符串保存登录状态，经过测试大概15分钟，不同学校可能不同，登录后保存该字符串，无需再次登录减轻服务器压力
#例子
```JavaScript
var getLesson=require('getLesson');
var data=getLesson(xh,pas);
console.log(data);
[ { lessonId: 'kcmcGrid:_ctl2:xk',
    lessonName: '金银提取加工简介',
    lessonTime: '周五第9,10,11节{第9-16周}',
    lessonSite: 'L4204',
    lessonCredit: '1.5',
    lessonNumber: '31' },
  { lessonId: 'kcmcGrid:_ctl3:xk',
    lessonName: '神经经济决策学',
    lessonTime: '周五第9,10,11节{第9-16周}',
    lessonSite: 'L4301',
    lessonCredit: '1.5',
    lessonNumber: '1' },
  { lessonId: 'kcmcGrid:_ctl4:xk',
    lessonName: '基因与人体健康',
    lessonTime: '周三第9,10,11节{第9-16周}',
    lessonSite: 'L4203',
    lessonCredit: '1.5',
    lessonNumber: '1' },
  { lessonId: 'kcmcGrid:_ctl5:xk',
    lessonName: '化学化工常用软件及应用',
    lessonTime: '周五第9,10,11节{第9-16周}',
    lessonSite: 'L4202',
    lessonCredit: '1.5',
    lessonNumber: '14' },
  { lessonId: 'kcmcGrid:_ctl6:xk',
    lessonName: '近代物理的实验观察',
    lessonTime: '周二第9,10,11节{第9-16周}',
    lessonSite: '二实验楼218',
    lessonCredit: '1.5',
    lessonNumber: '25' },
  { lessonId: 'kcmcGrid:_ctl7:xk',
    lessonName: 'JLPT日本语能力试验2级听解对策讲座',
    lessonTime: '周三第9,10,11节{第9-16周}',
    lessonSite: 'L4303',
    lessonCredit: '1.5',
    lessonNumber: '32' },
  { lessonId: 'kcmcGrid:_ctl8:xk',
    lessonName: '综合英语(5)',
    lessonTime: '?',
    lessonSite: '?',
    lessonCredit: '5.0',
    lessonNumber: '445' },
  { lessonId: 'kcmcGrid:_ctl9:xk',
    lessonName: '综合英语(6)',
    lessonTime: '?',
    lessonSite: '?',
    lessonCredit: '5.0',
    lessonNumber: '445' },
  { lessonId: 'kcmcGrid:_ctl10:xk',
    lessonName: '应用伦理学',
    lessonTime: '周四第9,10,11节{第9-16周}',
    lessonSite: 'L4203',
    lessonCredit: '1.5',
    lessonNumber: '1' },
  { lessonId: 'kcmcGrid:_ctl11:xk',
    lessonName: '昆曲艺术导赏',
    lessonTime: '周二第9,10,11节{第9-16周}',
    lessonSite: 'L4303',
    lessonCredit: '1.5',
    lessonNumber: '6' },
  { lessonId: 'kcmcGrid:_ctl12:xk',
    lessonName: '机械工程综合实训',
    lessonTime: '周一第9,10,11节{第9-16周}',
    lessonSite: '工程实践中心',
    lessonCredit: '1.5',
    lessonNumber: '93' },
  { lessonId: 'kcmcGrid:_ctl13:xk',
    lessonName: '器乐合奏',
    lessonTime: '?',
    lessonSite: '?',
    lessonCredit: '1.5',
    lessonNumber: '31' },
  { lessonId: 'kcmcGrid:_ctl14:xk',
    lessonName: '过程装备与控制工程概论',
    lessonTime: '周四第9,10,11节{第9-16周}',
    lessonSite: 'L4102',
    lessonCredit: '1.5',
    lessonNumber: '99' },
  { lessonId: 'kcmcGrid:_ctl15:xk',
    lessonName: '物联网导论',
    lessonTime: '周五第9,10,11节{第9-16周}',
    lessonSite: 'L4402',
    lessonCredit: '1.5',
    lessonNumber: '1' },
  { lessonId: 'kcmcGrid:_ctl16:xk',
    lessonName: '材料加工工程导论',
    lessonTime: '周四第9,10,11节{第9-16周}',
    lessonSite: 'L3107',
    lessonCredit: '1.5',
    lessonNumber: '111' },
  { lessonId: 'kcmcGrid:_ctl17:xk',
    lessonName: '能源科学导论',
    lessonTime: '周四第9,10,11节{第9-16周}',
    lessonSite: 'L4103',
    lessonCredit: '1.5',
    lessonNumber: '34' },
  { lessonId: 'kcmcGrid:_ctl18:xk',
    lessonName: '生命要素与医药工业',
    lessonTime: '周二第9,10,11节{第9-16周}',
    lessonSite: 'L4203',
    lessonCredit: '1.5',
    lessonNumber: '1' },
  { lessonId: 'kcmcGrid:_ctl19:xk',
    lessonName: '化工漫谈-从石油到新材料',
    lessonTime: '周四第9,10,11节{第9-16周}',
    lessonSite: 'L4402',
    lessonCredit: '1.5',
    lessonNumber: '1' } ]
```