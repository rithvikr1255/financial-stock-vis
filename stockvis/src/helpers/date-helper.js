
function convertDatetoUnix(date) {
    return (
        Math.floor(date.getTime() / 1000)
    );
}

function convertUnixTimestampToDate(unix) {
    const milli = unix * 1000;
    return new Date(milli).toLocaleDateString();
}

function createDate(date, days, weeks, months, years) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7*weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);

    return newDate;
}
export { convertDatetoUnix, convertUnixTimestampToDate, createDate };