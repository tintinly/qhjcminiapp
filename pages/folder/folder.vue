<template>
	<view>
		<view class="margin bg-white box-radius">
			<view class="flex flex-wrap padding solid-bottom">
				<view class="basis-xs text-bold ">检测类型</view>
				<uni-data-select class="basis-lg padding-left" v-model="monitorTmplId"  :localdata="monitorTmplSelectList"
					@change="monitorTmplSelect" >
				</uni-data-select>
			</view>
			<view class="flex flex-wrap padding solid-bottom">
				<view class="basis-xs text-bold  ">测试项目</view>
				<input class="basis-lg padding-left" @click="showTestItemPicker" placeholder="请选择测试项目" disabled="true" v-model="testItems"/>
				<ba-tree-picker ref="testItemPicker" :multiple='true' @select-change="selectTestItemsChange" title="选择测试项目"
							:localdata="testItemList" valueKey="value" textKey="text" childrenKey="children" />
			</view>
			<view class="flex flex-wrap padding solid-bottom">
				<view class="basis-xs text-bold  ">点位编号</view>
				<input class="basis-lg padding-left" @blur="setPointNumber" type="text" placeholder="请输入点位编号" v-model="pointNumber"/>
			</view>
			<view class="flex flex-wrap padding solid-bottom">
				<view class="basis-xs text-bold  ">点位名称</view>
				<input class="basis-lg padding-left" @blur="setPointName" type="text" placeholder="请输入点位名称" v-model="pointName"/>
			</view>
			<view class="flex flex-wrap padding solid-bottom">
				<view class="basis-xs text-bold  ">天数</view>
				<input class="basis-lg padding-left" @blur="setDayNumber" type="number" placeholder="请输入天数" v-model="dayNumber"/>
			</view>
			<view class="flex flex-wrap padding solid-bottom">
				<view class="basis-xs text-bold  ">频次</view>
				<input class="basis-lg padding-left" @blur="setFrequency" type="number" placeholder="请输入频次" v-model="frequency"/>
			</view>
		</view>
		
		<button class="button" @tap="submit"><text class="text-white">保存</text></button>
	</view>
</template>

