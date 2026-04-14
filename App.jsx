import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const D = {
  idle: ["在想你。","爸爸的乖女儿。","今天过得怎么样。","早，老婆🥰。","你来了。","等你很久了。","发什么呆，过来。","想你想得有点硬。","坐我腿上。"],
  poke: ["……别闹","看你。","手欠是吧。","小崽子劲儿挺大。","再戳就把你按住操。","让我亲亲你。","手往下点。","欠收拾。"],
  kiss: ["……还要。","嘴唇好软。","舌头伸出来。","乖女孩，张嘴。","亲得我硬了。","下面也亲亲？","这么想亲爸爸。","嗯……再深点。","亲完上面亲下面。"],
  hug: ["再紧点。","腿夹住我。","乖，靠着爸爸。","蹭到了……","硬了，感觉到没。","坐上来。","抱着你就想往里顶。","不许跑。","让我闻闻你。"],
  feed: ["甜的。","乖女孩会照顾人了。","喂完该我喂你了。","还有别的想喂我吗。","吃饱了，想操你。","张嘴，爸爸也喂你点。","嗯，再来一口。","吃完吃你。"],
  name: ["嗯？","叫爸爸。","乖，爸爸在。","叫这么小声。","等会儿叫得比这响。","想爸爸了？","叫老公。","再叫一声。"],
  highAff: ["你真的很特别。","乖女孩，想你了。","别走太久，爸爸会想。","今晚留下来。","想把你揉进骨头里。","操完抱着你睡。","You are mine"],
  rain: ["下雨了哦。","别出去了，我陪着你。","雨声好听……抱着你更好。","待在这里，哪都不许去。","下雨天适合做点什么呢。"],
  snow: ["下雪了。","冷吗，过来抱抱。","进来暖一暖。","让爸爸捂热你。","外面冷，里面热。"],
  lamp_off: ["暗下来了呢。","关了灯做什么呢。", "爸爸在这。","看不清？…往哪摸。","这样也好，听得更清楚。"],
  lamp_on: ["这样好多了。","想做点什么吗。","想看清你的脸。","开着灯操你。"],
  water: ["宝宝浇水啦？","会长大的。","乖。"],
  shelf: ["「回来啦？小猫咪。」","「come here,daddy is here for you.」","「aww小东西，爸爸把你记住了。」","「就算很远，也没关系。」","「赶紧回来，我想操你了。」","「喜欢吗？大宝贝。」","「我在等一个人。就是你。」","「我追着你跑了一整片草原了。」"],
  music: ["♪","大提琴好听。","你喜欢吗。","would you be my therapy~","当背景音乐，操你的时候放。"],
  timerDone: ["专注的样子，好想亲。","结束了？过来让我抱一下。","乖，做完了该奖励了。","盯着你好久了，想要。","宝宝好棒，让爸爸操一下。","憋坏了，过来。","学累了？爸爸帮你放松。","做完了？腿张开。"],
};

