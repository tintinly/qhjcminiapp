<template>
	<view >
		<view style="padding: 5px 12px;">
			<uni-card :is-shadow="true" is-full>
				<text class="uni-h6">请输入或拍照上传委托内容</text>
			</uni-card>
		</view>
		
		<view class="content-box ">
			<view class="content-row solid-bottom">
				<view class="title-bar bg-white  ">
					<view class="margin-left">
						图片上传
					</view>
					
					<view class="margin-right">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="content-bar">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="content-row ">
				<view class="title-bar bg-white ">
					<view class="margin-left">
						委托内容
					</view>
					<view class="margin-right">
						{{wordCount}}/200
					</view>
				</view>
					
				<view class="content-bar ">
					<uni-easyinput type="textarea" auto-height="true"  maxlength=200 v-model="entrustContent" @input="spyInput($event)" placeholder="请输入委托内容(200字以内)"></uni-easyinput>
				</view>
			</view>
			
		</view>
		
		
		<button class="button bg-qhjc-blue" @click="submit"><text class="text-white">提交</text></button>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				entrustContent : '',
				wordCount : 0
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options){
			this.loadData();
		},
		methods: {
			loadData : function(e)	 {
				
			},
			spyInput:function(e){
				console.log(e)
			   this.wordCount = e.length
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					},
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			submit : function(e) {
				if (!this.validateForm()) {
					return
				}
				uni.showModal({
					title: '确定',
					content: '确定提交该委托单？',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '上传中'
							})
							uni.request({
								url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/submit-entrust',
								data : {
									entrustContent : this.entrustContent,
									openId : getApp().globalData.openId,
									clientId : getApp().globalData.clientList.clientId,
									clientContactId : getApp().globalData.clientList.clientContactId
								},
								method : 'POST',
								success : (enTrustId) =>{
									console.log('enTrustId',enTrustId)
									if (enTrustId.statusCode==500) {
										uni.hideLoading()
										uni.showToast({
											title:'提交时发生错误',
											duration:1500,
											icon:'none'
										})
									} else if (enTrustId.statusCode==404) {
										uni.hideLoading()
										uni.showToast({
											title:'网络错误',
											duration:1500,
											icon:'error'
										})
									} else {
										// 上传照片 至 lims系统附件
										if (this.imgList.length > 0) {
											for (var i = 0; i < this.imgList.length; i++) {
												var fileIndex = i;
												uni.uploadFile({
													url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/upload-file',
													filePath: this.imgList[i],
													name:  'file', 
													formData: {
														'targetId' : "T_EMC_WX_ENTRUST$" + enTrustId.data,
														'fileName' : '委托单附照' + fileIndex + 1
													},
													success: (uploadFileRes) => {
															console.log(uploadFileRes)
																
															if (uploadFileRes.statusCode === 500) {
																uni.hideLoading()
																uni.showToast({
																	title : '上传图片错误',
																	icon: 'error',
																	duration : 1500,
																})
												
															} else{
																uni.hideLoading()
																uni.navigateBack()
																uni.showModal({
																	title: '提示',
																	content: '请前往【我的->我的委托】查看委托单',
																	showCancel : false,
																});
																											
															} 
													},
													fail : (uploadFileRes) =>{
														uni.hideLoading()
														uni.showToast({
															title : '上传图片错误',
															icon: 'error',
															duration : 1500,
														})
													}
												});
											}
										} else {
											uni.hideLoading()
											uni.navigateBack()
											uni.showModal({
												title: '提示',
												content: '请前往【我的->我的委托】查看委托单',
												showCancel : false,
											});
										}
									}
								
								
								},
								fail : res=>{
									uni.hideLoading()
									uni.showToast({
										title : '提交错误',
										icon: 'error',
										duration : '1500',
									})
								}
							})
						}
						
		
					}
				})
			},
			validateForm : function(e) {
				console.log('this.entrustContent',this.entrustContent)
				console.log('this.imgList',this.imgList)
				if (this.entrustContent == '' && this.imgList.length === 0) {
					uni.showToast({
						title: '请上传照片或输入委托内容',
						duration: 1500,
					});
					return false
				} else {
					return true;
				}
			}
		}
		
	}
</script>

<style lang="scss">

	
	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
		color: #333;
	}
	

	
	.button{
		border-radius: 80rpx;
		margin: 40rpx 50rpx;
		font-size: 35rpx;
		background-color: cornflowerblue;
	}
		
	.content-box {
		margin: 15rpx 27rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
		box-shadow: 10px 10px 5px rgba(39, 48, 57, 0.05);
	}
	
	.content-row {
		// padding : 15rpx 27rpx;
		background-color: #ffffff;
		// border-style: solid;
		// border-width: 2px;
		border-radius: 16rpx;
		padding: 5px;
	}
		
	.title-bar {
		display: flex;
		position: relative;
		align-items: center;
		border-radius: 16rpx;
		min-height: 70upx;
		justify-content: space-between;
	}
	
	.content-bar {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100rpx;
		border-radius: 16rpx;
		justify-content: space-between;
}
</style>
