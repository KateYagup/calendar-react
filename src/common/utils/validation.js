import moment from 'moment';

export const validateCreatedEvent = (eventData, events) => {
    const { dateFrom, dateTo } = eventData;
    if (dateFrom > dateTo) {
        return {
            isValid: false,
            validationMessage: 'Начало должно начинаться ранше конца мероприятия!!!'
        }
    }
    const duration = moment.duration(moment(dateTo).diff(dateFrom))
    if (duration.asHours() < 1) {
        return {
            isValid: false,
            validationMessage: 'Подія має тривати не менше години!!!'
        }
    }

    const isOverLapping = events.some(event => {
        return (
            Date.parse(event.dateFrom) < dateFrom
            && Date.parse(event.dateTo) > dateFrom
            || Date.parse(event.dateFrom) < dateTo
            && Date.parse(event.dateTo) > dateTo
        )
    })
    if (isOverLapping) {
        return {
            isValid: false,
            validationMessage: 'Події не повинні перетинатися'
        }
    }
    return { isValid: true, validationMessage: '' }
}