import AbstractTransient from './AbstractTransient'
import TransientData from './TransientData';
import FileSystemLogger from '../ApplicationLogger/FileSystemLogger';
import MongoDBClient from '../MongoDBClient'
import { Collection } from 'mongodb';

export default class MongoDBTransient extends AbstractTransient {

  protected content: TransientData | undefined;
  protected client: MongoDBClient | undefined;

  /**
   * @package VectorJS
   * FileSystemTransient.constructor()
   * @returns void
   */
  public constructor(name: string) {
    super(name);
    this.client = new MongoDBClient();
  }

  /**
   * @package VectorJS
   * MongoDBTransient.isValid()
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
   * MongoDBTransient.getContent()
   * @returns Promise<Object | undefined>
   */
  public async getContent(): Promise<Object | undefined> {
    let content: TransientData | undefined = this.content;
    if (undefined === content) {
      await this.client?.connect('vector');
      const collection: Collection<Document> | undefined = await this.client?.getCollection('transients');
      try {
        const document = await collection?.findOne({ name: this.name });
        if (document) {
          // @ts-ignore
          return document?.content;
        }
      } catch (error) {
        await FileSystemLogger.write(`Core error: ${error}`);
      } finally {
        await this.client?.disconnect();
      }
    }
    return content?.content;
  }

  /**
   * @package VectorJS
   * MongoDBTransient.setContent()
   * @param content: Object
   * @param ttl: number
   * @returns Promise<void>
   */
  public async setContent(content: Object, ttl: number): Promise<void> {
    await this.client?.connect('vector');
    const collection: Collection<Document> | undefined = await this.client?.getCollection('transients');
    const date: Date = new Date();
    const createdAt: number = date.getTime();
    try {
      await collection?.updateOne({ name: this.name }, {
        $set: {
          name: this.name,
          createdAt: createdAt,
          ttl: ttl,
          content: content
        }
      } as any, { upsert: true });
    } catch (error) {
      await FileSystemLogger.write(`Core error: ${error}`);
    } finally {
      await this.client?.disconnect();
    }
  }

}
