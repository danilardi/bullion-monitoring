export function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}

export function getWeekNumber(date) {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
}

export function getWeeksInMonthOnYear(year, month) {
    const weeks = [],
        firstDate = new Date(year, month, 0),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();

    let start = 1,
        end = 7 - firstDate.getDay();

    while (start <= numDays) {
        weeks.push({
            start: start,
            end: end,
        });
        start = end + 1;
        end = end + 7;
        if (end > numDays) end = numDays;
    }

    return weeks;
}

// fun get week in month from date
export function getWeekInMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const weeks = getWeeksInMonthOnYear(year, month);

    for (let week of weeks) {
        if (date.getDate() >= week.start && date.getDate() <= week.end) {
            return weeks.indexOf(week) + 1;
        }
    }
}

// create fun convert "Sun Nov 19 2023 15:08:00 GMT+0700 (Western Indonesia Time)" to "2023-11-19"
export function convertDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const dt = dateObj.getDate();

    return `${year}-${month}-${dt}`;
}