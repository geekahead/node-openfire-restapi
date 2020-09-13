// xmpp__client.d.ts:
declare module "@xmpp/client" {
    import { EventEmitter } from "events";
    import * as xmpp__conection from "@xmpp/connection";
    import * as xmpp__xml from "@xmpp/xml";

    export enum EventType {
        ERROR = "error",
        OFFLINE = "offline",
        ONLINE = "online",
        STANZA = "stanza",
        OPEN = "open",
        ELEMENT = "element",
        DISCONNECT = "disconnect"
    }

    export interface Bosh {
        url?: string;
        prebind?(error: any, data: any): void;
    }
    
    export enum StanzaType {
        PERSENCE = "presence",
        MESSAGE = "message",
        IQ = "iq",
    }

    export class Stanza extends xmpp__xml.Element {

        // This has to be used for the static class initializer new Client.Stanza(..). If there is a better way feel free to
        // contribute.
        // tslint:disable-next-line
        new(name: string, attr: any): Stanza;
        from: string;
        to: string;
        id: string;
        type: string;
    }

    export enum ChatType {
        CHAT = "chat",
        GROUPCHAT = "groupchat"
    }

    export interface ClientParmas {
        service: string;
        domain: string;
        resource?: string;
        username: string;
        password: string;
    }

    export function client(params: ClientParmas): Client;

    export interface ClientOptions {
        jid: string;
        password: string;
        host?: string;
        port?: number;
        reconnect?: boolean;
        autostart?: boolean; // if we start connecting to a given port
        register?: boolean; // register account before authentication
        legacySSL?: boolean; // connect to the legacy SSL port, requires at least the host to be specified
        credentials?: any; // Dictionary (optional) - TLS or SSL key and certificate credentials
        actAs?: string; // if admin user act on behalf of another user (just user)
        disallowTLS?: boolean; // prevent upgrading the connection to a secure one via TLS
        preferred?: string; // Preferred SASL mechanism to use
        bosh?: Bosh;
    }

    export class Client extends xmpp__conection.Connection {
        static Stanza: Stanza;

        constructor(options: ClientOptions);

        public on(event: EventType, c: (e: any, d: any) => any): this;

        public send(element: object, ...args: object[]): Promise<any>;

        public connect(service: string): Promise<any>;

        public socketParameters(...args: object[]): object;

        public header(...args: object[]): string;

        public headerElement(...args: object[]): xmpp__xml.Element;

        public footer(...args: object[]): string;

        public footerElement(...args: object[]): xmpp__xml.Element;
    }
}