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
			<a class="text-xs-center date-now" @click="start = now.date">
				Сегодня: <br>
				{{ now.string }}
			</a>

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
			<v-card>
				<v-card-text>Фильтры по комнатам</v-card-text>
				<v-card-text class="pt-0">
					<v-checkbox
							ref="roomsFilter"
							class="mt-1"
							:light="false"
							v-for="(roomEvent, i) in roomEvents"
							:key="roomEvent.room"
							v-model="roomEvent.active"
							:label="roomEvent.room"
							hide-details
							color="blue accent-4"
					></v-checkbox>
					<div class="text-xs-right mt-2">
						<v-btn small
								@click="resetRoomEventsActive(roomEvents, roomsFilterDefault)"
						>сбросить фильтр</v-btn>
					</div>

				</v-card-text>
			</v-card>
			<v-card class="mt-3">
				<v-card-text>Фильтры по спикеру</v-card-text>
				<v-card-text class="pt-0">
					<v-checkbox
							class="mt-1"
							:light="false"
							v-for="(speaker, i) in getSpeakers"
							:key="speaker.title + i"
							@change="onChangeSpeaker({value: $event, speaker: {name: speaker.speaker.name}})"
							:label="speaker.speaker.name"
							hide-details
							:input-value="speaker.speaker.active"
							color="blue accent-4"
					></v-checkbox>
					<div class="text-xs-right mt-2">
						<v-btn small
								@click="resetCheckboxesSpeaker(roomsFilterDefault)"
						>сбросить фильтр</v-btn>
					</div>

				</v-card-text>
			</v-card>
			<v-card class="mt-3">
				<v-card-text>Филтр по направлению</v-card-text>
				<v-card-text class="pt-0">
					<v-checkbox
							class="mt-1"
							:light="false"
							v-for="(eventType, i) in getEventType"
							:key="eventType.title + i"
							@change="onChangeEventType({value: $event, eventType: {name: eventType.eventType.name}})"
							:label="eventType.eventType.name"
							hide-details
							:input-value="eventType.eventType.active"
							color="blue accent-4"
					></v-checkbox>
					<div class="text-xs-right mt-2">
						<v-btn small
								@click="resetCheckboxesEventType(roomsFilterDefault)"
						>сбросить фильтр</v-btn>
					</div>

				</v-card-text>
			</v-card>
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
									:class="roomEvent.active ? '' : 'hide'"
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
									v-for="(roomEvent, i) in getRoomEventsTime(date, hour)"
									:key="'roomEventtitle'+i"
									:class="roomEvent.active ? '' : 'hide'"
							>
								<v-card
										dark
										:height="intervals.height - 12"
										:class="roomEvent.speaker.active && roomEvent.eventType.active ? roomEvent.className : roomEvent.className + ' disabled'"
										:style="roomEvent.style"
										v-if="roomEvent.title"
										disabled
								>
									<v-layout class="fill-height wrap">
										<v-flex>
											<v-card-text>
												<div class="mb-2">
													{{ roomEvent.title }}
												</div>
												<div>
													{{ roomEvent.text }}
												</div>
											</v-card-text>
										</v-flex>
										<v-flex class="mt-auto">
											<v-card-text class="">
												<div class="text-xs-right">
													Спикер: {{ roomEvent.speaker.name }}
												</div>
											</v-card-text>
										</v-flex>
									</v-layout>
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

	const nowDate = {
		default() {
			let month = [
				'Января',
				'Февраля',
				'Марта',
				'Апреля',
				'Мая',
				'Июня',
				'Июля',
				'Авгуса',
				'Сентября',
				'Ноября',
				'Декабря',
			];
			let date = new Date()
			return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`

		}
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
			now: {
				string: nowDate.default(),
				date: new Date().toISOString().substr(0, 10)
			},
			type: 'day',
			weekdays: weekdaysDefault,
			roomsFilterDefault: true,
			// intervals: this.intervalsDefault,
			maxDays: 7,
			styleInterval: 'default',
			color: 'primary',
		}),
		computed: {
			...mapGetters([
				'roomEvents',
				'intervals',
				'getRoomsEvents',
				'getSpeakers',
				'getEventType'
			]),

			intervalStyle () {
				console.log(this.$refs)
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
			},
		},
		methods: {
			...mapActions([
				'resetCheckboxesSpeaker',
				'onChangeSpeaker',
				'resetCheckboxesEventType',
				'onChangeEventType'
			]),
			showIntervalLabel (interval) {
				return interval.minute === 0
			},
			disabledEvent() {
				return 'test'
			},
			intervalFormat(interval) {
				return interval.hour + ':00'
			},
			getRoomEventsTime(date, hour){
				let result = []

				this.roomEvents.forEach(function (roomEvent, index, arr){
					result[index] = {
						title: null,
						text: null,
						className: null,
						date: date,
						timeStart: hour,
						timeEnd: '10:00',
						active: roomEvent.active
					}
					roomEvent.items.forEach(function (subItem, subIndex, subArr){
						if (subItem.date === date && parseInt(subItem.timeStart.substr(0, 2)) === hour) {
							subItem.active = roomEvent.active
							result[index] = subItem
						}
					})
				})
				return result
			},

			test(data){
				console.log(data);
				return data
			},
			resetRoomEventsActive(data, defaults) {
				data.forEach((item)=>{
					item.active = defaults
				})
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
	.disabled {
		opacity: 0.4 !important;
	}
	.hide {
		display: none !important;
	}
	.date-now{
		display: block;
		width: 100%;
		height: 0;
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