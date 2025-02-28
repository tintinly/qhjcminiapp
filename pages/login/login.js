import { HTTP } from '../../common/http.js'
import utils from '../../common/util.js'
export default {
	methods: {
		
		getPhoneNumber(e) {
			var that = this;
			console.log('微信手机授权快捷登录中',e);
			var errMsg = e.detail.errMsg;
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
					console.log('微信登录授权码',loginCode);
					if (loginCode) {
						HTTP(`/open/emc/projectfunction/module/bp/wechat/get-openId`,{
							appId : getApp().globalData.appId,
							loginCode: loginCode,
						}).then(res=>{
							console.log('微信身份信息',res)
							var openId = res.data.openid
							var sessionKey = res.data.session_key;
							HTTP(`/open/emc/projectfunction/module/bp/wechat/get-phone`,{
								appId : getApp().globalData.appId,
								phoneCode: phoneCode
							}).then(res=>{
								console.log("手机信息",res)
								var phoneNumber = res.data.phone_info?.phoneNumber
								HTTP(`/open/emc/projectfunction/module/bp/wechat/get-user-info`,{
									openId : openId,
									phoneNumber: phoneNumber
								}).then(res=>{
									console.log("用户信息",res)
									var userInfo = res.data;
									wx.setStorageSync('phoneNumber', phoneNumber);
									wx.setStorageSync('openId', openId);
									wx.setStorageSync('sessionKey', sessionKey);
									wx.setStorageSync('userInfo', userInfo);
									utils.isLogin();
									that.selectRedDotCue();
									uni.switchTab({
										url: '../home/home',
									})
								}).catch(err=>{
									utils.isLogin();
									uni.showToast({
										duration:1500,
										title: '登录失败',
										icon : 'error'
									})
								});
							}).catch(err=>{
							});
						}).catch(err=>{
						});
					} else {
						console.log('无法获取微信登录授权码！' + res.errMsg)
					}
				}
			})
		},
		
		selectRedDotCue() {
			HTTP(`/open/emc/projectfunction/module/bp/wechat/select-red-dot-cue`,{
				openId : getApp().globalData.openId,
				clientContactId : getApp().globalData.userInfo.clientContactId,
			}).then(res=>{
				var data = res.data;
				Object.keys(data).forEach(k=>{
					getApp().globalData.redDotCue[k] = data[k];
					uni.$emit(k, data[k]);
				})
				var tab1Cue = getApp().globalData.redDotCue.tab1Cue;
				if (Number(tab1Cue) > 0) {
					uni.setTabBarBadge({
						index: 1,
						text: String(tab1Cue),
					});
				} else {
					uni.hideTabBarRedDot({
						index: 1
					});
				}
			}).catch(err=>{
			});
		}
	},
		
	onUnload: function () {
		wx.switchTab({
			url: '../login/login',
		});
	},
	
}