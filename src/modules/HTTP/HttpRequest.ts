export default class HTTPRequest {

  protected uri: RequestInfo | URL;
  protected method: string;
  protected headers: Headers | undefined;
  protected body: BodyInit | undefined;

  constructor(
    uri: RequestInfo | URL,
    method: string,
    headers: Headers | undefined = undefined,
    body: BodyInit | undefined = undefined,
  ) {
    this.uri = uri;
    this.method = method;
    this.headers = headers;
    this.body = body;
  }

  /**
   * @package VectorJS
   * HttpRequest.send()
   * @return Promise<Object | undefied>
   */
  public async send(): Promise<Object | undefined> {
    try {
      const response = await fetch(this.uri, {
        method: this.method,
        headers: this.headers,
        body: undefined !== this.body ?
          JSON.stringify(this.body) :
          this.body
      });
      const status = response.status;
      const body = await response.text();
      return { "status": status, "body": body };
    } catch (err: any) {
      if (process.env.APP_DEBUG) {
        console.log(err);
      }
    }
  }

}
