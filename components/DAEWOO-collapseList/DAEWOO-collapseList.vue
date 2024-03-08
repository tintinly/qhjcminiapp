<template>
	<view>
		<view class="options" @click="open(item)">
			<view class="warp-up" :style="{ 'borderBottom': showChildren ? 'none' : '2rpx solid #CDCDCD' }">
				<view class="option-left">
					<!-- <view class="img"></view> -->
					<template v-if="item.headImage">
						<image class="img" :src="item.headImage" mode=""></image>
					</template>
					<template v-else>
						<view class="img"></view>
					</template>
					<view class="name" v-if="item.children">{{ item.name }}</view>
					<view class="branch" v-else>
						<view class="name">{{ item.name }}</view>
						<view class="introduce">{{ item.introduce }}</view>
					</view>
				</view>
				<view class="option-right">
					<image src="../../static/fold.svg" class="fold" v-show="showChildren"></image>
					<image src="../../static/noFold.svg" class="noFold" v-show="!showChildren"></image>
				</view>
			</view>
		</view>
		<view v-show="showChildren">
			<view class="options children"  v-for="(itemChildren,indexChildren) in item.children" :key="indexChildren"  @click="clickSelect(itemChildren)">
				<view class="children-warp-up" style="border: none;">
					<view class="children-left">
						<view class="img" style="background-color: #FFFFFF;"></view>
					</view>
					<view class="children-right" :style="{ 'borderBottom': indexChildren === item.children.length - 1? 'none' : '' }">
						<view>
							<view class="name" v-show="itemChildren.children">{{ itemChildren.name }}</view>
							<view class="branch" v-show="!itemChildren.children">
								<view class="name">{{ itemChildren.name }}</view>
								<view class="introduce">{{ itemChildren.introduce }}</view>
							</view>
						</view>
						<image src="../../static/noFold.svg" class="noFold"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			
			index: {
				type:Number,
				default: 0
			},
			
			activeIndex: {
				type:Number,
				default: 0
			}
		},
		data() {
			return {
				showChildren: false
			}
		},
		
		methods: {
			open(item) {
				// 如果无子选项不展开
				if(!item?.children?.length) {
					return this.clickSelect(item);
				};
				this.showChildren = !this.showChildren;
				if(this.showChildren){
					this.$emit("selectElement",this.index);
				} 
			},
			
			clickSelect(item) {
				this.$emit("clickSelect",item);
			}
		},
		
		watch: {
			activeIndex(val) {
				// 如果改组件不是当前选中，则关闭其他
				if(this.index != val) {
					this.showChildren = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.options {
		// padding: 30rpx 40rpx;
		padding: 0 20px;
		.warp-up {
			display: flex;
			justify-content: space-between;
			// border-bottom: 2rpx solid #CDCDCD;
			padding: 30rpx 0;
			.option-left {
				display: flex;
				.name {
					color: #313131;
					font-family: 'PingFang SC';
					font-style: normal;
					font-weight: 700;
					font-size: 32rpx;
					display: flex;
					align-items: center;
				}
				.img {
					width: 100rpx;
					height: 100rpx;
					background: #D9D9D9;
					border-radius: 6px;
					margin-right: 10px;
				}
				.branch {
					display: flex; 
					flex-direction: column;
					justify-content: space-between;
					.introduce {
						font-weight: 400;
						font-size: 28rpx;
						color: #585858;
					}
				}
			}
			.option-right {
				display: flex;
				align-items: center;
				.fold {
					width: 28rpx;
					height: 14rpx;
				}
				.noFold {
					width: 14rpx;
					height: 28rpx;
				}
			}
		}
	}
	.children {
		background: #FFFFFF;
		.children-warp-up {
			display: flex;
			border-bottom: 2rpx solid #CDCDCD;
			// padding: 30rpx 0;
			.children-left {
				display: flex;
				padding: 30rpx 0;
				.name {
					color: #313131;
					font-family: 'PingFang SC';
					font-style: normal;
					font-weight: 500;
					font-size: 32rpx;
					display: flex;
					align-items: center;
				}
				.img {
					width: 100rpx;
					height: 100rpx;
					background: #D9D9D9;
					border-radius: 6px;
					margin-right: 10px;
				}
				.branch {
					display: flex; 
					flex-direction: column;
					justify-content: space-between;
					.introduce {
						font-weight: 400;
						font-size: 28rpx;
						color: #585858;
					}
				}
			}
			.children-right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;
				border-bottom: 1px solid #CDCDCD;
				
				.branch {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name {
						color: #313131;
						font-family: 'PingFang SC';
						font-style: normal;
						font-weight: 700;
						font-size: 32rpx;
						display: flex;
						align-items: center;
					}
					.introduce {
						font-weight: 400;
						font-size: 28rpx;
						color: #585858;
					}
				}
				.fold {
					width: 28rpx;
					height: 14rpx;
				}
				.noFold {
					width: 14rpx;
					height: 28rpx;
				}
			}
		}
	}
</style>
