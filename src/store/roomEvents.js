import Vue from 'vue'
export default {
	state: {
		intervals: {
			first: 8,
			minutes: 60,
			count: 13,
			height: 140
		},
		roomEvents: [
			{
				id: '01',
				room: 'EFIC Hall',
				active: true,
				items: [
					{
						id: '011',
						title: 'EFIC Hall 1',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'red',
						date: new Date().toISOString().substr(0, 10),
						timeStart: '09:00',
						eventLength: 90,
						speaker: {
							name: 'H. Wittink',
							active: true
						},
						eventType: {
							name: 'клинич. разбор',
							active: true
						},
					}
				],
			},
			{
				id: '02',
				room: 'Auditorium 1A',
				active: true,
				items: [
					{
						id: '021',
						title: 'Auditorium 1',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'red',
						date: new Date().toISOString().substr(0, 10),
						timeStart: '09:00',
						eventLength: 120,
						speaker: {
							name: 'P. Cameron',
							active: true
						},
						eventType: {
							name: 'клинич. разбор',
							active: true
						},
					},
					{
						id: '022',
						title: 'Auditorium 2',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'brown',
						date: new Date().toISOString().substr(0, 10),
						timeStart: '12:30',
						eventLength: 60,
						speaker: {
							name: 'H. Wittink',
							active: true
						},
						eventType: {
							name: 'пленарная сессия',
							active: true
						},
					},
					{
						id: '023',
						title: 'Auditorium 3',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'purple',
						date: '2019-07-27',
						timeStart: '17:00',
						eventLength: 60,
						speaker: {
							name: 'D. Tibboel',
							active: true
						},
						eventType: {
							name: 'клинич. разбор',
							active: true
						}
					},
				],
			},
		]
	},
	mutations: {
		resetCheckboxesSpeaker(state, payload) {
			setData.resetCheckbox(state.roomEvents, 'speaker', payload)
		},
		onChangeSpeaker(state, payload) {
			setData.onChange(state.roomEvents, 'speaker', payload)
		},

		resetCheckboxesEventType(state, payload) {
			setData.resetCheckbox(state.roomEvents, 'eventType', payload)
		},
		onChangeEventType(state, payload) {
			setData.onChange(state.roomEvents, 'eventType', payload)
		}
	},
	actions: {
		resetCheckboxesSpeaker({commit}, payload) {
			commit('resetCheckboxesSpeaker', payload)
		},
		onChangeSpeaker({commit}, payload) {
			commit('onChangeSpeaker', payload)
		},

		resetCheckboxesEventType({commit}, payload) {
			commit('resetCheckboxesEventType', payload)
		},
		onChangeEventType({commit}, payload) {
			commit('onChangeEventType', payload)
		}
	},
	getters:{
		roomEvents(state){
			state.roomEvents.forEach(function (item, index, arr){
				// state.roomEvents[index].active = true
				item.items.forEach(function (subItem, subIndex, subArr){
					let roomStyles = getData.getEventStyle({
						minutes: subItem.eventLength,
						defaultHeight: state.intervals.height - 8,
						defaultMinutes: state.intervals.minutes,
						timeStart: subItem.timeStart
					})
					state.roomEvents[index].items[subIndex].style = roomStyles
				})
			})
			return state.roomEvents
		},
		intervals(state) {
			return state.intervals
		},
		getSpeakers(state) {
			return getData.getFilter(state.roomEvents, 'speaker')
		},
		getEventType(state) {
			return getData.getFilter(state.roomEvents, 'eventType')
		},
		getRoomsEvents(state) {
			let result = []
			state.roomEvents.forEach(function (roomEvent, index, arr){
				roomEvent.items.forEach(function (subItem, subIndex, subArr){
					result.push(subItem)
				})
			})
			return result
		}
	}
}

const setData = {
	onChange(array, dataName, setValue) {
		array.forEach(function (items){
			items.items.forEach(function (item){
				if (item[ dataName ].name === setValue[ dataName ].name) {
					item[ dataName ].active = setValue.value
				}
			})
		})
	},
	resetCheckbox(array, dataName, setValue) {
		array.forEach(function (roomEvent, index, arr){
			roomEvent.items.forEach(function (subItem, subIndex, subArr){
				subItem[ dataName ].active = setValue
			})
		})
	},
}

const getData = {
	default() {
		return undefined
	},
	getFilter(array, filterName) {
		let result = []
		array.forEach(function (roomEvent, index, arr){
			roomEvent.items.forEach(function (subItem, subIndex, subArr){
				// result.speaker = speaker.getSpeaker(roomEvent)

				let flag = true

				if (result[0] === undefined) {
					result.push(subItem)
				} else {
					result.some(function (resultItem){
						flag = resultItem[ filterName ].name === subItem[ filterName ].name
						return flag
					})
				}
				if (!flag) {
					result.push(subItem)
				}
			})
		})
		return result
	},
	getEventStyle(data) {
		let payload = {
			minutes: parseInt(data.minutes),
			defaultHeight: parseInt(data.defaultHeight),
			defaultMinutes: parseInt(data.defaultMinutes),
			timeStart: parseInt(data.timeStart.substr(3,2))
		}
		let height = (payload.minutes * payload.defaultHeight) / payload.defaultMinutes
		let result = {
			position: 'relative',
			height: height + 'px'
		}
		if (payload.timeStart > 0) {
			result.top = (payload.timeStart * payload.defaultHeight) / payload.defaultMinutes + 'px'
		}
		return result
	}
}