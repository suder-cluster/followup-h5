#### 使用说明
---

注册组件后直接使用，支持自定义内容。

###### 使用方式

```
import scrollList from '@/components/zh-scrollList/scrollList/scrollList'
```
###### 在页面中使用组件
```
import scrollList from '@/components/zh-scrollList/scrollList/scrollList'

<scrollList :list="goods_list">
	<template #default="{rows}">
		<view class="rows">
			<view>自定义内容</view>
		</view>
	</template>
</scrollList>
```
#### 参数说明
---

| 参数			| 类型	| 默认值	| 描述								|
| ---			| ---	| ---	| ---								|
| list			| Array	| []	| 滚动循环数据						|
| time			| Number| 2000	| 滚动间隔时间（单位ms）				|
| min			| Number| 3		| 最少几条数据开始滚动				|
| height		| Number| 520	| 滚动区域的高度(单位rpx)				|
| line_height	| Number| 60	| 每次滚动的高度和每行的高度(单位rpx)	|
| name			| String| name	| 左边属性名							|
| time_name		| String| time	| 右边属性名							|

##### 示例

```
<template>
	<view class="">
		<view class="content">
			<view class="title">循环滚动列表，支持小程序、h5、app</view>
			<view class="titlea">支持slot自定义内容</view>
			<view class="scroll_list">
				<scrollList :list="goods_list">
					<template #default="{rows}">
						<view class="rows">
							<view class="">{{rows.name}}</view>
							<view class="">{{rows.time}}</view>
						</view>
					</template>
				</scrollList>
			</view>
		</view>
	</view>
</template>

<script>
	import scrollList from '@/components/zh-scrollList/scrollList/scrollList'
	export default {
		components: {
			scrollList
		},
		data() {
			return {
				goods_list: [{
						id: 1,
						name: '用户1',
						time: '54分钟前'
					},
					{
						id: 2,
						name: '用户2',
						time: '54分钟前'
					}, {
						id: 3,
						name: '用户3',
						time: '54分钟前'
					}, {
						id: 4,
						name: '用户4',
						time: '54分钟前'
					}, {
						id: 5,
						name: '用户5',
						time: '54分钟前'
					}, {
						id: 6,
						name: '用户6',
						time: '54分钟前'
					}, {
						id: 7,
						name: '用户7',
						time: '54分钟前'
					}, {
						id: 8,
						name: '用户8',
						time: '54分钟前'
					}, {
						id: 9,
						name: '用户9',
						time: '54分钟前'
					}, {
						id: 10,
						name: '用户10',
						time: '54分钟前'
					},
				]
			}
		},
		onLoad() {

		},
		methods: {

		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 24upx;

		.title {
			text-align: center;
			margin-bottom: 10upx;
			font-size: 30upx;
			color: #333;
			font-weight: bold;
		}

		.titlea {
			text-align: center;
			margin-bottom: 20upx;
			font-size: 26upx;
			color: #333;
			font-weight: bold;
		}

		.scroll_list {
			padding: 0 24upx;

			.rows {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>

```



