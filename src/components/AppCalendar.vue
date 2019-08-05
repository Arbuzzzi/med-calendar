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
			<v-card>
				<v-card-text>
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
							<v-layout>
								<v-icon class="notranslate">event</v-icon>
								<v-text-field
										class="ml-2"
										v-model="start"
										label="Выберите день"
										readonly
										v-on="on"
								></v-text-field>
							</v-layout>
						</template>
						<v-date-picker
								v-model="start"
								no-title
								scrollable
								locale="ru"
								@input="$refs.startMenu.save(start)"
						>
							<v-spacer></v-spacer>
							<v-btn
									flat
									color="primary"
									@click="startMenu = false"
							>
								Отмена
							</v-btn>
							<v-btn
									flat
									color="primary"
									@click="$refs.startMenu.save(now.date)"
							>
								Сегодня
							</v-btn>
						</v-date-picker>
					</v-menu>
					<v-menu
							ref="menuTimeStart"
							v-model="menuTimeStart"
							:close-on-content-click="false"
							:nudge-right="40"
							:return-value.sync="timeStart"
							lazy
							transition="scale-transition"
							offset-y
							full-width
							max-width="290px"
							min-width="290px"

					>
						<template v-slot:activator="{ on }">
							<v-layout>
								<v-icon class="notranslate">access_time</v-icon>
								<v-text-field
										class="ml-2"
										v-model="timeStart"
										label="Время c:"
										:value="intervals.maxTimeDefault"
										readonly
										v-on="on"
								></v-text-field>
							</v-layout>

						</template>
						<v-time-picker
								v-if="menuTimeStart"
								v-model="timeStart"
								@input="changeTimeStart($event)"
								full-width
								@click:minute="$refs.menuTimeStart.save(timeStart)"
								format="24hr"
								:min="intervals.minTimeDefault"
								:max="intervals.maxTime"
						></v-time-picker>
					</v-menu>

					<v-menu
							ref="menuTimeEnd"
							v-model="menuTimeEnd"
							:close-on-content-click="false"
							:nudge-right="40"
							:return-value.sync="timeEnd"
							lazy
							transition="scale-transition"
							offset-y
							full-width
							max-width="290px"
							min-width="290px"
					>
						<template v-slot:activator="{ on }">
							<v-layout>
								<v-icon class="notranslate">access_time</v-icon>
								<v-text-field
										class="ml-2"
										v-model="timeEnd"
										label="Время по:"
										:value="intervals.maxTimeDefault"
										readonly
										v-on="on"
								></v-text-field>
							</v-layout>
						</template>
						<v-time-picker
								v-if="menuTimeEnd"
								v-model="timeEnd"
								@input="changeTimeEnd($event)"
								full-width
								@click:minute="$refs.menuTimeEnd.save(timeEnd)"
								format="24hr"
								:min="intervals.minTime"
								:max="intervals.maxTimeDefault"
						></v-time-picker>
					</v-menu>
					<div class="text-xs-right">
						<v-btn small
								@click="resetTimeDate()"
						>сбросить время</v-btn>
					</div>
				</v-card-text>
			</v-card>
			<v-card class="mt-3">
				<v-card-text>Фильтры по комнатам</v-card-text>
				<v-card-text class="pt-0">
					<v-checkbox
							ref="roomsFilter"
							class="mt-1"
							:light="false"
							v-for="(roomEvent, i) in getDataTime(start, 'room')"
							:key="roomEvent.room.name + i"
							v-model="roomEvent.room.active"
							@change="onChangeRoom({value: $event, room: {name: roomEvent.room.name}})"
							:input-value="roomEvent.room.active"
							:label="roomEvent.room.name"
							hide-details
							color="blue accent-4"
					></v-checkbox>
					<div v-if="getDataTime(start, 'room').length === 0">Выберите пожалуйста другую дату.</div>
					<div class="text-xs-right mt-2">
						<v-btn small
								@click="resetCheckboxesRoom(roomsFilterDefault)"
								:disabled="getDataTime(start, 'room').length === 0"
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
							v-for="(speaker, i) in getDataTime(start, 'speaker')"
							:key="speaker.title + i"
							@change="onChangeSpeaker({value: $event, speaker: {name: speaker.speaker.name}})"
							:label="speaker.speaker.name"
							hide-details
							:input-value="speaker.speaker.active"
							color="blue accent-4"
					></v-checkbox>
					<div v-if="getDataTime(start, 'speaker').length === 0">Выберите пожалуйста другую дату.</div>
					<div class="text-xs-right mt-2">
						<v-btn small
								@click="resetCheckboxesSpeaker(roomsFilterDefault)"
								:disabled="getDataTime(start, 'speaker').length === 0"
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
							v-for="(eventType, i) in getDataTime(start, 'eventType')"
							:key="eventType.title + i"
							@change="onChangeEventType({value: $event, eventType: {name: eventType.eventType.name}})"
							:label="eventType.eventType.name"
							hide-details
							:input-value="eventType.eventType.active"
							color="blue accent-4"
					></v-checkbox>
					<div v-if="getDataTime(start, 'eventType').length === 0">Выберите пожалуйста другую дату.</div>
					<div class="text-xs-right mt-2">
						<v-btn small
								@click="resetCheckboxesEventType(roomsFilterDefault)"
								:disabled="getDataTime(start, 'eventType').length === 0"
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
			<v-layout class="mb-2"
					v-if="eventBannerData.length !== 0"
			>
				<v-flex>
					<v-card>
						<v-card-title class="pb-0">
							<h2 class="font-weight-regular headline">{{ eventBannerData.title }}</h2>
						</v-card-title>
						<v-card-text class="pb-0">
							{{ eventBannerData.description }}
						</v-card-text>
						<v-card-text class="text-xs-right">
							{{ getBannerDates }}
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-sheet elevation="1" class="mr-2">
				<v-calendar
						ref="calendar"
						v-model="start"
						:type="type"
						:start="start"
						:min-weeks="minWeeks"
						:max-days="maxDays"
						:dark="dark"
						@change="setEventBannerData(start)"
						:first-interval="intervals.first"
						:interval-minutes="intervals.minutes"
						:interval-count="intervals.count"
						:interval-height="intervals.height"
						:color="color"
						locale="ru-RU"
						:interval-format="intervalFormat"
				>

					<template v-slot:interval="{hour, date, minutes, time, timeToY, minutesToPixels}">
						<v-layout class="room-header"
								v-if="hour === intervals.first"
						>
							<v-flex xs12 class="pa-1 calendar-border-right calendar-border-top"
									:style="{minWidth: '140px'}"
									v-for="(roomEvent, i) in getDataTime(date, 'room')"
									:key="'roomEventName'+i"
									v-show="roomEvent.room ? roomEvent.room.active : false "
							>
								<div>
									{{ roomEvent.room.name }}
								</div>
							</v-flex>
						</v-layout>
						<v-layout class="fill-height" v-if="hour !== intervals.first">
							<v-flex xs12 class="calendar-border-right fill-height pa-1"
									:style="{minWidth: '140px'}"
									v-for="(roomEvent, i) in getRoomEventsTime(date, hour)"
									:key="'roomEventTitle'+i"
									v-show="roomEvent.room.active"
							>
								<v-dialog
										v-model="roomEvent.dialog"
										width="500"
								>
									<template v-slot:activator="{ on }">
										<v-hover>
											<v-card
													slot-scope="{ hover }"
													class="card-event"
													dark
													:class="roomEvent.speaker.active && // проверка на фильтры
																	roomEvent.eventType.active ? // проверка на фильтры
																		roomEvent.dialog ? // проверка на модалку
																		'green' :
																		roomEvent.className + ` elevation-${hover && !roomEvent.timeout ? '12 z1000' : 2}` :
																	roomEvent.className + ' disabled'"
													:style="roomEvent.style"
													disabled
													v-on="roomEvent.speaker.active && roomEvent.eventType.active && !roomEvent.timeout ? on : ''"
											>
												<v-layout class="fill-height wrap"
														:style="roomEvent.style ? {minHeight: roomEvent.style.minHeight}: {}"
												>
													<v-flex>
														<v-card-text>
															<div class="mb-2">
																{{ roomEvent.title }}
															</div>
															<div>
																{{ roomEvent.shortText }}
															</div>
														</v-card-text>
													</v-flex>
													<v-flex class="mt-auto">
														<v-card-text class="">
															<div class="text-xs-right">
																{{ roomEvent.speaker.name ? `Спикер: ${roomEvent.speaker.name}`: '' }}
															</div>
														</v-card-text>
													</v-flex>
												</v-layout>
											</v-card>
										</v-hover>
									</template>
									<v-card>
										<v-card-title>
											{{ roomEvent.title }}
										</v-card-title>
										<v-card-text>
											{{ roomEvent.text }}
										</v-card-text>
									</v-card>
								</v-dialog>

							</v-flex>
						</v-layout>
					</template>
				</v-calendar>
			</v-sheet>
		</v-flex>
	</v-layout>
