export default {
	state: {
		intervals: {
			minTime: '08:00',
			maxTime: '19:00',
			minTimeDefault: '08:00',
			maxTimeDefault: '19:00',
			first: 7,
			minutes: 60,
			count: 13,
			height: 140
		},
		roomEvents: [
			{
				title: 'EFIC Hall 1',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '08:30',
				eventLength: 90,
				speaker: {
					name: 'H. Wittink',
					active: true
				},
				eventType: {
					name: 'клинич. разбор',
					active: true
				},
				room: {
					name: 'EFIC Hall',
					active: true,
				}
			},
			{
				title: 'room 3',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '09:00',
				eventLength: 90,
				speaker: {
					name: 'speaker-3',
					active: true
				},
				eventType: {
					name: 'клинич. разбор',
					active: true
				},
				room: {
					name: 'room 3',
					active: true,
				}
			},
			{
				title: 'Auditorium 1A',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '09:00',
				eventLength: 90,
				speaker: {
					name: 'P. Cameron',
					active: true
				},
				eventType: {
					name: 'клинич. разбор',
					active: true
				},
				room: {
					name: 'Auditorium 1A',
					active: true,
				}
			},
			{
				title: 'Auditorium 1A',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
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
				room: {
					name: 'Auditorium 1A',
					active: true,
				}
			},
			{
				title: 'Auditorium 1A',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				speaker: {
					name: 'D. Tibboel',
					active: true
				},
				eventType: {
					name: 'пленарная сессия',
					active: true
				},
				room: {
					name: 'Auditorium 1A',
					active: true,
				}
			},
			{
				title: 'room 4',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				speaker: {
					name: 'D. Tibboel',
					active: true
				},
				eventType: {
					name: 'пленарная сессия',
					active: true
				},
				room: {
					name: 'room 4',
					active: true,
				}
			},
			{
				title: 'room 5',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				speaker: {
					name: 'D. Tibboel',
					active: true
				},
				eventType: {
					name: 'пленарная сессия',
					active: true
				},
				room: {
					name: 'room 5',
					active: true,
				}
			},
			{
				title: 'room 6',
				text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				speaker: {
					name: 'D. Tibboel',
					active: true
				},
				eventType: {
					name: 'пленарная сессия',
					active: true
				},
				room: {
					name: 'room 6',
					active: true,
				}
			}
		],
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
		},

		resetCheckboxesRoom(state, payload) {
			setData.resetCheckbox(state.roomEvents, 'room', payload)
		},
		onChangeRoom(state, payload) {
			setData.onChange(state.roomEvents, 'room', payload)
		},

		changeTimeStart(state, payload) {
			console.log(1);
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
		},

		resetCheckboxesRoom({commit}, payload) {
			commit('resetCheckboxesRoom', payload)
		},
		onChangeRoom({commit}, payload) {
			commit('onChangeRoom', payload)
		},

		changeTimeStart({commit}, payload) {
			commit('changeTimeStart', payload)
		}
	},
	getters:{
		getRooms(state) {
			return getData.getOnceData(state.roomEvents, 'room')
		},
		roomEvents(state) {
			state.roomEvents.forEach(function (item, index){
				state.roomEvents[index].style = getData.getEventStyle({
					minutes: item.eventLength,
					defaultHeight: state.intervals.height - 8,
					defaultMinutes: state.intervals.minutes,
					timeStart: item.timeStart
				})
			})
			return state.roomEvents
		},
		intervals(state) {
			let result = state.intervals
			let times = {
				minTime: parseInt(state.intervals.minTime.substr(0, 10)),
				maxTime: parseInt(state.intervals.maxTime.substr(0, 10))
			}
			result.first = times.minTime - 1
			result.count = times.maxTime - times.minTime + 2
			return result
		},
		getSpeakers(state) {
			return getData.getOnceData(state.roomEvents, 'speaker')
		},
		getEventType(state) {
			return getData.getOnceData(state.roomEvents, 'eventType')
		}
	}
}

const setData = {
	onChange(array, dataName, setValue) {
		array.forEach(function (item){
			if (item[ dataName ].name === setValue[ dataName ].name) {
				item[ dataName ].active = setValue.value
			}
		})
	},
	resetCheckbox(array, dataName, setValue) {
		array.forEach(function (arrItem) {
			arrItem[ dataName ].active = setValue
		})
	},
}

const getData = {
	default() {
		return undefined
	},
	getOnceData(array, item) {
		let result = []
		array.forEach(function (arrItem){
			let flag = true

			if (result[0] === undefined) {
				result.push(arrItem)
			} else {
				result.some(function (resultItem){
					flag = resultItem[ item ].name === arrItem[ item ].name
					return flag
				})
			}
			if (!flag) {
				result.push(arrItem)
			}
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