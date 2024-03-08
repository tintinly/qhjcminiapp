<template>
	<div class="collapse-panel" >
		<div class="collapse-panel2" >
			<div class="header" :style="site=='left'?'justify-content: space-between;':'justify-content: flex-start;'">
				<span v-if="site=='left'">{{ title }}</span>
				<image style="width: 32rpx;" mode="widthFix" v-if="isOpen" src="./bu.png"></image>
				<image style="width: 32rpx;" mode="widthFix" v-else src="./rg.png"></image>
				<span v-if="site!='left'">{{ title }}</span>	
			</div>
			<div class="header2" @click="toggle" :style="site=='left'?'justify-content: space-between;':'justify-content: flex-start;'">
				<span v-if="site=='left'">{{ title }}</span>
				<image style="width: 32rpx;" mode="widthFix" v-if="isOpen" src="./bu.png"></image>
				<image style="width: 32rpx;" mode="widthFix" v-else src="./rg.png"></image>
				<span v-if="site!='left'">{{ title }}</span>	
			</div>
			<transition name="slide-up">
				<div v-show="isOpen" class="content" >
					<slot :open="isOpen"></slot>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CollapsePanel',
		props: {
			title: String,
			open: Boolean,
			site: { //文字位置
				type: String,
				default: 'left',
			},
		},
		data() {
			return {
				isOpen: this.open || false
			};
		},
		methods: {
			toggle() {
				if (this.isOpen) {
					this.closeAllDescendants(this.$slots.default);
				}
				this.isOpen = !this.isOpen;
				this.$emit('toggle',this.isOpen)
			},
			closeAllDescendants(slots) {
				if (slots) {
					slots.forEach(slot => {
						if (slot.componentInstance && slot.componentInstance.$options.name === 'CollapsePanel') {
							slot.componentInstance.isOpen = false;
							this.closeAllDescendants(slot.componentInstance.$slots.default);
						}
					});
				}
			}
		}
	};
</script>
<style scoped>
	.collapse-panel {
		overflow: hidden;
	    line-height: 50rpx;
	}
	.content {
		padding: 0 15rpx;
		overflow: hidden;
	}



	.slide-up-enter-active,
	.slide-up-leave-active {
		transition: all .5s ease;
	}

	.slide-up-enter,
	.slide-up-leave-to {
		transform: translateY(-100%);
	}

	.collapse-panel2 {
		position: relative;
	}

	.header {
		cursor: pointer;
		padding: 25rpx 15rpx;
		display: flex;
		align-items: center;
		font-size: 1rem;
		border-bottom: 1px solid #eaeaea;
	}

	.header2 {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		cursor: pointer;
		padding: 25rpx 15rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		z-index: 1;
		font-size: 1rem;
		border-bottom: 1px solid #eaeaea;
	}
	.header2:active{
		background-color: #f5f5f5;
	}

	.arrow {
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 6px 4px 0 4px;
		border-color: #999 transparent transparent transparent;
		transition: transform 0.3s ease;
	}

</style>