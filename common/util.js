function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};


function IsLogon(){
	var phoneNumber = wx.getStorageSync('phoneNumber');
	var openId = wx.getStorageSync('openId');
	var clientList = wx.getStorageSync('clientList');
	console.log("phoneNumber",phoneNumber);
	console.log("openId",openId);
	console.log("clientList",clientList);
	// 获取缓存的登录信息
	if (phoneNumber && openId && clientList && clientList.clientId) {
		console.log("用户已登陆");
		getApp().globalData.UserLogin = true;
		getApp().globalData.openId = openId;
		getApp().globalData.phoneNumber = phoneNumber;
		getApp().globalData.clientList = clientList
	}else{
		getApp().globalData.UserLogin = false
	}
	
};


function ellipsisFileName(str, maxLength) {
	const strLength = str.length
	let data = []
	if (strLength > maxLength) {
		data.push(str.substr(0, strLength - maxLength))
		data.push(str.substr(-maxLength))
	} else {
		data.push(str)
	}
	return data
}; 

export default{
	formatTime,
	formatLocation,
	dateUtils,
	IsLogon,
	ellipsisFileName
}
