export default {
	state: {
		roomEvents: [
			{
				room: 'EFIC Hall',
				items: [
					{
						title: 'EFIC Hall 1',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'red',
						date: new Date().toISOString().substr(0, 10),
						timeStart: '09:00',
						timeEnd: '10:00'
					}
				],
			},
			{
				room: 'Auditorium 1A',
				items: [
					{
						title: 'Auditorium 1',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'red',
						date: new Date().toISOString().substr(0, 10),
						timeStart: '09:00',
						timeEnd: '10:00'
					},
					{
						title: 'Auditorium 2',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'red',
						date: new Date().toISOString().substr(0, 10),
						timeStart: '12:00',
						timeEnd: '10:00'
					},
					{
						title: 'Auditorium 3',
						text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
						className: 'red',
						date: '2019-07-26',
						timeStart: '12:00',
						timeEnd: '10:00'
					},
				],
			},
			// {
			// 	room: 'Hall 1B',
			// 	title: 'IMI-PAINCARE',
			// 	text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
			// 	className: 'green',
			// 	date: new Date().toISOString().substr(0, 10),
			// 	timeStart: '09:00',
			// 	timeEnd: '10:00'
			// },
			// {
			// 	room: 'Auditorium 3A',
			// 	title: 'IMI-PAINCARE',
			// 	text: 'IMPROVING THE CARE OF PATIENTS SUFFERING FROM ACUTE OR CHRONIC PAIN',
			// 	className: 'green',
			// 	date: new Date().toISOString().substr(0, 10),
			// 	timeStart: '09:00',
			// 	timeEnd: '10:00'
			// },
		]
	},
	mutations: {

	},
	actions: {

	},
	getters:{
		roomEvents(state){
			return state.roomEvents
		}
	}
}