export function getLocalDay() {
    const day = new Date().getDay();
    return day === 0 ? day + 1 : day;
}