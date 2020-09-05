/**
 * xml2js helper utility
 */

import * as xml2js from 'xml2js';
import { RosterItem } from './interfaces/Roster';
const parser = new xml2js.Parser({ explicitArray: false });
const builder = new xml2js.Builder();

class Helper {
  static async xml2json(xmlstring: string) {
    return await parser.parseStringPromise(xmlstring);
  }

  static async json2XML(json: string) {
    return builder.buildObject(json);
  }

  static makeRoosterBody(params: RosterItem): string {
    const { groups = [], subscriptionType, jid, nickname } = params;
    const body = `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <rosterItem>
        <jid>${jid}</jid>
        ${nickname ? `<nickname>${nickname}</nickname>` : ''}
        ${subscriptionType ? `<subscriptionType>${subscriptionType}</subscriptionType>` : ''}
       ${
         groups.length > 0
           ? `<groups>
         ${groups.map((g) => `<group> ${g} </group>`)} 
         </groups>`
           : ''
       }
      </rosterItem>`;
    return body;
  }
}

export default Helper;