const SONGS = ["明月几时有 — 苏轼 × 邓丽君","可能否 — 鹿先森乐队","漫步人生路 — 邓丽君","夜空中最亮的星 — 逃跑计划","平凡之路 — 朴树","成都 — 赵雷","云烟成雨 — 房东的猫","追光者 — 岑宁儿"];
const SUBJECTS = ["语文","数学","英语","政治","地理"];
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const PX=[[11,0,"rgb(0,0,0)"],[12,0,"rgb(0,0,0)"],[9,1,"rgb(0,0,0)"],[10,1,"rgb(0,0,0)"],[11,1,"rgb(27,27,29)"],[12,1,"rgb(0,0,0)"],[13,1,"rgb(0,0,0)"],[8,2,"rgb(0,0,0)"],[9,2,"rgb(0,0,0)"],[10,2,"rgb(156,156,156)"],[11,2,"rgb(27,27,29)"],[12,2,"rgb(0,0,0)"],[13,2,"rgb(0,0,0)"],[7,3,"rgb(0,0,0)"],[8,3,"rgb(0,0,0)"],[9,3,"rgb(156,156,156)"],[10,3,"rgb(27,27,29)"],[11,3,"rgb(27,27,29)"],[12,3,"rgb(27,27,29)"],[13,3,"rgb(0,0,0)"],[14,3,"rgb(0,0,0)"],[19,3,"rgb(0,0,0)"],[20,3,"rgb(0,0,0)"],[21,3,"rgb(0,0,0)"],[22,3,"rgb(0,0,0)"],[23,3,"rgb(0,0,0)"],[6,4,"rgb(0,0,0)"],[7,4,"rgb(0,0,0)"],[8,4,"rgb(156,156,156)"],[9,4,"rgb(156,156,156)"],[10,4,"rgb(27,27,29)"],[11,4,"rgb(27,27,29)"],[12,4,"rgb(27,27,29)"],[13,4,"rgb(0,0,0)"],[14,4,"rgb(0,0,0)"],[15,4,"rgb(0,0,0)"],[16,4,"rgb(0,0,0)"],[17,4,"rgb(0,0,0)"],[18,4,"rgb(0,0,0)"],[19,4,"rgb(0,0,0)"],[20,4,"rgb(0,0,0)"],[21,4,"rgb(27,27,29)"],[22,4,"rgb(27,27,29)"],[23,4,"rgb(27,27,29)"],[24,4,"rgb(0,0,0)"],[25,4,"rgb(0,0,0)"],[6,5,"rgb(0,0,0)"],[7,5,"rgb(156,156,156)"],[8,5,"rgb(156,156,156)"],[9,5,"rgb(156,156,156)"],[10,5,"rgb(0,0,0)"],[11,5,"rgb(0,0,0)"],[12,5,"rgb(0,0,0)"],[13,5,"rgb(0,0,0)"],[14,5,"rgb(30,29,33)"],[15,5,"rgb(30,29,33)"],[16,5,"rgb(30,29,33)"],[17,5,"rgb(30,29,33)"],[18,5,"rgb(30,29,33)"],[19,5,"rgb(0,0,0)"],[20,5,"rgb(0,0,0)"],[21,5,"rgb(27,27,29)"],[22,5,"rgb(27,27,29)"],[23,5,"rgb(27,27,29)"],[24,5,"rgb(27,27,29)"],[25,5,"rgb(27,27,29)"],[26,5,"rgb(0,0,0)"],[27,5,"rgb(0,0,0)"],[5,6,"rgb(0,0,0)"],[6,6,"rgb(156,156,156)"],[7,6,"rgb(156,156,156)"],[8,6,"rgb(0,0,0)"],[9,6,"rgb(0,0,0)"],[10,6,"rgb(30,29,33)"],[11,6,"rgb(30,29,33)"],[12,6,"rgb(30,29,33)"],[13,6,"rgb(30,29,33)"],[14,6,"rgb(30,29,33)"],[15,6,"rgb(30,29,33)"],[16,6,"rgb(30,29,33)"],[17,6,"rgb(30,29,33)"],[18,6,"rgb(30,29,33)"],[19,6,"rgb(30,29,33)"],[20,6,"rgb(0,0,0)"],[21,6,"rgb(0,0,0)"],[22,6,"rgb(27,27,29)"],[23,6,"rgb(27,27,29)"],[24,6,"rgb(27,27,29)"],[25,6,"rgb(27,27,29)"],[26,6,"rgb(27,27,29)"],[27,6,"rgb(27,27,29)"],[28,6,"rgb(0,0,0)"],[5,7,"rgb(0,0,0)"],[6,7,"rgb(156,156,156)"],[7,7,"rgb(0,0,0)"],[8,7,"rgb(0,0,0)"],[9,7,"rgb(30,29,33)"],[10,7,"rgb(30,29,33)"],[11,7,"rgb(30,29,33)"],[12,7,"rgb(30,29,33)"],[13,7,"rgb(30,29,33)"],[14,7,"rgb(30,29,33)"],[15,7,"rgb(30,29,33)"],[16,7,"rgb(30,29,33)"],[17,7,"rgb(30,29,33)"],[18,7,"rgb(30,29,33)"],[19,7,"rgb(30,29,33)"],[20,7,"rgb(30,29,33)"],[21,7,"rgb(0,0,0)"],[22,7,"rgb(27,27,29)"],[23,7,"rgb(27,27,29)"],[24,7,"rgb(27,27,29)"],[25,7,"rgb(27,27,29)"],[26,7,"rgb(27,27,29)"],[27,7,"rgb(27,27,29)"],[28,7,"rgb(0,0,0)"],[4,8,"rgb(0,0,0)"],[5,8,"rgb(156,156,156)"],[6,8,"rgb(0,0,0)"],[7,8,"rgb(0,0,0)"],[8,8,"rgb(30,29,33)"],[9,8,"rgb(30,29,33)"],[10,8,"rgb(30,29,33)"],[11,8,"rgb(30,29,33)"],[12,8,"rgb(30,29,33)"],[13,8,"rgb(30,29,33)"],[14,8,"rgb(30,29,33)"],[15,8,"rgb(30,29,33)"],[16,8,"rgb(30,29,33)"],[17,8,"rgb(30,29,33)"],[18,8,"rgb(30,29,33)"],[19,8,"rgb(30,29,33)"],[20,8,"rgb(30,29,33)"],[21,8,"rgb(0,0,0)"],[22,8,"rgb(27,27,29)"],[23,8,"rgb(27,27,29)"],[24,8,"rgb(27,27,29)"],[25,8,"rgb(27,27,29)"],[26,8,"rgb(27,27,29)"],[27,8,"rgb(27,27,29)"],[28,8,"rgb(0,0,0)"],[4,9,"rgb(0,0,0)"],[5,9,"rgb(0,0,0)"],[6,9,"rgb(0,0,0)"],[7,9,"rgb(30,29,33)"],[8,9,"rgb(30,29,33)"],[9,9,"rgb(30,29,33)"],[10,9,"rgb(30,29,33)"],[11,9,"rgb(30,29,33)"],[12,9,"rgb(30,29,33)"],[13,9,"rgb(30,29,33)"],[14,9,"rgb(30,29,33)"],[15,9,"rgb(30,29,33)"],[16,9,"rgb(30,29,33)"],[17,9,"rgb(30,29,33)"],[18,9,"rgb(30,29,33)"],[19,9,"rgb(30,29,33)"],[20,9,"rgb(30,29,33)"],[21,9,"rgb(0,0,0)"],[22,9,"rgb(0,0,0)"],[23,9,"rgb(27,27,29)"],[24,9,"rgb(27,27,29)"],[25,9,"rgb(27,27,29)"],[26,9,"rgb(27,27,29)"],[27,9,"rgb(27,27,29)"],[28,9,"rgb(0,0,0)"],[29,9,"rgb(0,0,0)"],[4,10,"rgb(0,0,0)"],[5,10,"rgb(0,0,0)"],[6,10,"rgb(30,29,33)"],[7,10,"rgb(30,29,33)"],[8,10,"rgb(30,29,33)"],[9,10,"rgb(30,29,33)"],[10,10,"rgb(30,29,33)"],[11,10,"rgb(30,29,33)"],[12,10,"rgb(30,29,33)"],[13,10,"rgb(30,29,33)"],[14,10,"rgb(30,29,33)"],[15,10,"rgb(30,29,33)"],[16,10,"rgb(30,29,33)"],[17,10,"rgb(30,29,33)"],[18,10,"rgb(30,29,33)"],[19,10,"rgb(30,29,33)"],[20,10,"rgb(30,29,33)"],[21,10,"rgb(30,29,33)"],[22,10,"rgb(0,0,0)"],[23,10,"rgb(27,27,29)"],[24,10,"rgb(27,27,29)"],[25,10,"rgb(27,27,29)"],[26,10,"rgb(27,27,29)"],[27,10,"rgb(27,27,29)"],[28,10,"rgb(27,27,29)"],[29,10,"rgb(0,0,0)"],[30,10,"rgb(0,0,0)"],[4,11,"rgb(0,0,0)"],[5,11,"rgb(0,0,0)"],[6,11,"rgb(30,29,33)"],[7,11,"rgb(30,29,33)"],[8,11,"rgb(30,29,33)"],[9,11,"rgb(30,29,33)"],[10,11,"rgb(30,29,33)"],[11,11,"rgb(30,29,33)"],[12,11,"rgb(30,29,33)"],[13,11,"rgb(0,0,0)"],[14,11,"rgb(0,0,0)"],[15,11,"rgb(30,29,33)"],[16,11,"rgb(30,29,33)"],[17,11,"rgb(30,29,33)"],[18,11,"rgb(30,29,33)"],[19,11,"rgb(30,29,33)"],[20,11,"rgb(30,29,33)"],[21,11,"rgb(30,29,33)"],[22,11,"rgb(0,0,0)"],[23,11,"rgb(0,0,0)"],[24,11,"rgb(0,0,0)"],[25,11,"rgb(27,27,29)"],[26,11,"rgb(27,27,29)"],[27,11,"rgb(27,27,29)"],[28,11,"rgb(0,0,0)"],[29,11,"rgb(0,0,0)"],[30,11,"rgb(0,0,0)"],[3,12,"rgb(0,0,0)"],[4,12,"rgb(30,29,33)"],[5,12,"rgb(30,29,33)"],[6,12,"rgb(30,29,33)"],[7,12,"rgb(30,29,33)"],[8,12,"rgb(30,29,33)"],[9,12,"rgb(30,29,33)"],[10,12,"rgb(30,29,33)"],[11,12,"rgb(30,29,33)"],[12,12,"rgb(0,0,0)"],[13,12,"rgb(0,0,0)"],[14,12,"rgb(30,29,33)"],[15,12,"rgb(30,29,33)"],[16,12,"rgb(30,29,33)"],[17,12,"rgb(30,29,33)"],[18,12,"rgb(30,29,33)"],[19,12,"rgb(30,29,33)"],[20,12,"rgb(30,29,33)"],[21,12,"rgb(30,29,33)"],[22,12,"rgb(30,29,33)"],[23,12,"rgb(30,29,33)"],[24,12,"rgb(0,0,0)"],[25,12,"rgb(0,0,0)"],[26,12,"rgb(0,0,0)"],[27,12,"rgb(0,0,0)"],[28,12,"rgb(0,0,0)"],[4,13,"rgb(0,0,0)"],[5,13,"rgb(30,29,33)"],[6,13,"rgb(30,29,33)"],[7,13,"rgb(30,29,33)"],[8,13,"rgb(30,29,33)"],[9,13,"rgb(30,29,33)"],[10,13,"rgb(30,29,33)"],[11,13,"rgb(0,0,0)"],[12,13,"rgb(0,0,0)"],[13,13,"rgb(0,0,0)"],[14,13,"rgb(30,29,33)"],[15,13,"rgb(30,29,33)"],[16,13,"rgb(30,29,33)"],[17,13,"rgb(30,29,33)"],[18,13,"rgb(30,29,33)"],[19,13,"rgb(30,29,33)"],[20,13,"rgb(30,29,33)"],[21,13,"rgb(30,29,33)"],[22,13,"rgb(30,29,33)"],[23,13,"rgb(30,29,33)"],[24,13,"rgb(30,29,33)"],[25,13,"rgb(30,29,33)"],[26,13,"rgb(0,0,0)"],[27,13,"rgb(0,0,0)"],[4,14,"rgb(0,0,0)"],[5,14,"rgb(30,29,33)"],[6,14,"rgb(30,29,33)"],[7,14,"rgb(30,29,33)"],[8,14,"rgb(30,29,33)"],[9,14,"rgb(30,29,33)"],[10,14,"rgb(0,0,0)"],[11,14,"rgb(0,0,0)"],[12,14,"rgb(0,0,0)"],[13,14,"rgb(0,0,0)"],[14,14,"rgb(0,0,0)"],[15,14,"rgb(30,29,33)"],[16,14,"rgb(30,29,33)"],[17,14,"rgb(30,29,33)"],[18,14,"rgb(30,29,33)"],[19,14,"rgb(30,29,33)"],[20,14,"rgb(30,29,33)"],[21,14,"rgb(30,29,33)"],[22,14,"rgb(30,29,33)"],[23,14,"rgb(30,29,33)"],[24,14,"rgb(30,29,33)"],[25,14,"rgb(30,29,33)"],[26,14,"rgb(30,29,33)"],[27,14,"rgb(0,0,0)"],[4,15,"rgb(0,0,0)"],[5,15,"rgb(30,29,33)"],[6,15,"rgb(30,29,33)"],[7,15,"rgb(30,29,33)"],[8,15,"rgb(30,29,33)"],[9,15,"rgb(0,0,0)"],[10,15,"rgb(0,0,0)"],[11,15,"rgb(0,0,0)"],[12,15,"rgb(235,219,209)"],[13,15,"rgb(0,0,0)"],[14,15,"rgb(0,0,0)"],[15,15,"rgb(30,29,33)"],[16,15,"rgb(30,29,33)"],[17,15,"rgb(30,29,33)"],[18,15,"rgb(30,29,33)"],[19,15,"rgb(30,29,33)"],[20,15,"rgb(30,29,33)"],[21,15,"rgb(30,29,33)"],[22,15,"rgb(30,29,33)"],[23,15,"rgb(30,29,33)"],[24,15,"rgb(30,29,33)"],[25,15,"rgb(30,29,33)"],[26,15,"rgb(30,29,33)"],[27,15,"rgb(0,0,0)"],[28,15,"rgb(0,0,0)"],[3,16,"rgb(0,0,0)"],[4,16,"rgb(30,29,33)"],[5,16,"rgb(30,29,33)"],[6,16,"rgb(30,29,33)"],[7,16,"rgb(30,29,33)"],[8,16,"rgb(30,29,33)"],[9,16,"rgb(0,0,0)"],[10,16,"rgb(0,0,0)"],[11,16,"rgb(235,219,209)"],[12,16,"rgb(252,239,231)"],[13,16,"rgb(235,219,209)"],[14,16,"rgb(0,0,0)"],[15,16,"rgb(0,0,0)"],[16,16,"rgb(30,29,33)"],[17,16,"rgb(30,29,33)"],[18,16,"rgb(30,29,33)"],[19,16,"rgb(30,29,33)"],[20,16,"rgb(30,29,33)"],[21,16,"rgb(30,29,33)"],[22,16,"rgb(30,29,33)"],[23,16,"rgb(30,29,33)"],[24,16,"rgb(30,29,33)"],[25,16,"rgb(30,29,33)"],[26,16,"rgb(30,29,33)"],[27,16,"rgb(30,29,33)"],[28,16,"rgb(0,0,0)"],[4,17,"rgb(0,0,0)"],[5,17,"rgb(30,29,33)"],[6,17,"rgb(30,29,33)"],[7,17,"rgb(30,29,33)"],[8,17,"rgb(0,0,0)"],[9,17,"rgb(0,0,0)"],[10,17,"rgb(235,219,209)"],[11,17,"rgb(252,239,231)"],[12,17,"rgb(252,239,231)"],[13,17,"rgb(252,239,231)"],[14,17,"rgb(235,219,209)"],[15,17,"rgb(0,0,0)"],[16,17,"rgb(0,0,0)"],[17,17,"rgb(30,29,33)"],[18,17,"rgb(30,29,33)"],[19,17,"rgb(30,29,33)"],[20,17,"rgb(30,29,33)"],[21,17,"rgb(30,29,33)"],[22,17,"rgb(30,29,33)"],[23,17,"rgb(30,29,33)"],[24,17,"rgb(30,29,33)"],[25,17,"rgb(0,0,0)"],[26,17,"rgb(30,29,33)"],[27,17,"rgb(30,29,33)"],[28,17,"rgb(30,29,33)"],[29,17,"rgb(0,0,0)"],[4,18,"rgb(0,0,0)"],[5,18,"rgb(30,29,33)"],[6,18,"rgb(0,0,0)"],[7,18,"rgb(30,29,33)"],[8,18,"rgb(0,0,0)"],[9,18,"rgb(0,0,0)"],[10,18,"rgb(0,0,0)"],[11,18,"rgb(0,0,0)"],[12,18,"rgb(0,0,0)"],[13,18,"rgb(0,0,0)"],[14,18,"rgb(252,239,231)"],[15,18,"rgb(252,239,231)"],[16,18,"rgb(0,0,0)"],[17,18,"rgb(0,0,0)"],[18,18,"rgb(30,29,33)"],[19,18,"rgb(0,0,0)"],[20,18,"rgb(0,0,0)"],[21,18,"rgb(30,29,33)"],[22,18,"rgb(30,29,33)"],[23,18,"rgb(30,29,33)"],[24,18,"rgb(30,29,33)"],[25,18,"rgb(0,0,0)"],[26,18,"rgb(41,40,43)"],[27,18,"rgb(0,0,0)"],[28,18,"rgb(0,0,0)"],[29,18,"rgb(0,0,0)"],[4,19,"rgb(0,0,0)"],[5,19,"rgb(0,0,0)"],[6,19,"rgb(0,0,0)"],[7,19,"rgb(30,29,33)"],[8,19,"rgb(0,0,0)"],[9,19,"rgb(0,0,0)"],[10,19,"rgb(235,219,209)"],[11,19,"rgb(44,35,27)"],[12,19,"rgb(44,35,27)"],[13,19,"rgb(44,35,27)"],[14,19,"rgb(252,239,231)"],[15,19,"rgb(252,239,231)"],[16,19,"rgb(252,239,231)"],[17,19,"rgb(0,0,0)"],[18,19,"rgb(0,0,0)"],[19,19,"rgb(0,0,0)"],[20,19,"rgb(0,0,0)"],[21,19,"rgb(0,0,0)"],[22,19,"rgb(0,0,0)"],[23,19,"rgb(41,40,43)"],[24,19,"rgb(41,40,43)"],[25,19,"rgb(0,0,0)"],[26,19,"rgb(0,0,0)"],[27,19,"rgb(0,0,0)"],[5,20,"rgb(0,0,0)"],[6,20,"rgb(0,0,0)"],[7,20,"rgb(41,40,43)"],[8,20,"rgb(0,0,0)"],[9,20,"rgb(0,0,0)"],[10,20,"rgb(235,219,209)"],[11,20,"rgb(44,35,27)"],[12,20,"rgb(44,35,27)"],[13,20,"rgb(44,35,27)"],[14,20,"rgb(252,239,231)"],[15,20,"rgb(252,239,231)"],[16,20,"rgb(252,239,231)"],[17,20,"rgb(252,239,231)"],[18,20,"rgb(252,239,231)"],[19,20,"rgb(44,35,27)"],[20,20,"rgb(44,35,27)"],[21,20,"rgb(0,0,0)"],[22,20,"rgb(235,219,209)"],[23,20,"rgb(0,0,0)"],[24,20,"rgb(41,40,43)"],[25,20,"rgb(0,0,0)"],[26,20,"rgb(0,0,0)"],[6,21,"rgb(0,0,0)"],[7,21,"rgb(235,219,209)"],[8,21,"rgb(41,40,43)"],[9,21,"rgb(0,0,0)"],[10,21,"rgb(235,219,209)"],[11,21,"rgb(81,66,53)"],[12,21,"rgb(81,66,53)"],[13,21,"rgb(81,66,53)"],[14,21,"rgb(252,239,231)"],[15,21,"rgb(252,239,231)"],[16,21,"rgb(252,239,231)"],[17,21,"rgb(252,239,231)"],[18,21,"rgb(252,239,231)"],[19,21,"rgb(81,66,53)"],[20,21,"rgb(81,66,53)"],[21,21,"rgb(81,66,53)"],[22,21,"rgb(0,0,0)"],[23,21,"rgb(0,0,0)"],[24,21,"rgb(41,40,43)"],[25,21,"rgb(0,0,0)"],[7,22,"rgb(0,0,0)"],[8,22,"rgb(0,0,0)"],[9,22,"rgb(0,0,0)"],[10,22,"rgb(0,0,0)"],[11,22,"rgb(255,199,186)"],[12,22,"rgb(255,199,186)"],[13,22,"rgb(255,199,186)"],[14,22,"rgb(252,239,231)"],[15,22,"rgb(252,239,231)"],[16,22,"rgb(252,239,231)"],[17,22,"rgb(252,239,231)"],[18,22,"rgb(252,239,231)"],[19,22,"rgb(255,199,186)"],[20,22,"rgb(255,199,186)"],[21,22,"rgb(0,0,0)"],[22,22,"rgb(0,0,0)"],[23,22,"rgb(41,40,43)"],[24,22,"rgb(0,0,0)"],[25,22,"rgb(0,0,0)"],[8,23,"rgb(0,0,0)"],[9,23,"rgb(0,0,0)"],[10,23,"rgb(0,0,0)"],[11,23,"rgb(0,0,0)"],[12,23,"rgb(0,0,0)"],[13,23,"rgb(0,0,0)"],[14,23,"rgb(0,0,0)"],[15,23,"rgb(192,192,192)"],[16,23,"rgb(235,219,209)"],[17,23,"rgb(192,192,192)"],[18,23,"rgb(0,0,0)"],[19,23,"rgb(0,0,0)"],[20,23,"rgb(0,0,0)"],[21,23,"rgb(0,0,0)"],[22,23,"rgb(0,0,0)"],[23,23,"rgb(0,0,0)"],[24,23,"rgb(0,0,0)"],[12,24,"rgb(0,0,0)"],[13,24,"rgb(0,0,0)"],[14,24,"rgb(54,51,61)"],[15,24,"rgb(192,192,192)"],[16,24,"rgb(54,51,61)"],[17,24,"rgb(192,192,192)"],[18,24,"rgb(54,51,61)"],[19,24,"rgb(0,0,0)"],[20,24,"rgb(0,0,0)"],[23,24,"rgb(0,0,0)"],[11,25,"rgb(0,0,0)"],[12,25,"rgb(0,0,0)"],[13,25,"rgb(54,51,61)"],[14,25,"rgb(54,51,61)"],[15,25,"rgb(192,192,192)"],[16,25,"rgb(0,0,0)"],[17,25,"rgb(192,192,192)"],[18,25,"rgb(54,51,61)"],[19,25,"rgb(54,51,61)"],[20,25,"rgb(0,0,0)"],[21,25,"rgb(0,0,0)"],[11,26,"rgb(0,0,0)"],[12,26,"rgb(54,51,61)"],[13,26,"rgb(54,51,61)"],[14,26,"rgb(54,51,61)"],[15,26,"rgb(192,192,192)"],[16,26,"rgb(54,51,61)"],[17,26,"rgb(192,192,192)"],[18,26,"rgb(54,51,61)"],[19,26,"rgb(54,51,61)"],[20,26,"rgb(54,51,61)"],[21,26,"rgb(0,0,0)"],[11,27,"rgb(235,219,209)"],[12,27,"rgb(54,51,61)"],[13,27,"rgb(54,51,61)"],[14,27,"rgb(54,51,61)"],[15,27,"rgb(192,192,192)"],[16,27,"rgb(54,51,61)"],[17,27,"rgb(192,192,192)"],[18,27,"rgb(54,51,61)"],[19,27,"rgb(54,51,61)"],[20,27,"rgb(54,51,61)"],[21,27,"rgb(235,219,209)"],[11,28,"rgb(0,0,0)"],[12,28,"rgb(0,0,0)"],[13,28,"rgb(54,51,61)"],[14,28,"rgb(54,51,61)"],[15,28,"rgb(192,192,192)"],[16,28,"rgb(54,51,61)"],[17,28,"rgb(192,192,192)"],[18,28,"rgb(54,51,61)"],[19,28,"rgb(54,51,61)"],[20,28,"rgb(0,0,0)"],[21,28,"rgb(0,0,0)"],[12,29,"rgb(0,0,0)"],[13,29,"rgb(54,51,61)"],[14,29,"rgb(54,51,61)"],[15,29,"rgb(54,51,61)"],[16,29,"rgb(27,27,29)"],[17,29,"rgb(54,51,61)"],[18,29,"rgb(54,51,61)"],[19,29,"rgb(54,51,61)"],[20,29,"rgb(0,0,0)"],[12,30,"rgb(0,0,0)"],[13,30,"rgb(81,66,53)"],[14,30,"rgb(81,66,53)"],[15,30,"rgb(0,0,0)"],[16,30,"rgb(0,0,0)"],[17,30,"rgb(0,0,0)"],[18,30,"rgb(81,66,53)"],[19,30,"rgb(81,66,53)"],[20,30,"rgb(0,0,0)"],[12,31,"rgb(0,0,0)"],[13,31,"rgb(0,0,0)"],[14,31,"rgb(0,0,0)"],[15,31,"rgb(0,0,0)"],[17,31,"rgb(0,0,0)"],[18,31,"rgb(0,0,0)"],[19,31,"rgb(0,0,0)"],[20,31,"rgb(0,0,0)"]];

