import fs from 'fs';
import AbstractTransient from './AbstractTransient';
import TransientData from './TransientData';
import FileSystemLogger from '../ApplicationLogger/FileSystemLogger';

export default class FileSystemTransient extends AbstractTransient {

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
   * FileSystemTransient.isValidSync()
   * @returns boolean 
   */
  public isValidSync(): boolean {
    this.getContentSync();
    if (undefined !== this.content) {
      const date: Date = new Date();
      if (this.content.ttl === 0 || (date.getTime() - this.content.createdAt) < this.content.ttl) {
        return true;
      }
    }
    return false;
  }

  /**
   * @package VectorJS
   * FileSystemTransient.isValid()
   * @returns Promise<boolean> 
   */
  public async isValid(): Promise<boolean> {
    await this.getContent();
    if (undefined !== this.content) {
      const date: Date = new Date();
      if (this.content.ttl === 0 || (date.getTime() - this.content.createdAt) < this.content.ttl) {
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
        fs.readFile('/app/var/transients/' + this.name, async (error, content) => {
          if (error) {
            await FileSystemLogger.write(`Core error: ${error}`);
            resolve(undefined);
          }
          this.content = JSON.parse(content.toString());
          resolve(this.content?.content);
        });
      }
      return content?.content;
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
    fs.writeFileSync('/app/var/transients/' + this.name,
      JSON.stringify({
        name: this.name,
        createdAt: createdAt,
        ttl: ttl,
        content: content
      }), 'utf8'
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
      fs.writeFile('/app/var/transients/' + this.name, JSON.stringify({
        name: this.name,
        createdAt: createdAt,
        ttl: ttl,
        content: content
      }), async (error) => {
        if (error) {
          await FileSystemLogger.write(`Core error: ${error}`);
        }
        resolve();
      });
    });
  }

}
