export default {
	default() {
		return undefined
	},
	getOnceDataTime(array, item = 'room', date) {
		let result = []
		array.forEach((itemRoom)=>{
			let isEventDate = itemRoom.date === date
			let flag = true
			if (result[0] === undefined) {
				if (isEventDate) {
					result.push(itemRoom)
				}

			} else {
				result.some(function (resultItem){
					if (!itemRoom.timeout) {
						flag = resultItem[ item ].name === itemRoom[ item ].name
						return flag
					}
				})
			}
			if (!flag && !itemRoom.timeout && isEventDate) {
				result.push(itemRoom)
			}
		})
		return result
	},
	getOnceData(array, item) {
		let result = []
		array.forEach(function (arrItem){
			let flag = true
			if (result[0] === undefined) {
				result.push(arrItem)
			} else {
				result.some(function (resultItem){
					if (arrItem[ item ]) {
						flag = resultItem[ item ].name === arrItem[ item ].name
						return flag
					}
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
			height: height + 'px',
			minHeight: height + 'px',
			overflow: 'hidden'
		}
		if (payload.timeStart > 0) {
			result.top = (payload.timeStart * payload.defaultHeight) / payload.defaultMinutes + 'px'
		}
		return result
	}
}