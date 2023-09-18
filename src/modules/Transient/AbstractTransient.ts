import Crypt from "../Crypt";

export default abstract class AbstractTransient {

  protected name: string;

  /**
   * @package VectorJS
   * AbstractTransient.constructor()
   * @returns void
   */
  public constructor(name: string) {
    this.name = Crypt.MD5(name);
  }

}