</template>

<script>
	function fixTranslateIcon(elements){
		for (let i = 0; i < elements.length; i++){
			let iconElement = elements[i];
			iconElement.translate = false
			iconElement.className += ' notranslate'
		}
	}

	import {mapActions, mapGetters} from 'vuex'
	import dateChanges from './../plugins/dateChanges'
	import getData from './../plugins/getData'

	export default {
		data: () => ({
			eventHeight: '',
			menuTimeStart: '',
			menuTimeEnd: '',
			timeStart: '',
			timeEnd: '',
			eventBannerData: {},
			dark: false,
			startMenu: false,
			start: new Date().toISOString().substr(0, 10),
			end: null,
			minWeeks: 1,
			now: {
				string: dateChanges.default(),
				date: new Date().toISOString().substr(0, 10)
			},
			type: 'day',
			roomsFilterDefault: true,
			maxDays: 7,
			color: 'primary',
		}),
		mounted() {
			this.resetTimeDate()
			let tagI = document.getElementsByTagName('i')
			let vIcon = document.getElementsByClassName('v-icon')
			fixTranslateIcon(tagI)
			fixTranslateIcon(vIcon)
			this.setEventBannerData(this.now.date)
		},
		updated() {
			let tagI = document.getElementsByTagName('i')
			let vIcon = document.getElementsByClassName('v-icon')
			fixTranslateIcon(tagI)
			fixTranslateIcon(vIcon)
		},
		computed: {
			...mapGetters([
				'intervals',
				'roomEvents',
				'eventBanners'

			]),
			getBannerDates() {
				return dateChanges.getDateIntervalString(this.eventBannerData.dateStart, this.eventBannerData.dateEnd)
			},
		},
		methods: {
			...mapActions([
				'resetCheckboxesSpeaker',
				'onChangeSpeaker',
				'resetCheckboxesEventType',
				'onChangeEventType',
				'onChangeRoom',
				'resetCheckboxesRoom',
				'changeTimeStart',
				'changeTimeEnd',
				'resetTime',
			]),

			setEventBannerData(date) {

				this.eventBanners.some((eventBanner)=> {

					let eventTimeStartNum = dateChanges.sumDate(eventBanner.dateStart)
					let eventTimeEndNum = dateChanges.sumDate(eventBanner.dateEnd)
					let dateNum = dateChanges.sumDate(date)
					let isCurrentDate = dateNum >= eventTimeStartNum && dateNum <= eventTimeEndNum

					if (isCurrentDate) {
						this.eventBannerData = eventBanner
						return true
					} else {
						this.eventBannerData = []
					}
				})
			},
			resetTimeDate(){
				this.start = this.now.date
				this.timeStart = this.intervals.minTimeDefault
				this.timeEnd = this.intervals.maxTimeDefault
				this.resetTime()
			},
			intervalFormat(interval) {
				return interval.hour + ':00'
			},
			getDataTime(date, item) {
				return getData.getOnceDataTime(this.roomEvents, item, date)
			},
			getRoomEventsTime(date, hour){
				let result = []
				this.getDataTime(date, 'room').forEach((itemRoom, indexRoom)=>{
					this.roomEvents.some((itemRoomEvent)=>{

						let itemRoomEventName = itemRoomEvent.room ? itemRoomEvent.room.name : false
						let isEventDate = itemRoomEvent.date === date
						let isEventHour = parseInt(itemRoomEvent.timeStart.substr(0, 2)) === hour
						let isRoomName = itemRoom.room.name === itemRoomEventName

						if (isEventDate && isEventHour && isRoomName && !itemRoomEvent.timeout) {
							result[indexRoom] = itemRoomEvent
							return true
						} else {
							if (itemRoomEvent.timeout && isEventDate && isEventHour) {
								result = []
								result[0] = itemRoomEvent
								result[0].speaker = {name: null, active: true}
								result[0].eventType = {name: null, active: true}
								result[0].room = {name: null, active: true}
								return true
							} else {
								result[indexRoom] = {
									title: null,
									text: null,
									className: 'hide',
									date: date,
									timeStart: hour,
									timeEnd: '10:00',
									room: {
										name: itemRoom.room.name,
										active: itemRoom.room.active
									},
									speaker: {
										name: null,
										active: null
									},
									eventType: {
										name: null,
										active: null
									}
								}
							}
						}
					})
				})
				return result
			},
			test(data){
				console.log(data);
				return data
			}
		},
		name: "app-calendar"
	}
</script>

<style scoped lang="scss">
	.z1000 {
		z-index: 1000;
	}
	.card-event {
		transition: height 0.3s;
		cursor: pointer;
		&.cursor-default {
			cursor: default;
		}
		&.disabled {
			cursor: default;
		}
		&:hover:not(.disabled) {
			height: auto !important;
		}
	}
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
	.room-header{
		position: sticky;
	}
</style>
<style lang="scss">
	.v-calendar-daily__interval-text{
		top: 50% !important;
		font-size: 10px !important;
		transform: translateY(-50%) !important;
	}
	.v-calendar-daily__scroll-area {
		overflow: auto !important;
		padding-right: 17px;
	}
	.v-calendar-daily__day{
		width: auto;
	}
	.calendar-border-right {
		border-right: #e0e0e0 1px solid;
	}
	.calendar-border-top {
		border-top: #e0e0e0 1px solid;
	}
	.v-calendar-daily__day, .v-calendar-daily__intervals-body  {
		& > div:first-child {
			height: 30px !important;
		}
	}
</style>