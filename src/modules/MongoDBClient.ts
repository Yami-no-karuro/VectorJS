import { MongoClient, Db, Collection } from 'mongodb';
import ApplicationLogger from './ApplicationLogger';

export default class MongoDBClient {

  private client: MongoClient | undefined;
  private db: Db | undefined;

  /**
   * @package VectorJS
   * MongoDBClient.constructor()
   * @returns void
   */
  public constructor() {
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
  public async connect(name: string): Promise<void> {
    try {
      await this.client?.connect();
      this.db = this.client?.db(name);
    } catch (error) {
      ApplicationLogger.write(`Unable to connect to database: "${name}"`);
    }
  }

  /**
   * @package VectorJS
   * MongoDBClient.getCollection()
   * @param name: string
   * @returns Collection<Document> 
   */
  public getCollection(name: string): Collection<Document> | undefined {
    try {
      const collection: Collection<Document> | undefined = this.db?.collection(name);
      return collection
    } catch (error) {
      ApplicationLogger.write(`Unable to retrive or create collection: "${name}"`);
    }
  }

}
