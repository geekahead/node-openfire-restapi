import { RestClient } from '../../RestClient';
import { UriBuilder } from '../../commons/UriBuilder';

class Message {
  private endPoint = 'messages/users';
  private endPointUri = UriBuilder.instance(this.endPoint);
  
  constructor(private readonly rest: RestClient) {
    this.rest = rest;
  }

  /**
   * 
   * @param message 
   */
  public async broadcastMessage(message: string): Promise<{statusCode: number}> {
    // const body = this.getBody(message);
    return await this.rest.post(this.endPointUri.uri()
            , {"json": 
                {
                    "body": message
                }
            });
  }

//   private getBody(message: string) {
//     return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//     <message>
//         <body>${message}</body>
//     </message>`;
//   }
}

export default Message;
