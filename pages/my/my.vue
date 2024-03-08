<template>
	<view>
		<!-- 这里是固定的导航栏 -->
		<view class="nav-bar-top" :style="'height:' + navHeight + 'px;' + 'border-width : ' + navBorder +'px;' ">
			<view class="nav-bar" :style="'top:' + statusbarHeight + 'px;' + 'height:' + nav + 'px'" >
			<!-- 	<view class="back-button"  @click="back">
					<uni-icons   custom-prefix="iconfont" type="icon-31fanhui1" size="20" color="white" ></uni-icons>
				</view> -->
				<view class="nav-title" >
					<text class="text-xl text-white">我的</text>
				</view>
			</view>
		</view>
		
		<!-- 背景图 -->
		<!-- <image src="../../static/image/top3.jpg"></image> -->
		<view class="bg-box">
	
					
			<view class="  text-lg text-center" :style="'padding-top:' + (statusbarHeight +  menuBot + 5 ) +'px;'">
				<!-- <text class="text-white text-xl">我的</text> -->
			</view>
		<!-- 	<view class="text-sm margin-top-sm" :style="'margin-left:' + (menuLeft + 5	) + 'px;'">
				<text class="text-grey ">企业编号\n{{companyInfo.clientNo}}</text>
			</view> -->
			<view class="before-userAvatar">
				<view class="userAvatar-box"  @click="toPage('../mydetail/mydetail')">
					<!-- <open-data type="userAvatarUrl"></open-data> -->
					<image class="userAvatar-image" :src="userInfo.avatar"></image>
				</view>
				<view class="userlogin"  @click="toPage('../mydetail/mydetail')">
					<view class=" text-lg margin-bottom-sm" style="text-align: left;"  >
						<text class="text-white  ">{{userInfo.nickName}}</text>
					</view>
					<view class=" text-sm " style="text-align: left;">
						<text class="text-white ">{{clientInfo.phoneNumber}}</text>
					</view>
				</view>
				<view class="userNotice" style="font-size: 25px;" @click="toPage('../todo/todo')">
					<view class="cuIcon-notice text-white"></view>
				</view>
				
			</view>
			
			<view class="order-card cu-list grid col-2  card-menu ">
				<view class="cu-item" @click="toPage('../selectorder/selectorder')">
					<view class="cuIcon-cart text-qhjc-blue" >
						<view v-if="toCommentSize > 0" class="cu-tag badge" >
							<block></block>
						</view>
					</view>
					<text>我的订单</text>
				</view>
				<view class="cu-item" @click="toPage('../selectentrust/selectentrust')">
					<view class="cuIcon-order text-qhjc-blue" >
					
					</view>
					<text>我的委托</text>
				</view>
			
			</view>
		</view>
		
		
		
		<view class="margin-left-sm margin-top-sm">
			<image mode="widthFix" class="qhjc-image" src="/static/image/loginpic2.png"></image>
		</view>
		<view class="cu-list menu card-menu  margin-bottom-xl shadow-lg">
			<view class="cu-item arrow" >
				<view class="content" @click="toPage('../selectinvoice/selectinvoice?clientNo=' + clientNo)">
					<text class="cuIcon-ticket text-qhjc-blue"></text>
					<text class="text-black">发票管理</text>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content" @click="toPage('../mydetail/mydetail')">
					<text class="cuIcon-people text-qhjc-blue"></text>
					<text class="text-black">个人资料</text>
				</view>
			</view>
		<!-- 	<view class="cu-item arrow" @click="toPage('../selectorder/selectorder')">
				<view class="content">
					<text class="cuIcon-cartfill text-qhjc-blue"></text>
					<text class="text-black">订单</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @click="toPage('../about/about')">
				<view class="content">
					<image src="../../static/image/loginpic3.png" class="png" mode="aspectFit"></image>
					<text class="text-black">关于秋毫</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="toPage('../customerservice/customerservice')">
				<view class="content">
					<text class="cuIcon-service text-qhjc-blue"></text>
					<text class="text-black">联系客服</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="toPage('../feedback/feedback')">
				<view class="content">
					<text class="cuIcon-comment text-qhjc-blue"></text>
					<text class="text-black">建议与反馈</text>
				</view>
			</view>
		
		</view>
		<view class="cu-list menu card-menu  margin-bottom-xl shadow-lg">
			<view class="cu-item arrow" @click="toPage('../option/option')">
				<view class="content">
					<text class="cuIcon-settingsfill text-qhjc-blue"></text>
					<text class="text-black">设置</text>
				</view>
			</view>
		</view>

		
	</view>
