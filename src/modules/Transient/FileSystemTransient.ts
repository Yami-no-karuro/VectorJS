import fs from 'fs';
import AbstractTransient from './AbstractTransient';
import TransientData from './TransientData';

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
   * FileSystemTransient.getContent()
   * @returns Object | undefined 
   */
  public getContent(): Object | undefined {
    let content: TransientData | undefined = this.content;
    if (undefined === content) {
      content = JSON.parse(
        fs.readFileSync('/app/var/transients/' + this.name, 'utf8')
      );
    }
    return content?.content;
  }

  /**
   * @package VectorJS
   * FileSystemTransient.setContent()
   * @param content: Object
   * @param ttl: number
   * @returns void 
   */
  public setContent(content: Object, ttl: number): void {
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

}
