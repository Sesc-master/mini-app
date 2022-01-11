export default function dateComparator(firstDate: string, secondDate: string) {
    let firstmonth = Number(firstDate.substring(3, 5));
    let secondmonth = Number(secondDate.substring(3, 5));
    if (firstmonth === secondmonth) {
        return Number(firstDate.substring(0, 2)) - Number(secondDate.substring(0, 2));
    }
    else return firstmonth - secondmonth;
}