## 折叠组件
> **组件名：uv-collapsePanel 和衍生组件 uv-collapsePane-list**

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### uv-collapsePanel
#### 以更加灵活的方式实现折叠功能，高度自定义

### uv-collapsePane-list
#### 小白直接使用的折叠组件，具有不限层级，方便使用等特点

##有项目需要开发的请联系 QQ:371524845
###开发不易，如果帮助到你的，请支持 有问题请留言，作者会积极更新

### uv-collapsePanel 用法

```htm
  <collapse-panel title="父面板1">
      <p>父面板1的内容</p>
      <collapse-panel title="子面板1">
        <p>子面板1的内容</p>
		<collapse-panel title="子面板1">
		  <p>子面板1的内容</p>
		</collapse-panel>
      </collapse-panel>
      <collapse-panel title="子面板2">
        <p>子面板2的内容</p>
      </collapse-panel>
   </collapse-panel>
```

## API

### 参数
|  属性名	|    类型	| 默认值	| 说明			|
|			|			|			|				|
| title		| String 	| |  折叠面板名称	|
| open		| Boolean|false| 是否默认打开折叠面板		|
| site		| String| left	| 文字位置		|


### 事件

|  事件名	|    类型	|  回调参数	|    说明		|
|			|			|			|				|
| toggle	| function	|Boolean| 	当前面板打开状态|

### uv-collapsePane-list 用法

```htm
<template>
	<div>
		<uv-collapsePane-list :list="list"></uv-collapsePane-list>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					title: '第一章',
					label: '比如：设计样式、图标和文本、元素的位置等。',
					children: [{
						title: '第一节',
						label: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。',
						children: [
							{
							title: '第一课时',
							label: '一致一致一致一致一致一致',
							children:[{
								title: '第一课时上半章节',
								label: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。',
							},{
								title: '第一课时下半章节',
								label: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。',
							}								
							]
						}]
					}, {
						title: '第二节',
						label: '导航'
					}]
				}, {
					title: '第二章',
					label: '组件'
				}]
			};
		}
	};
</script>
```

## API

### 参数
|  属性名	|    类型	| 默认值	| 说明			|
|			|			|			|				|
| list		| Array 	| |  数据	|
| showTitle		| String|title| 数据展示的title键名		|
| showName		| String| label	| 数据展示的label键名			|
| children		| String| children	| 数据展示的children键名			|

### 事件

|  事件名	|    类型	|  回调参数	|    说明		|
|			|			|			|				|
| toggle	| function	|{open,data,parent}|当前面板数据(open：开启状态，data：当前点击的面板数据，parent：当前点击的面板父级list) |

