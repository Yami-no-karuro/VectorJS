import fs from 'fs';
import Transient from './Transient';
import TransientData from './TransientData';

export default class FileSystemTransient extends Transient {

  protected content: TransientData | undefined;

  /**
   * @package VectorJS
   * FileSystemTransient.constructor()
   * @returns void
   */
  public constructor(name: string) {
    super(name);
  }

  /**
   * @package VectorJS
   * FileSystemTransient.isValid()
   * @returns boolean 
   */
  public isValid(): boolean {
    if (undefined !== this.content) {
      const date: Date = new Date();
      if (this.content.ttl === 0 ||
        (date.getTime() - this.content.createdAt) < this.content.ttl) {
        return true;
      }
    }
    return false;
  }

  /**
   * @package VectorJS
   * FileSystemTransient.getContentSync()
   * @returns Object | undefined 
   */
  public getContentSync(): Object | undefined {
    let content: TransientData | undefined = this.content;
    if (undefined === content) {
      content = JSON.parse(fs.readFileSync('/app/var/transients/' + this.name, 'utf8'));
      this.content = content;
    }
    return content?.content;
  }

  /**
   * @package VectorJS
   * FileSystemTransient.getContent()
   * @returns Promise<Object | undefined>
   */
  public getContent(): Promise<Object | undefined> {
    return new Promise(async (resolve, _) => {
      let content: TransientData | undefined = this.content;
      if (undefined === content) {
        fs.readFile('/app/var/transients/' + this.name, (error, content) => {
          if (!error) {
            this.content = JSON.parse(content.toString());
            resolve(this.content?.content);
          }
          resolve(undefined);
        });
      }
    });
  }

  /**
   * @package VectorJS
   * FileSystemTransient.setContentSync()
   * @param content: Object
   * @param ttl: number
   * @returns void 
   */
  public setContentSync(content: Object, ttl: number): void {
    const date: Date = new Date();
    const createdAt: number = date.getTime();
    const data: TransientData = {
      createdAt: createdAt,
      ttl: ttl,
      content: content
    }
    fs.writeFileSync('/app/var/transients/' + this.name,
      JSON.stringify(data), 'utf8'
    );
  }

  /**
   * @package VectorJS
   * FileSystemTransient.setContent()
   * @param content: Object
   * @param ttl: number
   * @returns Promise<void>
   */
  public setContent(content: Object, ttl: number): Promise<void> {
    return new Promise((resolve, _) => {
      const date: Date = new Date();
      const createdAt: number = date.getTime();
      const data: TransientData = {
        createdAt: createdAt,
        ttl: ttl,
        content: content
      }
      fs.writeFile('/app/var/transients/' + this.name, JSON.stringify(data), (_) => {
        resolve();
      });
    });
  }

}