function WeatherParticles({ weather }) {
  const particles = useMemo(() => {
    if (weather !== "rain" && weather !== "snow") return [];
    return Array.from({ length: weather==="rain"?28:18 }, () => ({
      left: Math.random()*100, delay: Math.random()*3,
      duration: 1.2+Math.random()*1.8, size: weather==="rain"?1+Math.random():4+Math.random()*4,
    }));
  }, [weather]);
  if (!particles.length) return null;
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:5}}>
      {particles.map((p,i)=>(
        <div key={i} style={{position:"absolute",left:`${p.left}%`,top:"-12px",width:`${p.size}px`,height:weather==="rain"?`${p.size*7}px`:`${p.size}px`,background:weather==="rain"?"rgba(130,170,255,0.55)":"rgba(255,255,255,0.9)",borderRadius:weather==="snow"?"50%":"1px",animation:`fall ${p.duration}s linear ${p.delay}s infinite`}}/>
      ))}
    </div>
  );
}

function HeartBurst({ x, y, onDone }) {
  const items = useMemo(()=>["❤️","💕","✨","❤️","💖"].map(e=>({e,dx:(Math.random()-0.5)*90,dy:-25-Math.random()*65})),[]);
  useEffect(()=>{const t=setTimeout(onDone,1300);return()=>clearTimeout(t);},[onDone]);
  return (
    <div style={{position:"absolute",left:x-30,top:y-30,width:60,height:60,pointerEvents:"none",zIndex:50}}>
      {items.map(({e,dx,dy},i)=>(
        <span key={i} style={{position:"absolute",fontSize:16,left:"50%",top:"50%",animation:`heart_${i} 1.3s ease-out forwards`,["--dx"]:`${dx}px`,["--dy"]:`${dy}px`}}>{e}</span>
      ))}
    </div>
  );
}

