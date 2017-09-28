
 
function readData(monthkey){
  console.log(monthkey);
   return wx.getStorageSync(monthkey)
}

export const data = {   
     key:"2017-09",
     value:{
        month: "2017-08",
        income: +234.00,
        outcome:-10.33,
        days: [
          {
            day:"2017-09-21",
            income: +234.00,
            outcome:-10.33,
            list:[
              {
                date: "2017-09-21",
                type: 1,//记账类型          
                name: "奖金",
                account: 123.00,//花费金额
                user: "",
                remark: "备注",
                typeimg: "jiangjin.png"
              },
              {
                date: "2017-09-21",
                type: 2,//记账类型          
                name: "购物消费",
                account: -123.00,//花费金额
                user: "",
                remark: "备注2",
                typeimg: "gouwu.png"
              }
            ],
          }     
        ]
     }           
}



var incomeTypes = [
  {
    "id": "jianzhi",
    "type": 1,
    "name": "兼职",
    "image": "jianzhi.png"
  },
  {
    "id": "gongzi",
    "type": 2,
    "name": "工资",
    "image": "gongzi.png"
  },
  {
    "id": "hongbao",
    "type": 3,
    "name": "红包",
    "image": "hongbao.png"
  },
  {
    "id": "touzi",
    "type": 4,
    "name": "投资",
    "image": "touzi.png"
  },
  {
    "id": "jiangjin",
    "type": 5,
    "name": "奖金",
    "image": "jiangjin.png"
  },
  {
    "id": "butie",
    "type": 6,
    "name": "补贴",
    "image": "butie.png"
  },
  {
    "id": "lijin",
    "type": 7,
    "name": "礼金",
    "image": "lijin.png"
  },
  {
    "id": "qita",
    "type": 8,
    "name": "其他",
    "image": "qita.png"
  }
];

var expendTypes = [
  {
    "id": 'canyin',
    "type": 10,
    "name": "餐饮",
    "image": "canyin.png"
  },
  {
    "id": 'jiaotong',
    "type": 11,
    "name": "交通",
    "image": "jiaotong.png"
  },
  {
    "id": 'jujia',
    "type": 12,
    "name": "居家",
    "image": "jujia.png"
  },
  {
    "id": 'gouwu',
    "type": 13,
    "name": "购物",
    "image": "gouwu.png"
  }, {
    "id": 'tongxun',
    "type": 14,
    "name": "通讯",
    "image": "tongxun.png"
  }, {
    "id": 'xuexi',
    "type": 15,
    "name": "学习",
    "image": "xuexi.png"
  }, {
    "id": 'jiankang',
    "type": 16,
    "name": "健康",
    "image": "jiankang.png"
  }, {
    "id": 'yule',
    "type": 17,
    "name": "娱乐",
    "image": "yule.png"
  }, {
    "id": 'lvyou',
    "type": 18,
    "name": "旅游",
    "image": "lvyou.png"
  }, {
    "id": 'qita',
    "type": 19,
    "name": "其他",
    "image": "qita.png"
  }
];


function sayHello(name) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

export { readData, sayHello, sayGoodbye, incomeTypes, expendTypes};

// 其他写法
// module.exports.sayHello = sayHello
// exports.sayGoodbye = sayGoodbye
// exports.incomeTypes = incomeTypes
// exports.expendTypes = expendTypes
