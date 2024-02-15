import fs from 'fs';

export default class FileSystemLogger 
{

  /**
   * @package VectorJS
   * ApplicationLogger.writeSync()
   * @param message: string
   * @returns void
   */
  public static writeSync(message: string): void 
  {
    const date: Date = new Date();
    const today: string = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    fs.appendFileSync('/app/var/logs/app.log.txt', `[${today}] - ${message}\n`, 'utf8');
  }

  /**
   * @package VectorJS
   * ApplicationLogger.write()
   * @param message: string
   * @returns Promise<void>
   */
  public static write(message: string): Promise<void> 
  {
    return new Promise((resolve, _) => {
      const date: Date = new Date();
      const today: string = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      fs.appendFile('/app/var/logs/app.log.txt', `[${today}] - ${message}\n`, (_) => {
        resolve();
      });
    });
  }

}
