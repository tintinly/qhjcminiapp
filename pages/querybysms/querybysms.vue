<template>
	<view>
		
		
		<view class="cu-modal" :class="modalName=='queryOtherModal'?'show':''">
			<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">提示</view>
						<view class="action" @tap="modalName = ''">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						查询其他将丢失当前数据，是否继续？
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="modalName = ''">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="clearQueryResult">确定</button>
						</view>
					</view>
				</view>
		</view>
		
		<view v-if="validClient.clientNo && validClient.clientNo != ''">
			<view class="margin-sm flex justify-between">
				<view>已查询到<text class="text-bold">{{validClient.clientName}}</text></view>
				<view ><text class="text-blue" @click="modalName = 'queryOtherModal'">查询其他？</text></view>
			</view>
			<sunway-empty-data v-if="!projectList || projectList.length == 0" imgSrc="/static/image/cue/empty.svg"></sunway-empty-data>
			<view class="margin bg-white radius-lg" v-for="item in projectList"  @tap="toPage('../projectdetail/projectdetail?projId=' + item.projId)">
				<view class="flex flex-wrap padding-xs  solid-bottom align-center radius">
					<view class="text-cut" style="flex-basis: 70% ">
						<text class="cuIcon-form text-sm text-sunway-blue margin-right-xs"></text><text class="text-bold">{{item.projName}}</text>
					</view>
					<view style="flex-basis: 30%">
						<view class=" fr title-text-right-text padding-lr padding-xs">{{item.projNode}}</view>
					</view>
				</view>
				<view class="grid col-1 padding-sm" >
					<view class="margin-bottom-sm"><text class="text-grey">任务编号 ：{{item.projNo}}</text></view>
					<view class=""><text class="text-grey">下达时间 ：{{item.createdTime}}</text></view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="inputBox">
				<view>
					<input placeholder="请输入企业名称" v-model="validClient.clientName"/>
				</view>
				<view @tap="searchClientByClientName">
					<text >{{searchBtnText}}</text>
				</view>
			</view>
			<view v-if="searchClient.clientNo && searchClient.clientNo != ''"  class="bg-white margin-top margin-lr radius-lg" >
				<view class="padding-sm">
					<view class="solid-bottom padding-bottom-sm"  >
						<view class=""><text class="cuIcon-form  text-sunway-blue margin-right"></text> <text class="text-bold">企业信息</text></view>
					</view>
					<view class="flex dashed-bottom padding-tb-sm justify-between"  >
						<view class="text-grey ">企业名称</view>
						<view class="">{{searchClient.clientName}}</view>
					</view>
					<view class="flex dashed-bottom padding-tb-sm justify-between"  >
						<view class="text-grey ">企业地址</view>
						<view class="">{{searchClient.address}}</view>
					</view>
					<view class="flex dashed-bottom padding-tb-sm justify-between"  >
						<view class="text-grey ">统一社会信用代码</view>
						<view class="">{{searchClient.creditCode}}</view>
					</view>
					<view class="flex dashed-bottom padding-tb-sm justify-between"  >
						<view class="text-grey ">企业联系人</view>
						<!-- <view class="flex-treble fr"><view class="fr">{{clientContactList[0].lxrName}}</view></view> -->
						<view class="margin-left-lg">
							<select-lay :value="lxrName" name="lxrName" slabel="lxrName" svalue="lxrName" placeholder="选择联系人"
								:options="searchClientContactList" @selectitem="selectLxr">
							</select-lay>
						</view>
					</view>
					<view class="flex dashed-bottom padding-tb-sm justify-between"  >
						<view class="text-grey ">联系电话</view>
						<view class="">{{lxrPhone && lxrPhone.length > 3 ? (lxrPhone.substring(0,3) + '****' + lxrPhone.substring(lxrPhone.length - 4)) : '' }}</view>
					</view>
					<view class="flex dashed-bottom padding-tb-sm justify-between"  >
						<view class="text-grey ">验证码</view>
						<view class="flex justify-end">
							<view class="text-right margin-right-sm">
								<input placeholder="请输入验证码" v-model="captcha"/>
							</view>
							<view v-if="codeBtnText == '获取验证码'"  @tap="getCaptcha">
								<text class="text-sunway-blue" >{{codeBtnText}}</text>
							</view>
							<view v-else>
								<text class="text-grey">{{codeBtnText}}</text>
							</view>
						</view>
					</view>
					<view class="" >
						<button  class="btn-sunway" line- @click="submitQuery()">提交</button>
					</view>
				</view>
			</view>
			<view v-if="errorMsg && errorMsg != ''" class="errorMsg "><text class=" text-red">{{errorMsg}}</text></view>
		</view>
		
		<!-- <view class="inputBox">
			<view>
				<input placeholder="请输入验证码" v-model="captcha"/>
			</view>
			<view v-if="codeBtnText == '获取验证码'"  @tap="getCaptcha">
				<text class="text-sunway-blue" >{{codeBtnText}}</text>
			</view>
			<view v-else>
				<text class="text-grey">{{codeBtnText}}</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import utils from '../../common/util.js';
	import { HTTP } from '../../common/http.js';
	export default {
		data() {
			return {
				modalName : '',
				searchBtnText : '查询',
				codeBtnText : '获取验证码',
				errorMsg : '',
				
				validClient : {
					clientNo : '',
					clientName : '',
				},
				searchClient : {},
				searchClientContactList : [],
				lxrName : '',
				lxrPhone : '',
				captcha : '',
				countDownTime : 60,
				
				projectList : [],
				
				/* pageInfo : {
					pageSize : 10,  // 每页数据量
					pageNum : 1,       // 当前第几页
					total : 0, // 总数据量
				}, */
			}
		},
		onLoad () {
			var validClient = utils.getTempCache('querybysms_clientNo');
			if (validClient) {
				this.validClient = validClient;
			}
			if (this.validClient.clientNo && this.validClient.clientNo != '') {
				this.loadProjData(this.validClient.clientNo);
			}
		},
		/* onReachBottom(){
			let dataSize = this.pageInfo.pageNum * this.pageInfo.pageSize
			if(dataSize < this.pageInfo.total){
				//当前条数小于总条数 则增加请求页数
				this.pageInfo.pageNum ++;
				this.loadData() // 调用加载数据方法
			}else{
				// console.log('已加载全部数据')
			}
		},
		onPullDownRefresh () {
			this.list = []
			this.pageInfo = {
				pageSize : 10,
				pageNum : 1,
				total : 0
			};
			this.loadData()
			setTimeout(() => {
			  uni.stopPullDownRefresh ();
			}, 1000);
		}, */
		methods: {
			toPage : function (url){
				uni.navigateTo({
					url : url 
				})
			},
			searchClientByClientName() {
				var clientName = this.validClient.clientName;
				if (clientName && clientName != '') {
					HTTP(`/open/emc/projectfunction/module/bp/wechat/select-client-detail`,{
						clientName : clientName
					}).then(res=>{
						var searchClient = res.data.client;
						var searchClientContactList = res.data.clientContactList;
						if (searchClient != undefined) {
							this.searchClient = searchClient;
							this.searchClientContactList = searchClientContactList;
							if (searchClientContactList.length > 0) {
								this.lxrName = searchClientContactList[0].lxrName ;
								this.lxrPhone = searchClientContactList[0].lxrPhone ;
							}
							this.errorMsg = ''
						} else {
							this.errorMsg = '未查询到相关企业信息'
						}
					}).catch(err=>{
						that.codeBtnText = '获取验证码';
					});
				} else {
					uni.showToast({
						title: '请输入企业名称',
						icon: 'none',
						duration: 2000
					})
				}
				this.codeLimit = false;
			},
			selectLxr(index, item) {
				this.lxrName = item.lxrName ;
				this.lxrPhone = item.lxrPhone ;
			},
			getCaptcha() {
				var that = this;
				var lxrPhone = this.lxrPhone;
				var searchClient = this.searchClient;
				lxrPhone = '13025137449';
				if (searchClient && searchClient != {} && lxrPhone && lxrPhone != '' ) {
					HTTP(`/open/emc/projectfunction/module/bp/wechat/send/captcha/${lxrPhone}`,{},{},'GET').then(res=>{
						if (res.data.code == 200) {
							var countDownTime = that.countDownTime
							countDownTime--;
							that.codeBtnText = countDownTime + ' 秒后重新获取';
							var countDown = setInterval(function () {
								countDownTime--;
								that.codeBtnText = countDownTime + ' 秒后重新获取';
								if (countDownTime <= 0) {
									clearInterval(countDown);
									that.codeBtnText = '获取验证码';
									that.countDownTime = 60;
								}
							}, 1000)
						} else if (res.data.code == 500) {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							});
						}
					}).catch(err=>{
						that.codeBtnText = '获取验证码';
					});
				} else {
					uni.showToast({
						title: '所查企业或企业联系人信息不存在',
						icon: 'none',
						duration: 2000
					});
				}
			},
			submitQuery() {
				var lxrPhone = this.lxrPhone;
				var captcha = this.captcha;
				var clientNo = this.searchClient.clientNo;
				lxrPhone = '13025137449';
				if (!captcha || captcha == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 2000
					});
					return;
				} 
				if (!lxrPhone || lxrPhone == '') {
					uni.showToast({
						title: '企业联系人联系方式为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				
				HTTP(`/open/emc/projectfunction/module/bp/wechat/validate/${lxrPhone}/${captcha}`,{},{},'get').then(res=>{
					if (res.data == true) {
						// 有效期一天
						this.validClient.clientNo = clientNo;
						utils.setTempCache('querybysms_clientNo',this.validClient, 24);
						this.loadProjData(this.validClient.clientNo);
					} else {
						this.errorMsg = '验证码错误';
					}
				}).catch(err=>{
				});
			},
			loadProjData(clientNo) {
				// var pageInfo = this.pageInfo;
				HTTP(`/open/emc/projectfunction/module/bp/wechat/select-project`,{
					clientNo : clientNo ,
					// pageInfo : pageInfo
				}).then(res=>{
					var dataList = res.data;
					if(dataList.length == 0){
						this.projectList = []
					}else{
						var projectList = [];
						for(var i = 0 ; i < dataList.length ; i++){
							projectList[projectList.length] = {
								projId : dataList[i].projId,
								projName : dataList[i].projName,
								projNode : dataList[i].projNode,
								projNo : dataList[i].projNo !== undefined ?  dataList[i].projNo : '无',
								createdTime : dataList[i].createdTime,
								fileList : dataList[i].projFile
							}
						}
						// this.pageInfo.total = res.data.total
						//新数据push到列表中
						// this.projectList.push(...projectList)
						this.projectList = projectList;
					}
				}).catch(err=>{
					var projectList = [];
				});
			},
			clearQueryResult() {
				Object.assign(this, {
					modalName : '',
					searchBtnText : '查询',
					codeBtnText : '获取验证码',
					errorMsg : '',
					
					validClient : {
						clientNo : '',
						clientName : this.validClient.clientName,
					},
					searchClient : {},
					searchClientContactList : [],
					lxrName : '',
					lxrPhone : '',
					captcha : '',
					countDownTime : 60,
					
					projectList : [],
				});
				utils.clearTempCache('querybysms_clientNo');
			}
		}
	}
</script>

<style>
	@import url(../querybysms/querybysms.css);
</style>
