import MongoDBClient from '../MongoDBClient';
import { Collection } from 'mongodb';
import FileSystemLogger from './FileSystemLogger';

export default class MongoDBLogger 
{

  protected client: MongoDBClient | undefined;

  /**
   * @package VectorJS
   * MongoDBLogger.constructor()
   */
  public constructor() {
    this.client = new MongoDBClient();
  }

  /**
   * @package VectorJS
   * MongoDBLogger.write()
   * @param message: string
   * @returns Promise<void>
   */
  public async write(message: string): Promise<void> 
  {
    await this.client?.connect('vector');
    const collection: Collection<Document> | undefined = await this.client?.getCollection('logs');
    const date: Date = new Date();
    const today: string = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    try {
      await collection?.insertOne({
        date: today,
        message: message
      } as any);
    } catch (error) {
      await FileSystemLogger.write(`Core error: ${error}`);
    } finally {
      await this.client?.disconnect();
    }
  }

}
