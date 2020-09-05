import { Rest } from '../got';

class Message {
  private endPoint = 'messages/users';
  constructor(private readonly rest: Rest) {
    this.rest = rest;
  }

  public async broadcastMessage(message: string): Promise<number> {
    const body = this.getBody(message);

    const resp = await this.rest.post(this.endPoint, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return resp.statusCode;
  }
  private getBody(message: string) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <message>
        <body>${message}</body>
    </message>`;
  }
}

export default Message;
