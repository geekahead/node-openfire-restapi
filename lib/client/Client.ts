import * as xmpp_client from "@xmpp/client";
import * as xmpp_xml from "@xmpp/xml";
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

    protected xmppClient!: xmpp_client.Client;

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
        this.init({ "service": this.service, "domain": this.domain, 
            "resource": this.resource, "username": username, "password": password });
    }

    public async joinRoom(room: string): Promise<boolean> {
        // Sends a chat message to itself
        const message = xmpp_xml(
            xmpp_client.StanzaType.PERSENCE,
            { to: room + "/" + this.username },
            xmpp_xml("x", { xmlns: "http://jabber.org/protocol/muc" })
        );
        await this.xmppClient.send(message);
        return true;
    }

    public async send(text: string, to: string, type: xmpp_client.ChatType = xmpp_client.ChatType.CHAT): Promise<boolean> {
        if (this.connected) {
            // 创建一个<message>元素并发送
            const message = xmpp_xml(
                xmpp_client.StanzaType.MESSAGE,
                { "type": type, "to": to },
                xmpp_xml("body", {}, text)
            );
            await this.xmppClient.send(message);
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
        this.xmppClient = xmpp_client.client(options);

        // debug(xmpp, true);

        this.xmppClient.on(xmpp_client.EventType.ERROR, (err) => {
            logger.debug(err);
            this.emit(xmpp_client.EventType.ERROR, err);
        });

        this.xmppClient.on(xmpp_client.EventType.OFFLINE, () => {
            logger.debug("offline");
            this.emit(xmpp_client.EventType.OFFLINE);
        });

        this.xmppClient.on(xmpp_client.EventType.STANZA, async (stanza) => {
            if (stanza.is(xmpp_client.StanzaType.MESSAGE)) {
                const xmppMsg: XmppMessage = new XmppMessage(stanza);
                if ((xmppMsg.isChat() || xmppMsg.isGroupChat()) && xmppMsg.hasBody()) {
                    this.emit("message", xmppMsg);
                } else {
                    logger.warn("Received no chat or empty message: ", xmppMsg.toString())
                }

                return true;
            }
        });

        this.xmppClient.on(xmpp_client.EventType.ONLINE, async (address) => {
            this.connected = true;
            // Makes itself available
            await this.xmppClient.send(xmpp_xml(xmpp_client.StanzaType.PERSENCE));

            this.emit(xmpp_client.EventType.ONLINE, address);

        });
    }
}

export default OpenfireClient;