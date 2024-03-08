<template>
	<view class="header">
		<image src="/static/image/loginpic3.png"></image>
		<!-- 授权登录按钮 -->
		<!-- <button class="bottom" @tap="login" type="primary">微信快速授权登录</button> -->
		<button class="bottom" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信快速授权登录</button>
	</view>
</template>

<script>
	import login from './login.js'
	export default {
		data () {
			return {
				testvalue: ''
			}
		},
		methods:{
			onunload(e){
				login.methods.onUnload(e)
			},
			login:function(){
				login.methods.login()
			},
			getPhoneNumber(e){
				login.methods.getPhoneNumber(e)
			},
		}
	}
</script>

<style>
	@import url(../login/login.css);
	
</style>
