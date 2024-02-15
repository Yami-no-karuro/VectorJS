import { MongoClient, Db, Collection } from 'mongodb';
import FileSystemLogger from './ApplicationLogger/FileSystemLogger';

export default class MongoDBClient 
{

  private client: MongoClient | undefined;
  private db: Db | undefined;

  /**
   * @package VectorJS
   * MongoDBClient.constructor()
   */
  public constructor() 
  {
    if (undefined !== process.env.MONGO_URL) {
      this.client = new MongoClient(process.env.MONGO_URL);
    }
  }

  /**
   * @package VectorJS
   * MongoDBClient.connect()
   * @param name: string
   * @returns Promise<void>
   */
  public async connect(name: string): Promise<void> 
  {
    try {
      await this.client?.connect();
      this.db = this.client?.db(name);
    } catch (error) {
      await FileSystemLogger.write(`Unable to connect to database: "${name}"`);
    }
  }

  /**
   * @package VectorJS
   * MongoDBClient.disconnect()
   * @returns Promise<void>
   */
  public async disconnect(): Promise<void> 
  {
    try {
      await this.client?.close();
      this.db = undefined;
    } catch (error) {
      await FileSystemLogger.write('Unable to close current database connection;');
    }
  }

  /**
   * @package VectorJS
   * MongoDBClient.getCollection()
   * @param name: string
   * @returns Promise<Collection<Document> | undefined>   
   */
  public async getCollection(name: string): Promise<Collection<Document> | undefined> 
  {
    try {
      const collection: Collection<Document> | undefined = this.db?.collection(name);
      return collection
    } catch (error) {
      await FileSystemLogger.write(`Unable to retrive or create collection: "${name}"`);
    }
  }

}
