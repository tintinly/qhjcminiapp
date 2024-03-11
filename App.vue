<script>
	export default {
		data() {
			return {
			};
		},
		globalData : {
			host : 'https://lims.qiuhaotesting.com:8091',
			// host : 'http://58.215.200.126:8090',
			// host : 'http://localhost:8088',
			// host : 'http://182.168.1.62:8088',
			// host : 'http://cn-nd-plc-1.openfrp.top:55671',
			method : 'POST',
			UserLogin : false,
			appId : 'wx239100a18d156ddc',
			openId : '',
			phoneNumber : '',
			clientList : [],
			folderList : [],
			orderList : [],
			mch_key : '1632389429',//商户密钥
			
			
			// 不同机型页面信息
			navHeight : '',// 整个导航栏的高度
			nav : '',// 导航栏的高度
			menuLeft : '', //胶囊与左边的距离
			menuHeight : '', //胶囊的高度
			menuBot : '', //胶囊距离顶部的高度
			windowWidth : '' ,//整个设备的宽度
			unSafeButtomHeight : '' ,//底部非安全区域高度
			
			// 红点信息
			redDotCue : {}
		},
		methods : {
			
		},
		onLaunch: function() {
			console.log('App Launch')
			// 获取胶囊信息
			let menuButtonObject = wx.getMenuButtonBoundingClientRect()
			console.log(menuButtonObject)
			// 获取设备信息
			wx.getSystemInfo({
			  success: res => {
				console.log(res)
				// 整个导航栏的高度
				let navHeight = res.statusBarHeight + menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight)*2
				// 导航栏的高度
				let nav = navHeight - res.statusBarHeight
		 
				// 挂载到全区变量 globalData 上
				this.globalData.navHeight = navHeight
				this.globalData.nav = nav
				console.log("navHeight",navHeight)
				console.log("nav",nav)
				// 胶囊与左边的距离
				this.globalData.menuLeft = menuButtonObject.left
				// 胶囊的高度
				this.globalData.menuHeight = menuButtonObject.height
				// 胶囊距离顶部的高度
				this.globalData.menuBot = menuButtonObject.top - res.statusBarHeight
				// 整个设备的宽度
				this.globalData.windowWidth = res.windowWidth
				// 底部非安全区域高度
				this.globalData.unSafeButtomHeight = res.screenHeight - res.safeArea.bottom
			  },
			  fail: err => {
				console.log(err)
			  }
			})

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	

		
	/*每个页面公共css */

	@import './common/uni.css';
	@import '@/static/customicons.css';
	@import '@/static/iconfont.css';
	
	@import "./colorui/main.css";
	@import "./colorui/icon.css";
</style>
	
