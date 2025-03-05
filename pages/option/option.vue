<template>
	<view>
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
			<!-- <view v-if="limsIsLogin" class="cu-item arrow">
				<view class="content">
					<image src="../../static/image/gikam.svg"  mode="aspectFit"></image>
					<text class="text-black">lims登录（已登录）</text>
				</view>
			</view>
			<view v-else class="cu-item arrow" @click="limsLogin">
				<view class="content">
					<image src="../../static/image/gikam.svg"  mode="aspectFit"></image>
					<text class="text-black">lims登录</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @click="cancelAcount">
				<view class="content">
					<text class="cuIcon-deletefill text-sunway-blue"></text>
					<text class="text-black">账号注销</text>
				</view>
			</view>
		</view>
		<button type="warn" class="button" @click="logout">退出登陆</button>
	</view>
</template>

<script>
	import utils from '../../common/util.js';
	import { HTTP } from '../../common/http.js'
	export default {
		data() {
			return {
				limsIsLogin : getApp().globalData.cookie != undefined && getApp().globalData.cookie != ''
			}
		},
		computed : {
		},
		methods: {
			logout : function(e) {
				utils.logout();
			},
			limsLogin : function(e) {
				utils.tryLimsLogin().then(res=>{
					this.limsIsLogin = true;
				}).catch(err=>{
					this.limsIsLogin = false;
					uni.navigateTo({
						url: '../limslogin/limslogin',
					});
				});
				
			},
			cancelAcount : function(e)	{
				uni.showModal({
					title: '确认',
					content: '是否确认注销当前账号',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({
								title: '正在注销'
							});
							HTTP(`/open/emc/projectfunction/module/bp/wechat/cancel-account`,{
								openId : getApp().globalData.openId,
								phoneNumber : getApp().globalData.phoneNumber
							}).then(res=>{
								utils.limsLogout();
								uni.clearStorageSync();			
								if(!utils.isLogin()){
									uni.navigateTo({
										url: '../login/login',
									})
								}
							}).catch(err=>{
								uni.hideLoading()
								uni.showToast({
									title: '注销失败',
									duration: 1000
								});
							});
						}
					}
				});
			
			}
		}
	}
</script>

<style>
	@import url(../option/option.css);
</style>
