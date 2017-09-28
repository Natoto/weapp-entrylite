 

entryjson = 
[
	{
		"date":"2017-09-21",
		"type":1,//记账类型
		"name":"奖金",
		"account":123.00,//花费金额
		"user":"",
		"remark":"",
	},
];

incomeTypes=[   {'jianzhi':{'type':1,'image':'../../resource/jianzhi.png'}},
				{'gongzi':{'type':2,'image':'../../resource/gongzi.png'}},
				{'hongbao':{'type':3,'image':'../../resource/hongbao.png'}},
				{'touzi':{'type':4,'image':'../../resource/touzi.png'}},
				{'jiangjin':{'type':5,'image':'../../resource/jiangjin.png'}},
				{'butie':{'type':6,'image':'../../resource/butie.png'}},
				{'lijin':{'type':7,'image':'../../resource/lijin.png'}},
				{'qita':{'type':8,'image':'../../resource/jianzhi.png'}}];

var expendTypes=['canyin','jiaotong','jujia','gouwu','tongxun','xuexi','jiankang','yule','lvyou','qita'];
 
function sayHello(name) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}


entryjson={
	entryjson:entryjson,
	incomeTypes:incomeTypes,	
}
module.exports.sayHello = sayHello
exports.sayGoodbye = sayGoodbye

// module.exports.entryjson = entryjson
 