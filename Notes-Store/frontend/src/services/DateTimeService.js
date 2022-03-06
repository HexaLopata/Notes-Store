export default class DateTimeService {
    static format(dateTime) {
        let [date, time] = dateTime.split('T')
        date = date.split('-').reverse().join('-')
        time = time.replace('Z', '')
        time = time.split(':')
        time.pop()
        time = time.join(':')
        return date + ' ' + time
    }
}