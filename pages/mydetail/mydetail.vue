<template>
	<view class="container">
		<uni-card :is-shadow="true" is-full>
			<text class="uni-h6">完善个人信息以及企业信息。</text>
		</uni-card>
		
		
	<!-- 	<view class="padding-sm">
			<view class="">
				<text class="cuIcon-title text-qhjc-blue padding-right-sm"></text><text class="text-bold">用户信息</text>
			</view>
			<view class="flex flex-wrap padding align-center">
				<view class="basis-xs">头像</view>
				<view class="basis-lg ">
					<view class="fr cu-avatar lg round" :style="'background-image:url(' + userInfo.avatar + ');'"></view>
				</view >
			</view>
		</view> -->
		
		
		
		<uni-section title="用户信息" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="userInfo" :model="userInfo" labelWidth	="160" :rules="userInfoRules">
				
					<uni-forms-item label="头像" >
		<!-- 				<view class="example-body custom-image-box">
							<uni-file-picker limit="1" :del-icon="false" disable-preview :imageStyles="imageStyles" file-mediatype="image">选择</uni-file-picker>
						</view> -->
						<view class="userAvatar">
							<text v-if="inputType" class="userAvatar-text" v-text="avatarDesc"></text>
							<text v-else class="userAvatar-text" ></text>
							<button v-if="!inputType" disabled="true" class="userAvatar-box" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<image class="userAvatar-image" :src="userInfo.avatar"></image>
							</button>
							<button v-else class="userAvatar-box" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<image class="userAvatar-image" :src="userInfo.avatar"></image>
							</button>
						</view>
					</uni-forms-item>
					<uni-forms-item label="昵称" >
						<uni-easyinput v-if="!inputType" disabled="true" type="nickname" v-model="userInfo.nickName" placeholder="请输入昵称" />
						<uni-easyinput v-else type="nickname" v-model="userInfo.nickName" placeholder="请输入昵称" />
					</uni-forms-item>

				</uni-forms>
			</view>
		</uni-section>
		<uni-section title="个人信息" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
			
				<uni-forms ref="personInfo" :model="personInfo" labelWidth="80px" :rules="personInfoRules">
		
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-if="!inputType" disabled="true" v-model="personInfo.name" placeholder="请输入姓名" />
						<uni-easyinput v-else v-model="personInfo.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="联系方式" required name="phoneNumber">
						<uni-easyinput disabled="true" v-model="personInfo.phoneNumber" placeholder="请输入联系方式" />
					</uni-forms-item>
					<uni-forms-item label="性别" >
						<uni-data-checkbox v-if="!inputType" disabled="true" selectedColor="blue" v-model="personInfo.sex" @change="sexChange" :localdata="sexs" />
						<uni-data-checkbox v-else v-model="personInfo.sex" selectedColor="blue" @change="sexChange" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="生日">
						<uni-datetime-picker v-if="!inputType" disabled="true" type="date" v-model="personInfo.birthday" />
						<uni-datetime-picker v-else type="date" v-model="personInfo.birthday" />
					</uni-forms-item>
		
				</uni-forms>
			</view>
		</uni-section>
		<uni-section title="企业信息" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
			
				<uni-forms ref="companyInfo" :model="companyInfo" labelWidth="80px" :rules="companyInfoRules">
					<uni-forms-item label="企业名称" required name="clientName">
						<uni-easyinput v-if="!inputType" disabled="true" v-model="companyInfo.clientName" placeholder="请输入所属企业名称" />
						<uni-easyinput v-else v-model="companyInfo.clientName" placeholder="请输入所属企业名称" />
					</uni-forms-item>
					<uni-forms-item label="企业地址" required name="address">
						<uni-easyinput v-if="!inputType" disabled="true" v-model="companyInfo.address" placeholder="请输入企业地址" />
						<uni-easyinput v-else v-model="companyInfo.address" placeholder="请输入企业地址" />
					</uni-forms-item>
					<uni-forms-item label="企业邮箱" required name="mail">
						<uni-easyinput v-if="!inputType" disabled="true" v-model="companyInfo.mail" placeholder="请输入企业邮箱" />
						<uni-easyinput v-else v-model="companyInfo.mail" placeholder="请输入企业邮箱" />
					</uni-forms-item>
				</uni-forms>
	
			</view>
		</uni-section>

		
		<button  class="button bg-qhjc-blue" v-if="!inputType" @click="changeDetail">修改基本信息</button>
		<button  class="button bg-qhjc-blue" v-else  @click="submit">保存</button>
	</view>
