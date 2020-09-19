import * as xmpp_client from "@xmpp/client";
import * as xmpp_xml from "@xmpp/xml";

export class XmppMessage {
    private msg: xmpp_client.Stanza;

    constructor(msg: xmpp_client.Stanza) {
        this.msg = msg;
    }

    public getFrom(): string {
        return this.msg.getAttr("from");;
    }

    public getType(): string {
        return this.msg.getAttr("type");
    }

    public getBody(): string {
        const body: xmpp_xml.Element | any = this.msg.getChild("body");
        if (body) {
            return body.getText();
        } else {
            return "";
        }
    }

    public isChat(): boolean {
        return (this.getType() === xmpp_client.ChatType.CHAT );
    }

    public isGroupChat(): boolean {
        return (this.getType() === xmpp_client.ChatType.GROUPCHAT );
    }

    public hasBody(): boolean {
        return typeof this.msg.getChild("body") !== undefined;
    }

    public toString(): string {
        return this.msg.toString();
    }
}