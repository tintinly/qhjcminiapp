<template>
  <div>
    <uv-collapsePanel  v-slot="{open}" @toggle="toggle($event,item,parent)" :key="index" v-for="item,index in list" :title="item[showTitle]" >
	  <div class="names" :style="open?'border-bottom: 1px solid #eaeaea;':''">{{item[showName]}}</div>
      <uv-collapsePane-list  :parent="[...parent,item]" :children="children" :showName="showName" :showTitle="showTitle" :list="item[children]" v-if="item[children] && item[children].length>0"></uv-collapsePane-list>
    </uv-collapsePanel>
  </div>
</template>

<script>
export default {
	name:'uv-collapsePane-list',
	props:{
		list: {
			type: Array,
			default () {
				return []
			},
		},
		parent: {
			type: Array,
			default () {
				return []
			},
		},
		showTitle: {
			type: String,
			default: 'title',
		},
		showName: {
			type: String,
			default: 'label',
		},
		children: {//需要识别的code标识
			type: String,
			default: 'children',
		},
	},
	data() {
	  return {};
	},
	methods: {
		toggle(e,item,parent){
			this.$emit('toggle',e,item,parent)
		}
	}
	  
};
</script>

<style scoped>
	.names{
	  padding: 20px 15rpx;
	  color: #666;
	  font-size: 0.93rem;
	}
</style>