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
					label: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。',
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
						}, {
							title: '第二课时',
							label: '反馈反馈反馈反馈反馈反馈反馈'
						}, {
							title: '第三课时',
							label: '效效率效率率'
						}, {
							title: '第四课时',
							label: '可控'
						}]
					}, {
						title: '第二节',
						label: '导航',
						children: [{
							title: '侧向导航',
							label: '侧向导航'
						}, {
							title: '顶部导航',
							label: '顶部导航'
						}]
					}]
				}, {
					title: '第二章',
					label: '组件',
					children: [{
						title: '第一节',
						label: '第一节第一节第一节第一节',
						children: [{
							title: 'layout',
							label: 'Layout 布局'
						}, {
							title: 'color',
							label: 'Color 色彩'
						}, {
							title: 'typography',
							label: 'Typography 字体'
						}, {
							title: 'icon',
							label: 'Icon 图标'
						}, {
							title: 'button',
							label: 'Button 按钮'
						}]
					}, {
						title: '第二节',
						label: '第二节',
						children: [{
							title: 'radio',
							label: 'Radio 单选框'
						}, {
							title: 'checkbox',
							label: 'Checkbox 多选框'
						}, {
							title: 'input',
							label: 'Input 输入框'
						}, {
							title: 'input-number',
							label: 'InputNumber 计数器'
						}, {
							title: 'select',
							label: 'Select 选择器'
						}, {
							title: 'cascader',
							label: 'Cascader 级联选择器'
						}, {
							title: 'switch',
							label: 'Switch 开关'
						}, {
							title: 'slider',
							label: 'Slider 滑块'
						}, {
							title: 'time-picker',
							label: 'TimePicker 时间选择器'
						}, {
							title: 'date-picker',
							label: 'DatePicker 日期选择器'
						}, {
							title: 'datetime-picker',
							label: 'DateTimePicker 日期时间选择器'
						}, {
							title: 'upload',
							label: 'Upload 上传'
						}, {
							title: 'rate',
							label: 'Rate 评分'
						}, {
							title: 'form',
							label: 'Form 表单'
						}]
					}, {
						title: 'data',
						label: 'Data',
						children: [{
							title: 'table',
							label: 'Table 表格'
						}, {
							title: 'tag',
							label: 'Tag 标签'
						}, {
							title: 'progress',
							label: 'Progress 进度条'
						}, {
							title: 'tree',
							label: 'Tree 树形控件'
						}, {
							title: 'pagination',
							label: 'Pagination 分页'
						}, {
							title: 'badge',
							label: 'Badge 标记'
						}]
					}, {
						title: 'notice',
						label: 'Notice',
						children: [{
							title: 'alert',
							label: 'Alert 警告'
						}, {
							title: 'loading',
							label: 'Loading 加载'
						}, {
							title: 'message',
							label: 'Message 消息提示'
						}, {
							title: 'message-box',
							label: 'MessageBox 弹框'
						}, {
							title: 'notification',
							label: 'Notification 通知'
						}]
					}, {
						title: 'navigation',
						label: 'Navigation',
						children: [{
							title: 'menu',
							label: 'NavMenu 导航菜单'
						}, {
							title: 'tabs',
							label: 'Tabs 标签页'
						}, {
							title: 'breadcrumb',
							label: 'Breadcrumb 面包屑'
						}, {
							title: 'dropdown',
							label: 'Dropdown 下拉菜单'
						}, {
							title: 'steps',
							label: 'Steps 步骤条'
						}]
					}, {
						title: 'others',
						label: 'Others',
						children: [{
							title: 'dialog',
							label: 'Dialog 对话框'
						}, {
							title: 'tooltip',
							label: 'Tooltip 文字提示'
						}, {
							title: 'popover',
							label: 'Popover 弹出框'
						}, {
							title: 'card',
							label: 'Card 卡片'
						}, {
							title: 'carousel',
							label: 'Carousel 走马灯'
						}, {
							title: 'collapse',
							label: 'Collapse 折叠面板'
						}]
					}]
				}, {
					title: '第三章',
					label: '资源',
					children: [{
						title: 'axure',
						label: 'Axure Components'
					}, {
						title: 'sketch',
						label: 'Sketch Templates'
					}, {
						title: 'jiaohu',
						label: '组件交互文档'
					}]
				}]
			};
		}
	};
</script>