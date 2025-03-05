<template>
	<view>
		<!-- 底部按钮栏 -->
		<view class="btn-group" :style="'bottom:' + unSafeButtomHeight + 'px;'  ">
			<slot>非固定部分</slot>
			<!--示例如下-->
			<!-- <view class="flex justify-end">
				<view><button class="radius-xl btn-sunway-blue" @click="click1" >立即支付</button></view>
				<button class="button  bg-yellow" @click="click2" >评价</button>
			</view> -->
		</view>
		<view class="safe-area" :style="'height:' + unSafeButtomHeight + 'px;'  "></view>
	</view>
</template>

<script>
	export default {
		name:"sunway-bottom-btn-group",
		props:{
			btnTitle :{
				type: String,
				default: '按钮'
			},
		},
		data() {
			return {
				// 底部相关
				unSafeButtomHeight : getApp().globalData.unSafeButtomHeight,
			};
		},
		methods : {
			btnClick(){//给父组件传值
				this.$emit('btnClick');
			}
		}
	}
</script>

<style>
	.btn-group {
		padding : 20px;
		z-index: 1;
		width: 100%;
		position: fixed;
		/* bottom : 0px; */
		background-color: #ffffff;
		/* box-shadow: -20px 0px 5px rgba(39, 48, 57, 0.05); */
	}
	
	.safe-area {
		z-index: 1;
		width: 100%;
		position: fixed;
		bottom : 0px;
		background-color: #ffffff;
		/* box-shadow: -20px 0px 5px rgba(39, 48, 57, 0.05); */
	}
</style>