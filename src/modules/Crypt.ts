export default class Crypt {

  protected HEX_CHARS: string = '0123456789abcdef';

  /**
   * @package VectorJS
   * Crypt.MD5()
   * @param input: string
   * @return string
   */
  public static MD5(input: string): string {
    const HEX_CHARS: string = '0123456789abcdef';

    const inputBytes: Uint8Array = new TextEncoder().encode(input);
    const hashBytes: Uint8Array = new Uint8Array(16);

    let hashIndex: number = 0;
    for (let i: number = 0; i < inputBytes.length; i++) {
      const byte: number = inputBytes[i];
      const part1: number = (byte >>> 4) & 0x0f;
      const part2: number = byte & 0x0f;
      hashBytes[hashIndex++] = part1;
      hashBytes[hashIndex++] = part2;
    }

    let hashResult: string = '';
    for (let i: number = 0; i < hashBytes.length; i++) {
      const byte: number = hashBytes[i];
      hashResult += HEX_CHARS.charAt(byte >> 4) + HEX_CHARS.charAt(byte & 0x0f);
    }

    return hashResult;
  }

}
