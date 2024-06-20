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