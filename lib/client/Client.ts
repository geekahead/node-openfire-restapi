import * as xmppClient from "@xmpp/client";
import { EventEmitter } from "events";
import { Logger as logger, E_Log_Level } from "../commons/logger/Logger";
import { XmppMessage } from "./XmppMessage";

logger.setLevel(E_Log_Level.Debug);

class OpenfireClient extends EventEmitter {

    protected service: string;
    protected domain: string;
    protected resource: string;
    protected username: string = "";
    protected password: string = "";

    protected connected: boolean = false;

    protected xmpp: xmppClient.client.Client;

    constructor(options: { service: string, domain: string, resource: string }) {
        super(options as any);
        this.service = options.service;
        this.domain = options.domain;
        this.resource = options.resource;
    }

    /**
     * 
     * @param username 
     * @param password 
     */
    public login(username: string, password: string): void {
        this.init({ "service": this.service, "domain": this.domain, "resource": this.resource, "username": username, "password": password });
    }

    public async joinRoom(room: string): Promise<boolean> {
        // Sends a chat message to itself
        const message = xmppClient.xml(
            xmppClient.StanzaType.PERSENCE,
            { to: room + "/" + this.username },
            xmppClient.xml(xmppClient.StanzaType.X, { xmlns: "http://jabber.org/protocol/muc" })
        );
        await this.xmpp.send(message);
        return true;
    }

    public async send(text: string, to: string, type: xmppClient.ChatType = xmppClient.ChatType.CHAT): Promise<boolean> {
        if (this.connected) {
            // 创建一个<message>元素并发送
            const message = xmppClient.xml(
                xmppClient.StanzaType.MESSAGE,
                { "type": type, "to": to },
                xmppClient.xml("body", {}, text)
            );
            await this.xmpp.send(message);
            return true;
        } else {
            return false;
        }
    }

    private init(options: {
        service: string,
        domain: string,
        resource: string,
        username: string,
        password: string
    }): void {
        this.xmpp = xmppClient.client(options);

        // debug(xmpp, true);

        this.xmpp.on(xmppClient.EventType.ERROR, (err) => {
            logger.debug(err);
            this.emit(xmppClient.EventType.ERROR, err);
        });

        this.xmpp.on(xmppClient.EventType.OFFLINE, () => {
            logger.debug("offline");
            this.emit(xmppClient.EventType.OFFLINE);
        });

        this.xmpp.on(xmppClient.EventType.STANZA, async (stanza) => {
            if (stanza.is(xmppClient.StanzaType.MESSAGE)) {
                const xmppMsg: XmppMessage = new XmppMessage(stanza);
                if ((xmppMsg.isChat() || xmppMsg.isGroupChat()) && xmppMsg.hasContent()) {
                    this.emit("message", xmppMsg);
                } else {
                    logger.warn("Received no chat or empty message: ", xmppMsg.toString())
                }

                return true;
            }
        });

        this.xmpp.on(xmppClient.EventType.ONLINE, async (address) => {
            this.connected = true;
            // Makes itself available
            await this.xmpp.send(xmppClient.xml(xmppClient.StanzaType.PERSENCE));

            this.emit(xmppClient.EventType.ONLINE, address);

        });
    }
}

export default OpenfireClient;