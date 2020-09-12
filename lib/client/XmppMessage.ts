import * as xmppClient from "@xmpp/client";

export class XmppMessage {
    private msg: xmppClient.Stanza;

    constructor(msg: xmppClient.Stanza) {
        this.msg = msg;
    }

    public getFrom(): string {
        return this.msg.getAttr("from");;
    }

    public getType(): string {
        return this.msg.getAttr("type");
    }

    public getText(): object {
        return this.msg.getChild("body").getText();
    }

    public isChat(): boolean {
        return (this.getType() === xmppClient.ChatType.CHAT );
    }

    public isGroupChat(): boolean {
        return (this.getType() === xmppClient.ChatType.GROUPCHAT );
    }

    public hasContent(): boolean {
        return typeof this.msg.getChild("body") !== undefined;
    }

    public toString(): string {
        return this.msg.toString();
    }
}