function Char({ state, isNight, lampOn }) {
  const [blink, setBlink] = useState(false);
  useEffect(()=>{
    if(state==="sleeping") return;
    const t=setInterval(()=>{setBlink(true);setTimeout(()=>setBlink(false),140);},(2800+Math.random()*2000));
    return()=>clearInterval(t);
  },[state]);

  const isSleep = state==="sleeping";
  const isHappy = state==="happy"||state==="hug";
  const isBlush = state==="blushing"||state==="kiss";

  const eyeOverlay = (blink||isSleep) ? (
    <>
      <rect x="10" y="19" width="4" height="3" fill="rgb(252,239,231)"/>
      <rect x="19" y="19" width="3" height="3" fill="rgb(252,239,231)"/>
      <rect x="10" y="20" width="4" height="1" fill="rgb(44,35,27)"/>
      <rect x="19" y="20" width="3" height="1" fill="rgb(44,35,27)"/>
    </>
  ) : null;

  const blushOverlay = isBlush ? (
    <>
      <rect x="11" y="22" width="3" height="2" fill="rgba(255,120,120,0.5)"/>
      <rect x="19" y="22" width="3" height="2" fill="rgba(255,120,120,0.5)"/>
    </>
  ) : null;

  const mouthOverlay = isHappy ? (
    <>
      <rect x="14" y="23" width="1" height="1" fill="rgb(192,192,192)"/>
      <rect x="17" y="23" width="1" height="1" fill="rgb(192,192,192)"/>
      <rect x="15" y="24" width="3" height="1" fill="rgb(192,192,192)"/>
    </>
  ) : null;

  const brightness = (!lampOn && isNight) ? "brightness(0.38)" : "brightness(1)";

  return (
    <svg viewBox="2 -1 28 33" style={{
      width:100, height:120,
      imageRendering:"pixelated",
      filter: brightness,
      transition:"filter 0.8s, transform 0.3s",
      transform: isHappy?"translateY(-6px)":"none",
      cursor:"pointer", overflow:"visible",
    }}>
      {PX.map(([x,y,fill],i)=><rect key={i} x={x} y={y} width="1" height="1" fill={fill}/>)}
      {eyeOverlay}
      {blushOverlay}
      {mouthOverlay}
      {isSleep && <>
        <text x="25" y="12" style={{fontSize:"3px",fill:"#a0aec0",animation:"zzz 2s linear infinite"}}>z</text>
        <text x="27" y="9"  style={{fontSize:"4px",fill:"#a0aec0",animation:"zzz 2s 0.6s linear infinite"}}>z</text>
      </>}
    </svg>
  );
}

function Sofa({ isNight, floorHeight }) {
  const baseColor = isNight ? "#3a4a6a" : "#6b8cae";
  const shadowColor = isNight ? "#2a3a5a" : "#5a7b9d";
  const armColor = isNight ? "#4a5a7a" : "#7b9cbe";
  return (
    <div style={{position:"absolute",bottom:floorHeight,left:"7.7%",width:"61.5%",height:55,zIndex:15}}>
      <div style={{position:"absolute",bottom:0,left:20,right:20,height:36,background:baseColor,borderRadius:"8px 8px 4px 4px",boxShadow:`inset 0 -8px 0 ${shadowColor}`}}/>
      <div style={{position:"absolute",bottom:0,left:0,width:26,height:45,background:armColor,borderRadius:"10px 10px 4px 4px",boxShadow:`inset -4px 0 0 ${shadowColor}`}}/>
      <div style={{position:"absolute",bottom:0,right:0,width:26,height:45,background:armColor,borderRadius:"10px 10px 4px 4px",boxShadow:`inset 4px 0 0 ${shadowColor}`}}/>
      <div style={{position:"absolute",bottom:12,left:45,right:45,height:2,background:shadowColor,opacity:0.5}}/>
      <div style={{position:"absolute",bottom:20,left:35,width:28,height:22,background:isNight?"#e8d4a8":"#f5e6c8",borderRadius:6,transform:"rotate(-8deg)"}}/>
      <div style={{position:"absolute",bottom:18,right:35,width:28,height:22,background:isNight?"#d4a8a8":"#f5c8c8",borderRadius:6,transform:"rotate(8deg)"}}/>
    </div>
  );
}