</template> 
<script>
	import my from './my.js'
	import utils from '../../common/util.js';
	export default {
		data () {
			return {
				// 顶部栏信息
				nav : getApp().globalData.nav,
				navHeight : getApp().globalData.navHeight,
				statusbarHeight : getApp().globalData.navHeight - getApp().globalData.nav,
				menuBot : getApp().globalData.menuBot,
				menuLeft : getApp().globalData.menuLeft,
				UserLogin : false,
				Adminstator: false,
				TapAccount: 0,
				unPayNum : getApp().globalData.unPayNum,
				clientNo : getApp().globalData.clientList.clientNo,
				//用户信息
				userInfo : {
					avatar : '../../static/icon/defaultAvatarBlack.jpg',
					nickName : '微信用户',
				},
				clientInfo : {
					phoneNumber : '00000000000',
				},
				companyInfo : {
					clientNo : 'xxxxxx',
				},
				cartIcon: {
					color: '#4aa1ed',
					size: '22',
					type: 'cart-filled'
				},
				gearIcon: {
					color: '#4aa1ed',
					size: '22',
					type: 'gear-filled'
				},
				personIcon: {
					color: '#4aa1ed',
					size: '22',
					type: 'person-filled'
				},
				phoneIcon: {
					color: '#4aa1ed',
					size: '22',
					type: 'phone-filled'
				},
				chatbubbleIcon: {
					color: '#4aa1ed',
					size: '22',
					type: 'chatbubble-filled'
				},
				toCommentSize : 0
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
			var UserLogin = getApp().globalData.UserLogin;
			if(!UserLogin){
				wx.navigateTo({
					url: '../login/login',
				})
			}else{
				// 用户信息
				this.clientList = getApp().globalData.clientList
				if (this.clientList.avatar != undefined && this.clientList.avatar != '') {
					this.userInfo.avatar = this.clientList.avatar
				}
				if (this.clientList.lxrPhone != undefined && this.clientList.lxrPhone != '') {
					this.clientInfo.phoneNumber = this.clientList.lxrPhone
				}
				if (this.clientList.nickName != undefined && this.clientList.nickName != '') {
					this.userInfo.nickName = this.clientList.nickName
				}
				this.companyInfo.clientNo = this.clientList.clientNo

				this.UserLogin = true;
		    }
			uni.$on('updateAvatar',this.updateAvatar)
			uni.$on('updateInfo',this.updateInfo)
			
		},
		methods:{
			// 跳转函数
			toPage: function (url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
			updateAvatar : function (e)	 {
				console.log('触发了更新头像事件')
				this.userInfo.avatar = e.avatar
			},
			updateInfo : function (e)	 {
				console.log('触发了信息事件',e)
				this.userInfo.nickName = e.nickName
				this.clientInfo.phoneNumber = e.phoneNumber
			}
		}
	}
</script>

<style scoped>
	@import url(../my/my.css);

	
	.nav-bar-top {
		 z-index: 1;
		width: 100%;
		position:fixed;
		background-color: #3881ed;
		border-style :solid ;
		border-color: #3881ed;
		top : 0px  /* 使fixed位置生效 */
	}
	
	.nav-bar {
		width: 100%;
		position:fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* border: 2px solid; */
	}
	
	.nav-title {
			position:absolute;
			left: 50%;    /* 起始是在body中，横向距左50%的位置 */
			transform:translate(-50%); /* 水平、垂直都居中,也可以写成下面的方式 */
			text-align: center;
	}
	
	
	.back-button {
		position:absolute;
		left: 1%;    
	}

	.userAvatar-image {
		/* font-weight: bold; */
		/* border-width: 1rpx; */
		/* border-color: white; */
		border-radius: 50%;
	}
	

</style>