import fs from 'fs';

export default class ApplicationLogger {

  /**
   * @package VectorJS
   * ApplicationLogger.write()
   * @param message: string
   * @returns void
   */
  public static write(message: string): void {
    const date: Date = new Date();
    const today: string = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
    fs.appendFileSync('/app/var/logs/app.log.txt', `[${today}] - ${message}`, 'utf8');
  }

}
