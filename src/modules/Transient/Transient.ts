import Crypt from "../Crypt";

export default class Transient {

  protected name: string;

  /**
   * @package VectorJS
   * Transient.constructor()
   * @returns void
   */
  public constructor(name: string) {
    this.name = Crypt.MD5(name);
  }

}
