<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<v-layout wrap>
		<v-flex
				sm12
				lg2
				class="pa-3 mb-3 feature-pane"
		>
			<v-btn
					fab
					outline
					small
					absolute
					left
					color="primary"
					@click="$refs.calendar.prev()"
			>
				<v-icon dark>
					keyboard_arrow_left
				</v-icon>
			</v-btn>
			<v-btn
					fab
					outline
					small
					absolute
					right
					color="primary"
					@click="$refs.calendar.next()"
			>
				<v-icon
						dark
				>
					keyboard_arrow_right
				</v-icon>
			</v-btn>
			<br><br><br>
			<v-checkbox
					v-model="dark"
					label="Dark"
			></v-checkbox>
			<v-menu
					ref="startMenu"
					v-model="startMenu"
					:close-on-content-click="false"
					:nudge-right="40"
					:return-value.sync="start"
					transition="scale-transition"
					min-width="290px"
					lazy
					offset-y
					full-width
			>
				<template v-slot:activator="{ on }">
					<v-text-field
							v-model="start"
							label="Выберите день"
							prepend-icon="event"
							readonly
							v-on="on"
					></v-text-field>
				</template>
				<v-date-picker
						v-model="start"
						no-title
						scrollable
						locale="ru"
				>
					<v-spacer></v-spacer>
					<v-btn
							flat
							color="primary"
							@click="startMenu = false"
					>
						Cancel
					</v-btn>
					<v-btn
							flat
							color="primary"
							@click="$refs.startMenu.save(start)"
					>
						OK
					</v-btn>
				</v-date-picker>
			</v-menu>
		</v-flex>
		<v-flex
				sm12
				lg10
				class="pl-3"
		>
			<v-sheet elevation="1" class="mt-2 mr-2">
				<v-calendar
						ref="calendar"
						v-model="start"
						:type="type"
						:start="start"
						:end="end"
						:min-weeks="minWeeks"
						:max-days="maxDays"
						:now="now"
						:dark="dark"
						:weekdays="weekdays"
						:first-interval="intervals.first"
						:interval-minutes="intervals.minutes"
						:interval-count="intervals.count"
						:interval-height="intervals.height"
						:interval-style="intervalStyle"
						:show-interval-label="showIntervalLabel"
						:color="color"
						locale="ru-RU"
						:interval-format="intervalFormat"
				>

					<template v-slot:dayHeader="{ day, date }">
						<v-layout>
							<v-flex xs3 class="pa-1 calendar-border-right calendar-border-top"
									v-for="roomEvent in roomEvents"
									:key="roomEvent.room"
							>
								<div>
									{{ roomEvent.room }}
								</div>
							</v-flex>
						</v-layout>
					</template>
					<template v-slot:interval="{ hour, date, minutes, time }">
						<v-layout class="fill-height">
							<v-flex xs3 class="calendar-border-right fill-height pa-1"
									v-for="(roomEvent, i) in getRoomEvents(date, time)"
									:class="test(roomEvent)"
									:key="'roomEventtitle'+i"
							>
								<v-card
										:height="intervals.height - 12"
										:class="roomEvent.className"
										v-if="roomEvent.timeStart === time && roomEvent.date === date"
										disabled
								>
									<v-card-text

									>
										<div class="grey--text text--darken-1">
											{{ roomEvent.title }}
										</div>
										<div>
											{{ roomEvent.text }}
										</div>
									</v-card-text>
								</v-card>
								<v-card
										:height="intervals.height - 12"
										v-else
										disabled
								>
									<v-card-text

									>
										<div class="grey--text text--darken-1">
											пустая ячейка
										</div>
										<div>
										</div>
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</template>
				</v-calendar>
			</v-sheet>
		</v-flex>
	</v-layout>
</template>

<script>

	const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

	const intervalsDefault = {
		first: 8,
		minutes: 60,
		count: 13,
		height: 140
	}

	const styling = {
		default () {
			return undefined
		},
		workday (interval) {
			const inactive = interval.weekday === 0 ||
				interval.weekday === 6 ||
				interval.hour < 9 ||
				interval.hour >= 17
			const startOfHour = interval.minute === 0
			const dark = this.dark
			const mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

			return {
				backgroundColor: inactive ? (dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined,
				borderTop: startOfHour ? undefined : '1px dashed ' + mid
			}
		},
		past (interval) {
			return {
				backgroundColor: interval.past ? (this.dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined
			}
		}
	}
	import {mapGetters, mapActions} from 'vuex'

	export default {
		data: () => ({
			dark: false,
			startMenu: false,
			start: new Date().toISOString().substr(0, 10),
			endMenu: false,
			end: null,
			nowMenu: false,
			minWeeks: 1,
			now: null, //new Date("yyyy-mm-dd").format("yyyy-mm-dd"),
			type: 'day',
			weekdays: weekdaysDefault,
			intervals: intervalsDefault,
			maxDays: 7,
			styleInterval: 'default',
			color: 'primary',
		}),
		computed: {
			...mapGetters([
				'roomEvents'
			]),

			intervalStyle () {
				return styling[ this.styleInterval ].bind(this)
			},
			hasIntervals () {
				return this.type in {
					'week': 1, 'day': 1, '4day': 1, 'custom-daily': 1
				}
			},
			hasEnd () {
				return this.type in {
					'custom-weekly': 1, 'custom-daily': 1
				}
			}
		},
		methods: {
			showIntervalLabel (interval) {
				return interval.minute === 0
			},
			intervalFormat(interval) {
				return interval.hour + ':00'
			},
			getRoomEvents(date, time){
				let result = []

				this.roomEvents.forEach(function (roomEvent, index, arr){
					result[index] = {
						title: null,
						text: null,
						className: null,
						date: date,
						timeStart: time,
						timeEnd: '10:00'
					}
					roomEvent.items.forEach(function (subItem, subIndex, subArr){
						if (subItem.date === date && subItem.timeStart === time) {
							result[index] = subItem
						}
					})
				})
				console.log(result);
				return result
			},

			test(data){
				// console.log(data);
				return data
			}
		},
		name: "app-calendar"
	}
</script>

<style scoped>
	.feature-pane {
		position: relative;
		padding-top: 30px;
		box-shadow: 0 0 10px rgba(0,0,0,0.3);
	}
</style>
<style>
	.v-calendar-daily__interval-text{
		top: 50% !important;
		font-size: 10px !important;
		transform: translateY(-50%) !important;
	}
	.v-calendar-daily__scroll-area {
		overflow: auto !important;
		padding-right: 17px;
	}
	.calendar-border-right {
		border-right: #e0e0e0 1px solid;
	}
	.calendar-border-top {
		border-top: #e0e0e0 1px solid;
	}
</style>