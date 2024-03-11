<template>
	<!--index.wxml-->
	<view>
		<view class="background">
				<!-- <button class="home-top"></button> -->
			<view class="home-top"  ></view>
			<!-- 	<view class="item">
					<button class="button1" @tap="placeorder"></button>
					<button class="button2" @tap="select"></button>
				</view>
	 -->
			<view class="button-row">
				<view class="card-inside" @tap="placeorder">
					<uni-icons class="card-icon" custom-prefix="iconfont" type="icon-gouwuche" size="50" color="#2f7efd" ></uni-icons>
					<view class="card-content"> 
						<view class="card-title"> 自助下单 </view>
						<view class="card-desc"> ORDER </view>
					</view>
				</view>
				<view class="card-inside" @tap="entrust">
					<uni-icons class="card-icon" custom-prefix="iconfont" type="icon-peixun" size="50" color="#2f7efd"></uni-icons>
					<view class="card-content"> 
						<view class="card-title"> 检测委托 </view>
						<view class="card-desc"> ENTRUST </view>
					</view>
				</view>
				
			</view>

			<view class="button-row">
				<view class="card-inside" @tap="selectProject">
					<uni-icons class="card-icon" custom-prefix="iconfont" type="icon-sousuo" size="50" color="#2f7efd" ></uni-icons>
					<view class="card-content"> 
						<view class="card-title"> 任务查询 </view>
						<view class="card-desc"> QUERY </view>
					</view>
				</view>
				<view  class="card-inside" @tap="openComment">
					<uni-icons class="card-icon" custom-prefix="iconfont" type="icon-shoucang" size="50" color="#2f7efd"></uni-icons>
					<view class="card-content"> 
						<view class="card-title"> 
							客户评价
							<view class="tab-tag" v-if="toCommentCue > 0" >
								<block v-if="toCommentCue!=1">{{toCommentCue>99?'99+':toCommentCue}}</block>
							</view>
						 </view>
						<view class="card-desc"> EVALUATE </view>
					</view>
				</view>
			</view>
			<button class="button-image bg-qhjc-blue"  @click="toggle('center')">
				<view class="button-text1 text-df">
					<text class="  text-white">关注公众号</text>
				</view>
				<view class="button-text2 text-df ">
					<text class="text-white">了解秋毫更多信息</text>
				</view>
				
				<image mode="aspectFit"  src="../../static/image/qrCode.jpg"></image></button>
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" ><image mode="aspectFit" show-menu-by-longpress="true" src="../../static/image/qrCode.jpg"></image></view>
			</uni-popup>
		</view>
	
	</view>
</template>

<script>
	import home from './home.js'
	export default {
		data () {
			return {
				toCommentCue : getApp().globalData.redDotCue.toCommentCue,
				tab1Cue : getApp().globalData.redDotCue.tab1Cue,
			}
		},
		onLoad() {
		  var that = this;
		  var UserLogin = getApp().globalData.UserLogin;
		  if(!UserLogin){
			   uni.reLaunch({
				 url: '../login/login',
			   })
		  }
		  uni.$on('toCommentCue', function(toCommentCue) {
			  console.log('触发了提示更新事件')
			  console.log(toCommentCue)
			  that.toCommentCue = toCommentCue;
		  })
		},
		onShow : function (e) {
			console.log('2');
			this.toCommentCue = getApp().globalData.redDotCue.toCommentCue
			this.tab1Cue = getApp().globalData.redDotCue.tab1Cue;
			if (Number(this.tab1Cue) > 0) {
				uni.setTabBarBadge({
					index: 1,
					text: String(this.tab1Cue),
				});
			} else {
				uni.hideTabBarRedDot({
					index: 1
				});
			}
		},
		methods:{
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			placeorder(e){
			  wx.navigateTo({
			    url: '../placeorder/placeorder',
			  })
			},
			selectProject(e){
			  wx.navigateTo({
			    url: '../selectproject/selectproject?clientNo=' + getApp().globalData.clientList.clientNo,
			  })
			},
			entrust(e) {
				wx.navigateTo({
				  url: '../entrust/entrust',
				})
			},
			openComment(e) {
				wx.navigateTo({
				  url: '../selectorder/selectorder?tabIndex=3',
				})
				// uni.showLoading({
				// 	title : '请等候'
				// })
				// uni.request({
				// 	url:  getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/select-questionnaire-url',
				// 	method : getApp().globalData.method,
				// 	success : (res) => {
				// 		var data = res.data;
				// 		if (data.questionnaireUrl == undefined) {
				// 			uni.showToast({
				// 				title : '暂无评价问卷',
				// 				icon : 'none'
				// 			})
				// 			return
				// 		}
				// 		var questionnaireUrl = data.questionnaireUrl;
				// 		var sid = data.sid;
				// 		var hash = data.hash;
				// 		uni.hideLoading()
				// 		wx.openEmbeddedMiniProgram({
				// 		  appId: 'wxebadf544ddae62cb',
				// 		  path : `pages/survey/index?sid=${sid}&hash=${hash}&navigateBackMiniProgram=true`
				// 		});
				// 	} 
				// })
			}
		},
	}
</script>

<style lang="scss">
	@import url(../home/home.scss);
</style>