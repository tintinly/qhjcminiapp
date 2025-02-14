<template>
	<view>
		<view class="margin padding-sm bg-white border-radius" @longpress="copy">
			<text class="text-bold">{{company}}\n</text>
			<text>{{contact}}</text><text style="color: blue;"  @tap="callPhone" >{{phoneNumber}}</text><text>\n</text>
			<text>{{email}}\n</text>
			<text>{{address}}\n</text>
		</view>
	
		<button  class="button bg-sunway-blue" open-type='contact'><text class="text-white">客服会话</text></button>
	<!-- 	<uni-group class="map-card" mode="card" >
			<view class="map">
				<map id="map"
				show-location="true" >     
				</map>
			</view>
		</uni-group> -->
		<!-- <button type="sucess" class="cu-btn"  @click="copy"> 测试</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				company : '江阴秋毫检测有限公司',
				contact : '联系电话：', phoneNumber : '0510-86803490',
				email : '公司邮箱：qiuhaojiance@163.com',
				address : '公司地址：江阴市砂山路85号百桥生物园B座、江阴市科技大道88号（在建）'
			}
		},
		methods: {
			/*拨打电话*/
			callPhone(e){
				var phoneNumber = this.phoneNumber
			    wx.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			copy(e) {
				var copyContent = this.company + '\n'+ this.contact + this.phoneNumber + '\n' + this.email + '\n' + this.address;
				console.log(copyContent)
			
				uni.setClipboardData({
			 	    data: copyContent,
			    	success: function () {
						//调用方法成功
						console.log('copy success');
					}
				})
			}
		}
	}
</script>

<style>
	.box-radius {
	    border-radius: 16rpx;
	    box-shadow: 10rpx 10rpx 5rpx rgba(39, 48, 57, 0.05);
	}
	
	.text {
	  /* 字体大小 */
	  font-size: 20px;
	  /* 字体颜色 */
	  /* color: red; */
	  /* 字体风格-粗细 */
	  font-weight: bold;
	}

	.map {
	  /* position: absolute; */
	  width: 100%;
	  height: 80%;
	  bottom: 20%;
	}

	.button{
			/* border-radius: 80rpx; */
			margin: 40rpx 50rpx;
			font-size: 35rpx;
			
		}
</style>
