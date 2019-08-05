import getData from '@/plugins/getData'
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
			height: 80
		},
		eventBanners: [
			{
				title: 'Заголовок меропиятия 1',
				description: 'Описание мероприятия. Здесь может быть много текста. 1',
				dateStart: new Date().toISOString().substr(0, 10),
				dateEnd: (function (eventDuration = 3) {
					let date = new Date()
					date.setDate(date.getDate() + eventDuration)
					return date.toISOString().substr(0, 10)
				})(),
			},
			{
				title: 'Заголовок меропиятия 2',
				description: 'Описание мероприятия. Здесь может быть много текста. 2',
				dateStart: (function (eventDuration = 4) {
					let date = new Date()
					date.setDate(date.getDate() + eventDuration)
					return date.toISOString().substr(0, 10)
				})(),
				dateEnd: (function (eventDuration = 8) {
					let date = new Date()
					date.setDate(date.getDate() + eventDuration)
					return date.toISOString().substr(0, 10)
				})(),
			}
		],
		roomEvents: [
			{
				title: 'EFIC Hall 1',
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '08:30',
				eventLength: 90,
				dialog: false,
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
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '09:00',
				eventLength: 90,
				dialog: false,
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
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '09:00',
				eventLength: 90,
				dialog: false,
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
				title: 'Перерыв title',
				shortText: '',
				text: '',
				className: 'grey cursor-default',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '11:00',
				eventLength: 60,
				timeout: true,
				dialog: false
			},
			{
				title: 'Auditorium 1A',
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '12:30',
				eventLength: 60,
				dialog: false,
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
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: (function (eventDuration = 4) {
					let date = new Date()
					date.setDate(date.getDate() + eventDuration)
					return date.toISOString().substr(0, 10)
				})(),
				timeStart: '8:00',
				eventLength: 70,
				dialog: false,
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
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				dialog: false,
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
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				dialog: false,
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
				shortText: 'IMPROVING THE CARE OF PATIENTS',
				text: 'lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam',
				className: 'red',
				date: new Date().toISOString().substr(0, 10),
				timeStart: '15:15',
				eventLength: 70,
				dialog: false,
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
			state.intervals.minTime = payload
		},
		changeTimeEnd(state, payload) {
			state.intervals.maxTime = payload
		},
		resetTime(state) {
			state.intervals.maxTime = state.intervals.maxTimeDefault
			state.intervals.minTime = state.intervals.minTimeDefault
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
		},
		changeTimeEnd({commit}, payload) {
			commit('changeTimeEnd', payload)
		},
		resetTime({commit}, payload) {
			commit('resetTime', payload)
		}
	},
	getters:{
		eventBanners(state) {
			return state.eventBanners
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