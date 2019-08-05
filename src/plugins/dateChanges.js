export default {
	month: [
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
	],
	default() {
		let date = new Date()
		return `${date.getDate()} ${this.month[date.getMonth()]} ${date.getFullYear()}`
	},
	getDateString(date = '2019-08-20') {
		let year = parseInt(date.substr(0, 4))
		let month = parseInt(date.substr(6, 2))
		let day = parseInt(date.substr(8, 2))
		return `${day} ${this.month[month - 1]} ${year}`
	},
	getDateIntervalString(dateStart = '2019-08-20', dateEnd = '2020-09-25') {
		let daysStart = {
			year: parseInt(dateStart.substr(0, 4)),
			month: this.month[parseInt(dateStart.substr(6, 2)) - 1].toUpperCase(),
			day: parseInt(dateStart.substr(8, 2)),
		}
		let daysEnd = {
			year: parseInt(dateEnd.substr(0, 4)),
			month: this.month[parseInt(dateEnd.substr(6, 2)) - 1].toUpperCase(),
			day: parseInt(dateEnd.substr(8, 2)),
		}
		let result = ''

		if (daysStart.year === daysEnd.year) {
			if (daysStart.month === daysEnd.month) {
				result = `${daysStart.day} \u2013 ${daysEnd.day} ${daysEnd.month} ${daysEnd.year}`
			} else {
				result = `${daysStart.day} ${daysStart.month} \u2013 ${daysEnd.day} ${daysEnd.month} ${daysEnd.year}`
			}
		} else {
			result = `${daysStart.day} ${daysStart.month} ${daysStart.year} \u2013 ${daysEnd.day} ${daysEnd.month} ${daysEnd.year}`
		}
		return result
	},
	sumDate(dateString) {
		let days = {
			year: parseInt(dateString.substr(0, 4)),
			month: parseInt(dateString.substr(6, 2)),
			day: parseInt(dateString.substr(8, 2)),
		}
		return days.year + days.month + days.day
	}
}