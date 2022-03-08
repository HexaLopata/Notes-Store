export default class DateTimeService {
    static format(dateTimeString) {
        let [date, time] = dateTimeString.split('T')
        date = date.split('-').reverse().join('-')
        time = time.replace('Z', '')
        time = time.split(':')
        time.pop()
        time = time.join(':')
        return date + ' ' + time
    }

    static parseDate(dateTimeString) {
        return new Date(dateTimeString)
    }
}