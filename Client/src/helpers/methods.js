export function toMySqlDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