</template>

<script>
	import myDetail from './mydetail.js'
	import utils from '../../common/util.js';
	export default {
		data () {
			return {
				clientList : [],
				inputType : false,
				//用户信息
				avatarDesc : "请选择头像",
				userInfo : {
					avatar : '../../static/icon/defaultAvatarBlack.jpg',
					nickName : '',
				},
				//个人信息
				personInfo : {
					name : '',
					phoneNumber : '',
					birthday : '',
					mail : '',
					sex : '',
				},
				//企业信息
				companyInfo : {
					clientNo : '',
					clientName : '',
					address : '',
					mail : '',
				},
				// 性别选项
				sexs: [{
					text: '男',
					value: '0'
				}, {
					text: '女',
					value: '1'
				}, {
					text: '保密',
					value: '2'
				}],
				//表单验证规则
				personInfoRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空',
						}]
					},
				},
				companyInfoRules: {
					clientName: {
						rules: [{
							required: true,
							errorMessage: '企业名称不能为空',
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '企业地址不能为空',
						}]
					},
					mail: {
						rules: [{
							required: true,
							errorMessage: '企业邮箱不能为空',
						}]
					},
				}	
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options){
			this.loadData();
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload(){
			var ss = getApp().globalData.clientList;
			if(getApp().globalData.clientList == []){
				return;
			}
			wx.switchTab({
				url: '../my/my',
			});
		},
		methods:{
			sexChange : function (e){
			},
			onChooseAvatar: function(e) {
				this.userInfo.avatar = e.detail.avatarUrl
				this.avatarDesc = ""
				console.log(this.userInfo.avatar)
		    },
			changeDetail: function(e){
				this.inputType = true;
			},
			// 通过async和await可并发控制promise对象调用
			async validateForm()	 {
				var validateFlag = true
				await this.$refs.personInfo.validate().then(res=>{
				}).catch(err =>{
					validateFlag = false
				})
				await this.$refs.companyInfo.validate().then(res=>{
				}).catch(err =>{
					validateFlag = false
				})

				return validateFlag;

			},
			// 返回 上传头像promise对象 构造器
			uploadAvatar : function()	 {
				return new Promise((resolve,reject)=>{
					console.log('beforeAvatar',this.userInfo.avatar ) 
					if (this.userInfo.avatar == undefined) {
						resolve('')
					}
					uni.uploadFile({
						url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/upload-file',
						filePath: this.userInfo.avatar,
						name:  'file', 
						formData: {
							'targetId' : "T_EMC_CLIENT_CONTACT$wx" +  getApp().globalData.openId,
							'fileName' : '用户头像',
						},
						success: (uploadFileRes) => {
							if (uploadFileRes.statusCode === 500) {
								console.log('500')
								uni.$emit('updateAvatar',{
									avatar : this.userInfo.avatar
								})
								resolve(this.userInfo.avatar)
							} else {
								console.log('sucess')
								uni.$emit('updateAvatar',{
									avatar : uploadFileRes.data
								})
								resolve(uploadFileRes.data)
							}
						},
						fail : (uploadFileRes) => {
							console.log('fail')
							uni.$emit('updateAvatar',{
								avatar : this.userInfo.avatar
							})
							resolve(this.userInfo.avatar)
						}
					})
				})
			},
			
			submit :function(){
				var _utils = utils;
				this.validateForm().then(flag=> {
					if (flag) {
						var openid = getApp().globalData.openId;
						var _this = this;
						uni.showLoading({
							title: '数据加载中...'
						});
						// 先上传头像
						this.uploadAvatar().then(url=>{
							console.log('afterAvatar', url)
							this.userInfo.avatar = url
							wx.request({
								url: getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/update-client',
								data: {
									openId : openid,
									clientId : _this.clientList == undefined ? '' : _this.clientList.clientId,
									userInfo : this.userInfo,
									personInfo : this.personInfo,
									companyInfo : this.companyInfo
								},
								method : getApp().globalData.method,
								success: (res) =>{
									if (res.statusCode == "500") {
										wx.hideLoading();
										uni.showModal({
											title: '错误',
											content: res.data.message,
											showCancel : false,
											success : res=>{
											}
										});
							
									} 
										
									var clientList = res.data;
									_this.clientList = clientList,//微信用户登录同一个小程序时的openid是固定的，所以可以作为用户唯一标识使用
									_this.inputType = false,
									wx.hideLoading();
									this.loadData('reload');
									
								
								},
								fail: clientData=>{
									wx.showToast({
										title: '保存用户信息失败',
										icon: 'none',
										duration: 1500,
									});
								}
							})
						})
						
						
					}
				})
			},
			loadData : function(options){
				var _utils = utils;
				if(options != undefined && options == 'reload'){
					wx.request({
						url : getApp().globalData.host + '/open/emc/projectfunction/module/bp/wechat/select-client-detail',
						data : {
							openId : getApp().globalData.openId,
							phoneNumber : getApp().globalData.phoneNumber
						},
						method : 'POST',
						success : (clientData) =>{
							wx.setStorageSync('clientList', clientData.data);
							_utils.IsLogon();
							this.clientList = clientData.data;
							this.inputType = false;
							// 用户信息
							if (this.clientList.avatar != undefined || this.clientList.avatar != '') {
								this.userInfo.avatar = this.clientList.avatar
							}
							console.log(this.userInfo.avatar)
							this.userInfo.nickName = this.clientList.nickName;
							// 用户信息
							this.personInfo.name = this.clientList.lxrName;
							this.personInfo.phoneNumber = this.clientList.lxrPhone;
							this.personInfo.birthday = this.clientList.birthday;
							this.personInfo.mail = this.clientList.mail;
							this.personInfo.sex = this.clientList.sex;
							// 企业信息
							this.companyInfo.clientName = this.clientList.clientName;
							this.companyInfo.address = this.clientList.address;
							this.companyInfo.mail = this.clientList.mail;
							uni.$emit('updateInfo',{
								nickName : this.userInfo.nickName,
								phoneNumber : this.personInfo.phoneNumber
							})
						},
						fail : clientData=>{
							wx.switchTab({
								url : '../my/my',
							});
							wx.showToast({
								title : '查询用户信息失败',
								icon : 'none',
								duration : 1500
							});
						}
					})
				}else{

					this.clientList = getApp().globalData.clientList;//微信用户登录同一个小程序时的openid是固定的，所以可以作为用户唯一标识使用
					this.inputType = false;
					// 用户信息
					if (this.clientList.avatar != undefined && this.clientList.avatar != '') {
						this.userInfo.avatar = this.clientList.avatar
					}
					this.userInfo.nickName = this.clientList.nickName;
					// 用户信息
					this.personInfo.name = this.clientList.lxrName;
					this.personInfo.phoneNumber = this.clientList.lxrPhone;
					this.personInfo.birthday = this.clientList.birthday;
					this.personInfo.mail = this.clientList.mail;
					this.personInfo.sex = this.clientList.sex;
					// 企业信息
					this.companyInfo.clientName = this.clientList.clientName;
					this.companyInfo.address = this.clientList.address;
					this.companyInfo.mail = this.clientList.mail;
					
				}
			}
		}
	}
</script>
<style lang="scss">
	.container {
		padding: 15px;
		background-color: #fff;
	}
	
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.button {
		// display: flex;
		// align-items: center;
		// height: 35px;
		// line-height: 35px;
		// margin-left: 10px;
		border-radius: 80rpx;
		margin: 40rpx 50rpx;
		font-size: 35rpx;
	}
	
	
	.userAvatar {
		display:flex;
		flex-direction:row;
		align-items: center;
	}
	
	.userAvatar-text {
		width: 168px;
		height: 38px;
	    // margin-left: 20%;
		text-align: center;
	}
	
	.userAvatar-box {
	    width: 60px;
	    height: 60px;
	    // margin-left: 70%;
		border-radius: 50%;
		overflow:hidden;
		// display:flex;
		text-align: center;
	}
	
	
	.userAvatar-image {
		max-width: unset;
	    width: 60px;
	    height: 60px;
		margin-left : -48%;
		border-style: solid;
		border-width: 1rpx;
		border-color: white;
		border-radius: 50%;
	}


	
</style>