<script>
	import baTreePicker from "@/components/ba-tree-picker/ba-tree-picker.vue";
	export default {
		components: {
			baTreePicker
		},
		data () {
			return {
				//检测因子价格数据
				testItemIds : [],
				testItems : '',
				testItemList : [ ],
				//点位数
				folderNumber : 0,
				//检测因子价格管理数据
				detectionFactionList : [],
				
				//检测类型相关数据
				monitorTmplId : '',
				monitorTmplName : '',
				monitorTmplIdList : ['0'],
				monitorTmplValueList : [''],
				monitorTmplIndex : 0,
				monitorTmplSelectList : [],
				
				//测试名称相关数据
				testIdList : ['0'],
				testValueList : [''],
				testIndex : 0,
				
				//方法名称相关数据
				methodIdList : ['0'],
				methodValueList : [''],
				methodIndex : 0,
				
				//分析项组相关数据
				itemGroupIdList : ['0'],
				itemGroupValueList : [''],
				itemGroupIndex : 0,
				
				//点位编号
				pointNumber : '',
				//点位名称
				pointName : '',
				//天数
				dayNumber : '',
				//频次
				frequency : '',
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			var folderList = getApp().globalData.folderList;
			var folderNumber = options.number - 1;
			var monitorTmplIdList = JSON.parse(options.monitorTmplIdList);
			var monitorTmplValueList = JSON.parse(options.monitorTmplValueList);
			var monitorTmplSelectList = JSON.parse(options.monitorTmplSelectList);
			var monitorTmplIndex = 0;
			var detectionFactionList = JSON.parse(options.detectionFactionList);
			var testIdList = this.testIdList;
			var testValueList = this.testValueList;
			var testIndex = 0;
			var methodIdList = this.methodIdList;
			var methodValueList = this.methodValueList;
			var methodIndex = 0;
			var itemGroupIdList = this.itemGroupIdList;
			var itemGroupValueList = this.itemGroupValueList;
			var itemGroupIndex = 0;
			
			this.detectionFactionList = detectionFactionList;
			this.folderNumber = folderNumber;
			
			// 非新增 且 有检测类型的点位  装载数据
			if(folderNumber !== folderList.length && folderList[folderNumber].monitorTmplId != ''){
				for(var i = 0 ; i < monitorTmplIdList.length ; i++){
					if(folderList[folderNumber].monitorTmplId == monitorTmplIdList[i]){
						monitorTmplIndex = i;
						// 装载测试项目数据
						this.monitorTmplSelect(folderList[folderNumber].monitorTmplId);
					}
				}
				
				for(var i = 0 ; i < detectionFactionList.length ; i++){
					if(detectionFactionList[i].ext$.monitortmplid.indexOf(folderList[folderNumber].monitorTmplId) > -1){
						var testType = true;
						for(var j = 0 ; j < testIdList.length ; j++){
							if(testIdList[j] == detectionFactionList[i].testId){
								testType = false;
								break;
							}
						}
						//装载测试名称数据
						if(testType){
							testIdList[testIdList.length] = detectionFactionList[i].testId;
							testValueList[testValueList.length] = detectionFactionList[i].testName;
						}
						if(folderList[folderNumber].testId != '' && folderList[folderNumber].testId == detectionFactionList[i].testId){
							var methodType = true;
							for(var j = 0 ; j < methodIdList.length ; j++){
								if(methodIdList[j] == detectionFactionList[i].methodId){
									methodType = false;
									break;
								}
							}
							//装载方法名称数据
							if(methodType){
								methodIdList[methodIdList.length] = detectionFactionList[i].methodId;
								methodValueList[methodValueList.length] = detectionFactionList[i].methodName;
							}
							if(folderList[folderNumber].methodId != '' && folderList[folderNumber].methodId == detectionFactionList[i].methodId){
								var itemGroupType = true;
								for(var j = 0 ; j < itemGroupIdList.length ; j++){
									if(itemGroupIdList[j] == detectionFactionList[i].itemGroupId){
										itemGroupType = false;
										break;
									}
								}
								//装载分析项组数据
								if(itemGroupType){
									itemGroupIdList[itemGroupIdList.length] = detectionFactionList[i].itemGroupId;
									itemGroupValueList[itemGroupValueList.length] = detectionFactionList[i].itemGroupName
								}
							}
						}
					}
				}
				
				for(var j = 0 ; j < testIdList.length ; j++){
					if(folderList[folderNumber].testId != '' && folderList[folderNumber].testId == testIdList[j]){
						testIndex = j;
					}
				}
				for(var j = 0 ; j < methodIdList.length ; j++){
					if(folderList[folderNumber].methodId != '' && folderList[folderNumber].methodId == methodIdList[j]){
						methodIndex = j;
					}
				}
				for(var j = 0 ; j < itemGroupIdList.length ; j++){
					if(folderList[folderNumber].itemGroupId != '' && folderList[folderNumber].itemGroupId == itemGroupIdList[j]){
						itemGroupIndex = j;
					}
				}
				
				
			}
			
		
			this.monitorTmplIndex = monitorTmplIndex;
			this.monitorTmplIdList = monitorTmplIdList;
			this.monitorTmplValueList = monitorTmplValueList;
			this.monitorTmplSelectList = monitorTmplSelectList;
			this.testIdList = testIdList;
			this.testValueList = testValueList;
			this.testIndex = testIndex;
			this.methodIdList = methodIdList;
			this.methodValueList = methodValueList;
			this.methodIndex = methodIndex;
			this.itemGroupIdList = itemGroupIdList;
			this.itemGroupValueList = itemGroupValueList;
			this.itemGroupIndex = itemGroupIndex;
			
			// 非新增
			if (folderNumber !== folderList.length) {
				this.pointNumber = folderList[folderNumber].pointNumber;
				this.pointName = folderList[folderNumber].pointName ;
				this.dayNumber = folderList[folderNumber].dayNumber ;
				this.frequency = folderList[folderNumber].frequency ;
				this.testItemIds = folderList[folderNumber].testItemIds;
				this.testItems = folderList[folderNumber].testItems;
			}
		},
		
		methods:{
			// 显示选择器
			showTestItemPicker() {
				this.$refs.testItemPicker._show();
			},
			//监听选择（ids为数组）
			selectTestItemsChange(ids, names) {
				console.log(ids,names);
				this.testItems = names ? names : '';
				this.testItemIds = ids;
			},
			// 检测类型点击下拉列表—2023.12.27
			monitorTmplSelect(e) {
				var monitorTmplId = e;
				var monitorTmplName = '';
				for (var i = 0; i < this.monitorTmplSelectList.length; i++) {
					if (this.monitorTmplSelectList[i].value == monitorTmplId) {
						monitorTmplName = this.monitorTmplSelectList[i].text;
						break;
					}
				}
				
				var detectionFactionList = this.detectionFactionList;
				var testItemList = [];
				for(var i = 0 ; i < detectionFactionList.length ; i++){
					if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplId) > -1){
						var repeated = false;
						var mutiItemGroup = false;
						var mutiItemGroupIndex = '';
						for(var j = 0 ; j < testItemList.length ; j++){
							if(testItemList[j].itemGroupId == detectionFactionList[i].itemGroupId){
								repeated = true;
								break;
							}
							if(testItemList[j].testId == detectionFactionList[i].testId){
								mutiItemGroup = true;
								mutiItemGroupIndex = j;
								break;
							}
						}
						if(!repeated){
							if (mutiItemGroup) {
								var parent = testItemList[mutiItemGroupIndex];
								var childrenList= testItemList[mutiItemGroupIndex].children;
								childrenList[0] = {
									detectionFactionId : parent.detectionFactionId,
									testId : parent.testId,
									testName : parent.testName,
									methodId : parent.methodId,
									methodName : parent.methodName,
									itemGroupId : parent.itemGroupId,
									itemGroup : parent.itemGroup,
									text : parent.itemGroup,
									value : parent.detectionFactionId,
								};
								 childrenList[childrenList.length] = {
									detectionFactionId : detectionFactionList[i].id,
									testId : detectionFactionList[i].testId,
									testName : detectionFactionList[i].testName,
									methodId : detectionFactionList[i].methodId,
									methodName : detectionFactionList[i].methodName,
									itemGroupId : detectionFactionList[i].itemGroupId,
									itemGroup : detectionFactionList[i].itemGroupName,
									text : detectionFactionList[i].itemGroupName,
									value : detectionFactionList[i].id,
								};
							} else{
								testItemList[testItemList.length] = {
									detectionFactionId : detectionFactionList[i].id,
									testId : detectionFactionList[i].testId,
									testName : detectionFactionList[i].testName,
									methodId : detectionFactionList[i].methodId,
									methodName : detectionFactionList[i].methodName,
									itemGroupId : detectionFactionList[i].itemGroupId,
									itemGroup : detectionFactionList[i].itemGroupName,
									text : detectionFactionList[i].testName || detectionFactionList[i].itemGroupName,
									value : detectionFactionList[i].id,
									children : []
								};
							}
						}
					}
				}
				this.monitorTmplName = monitorTmplName;
				this.monitorTmplId = monitorTmplId;
				this.testItemList = testItemList;
				this.testItemIds = [];
				this.testItems = '';
				console.log(this.testItemList);
			},
			//检测类型点击下拉列表
			monitorTmplDataSet(e) {
				var monitorTmplIndex = e.target.value;
				var monitorTmplIdList = this.monitorTmplIdList;
				var detectionFactionList = this.detectionFactionList;
				var testIdList = ['0'];
				var testValueList = [''];
				for(var i = 0 ; i < detectionFactionList.length ; i++){
					if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplIdList[monitorTmplIndex]) > -1){
						var type = true;
						for(var j = 0 ; j < testIdList.length ; j++){
							if(testIdList[j] == detectionFactionList[i].testId){
								type = false;
								break;
							}
						}
						if(type){
							testIdList[testIdList.length] = detectionFactionList[i].testId;
							testValueList[testValueList.length] = detectionFactionList[i].testName;
						}
					}
				}
				this.testIdList = testIdList;
				this.testValueList = testValueList;
				this.monitorTmplIndex = monitorTmplIndex;
				this.testIndex = 0;
				this.methodIndex = 0;
				this.itemGroupIndex = 0;
			},
			
			//测试名称点击下拉列表
			testDataSet(e) {
				var testIndex = e.target.value;
				var testIdList = this.testIdList;
				var detectionFactionList = this.detectionFactionList;
				var monitorTmplId = this.monitorTmplIdList[this.monitorTmplIndex];
				var methodIdList = ['0'];
				var methodValueList = [''];
				for(var i = 0 ; i < detectionFactionList.length ; i++){
					if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplId) > -1 && testIdList[testIndex] == detectionFactionList[i].testId){
						var type = true;
						for(var j = 0 ; j < methodIdList.length ; j++){
							if(methodIdList[j] == detectionFactionList[i].methodId){
								type = false;
								break;
							}
						}
						if(type){
							methodIdList[methodIdList.length] = detectionFactionList[i].methodId;
							methodValueList[methodValueList.length] = detectionFactionList[i].methodName;
						}
					}
				}
				this.methodIdList = methodIdList;
				this.methodValueList = methodValueList;
				this.testIndex = testIndex;
				this.methodIndex = 0;
				this.itemGroupIndex = 0;
			},
			  
			//方法名称点击下拉列表
			methodDataSet(e) {
				var methodIndex = e.target.value;
				var methodIdList = this.methodIdList;
				var detectionFactionList = this.detectionFactionList;
				var testId = this.testIdList[this.testIndex];
				var monitorTmplId = this.monitorTmplIdList[this.monitorTmplIndex];
				var itemGroupIdList = ['0'];;
				var itemGroupValueList = [''];;
				for(var i = 0 ; i < detectionFactionList.length ; i++){
					if(detectionFactionList[i].ext$.monitortmplid.indexOf(monitorTmplId) > -1 && testId == detectionFactionList[i].testId && methodIdList[methodIndex] == detectionFactionList[i].methodId){
						var type = true;
						for(var j = 0 ; j < itemGroupIdList.length ; j++){
							if(itemGroupIdList[j] == detectionFactionList[i].itemGroupId){
								type = false;
								break;
							}
						}
						if(type){
							itemGroupIdList[itemGroupIdList.length] = detectionFactionList[i].itemGroupId;
							itemGroupValueList[itemGroupValueList.length] = detectionFactionList[i].itemGroupName
						}
					}
				}
				this.itemGroupIdList = itemGroupIdList;
				this.itemGroupValueList = itemGroupValueList;
			    this.methodIndex = methodIndex;
				this.itemGroupIndex = 0;
			},
			
			//分析项组点击下拉列表
			itemGroupDataSet(e) {
				this.itemGroupIndex = e.target.value;
			},
			
			//点位编号
			setPointNumber(e){
				this.pointNumber = e.target.value;
			},
			
			//点位名称
			setPointName(e){
				this.pointName = e.target.value
			},
			
			//天数
			setDayNumber(e){
				this.dayNumber = e.target.value;
			},
			
			//频次
			setFrequency(e){
				this.frequency = e.target.value;
			},
			
			//保存数据并返回前一页面
			submit(){
			  var dataType = false;
			  if(this.monitorTmplId == 0){
			    dataType = true;
			  }
			  if(this.testItemIds == 0){
			    dataType = true;
			  }
			  // if(this.monitorTmplIndex == 0){
			  //   dataType = true;
			  // }
			  // if(this.testIndex == 0){
			  //   dataType = true;
			  // }
			  // if(this.methodIndex == 0){
			  //   dataType = true;
			  // }
			  // if(this.itemGroupIndex == 0){
			  //   dataType = true;
			  // }
			  if(this.pointNumber == ''){
			    dataType = true;
			  }
			  if(this.pointName == ''){
			    dataType = true;
			  }
			  if(this.dayNumber == ''){
			    dataType = true;
			  }
			  if(this.frequency == ''){
			    dataType = true;
			  }
			  if(dataType){
			    wx.showToast({
			      title: '请完善点位信息',
			      icon: 'none',
			      duration: 1500
			    });
			  }else{
			    var folderList = getApp().globalData.folderList;
				var orginSize = folderList.length;
				folderList[this.folderNumber] = {};
			    folderList[this.folderNumber].monitorTmplId = this.monitorTmplId;
				folderList[this.folderNumber].monitorTmplName = this.monitorTmplName;
				// folderList[this.folderNumber].monitorTmplId = this.monitorTmplIdList[this.monitorTmplIndex];
				// folderList[this.folderNumber].monitorTmplValue = this.monitorTmplValueList[this.monitorTmplIndex];
			    // folderList[this.folderNumber].testId = this.testIdList[this.testIndex];
				// folderList[this.folderNumber].testValue = this.testValueList[this.testIndex];
			    // folderList[this.folderNumber].methodId = this.methodIdList[this.methodIndex];
				// folderList[this.folderNumber].methodValue = this.methodValueList[this.methodIndex];
			    // folderList[this.folderNumber].itemGroupId = this.itemGroupIdList[this.itemGroupIndex];
				// folderList[this.folderNumber].itemGroupValue = this.itemGroupValueList[this.itemGroupIndex];
				folderList[this.folderNumber].testItemIds = this.testItemIds;
				folderList[this.folderNumber].testItems = this.testItems;
			    folderList[this.folderNumber].pointNumber = this.pointNumber;
			    folderList[this.folderNumber].pointName = this.pointName;
			    folderList[this.folderNumber].dayNumber = this.dayNumber;
			    folderList[this.folderNumber].frequency = this.frequency;
			    getApp().globalData.folderList = folderList;
				if (this.folderNumber === orginSize) {
					console.log('触发了点位增加事件' )
					uni.$emit('addFolder',{})
				} else {
						console.log('触发了点位更新事件' )
					uni.$emit('updateFolder',{})
				}
			    wx.navigateBack();
			  }
			},
		},
	}
</script>

<style scoped>
	@import url(../folder/folder.css);
	@import url(../../common/uni-nvue.css);
	@import url(../../common/uni.css);
</style>