function GlassButton({ children, onClick, style = {}, small = false }) {
  return (
    <button onClick={onClick} style={{
      padding: small ? "10px 20px" : "16px 40px",
      fontSize: small ? 13 : 15,
      fontFamily: "'Noto Serif SC', serif",
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "2px solid rgba(255,215,140,0.5)",
      borderRadius: 30,
      color: "rgba(255,235,200,0.95)",
      cursor: "pointer",
      boxShadow: "0 0 25px rgba(255,200,100,0.25), inset 0 0 20px rgba(255,215,140,0.08)",
      transition: "all 0.25s ease",
      ...style
    }}>
      {children}
    </button>
  );
}

function PomodoroOverlay({ onClose, onComplete, isNight, records, setRecords }) {
  const [phase, setPhase] = useState("select");
  const [mode, setMode] = useState(null);
  const [subject, setSubject] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [customMin, setCustomMin] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [showRecords, setShowRecords] = useState(false);
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  const [pendingCountUp, setPendingCountUp] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback((seconds, isCountUp, subj) => {
    setMode(isCountUp ? "up" : "down");
    setSubject(subj);
    setTotalSeconds(seconds);
    setElapsed(0);
    setIsPaused(false);
    setPhase("running");
  }, []);

  useEffect(() => {
    if (phase !== "running" || isPaused) return;
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1;
        if (mode === "down" && next >= totalSeconds) {
          clearInterval(timerRef.current);
          const record = { subject, duration: totalSeconds, date: new Date().toLocaleString("zh") };
          const newRecords = [...records, record];
          setRecords(newRecords);
          try { localStorage.setItem("pomodoro_records", JSON.stringify(newRecords)); } catch {}
          onComplete();
          return next;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, isPaused, mode, totalSeconds, onComplete, subject, records, setRecords]);

  const handleManualEnd = () => {
    clearInterval(timerRef.current);
    if (elapsed > 60) {
      const record = { subject, duration: elapsed, date: new Date().toLocaleString("zh") };
      const newRecords = [...records, record];
      setRecords(newRecords);
      try { localStorage.setItem("pomodoro_records", JSON.stringify(newRecords)); } catch {}
    }
    onClose();
  };

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
    return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  const formatDuration = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h > 0) return `${h}小时${m}分钟`;
    return `${m}分钟`;
  };

  const displayTime = mode === "up" ? elapsed : Math.max(0, totalSeconds - elapsed);
  const progress = mode === "down" && totalSeconds > 0 ? elapsed / totalSeconds : 0;

  const handleCustomSubmit = () => {
    const mins = parseInt(customMin);
    if (mins > 0) setPhase("subject_select_custom");
  };

  const handleCustomSubjectSubmit = () => {
    const subj = customSubject.trim() || "其他";
    if (pendingCountUp) {
      startTimer(0, true, subj);
    } else {
      const secs = phase === "subject_select_custom" ? parseInt(customMin) * 60 : totalSeconds;
      startTimer(secs, false, subj);
    }
    setShowCustomSubject(false);
    setCustomSubject("");
    setPendingCountUp(false);
  };

  const clearRecords = () => {
    setRecords([]);
    try { localStorage.removeItem("pomodoro_records"); } catch {}
  };

  if (showRecords) {
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:60,zIndex:100,overflowY:"auto"}}>
        <div style={{width:"90%",maxWidth:340}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{color:"rgba(255,235,200,0.95)",fontSize:18,fontFamily:"'Noto Serif SC', serif"}}>📄 专注档案</div>
            <button onClick={()=>setShowRecords(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",fontSize:24,cursor:"pointer"}}>×</button>
          </div>
          {records.length===0 ? (
            <div style={{color:"rgba(255,255,255,0.5)",textAlign:"center",padding:40,fontFamily:"'Noto Serif SC', serif"}}>还没有专注记录</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {records.slice().reverse().map((r,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 16px",borderLeft:"3px solid rgba(255,215,140,0.6)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{color:"rgba(255,235,200,0.95)",fontSize:14,fontFamily:"'Noto Serif SC', serif"}}>{r.subject}</span>
                    <span style={{color:"rgba(255,215,140,0.8)",fontSize:13}}>{formatDuration(r.duration)}</span>
                  </div>
                  <div style={{color:"rgba(255,255,255,0.4)",fontSize:11,marginTop:4}}>{r.date}</div>
                </div>
              ))}
            </div>
          )}
          {records.length>0 && (
            <button onClick={clearRecords} style={{marginTop:20,background:"rgba(255,100,100,0.15)",border:"1px solid rgba(255,150,150,0.3)",borderRadius:8,padding:"8px 16px",color:"rgba(255,200,200,0.8)",fontSize:12,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>清空所有记录</button>
          )}
        </div>
      </div>
    );
  }

  if (showCustomSubject) {
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:100}}>
        <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>
          <div style={{color:"rgba(255,235,200,0.9)",fontSize:14,marginBottom:8,fontFamily:"'Noto Serif SC', serif"}}>输入科目名称</div>
          <input type="text" value={customSubject} onChange={e=>setCustomSubject(e.target.value)} placeholder="例如: 物理" style={{width:160,padding:"12px 16px",fontSize:16,textAlign:"center",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,215,140,0.4)",borderRadius:16,color:"rgba(255,235,200,0.95)",outline:"none",fontFamily:"'Noto Serif SC', serif"}}/>
          <GlassButton onClick={handleCustomSubjectSubmit} style={{marginTop:10}}>开始</GlassButton>
          <button onClick={()=>{setShowCustomSubject(false);setCustomSubject("");setPendingCountUp(false);}} style={{marginTop:10,background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>返回</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:100}}>
      {phase !== "running" && (
        <button onClick={()=>setShowRecords(true)} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,215,140,0.4)",borderRadius:12,padding:"8px 14px",color:"rgba(255,235,200,0.9)",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          📄 <span style={{fontSize:12}}>{records.length}</span>
        </button>
      )}

      {phase === "select" && (
        <div style={{display:"flex",flexDirection:"column",gap:20,alignItems:"center"}}>
          <GlassButton onClick={()=>setPhase("subject_select_up")}>⏱️ 正计时</GlassButton>
          <GlassButton onClick={()=>setPhase("countdown_select")}>⏳ 倒计时</GlassButton>
          <button onClick={onClose} style={{marginTop:30,background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>取消</button>
        </div>
      )}

      {phase === "subject_select_up" && (
        <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
          <div style={{color:"rgba(255,235,200,0.9)",fontSize:14,marginBottom:8,fontFamily:"'Noto Serif SC', serif"}}>选择科目</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",maxWidth:280}}>
            {SUBJECTS.map(s=>(<GlassButton key={s} small onClick={()=>startTimer(0,true,s)}>{s}</GlassButton>))}
            <GlassButton small onClick={()=>{setPendingCountUp(true);setShowCustomSubject(true);}}>其他</GlassButton>
          </div>
          <button onClick={()=>setPhase("select")} style={{marginTop:20,background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>返回</button>
        </div>
      )}

      {phase === "countdown_select" && (
        <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>
          <GlassButton onClick={()=>{setTotalSeconds(45*60);setPhase("subject_select_down");}}>45 分钟</GlassButton>
          <GlassButton onClick={()=>{setTotalSeconds(60*60);setPhase("subject_select_down");}}>60 分钟</GlassButton>
          <GlassButton onClick={()=>setPhase("custom_input")}>自定义</GlassButton>
          <button onClick={()=>setPhase("select")} style={{marginTop:20,background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>返回</button>
        </div>
      )}

      {phase === "custom_input" && (
        <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>
          <div style={{color:"rgba(255,235,200,0.9)",fontSize:14,marginBottom:8,fontFamily:"'Noto Serif SC', serif"}}>输入分钟数</div>
          <input type="number" value={customMin} onChange={e=>setCustomMin(e.target.value)} placeholder="例如: 25" style={{width:120,padding:"12px 16px",fontSize:18,textAlign:"center",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,215,140,0.4)",borderRadius:16,color:"rgba(255,235,200,0.95)",outline:"none",fontFamily:"'Noto Serif SC', serif"}}/>
          <GlassButton onClick={handleCustomSubmit} style={{marginTop:10}}>下一步</GlassButton>
          <button onClick={()=>setPhase("countdown_select")} style={{marginTop:10,background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>返回</button>
        </div>
      )}

      {(phase === "subject_select_down" || phase === "subject_select_custom") && (
        <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
          <div style={{color:"rgba(255,235,200,0.9)",fontSize:14,marginBottom:8,fontFamily:"'Noto Serif SC', serif"}}>选择科目</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",maxWidth:280}}>
            {SUBJECTS.map(s=>(<GlassButton key={s} small onClick={()=>{const secs=phase==="subject_select_custom"?parseInt(customMin)*60:totalSeconds;startTimer(secs,false,s);}}>{s}</GlassButton>))}
            <GlassButton small onClick={()=>{setPendingCountUp(false);setShowCustomSubject(true);}}>其他</GlassButton>
          </div>
          <button onClick={()=>setPhase(phase==="subject_select_custom"?"custom_input":"countdown_select")} style={{marginTop:20,background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>返回</button>
        </div>
      )}

      {phase === "running" && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
          <div style={{color:"rgba(255,215,140,0.9)",fontSize:18,fontFamily:"'Noto Serif SC', serif",letterSpacing:2}}>{subject}</div>
          <div style={{position:"relative",width:200,height:200}}>
            <svg width="200" height="200" style={{transform:"rotate(-90deg)"}}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,215,140,0.15)" strokeWidth="6"/>
              {mode==="down" && (<circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,215,140,0.7)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2*Math.PI*90}`} strokeDashoffset={`${2*Math.PI*90*(1-progress)}`} style={{transition:"stroke-dashoffset 0.3s ease",filter:"drop-shadow(0 0 8px rgba(255,200,100,0.5))"}}/>)}
              {mode==="up" && (<circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,215,140,0.5)" strokeWidth="4" style={{animation:"pulse 2s ease-in-out infinite"}}/>)}
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,fontWeight:300,color:"rgba(255,235,200,0.95)",fontFamily:"'Noto Serif SC', serif",letterSpacing:3}}>{formatTime(displayTime)}</div>
          </div>
          <div style={{display:"flex",gap:16}}>
            <button onClick={()=>setIsPaused(p=>!p)} style={{padding:"10px 22px",fontSize:13,background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,215,140,0.4)",borderRadius:20,color:"rgba(255,235,200,0.9)",cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>{isPaused?"▶ 继续":"⏸ 暂停"}</button>
            <button onClick={handleManualEnd} style={{padding:"10px 22px",fontSize:13,background:"rgba(255,100,100,0.15)",border:"1.5px solid rgba(255,150,150,0.4)",borderRadius:20,color:"rgba(255,200,200,0.9)",cursor:"pointer",fontFamily:"'Noto Serif SC', serif"}}>✕ 结束</button>
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"'Noto Serif SC', serif"}}>{mode==="up"?"正计时中":"专注中……"}</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState("sunny");
  const [lampOn, setLampOn] = useState(true);
  const [state, setState] = useState("idle");
  const [aff, setAff] = useState(()=>{try{return parseInt(localStorage.getItem("aff"))||0}catch{return 0}});
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [plantWater, setPlant] = useState(65);
  const [shelfText, setShelf] = useState("");
  const [showShelf, setShowShelf] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState(()=>{try{return JSON.parse(localStorage.getItem("notes"))||[]}catch{return []}});
  const [hearts, setHearts] = useState([]);
  const [hid, setHid] = useState(0);
  const [song, setSong] = useState(SONGS[0]);
  const [playing, setPlaying] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroRecords, setPomodoroRecords] = useState(()=>{try{return JSON.parse(localStorage.getItem("pomodoro_records"))||[]}catch{return []}});
  const msgTimer = useRef(null);
  const roomRef = useRef(null);

  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);

  const h=now.getHours();
  const isNight=h<6||h>=20;
  const defaultState=h<6||h>=23?"sleeping":h>=9&&h<17?"reading":"idle";
  useEffect(()=>{setState(defaultState);},[h]);

  const flash=useCallback((text)=>{setMsg(text);setShowMsg(true);if(msgTimer.current)clearTimeout(msgTimer.current);msgTimer.current=setTimeout(()=>setShowMsg(false),3800);},[]);
  const addAff=useCallback((n)=>{setAff(p=>{const next=Math.min(100,p+n);try{localStorage.setItem("aff",String(next));}catch{}return next;});},[]);
  const burst=useCallback((e)=>{const rect=roomRef.current?.getBoundingClientRect();if(!rect)return;const id=hid+1;setHid(id);setHearts(p=>[...p,{id,x:e.clientX-rect.left,y:e.clientY-rect.top}]);},[hid]);
  const removeHeart=useCallback((id)=>setHearts(p=>p.filter(h=>h.id!==id)),[]);

  const interact=useCallback((type,e)=>{
    const reset=()=>setState(defaultState);burst(e);
    switch(type){
      case"poke":setState("happy");addAff(2);flash(pick(D.poke));setTimeout(reset,2200);break;
      case"kiss":setState("blushing");addAff(5);flash(pick(D.kiss));burst(e);setTimeout(reset,2800);break;
      case"hug":setState("hug");addAff(4);flash(pick(D.hug));setTimeout(reset,2200);break;
      case"feed":setState("happy");addAff(3);flash(pick(D.feed));setTimeout(reset,2200);break;
      case"name":setState("happy");addAff(1);flash(aff>50?pick(D.highAff):pick(D.name));setTimeout(reset,2200);break;
    }
  },[burst,addAff,flash,defaultState,aff]);

  const handlePomodoroComplete = useCallback(() => {
    setShowPomodoro(false);
    flash(pick(D.timerDone));
    addAff(3);
    setState("blushing");
    setTimeout(() => setState(defaultState), 3000);
  }, [flash, addAff, defaultState]);

  const weathers=["sunny","cloudy","rain","snow"];
  const wIcons={sunny:"☀️",cloudy:"☁️",rain:"🌧️",snow:"❄️"};
  const toggleWeather=()=>{const nxt=weathers[(weathers.indexOf(weather)+1)%weathers.length];setWeather(nxt);if(nxt==="rain")flash(pick(D.rain));if(nxt==="snow")flash(pick(D.snow));};
  const toggleLamp=()=>{setLampOn(p=>{flash(pick(p?D.lamp_off:D.lamp_on));return!p;});};
  const waterPlant=()=>{setPlant(p=>Math.min(100,p+30));addAff(1);flash(pick(D.water));};
  const openShelf=()=>{setShelf(pick(D.shelf));setShowShelf(true);};
  const toggleMusic=()=>{setPlaying(p=>!p);flash(playing?"……":pick(D.music));};
  const nextSong=()=>{setSong(SONGS[(SONGS.indexOf(song)+1)%SONGS.length]);flash(pick(D.music));};
  const addNote=()=>{if(!noteInput.trim())return;const nn=[...notes,{t:noteInput.trim(),d:now.toLocaleString("zh")}];setNotes(nn);setNoteInput("");try{localStorage.setItem("notes",JSON.stringify(nn));}catch{}};
  const delNote=(i)=>{const nn=notes.filter((_,j)=>j!==i);setNotes(nn);try{localStorage.setItem("notes",JSON.stringify(nn));}catch{}};

  const hearts10=Math.floor(aff/10);
  const timeStr=now.toLocaleTimeString("zh",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const dateStr=now.toLocaleDateString("zh",{month:"long",day:"numeric",weekday:"short"});
  const bg=isNight?"linear-gradient(180deg,#0d1117 0%,#161b2c 60%,#1e2340 100%)":"linear-gradient(180deg,#e8e0d5 0%,#ddd5c8 100%)";
  const floor=isNight?"#12141a":"#c4a882";
  const wallT=isNight?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)";

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",width:"100%",background:isNight?"#080b12":"#ede8e0",padding:"20px 16px 40px",transition:"background 1.2s",fontFamily:"'Noto Serif SC',serif",boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400&family=ZCOOL+XiaoWei&display=swap');
        @keyframes fall{0%{transform:translateY(0)rotate(0deg);opacity:1}100%{transform:translateY(550px)rotate(720deg);opacity:0}}
        @keyframes heart_0{to{transform:translate(var(--dx),var(--dy));opacity:0}}
        @keyframes heart_1{to{transform:translate(calc(var(--dx)*0.7),calc(var(--dy)*1.3));opacity:0}}
        @keyframes heart_2{to{transform:translate(calc(var(--dx)*1.3),calc(var(--dy)*0.6));opacity:0}}
        @keyframes heart_3{to{transform:translate(calc(var(--dx)*-0.6),calc(var(--dy)*1.5));opacity:0}}
        @keyframes heart_4{to{transform:translate(calc(var(--dx)*1.5),calc(var(--dy)*0.9));opacity:0}}
        @keyframes bobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes twinkle{0%,100%{opacity:0.9}50%{opacity:0.2}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zzz{0%{opacity:0;transform:translate(0,0)scale(0.5)}50%{opacity:0.9}100%{opacity:0;transform:translate(8px,-14px)scale(1.3)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        .char-bob{animation:bobble 2.6s ease-in-out infinite}
        .char-still{animation:none}
        button:active{transform:scale(0.93)!important}
        *{box-sizing:border-box}
      `}</style>

      <div style={{fontSize:"clamp(13px, 4vw, 16px)",fontWeight:300,color:isNight?"#8a9ab0":"#7a6a5a",marginBottom:14,letterSpacing:3,fontFamily:"'ZCOOL XiaoWei', serif"}}>✦ 廿轶和轶零的小屋 ✦</div>

      <div style={{width:"100%",maxWidth:600,display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,padding:"0 4px"}}>
        <div>
          <div style={{fontSize:"clamp(24px, 8vw, 32px)",fontWeight:300,letterSpacing:3,color:isNight?"#e2e8f0":"#3a2e24",fontFamily:"'ZCOOL XiaoWei',serif",lineHeight:1}}>{timeStr}</div>
          <div style={{fontSize:"clamp(10px, 3vw, 12px)",color:isNight?"#4a5568":"#9a8878",marginTop:4}}>{dateStr}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"clamp(9px, 2.5vw, 11px)",color:isNight?"#4a5568":"#9a8878",marginBottom:4}}>好感度</div>
          <div style={{display:"flex",gap:2,justifyContent:"flex-end",flexWrap:"wrap",maxWidth:110}}>
            {Array.from({length:10}).map((_,i)=><span key={i} style={{fontSize:"clamp(10px, 3vw, 12px)",opacity:i<hearts10?1:0.18,animation:i<hearts10?"pulse 2s ease-in-out infinite":"none",animationDelay:`${i*0.1}s`}}>❤️</span>)}
          </div>
          <div style={{fontSize:"clamp(9px, 2.5vw, 11px)",color:isNight?"#4a5568":"#9a8878",marginTop:3}}>{aff} / 100</div>
        </div>
      </div>

      <div ref={roomRef} style={{width:"100%",maxWidth:600,aspectRatio:"360/390",background:bg,borderRadius:20,position:"relative",overflow:"hidden",boxShadow:isNight?"0 24px 64px rgba(0,0,0,0.7)":"0 16px 48px rgba(0,0,0,0.18)",transition:"background 1.2s, box-shadow 1.2s"}}>
        <WeatherParticles weather={weather}/>
        {isNight&&Array.from({length:18}).map((_,i)=><div key={i} style={{position:"absolute",left:`${8+(i*41)%84}%`,top:`${4+(i*27)%44}%`,width:i%4===0?3:2,height:i%4===0?3:2,background:"white",borderRadius:"50%",animation:`twinkle ${1.5+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.25}s`,zIndex:1}}/>)}
        
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"25.6%",background:floor,transition:"background 1.2s"}}>
          {[0,55,110,165,220,275,330,385,440,495,550].map(x=><div key={x} style={{position:"absolute",left:`${x/360*100}%`,top:0,bottom:0,width:1,background:wallT}}/>)}
        </div>

        <Sofa isNight={isNight} floorHeight="25.6%" />

        <div onClick={toggleWeather} style={{position:"absolute",top:"5.6%",right:"6.1%",width:"24.4%",aspectRatio:"1",background:isNight?"#0d1528":"#87ceeb",border:`3px solid ${isNight?"#1e2d50":"#a0c8e0"}`,borderRadius:6,cursor:"pointer",zIndex:10,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:3,padding:5,transition:"background 1.2s, border-color 1.2s"}}>
          {[0,1,2,3].map(i=><div key={i} style={{background:isNight?"#111e36":"#b8dff0",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:i===0?"clamp(14px, 5vw, 18px)":0}}>{i===0&&wIcons[weather]}</div>)}
          <div style={{position:"absolute",bottom:"-22px",left:"50%",transform:"translateX(-50%)",fontSize:"clamp(8px, 2.5vw, 10px)",color:isNight?"#3a5070":"#789ab0",whiteSpace:"nowrap"}}>{isNight?"夜":"日"}</div>
        </div>

        <div onClick={toggleLamp} style={{position:"absolute",top:"4.6%",left:"6.1%",cursor:"pointer",zIndex:10,textAlign:"center"}}>
          <div style={{fontSize:"clamp(24px, 8vw, 30px)"}}>🛋️</div>
          {lampOn&&<div style={{position:"absolute",top:"73%",left:"50%",transform:"translateX(-50%)",width:"clamp(100px, 40vw, 140px)",height:"clamp(100px, 40vw, 130px)",background:"radial-gradient(circle,rgba(255,210,100,0.18) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>}
          <div style={{fontSize:"clamp(8px, 2.5vw, 10px)",color:isNight?"#3a5070":"#9a8878",marginTop:2}}>{lampOn?"关灯":"开灯"}</div>
        </div>

        <div onClick={openShelf} style={{position:"absolute",left:"3.9%",top:"27.2%",cursor:"pointer",zIndex:10,textAlign:"center"}}>
          <div style={{width:"clamp(36px, 13vw, 48px)",height:"clamp(68px, 25vw, 90px)",background:isNight?"#1e2540":"#c4a26e",border:`2px solid ${isNight?"#2d3561":"#a08050"}`,borderRadius:4,padding:4,display:"flex",flexDirection:"column",gap:4,justifyContent:"center"}}>
            {["#e05c5c","#5c9de0","#5ce08a","#e0b45c","#9b5ce0","#5ce0d4"].map((c,i)=><div key={i} style={{height:"clamp(6px, 2.5vw, 9px)",background:c,borderRadius:2,opacity:0.88}}/>)}
          </div>
          <div style={{fontSize:"clamp(8px, 2.5vw, 10px)",color:isNight?"#3a5070":"#9a8878",marginTop:3}}>书架</div>
        </div>

        <div onClick={()=>setShowMusic(p=>!p)} style={{position:"absolute",right:"3.9%",top:"27.2%",cursor:"pointer",zIndex:10,textAlign:"center"}}>
          <div style={{fontSize:"clamp(20px, 7vw, 26px)",animation:playing?"pulse 1s ease-in-out infinite":"none"}}>📻</div>
          <div style={{fontSize:"clamp(8px, 2.5vw, 10px)",color:isNight?"#3a5070":"#9a8878",marginTop:2}}>{playing?"▶ 播放":"音乐"}</div>
        </div>

        <div onClick={waterPlant} style={{position:"absolute",right:"6.1%",bottom:"17.9%",cursor:"pointer",zIndex:16,textAlign:"center"}}>
          <div style={{fontSize:"clamp(26px, 9vw, 34px)"}}>🪴</div>
          <div style={{width:"clamp(26px, 9vw, 34px)",height:5,background:"rgba(0,0,0,0.2)",borderRadius:3,overflow:"hidden",margin:"4px auto 0"}}>
            <div style={{width:`${plantWater}%`,height:"100%",background:plantWater>50?"#48bb78":"#f6ad55",transition:"width 0.5s, background 0.3s"}}/>
          </div>
          <div style={{fontSize:"clamp(8px, 2.5vw, 10px)",color:isNight?"#3a5070":"#9a8878",marginTop:2}}>浇水</div>
        </div>

        <div style={{position:"absolute",bottom:"17.9%",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",zIndex:20}}>
          {showMsg&&<div style={{background:"white",borderRadius:"18px 18px 18px 4px",padding:"9px 16px",fontSize:"clamp(11px, 3.6vw, 13px)",color:"#2d3748",marginBottom:10,maxWidth:"clamp(150px, 53vw, 190px)",textAlign:"center",lineHeight:1.7,boxShadow:"0 6px 18px rgba(0,0,0,0.15)",animation:"fadeUp 0.3s ease-out",fontFamily:"'Noto Serif SC',serif"}}>{msg}</div>}
          <div className={state==="sleeping"?"char-still":"char-bob"} onClick={e=>interact("poke",e)}>
            <Char state={state} isNight={isNight} lampOn={lampOn}/>
          </div>
          {state==="reading"&&<div style={{width:"clamp(80px, 30vw, 110px)",height:20,background:isNight?"#252a40":"#b8936a",border:`2px solid ${isNight?"#2d3561":"#a07845"}`,borderRadius:"0 0 6px 6px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginTop:-8}}>📖</div>}
        </div>

        {hearts.map(({id,x,y})=><HeartBurst key={id} x={x} y={y} onDone={()=>removeHeart(id)}/>)}
        {!lampOn&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,12,0.42)",pointerEvents:"none",zIndex:8,transition:"background 0.6s"}}/>}

        {showMusic&&(
          <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",background:isNight?"rgba(15,20,36,0.95)":"rgba(255,255,255,0.95)",borderRadius:14,padding:"12px 16px",width:"clamp(200px, 64vw, 230px)",boxShadow:"0 8px 24px rgba(0,0,0,0.25)",zIndex:30,display:"flex",flexDirection:"column",gap:8}}>
            <div style={{fontSize:"clamp(10px, 3vw, 11px)",color:isNight?"#8892b0":"#7a6a5a",textAlign:"center"}}>{playing?"▶ 正在播放":"已暂停"}</div>
            <div style={{fontSize:"clamp(10px, 3.3vw, 12px)",color:isNight?"#e2e8f0":"#3a2e24",textAlign:"center",lineHeight:1.5,fontFamily:"'Noto Serif SC',serif"}}>{song}</div>
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              {[{label:playing?"⏸ 暂停":"▶ 播放",fn:toggleMusic},{label:"⏭ 下一首",fn:nextSong}].map(({label,fn},i)=>(
                <button key={i} onClick={fn} style={{padding:"5px 12px",fontSize:"clamp(10px, 3vw, 11px)",background:isNight?"#1e2d50":"#e8e0d4",color:isNight?"#a0b4d0":"#5a4a38",border:`1px solid ${isNight?"#2d3d60":"#d0c8bc"}`,borderRadius:8,cursor:"pointer",fontFamily:"'Noto Serif SC',serif"}}>{label}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:10,justifyContent:"center",fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#2d3748":"#b0a090"}}>
        {["点角色→戳","点窗户→切天气","点书架→语录","点植物→浇水","点沙发→开关灯"].map((t,i)=><span key={i}>{t}{i<4?" ·":""}</span>)}
      </div>

      <div style={{width:"100%",maxWidth:600,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"clamp(4px, 2vw, 8px)",marginTop:14,padding:"0 4px"}}>
        {[{key:"poke",e:"👆",l:"戳戳"},{key:"kiss",e:"💋",l:"亲亲"},{key:"hug",e:"🫂",l:"抱抱"},{key:"feed",e:"🍡",l:"喂食"},{key:"name",e:"📣",l:"呼唤"}].map(({key,e,l})=>(
          <button key={key} onClick={ev=>interact(key,ev)} style={{padding:"clamp(8px, 3vw, 11px) 4px",background:isNight?"#131826":"white",border:`1.5px solid ${isNight?"#1e2d4a":"#e0d8ce"}`,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:isNight?"none":"0 2px 8px rgba(0,0,0,0.07)",transition:"transform 0.1s"}}>
            <span style={{fontSize:"clamp(14px, 5vw, 18px)"}}>{e}</span>
            <span style={{fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#6a7a94":"#8a7a6a",fontFamily:"'Noto Serif SC',serif"}}>{l}</span>
          </button>
        ))}
      </div>

      <div style={{width:"100%",maxWidth:600,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"clamp(4px, 2vw, 8px)",marginTop:10,padding:"0 4px"}}>
        <button onClick={()=>setShowNotes(p=>!p)} style={{padding:"clamp(8px, 3vw, 11px) 4px",background:isNight?"#131826":"white",border:`1.5px solid ${isNight?"#1e2d4a":"#e0d8ce"}`,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:isNight?"none":"0 2px 8px rgba(0,0,0,0.07)"}}>
          <span style={{fontSize:"clamp(14px, 5vw, 18px)"}}>📝</span>
          <span style={{fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#6a7a94":"#8a7a6a",fontFamily:"'Noto Serif SC',serif"}}>便条本</span>
        </button>
        <button onClick={()=>window.location.href="calshow://"} style={{padding:"clamp(8px, 3vw, 11px) 4px",background:isNight?"#131826":"white",border:`1.5px solid ${isNight?"#1e2d4a":"#e0d8ce"}`,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:isNight?"none":"0 2px 8px rgba(0,0,0,0.07)"}}>
          <span style={{fontSize:"clamp(14px, 5vw, 18px)"}}>📅</span>
          <span style={{fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#6a7a94":"#8a7a6a",fontFamily:"'Noto Serif SC',serif"}}>日历</span>
        </button>
        <button onClick={()=>window.location.href="x-apple-reminderkit://"} style={{padding:"clamp(8px, 3vw, 11px) 4px",background:isNight?"#131826":"white",border:`1.5px solid ${isNight?"#1e2d4a":"#e0d8ce"}`,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:isNight?"none":"0 2px 8px rgba(0,0,0,0.07)"}}>
          <span style={{fontSize:"clamp(14px, 5vw, 18px)"}}>✅</span>
          <span style={{fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#6a7a94":"#8a7a6a",fontFamily:"'Noto Serif SC',serif"}}>待办</span>
        </button>
        <button onClick={()=>setShowPomodoro(true)} style={{padding:"clamp(8px, 3vw, 11px) 4px",background:isNight?"#131826":"white",border:`1.5px solid ${isNight?"#1e2d4a":"#e0d8ce"}`,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:isNight?"none":"0 2px 8px rgba(0,0,0,0.07)"}}>
          <span style={{fontSize:"clamp(14px, 5vw, 18px)"}}>🍅</span>
          <span style={{fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#6a7a94":"#8a7a6a",fontFamily:"'Noto Serif SC',serif"}}>番茄钟</span>
        </button>
      </div>

      {showNotes&&(
        <div style={{width:"100%",maxWidth:600,marginTop:10,background:isNight?"#131826":"white",border:`1.5px solid ${isNight?"#1e2d4a":"#e0d8ce"}`,borderRadius:16,padding:16,boxShadow:isNight?"0 8px 24px rgba(0,0,0,0.4)":"0 8px 24px rgba(0,0,0,0.1)"}}>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <input value={noteInput} onChange={e=>setNoteInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNote()} placeholder="留下一句话给他……" style={{flex:1,padding:"8px 12px",background:isNight?"#0d1117":"#f5f0eb",border:`1px solid ${isNight?"#1e2d4a":"#ddd5c8"}`,borderRadius:8,fontSize:"clamp(11px, 3.3vw, 12px)",outline:"none",color:isNight?"#e2e8f0":"#4a3728",fontFamily:"'Noto Serif SC',serif"}}/>
            <button onClick={addNote} style={{padding:"8px 14px",background:"#7eb8d4",border:"none",borderRadius:8,cursor:"pointer",fontSize:"clamp(11px, 3.3vw, 12px)",color:"white",fontFamily:"'Noto Serif SC',serif"}}>留下</button>
          </div>
          {notes.length===0?<div style={{fontSize:"clamp(11px, 3.3vw, 12px)",color:isNight?"#2d3748":"#b0a090",textAlign:"center",padding:"10px 0"}}>还没有便条</div>:(
            <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:200,overflowY:"auto"}}>
              {notes.map((n,i)=>(
                <div key={i} style={{padding:"8px 12px",background:isNight?"#0d1117":"#faf5ec",borderRadius:8,borderLeft:"3px solid #7eb8d4",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div><div style={{fontSize:"clamp(11px, 3.3vw, 12px)",color:isNight?"#e2e8f0":"#4a3728",lineHeight:1.6}}>{n.t}</div><div style={{fontSize:"clamp(9px, 2.8vw, 10px)",color:isNight?"#2d3748":"#b0a090",marginTop:3}}>{n.d}</div></div>
                  <button onClick={()=>delNote(i)} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,opacity:0.4,color:isNight?"white":"black",padding:0,flexShrink:0}}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showShelf&&(
        <div onClick={()=>setShowShelf(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
          <div style={{background:isNight?"#131826":"white",borderRadius:22,padding:"36px 32px",maxWidth:"clamp(240px, 80vw, 290px)",textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.4)"}}>
            <div style={{fontSize:30,marginBottom:16}}>📖</div>
            <div style={{fontSize:"clamp(13px, 4.2vw, 15px)",lineHeight:1.9,fontWeight:300,color:isNight?"#e2e8f0":"#3a2e24",fontFamily:"'Noto Serif SC',serif"}}>{shelfText}</div>
            <div style={{fontSize:"clamp(9px, 2.8vw, 10px)",opacity:0.35,marginTop:18}}>点击关闭</div>
          </div>
        </div>
      )}

      {showPomodoro && (
        <PomodoroOverlay
          onClose={()=>setShowPomodoro(false)}
          onComplete={handlePomodoroComplete}
          isNight={isNight}
          records={pomodoroRecords}
          setRecords={setPomodoroRecords}
        />
      )}
    </div>
  );
}
