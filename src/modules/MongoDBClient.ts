import { MongoClient, Db, Collection } from 'mongodb';

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
   * @returns Promise<void>
   */
  public async connect(): Promise<void> {
    try {
      await this.client?.connect();
      this.db = this.client?.db('vector');
    } catch (error) {
      throw new Error("Unable to connect to database.");
      // ...
    }
  }

  /**
   * @package VectorJS
   * MongoDBClient.getCollection()
   * @returns Collection<Document> 
   */
  public getCollection(name: string): Collection<Document> | undefined {
    try {
      const collection: Collection<Document> | undefined = this.db?.collection(name);
      return collection
    } catch (error) {
      throw new Error("Unable to create or retrive collection.");
      // ...
    }
  }

}
