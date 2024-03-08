	const utils = require('../../common/util.js');
	export default {
		methods: {
			login() {
				wx.getUserProfile({
					desc: '用于完善会员资料',//声明获取用户个人信息后的用途，后续会展示在弹窗中
					success:(res) =>{
						wx.login({
							success:(loginData)=>{
								var code = loginData.code;
								wx.request({
									url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/get-openId',
									method : 'POST',
									data : {
										appId : getApp().globalData.appId,
										secret : getApp().globalData.secret,
										loginCode : code,
									},
									success:(openIdData)=>{
										wx.request({
											url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/select-client-detail',
											data: {
												openId : openIdData.data.openid
											},
											method : 'POST',
											success: (clientData) =>{
												var openId = openIdData.data.openid;
												wx.setStorageSync('openId', openId);
												console.log("用户信息",userInfo);
												console.log("openId",openId);
												if(clientData.data.clientId != undefined){
													var clientList = clientData.data;
													wx.setStorageSync('clientList', clientList);
													console.log("clientList",clientList);
													utils.default.IsLogon();
													wx.switchTab({
														url: '../home/home',
													})
												}else {
													utils.default.IsLogon();
													wx.navigateTo({
														url: '../mydetail/mydetail',
													})
												}
											},
											fail: clientData=>{
												console.log('获取用户信息失败',clientData);
												console.log('openIdData',openIdData);
												console.log('loginData',loginData);
												console.log('res',res);
												wx.navigateTo({
													url: '../login/login',
												});
											}
										})
									},
									fail: openIdData=>{
										console.log('获取openId失败',openIdData);
										console.log('loginData',loginData);
										console.log('res',res);
										wx.navigateTo({
											url: '../login/login',
										});
									}
								})
								fail: loginData=>{
									console.log('登录失败',loginData);
									console.log('res',res);
									wx.navigateTo({
										url: '../login/login',
									});
								}
							}
						})
						fail: res=>{
							console.log('授权失败',res);
							wx.navigateTo({
								url: '../login/login',
							});
						}
					}
				})
			},
			
			
			getPhoneNumber(e) {
				var errMsg = e.detail.errMsg
				if (errMsg.indexOf("fail") > -1) {
					uni.showToast({
						icon: 'none',
						title: '用户拒绝微信手机协议，请重新授权',
						duration: 1500
					});
					return
				}
				var phoneCode = e.detail.code
				wx.login({
					success: (res)=>{
						var loginCode = res.code
						if (loginCode) {
							//发起网络请求
							uni.showLoading({
								title: '登陆中'
							});
							wx.request({
								url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/get-openId',
								method : 'POST',
								data: {
									appId : getApp().globalData.appId,
									secret : getApp().globalData.secret,
									loginCode: loginCode,
						        },
								success:(openIdData)=>{
									console.log('微信身份信息',openIdData)
									if (openIdData.statusCode === 500 || openIdData.statusCode === 404) {
										uni.showToast({
											duration:1500,
											title: '网络错误',
											icon : 'error'
										})
									}
									wx.request({
										url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/get-phone',
										method : 'POST',
										data: {
											phoneCode: phoneCode
										},
										success : (phoneData)=>{
											var phoneNumber = phoneData.data.phone_info.phoneNumber
											wx.request({
												url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/select-client-detail',
												data: {
													openId : openIdData.data.openid,
													phoneNumber: phoneNumber
												},
												method : 'POST',
												success: (clientData) =>{
													console.log("clientData",clientData)
													if (clientData.statusCode === 500 || clientData.statusCode === 404) {
														uni.showToast({
															duration:1500,
															title: '网络错误',
															icon : 'error'
														})
													}
													var openId = openIdData.data.openid;
													wx.setStorageSync('phoneNumber', phoneNumber);
													wx.setStorageSync('openId', openId);
													if(clientData.data.clientId != undefined){
														var clientList = clientData.data;
														wx.setStorageSync('clientList', clientList);
														console.log("clientList",clientList);
														utils.default.IsLogon();
														wx.switchTab({
															url: '../home/home',
														})
													}else {
														utils.default.IsLogon();
														wx.navigateTo({
															url: '../logon/logon',
														})
													}
												},
												fail: clientData=>{
													console.log('获取用户信息失败',clientData);
													console.log('openIdData',openIdData);
													console.log('res',res);
													wx.navigateTo({
														url: '../login/login',
													});
												},
												complete: ()=>{
													uni.hideLoading();
												}
											})
										},
										fail : (phoneData)=>{
											console.log('获取手机信息失败',clientData);
											console.log('phoneData',phoneData);
											console.log('res',res);
											wx.navigateTo({
												url: '../login/login',
											});
										},
										complete: ()=>{
											uni.hideLoading();
										}
									})
								},
								fail: openIdData=>{
									console.log('获取openId失败',openIdData);
									console.log('res',res);
									wx.navigateTo({
										url: '../login/login',
									});
								},
								complete: ()=>{
									uni.hideLoading();
								}
						      })
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
				
			},
			
			wxLogin() {
				wx.login({
					success: (res)=>{
						var loginCode = res.code
						if (loginCode) {
							//发起网络请求
							uni.showLoading({
								title: '登陆中'
							});
							wx.request({
								url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/get-openId',
								method : 'POST',
								data: {
									appId : getApp().globalData.appId,
									secret : getApp().globalData.secret,
									loginCode: loginCode
						        },
								success:(openIdData)=>{
									console.log('微信身份信息',openIdData)
									if (openIdData.statusCode === 500 || openIdData.statusCode === 404) {
										uni.showToast({
											duration:1500,
											title: '网络错误',
											icon : 'error'
										})
									}
									wx.request({
										url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/select-client-detail',
										data: {
											openId : openIdData.data.openid
										},
										method : 'POST',
										success: (clientData) =>{
											console.log("clientData",clientData)
											if (clientData.statusCode === 500 || clientData.statusCode === 404) {
												uni.showToast({
													duration:1500,
													title: '网络错误',
													icon : 'error'
												})
											}
											var openId = openIdData.data.openid;
											wx.setStorageSync('openId', openId);
											if(clientData.data.clientId != undefined){
												var clientList = clientData.data;
												wx.setStorageSync('clientList', clientList);
												wx.setStorageSync('phoneNumber', clientList.lxrPhone);
												console.log("clientList",clientList);
												utils.default.IsLogon();
											}else {
												utils.default.IsLogon();
												wx.navigateTo({
													url: '../login/login',
												})
											}
										},
										fail: clientData=>{
											console.log('获取用户信息失败',clientData);
											console.log('openIdData',openIdData);
											console.log('res',res);
											wx.navigateTo({
												url: '../login/login',
											});
										},
										complete: ()=>{
											uni.hideLoading();
										}
									})
									
								},
								fail: openIdData=>{
									console.log('获取openId失败',openIdData);
									console.log('res',res);
									wx.navigateTo({
										url: '../login/login',
									});
								},
								complete: ()=>{
									uni.hideLoading();
								}
						      })
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			}
			
		},
			
		onUnload: function () {
			wx.switchTab({
				url: '../login/login',
			});
		},
		
	}