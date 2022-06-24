import { DateTime } from "luxon"

const useDepartureTime = (when: Date | null, plannedWhen: Date) => {

    const usedDepartureTime = when ? new Date(when) : new Date(plannedWhen)

    function getDisplayTime(time: Date): string {
        const dt = DateTime.fromJSDate(time)
        const delta = (dt).diffNow("minutes").minutes
        const roundedDelta = Math.abs(Math.round(delta))

        if (delta >= 1 && delta < 15) {
            return `in ${roundedDelta} Min.`
        } else if (delta < 1 && delta > -1) {
            return `jetzt`
        } else if (delta < -1) {
            return `vor ${roundedDelta} Min.`
        } else {
            return `um ${dt.toLocaleString(DateTime.TIME_24_SIMPLE)}`
        }
    }

    return {
        displayDepartureTime: getDisplayTime(usedDepartureTime),
        delayed: when ? when !== plannedWhen: null,
        hasDelayInfo: !!when
    }
}

export {useDepartureTime}