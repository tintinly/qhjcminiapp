<template>
	<view>
		<sunway-navbar :backShow="backShow" :titleShow="false"></sunway-navbar>
		<view class="app-welcome">
			<image src="../../static/image/loginpic.jpg"></image>
			<view class="margin-left-lg">
				<view class="margin-bottom-xs "><text>欢迎使用</text></view>
				<view><text class="text-xxl">秋毫检测</text></view>
			</view>
		</view>
		<view class="welcome-img-box">
			<image mode="widthFix" src="../../static/image/science-detect.svg"></image>
		</view>
		
		<!--需授权手机号的登录-->
		<button v-if="phoneNumber == undefined || phoneNumber == ''" class="button btn-sunway-blue" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"><text>一键登录</text></button>
		<!--无需授权手机号的登录-->
		<button v-else class="button btn-sunway-blue"  @click="loginByPhone"><text>一键登录</text></button>
		
		<!-- <view class="login-way-box">
			<view class="login-way-title">
				<view class="solid" style="width: 70rpx; height: 1px;"></view>
				<view class="margin-lr-sm"><text class=" text-sm text-gray " >其他登录方式</text></view>
				<view class="solid" style="width: 70rpx; height: 1px;"></view>
			</view>
			<view class="login-way" @click="toPage('../limslogin/limslogin')">
				<view class="margin-right-sm"><image src="../../static/image/gikam.svg"></image></view>
				<view><text>环境监测业务管理系统</text></view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	import login from './login.js'
	export default {
		data () {
			return {
				testvalue: '',
				backShow : false,
				phoneNumber : ''
			}
		},
		methods:{
			onunload(e){
				login.methods.onUnload(e)
			},
			getPhoneNumber(e){
				login.methods.getPhoneNumber(e)
			},
			loginByPhone(e){
				login.methods.loginByPhone(this.phoneNumber);
			},
			toPage : function (url){
				uni.navigateTo({
					url : url 
				})
			},
			back : function(e) {
				// 在C页面内 navigateBack，将返回A页面
				uni.navigateBack({
					delta: 1
				});
			},
		},
		onLoad(e) {
		  this.backShow = e.needBack && JSON.parse(e.needBack) ? true : false; 
		  // 预登录检查是否绑定了手机号
		  login.methods.preLogin().then(res=>{
		  	this.phoneNumber = res;
		  	console.log(this.phoneNumber == undefined || this.phoneNumber == '' ? '预登录失败' : '已预登录');
		  }).catch(err=>{
		  	console.log('预登录失败');
		  });
		},
	}
</script>

<style>
	@import url(../login/login.css);
	
</style>
