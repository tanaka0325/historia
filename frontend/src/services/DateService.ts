export class DateService {
  static toLocaleDateTimeString(date: Date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date
      .getDate()
      .toString()
      .padStart(2, '0');
    const hour = date
      .getHours()
      .toString()
      .padStart(2, '0');
    const min = date
      .getMinutes()
      .toString()
      .padStart(2, '0');

    return `${y}/${m}/${d} ${hour}:${min}`;
  }
}
