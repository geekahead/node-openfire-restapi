// xmpp__client.d.ts:
declare module "@xmpp/client" {
    import { EventEmitter } from "events";

    export interface ClientOptions {
        service: string;
        domain: string;
        resource?: string;
        username: string;
        password: string;
    }

    export enum EventType {
        ERROR = "error",
        OFFLINE = "offline",
        ONLINE = "online",
        STANZA = "stanza"
    }

    export interface Stanza extends Element {
        getChild(arg0: string): Element;
        getAttr(arg0: string): string;
        // This has to be used for the static class initializer new Client.Stanza(..). If there is a better way feel free to
        // contribute.
        // tslint:disable-next-line
        new(name: string, attr: any): Stanza;
        from: string;
        to: string;
        id: string;
        type: string;
    }

    export interface Element {
        is(name: string, xmlns: string): boolean;
        getName(): string;
        getNS(): string;
        findNS(prefix: string): string;
        getXmlns(): string;
        setAttrs(attrs: any): void;
        getAttrs(): any;

        up(): Element;
        c(name: string, attrs?: any): Element;
        cnode(child: Element): Element;
        t(text: string): Element;
        remove(el: Element, xmnls: string): Element;
        attr(attr: any, val: any): any;

        toString(): string;
        toJSON(): any;

        attrs: { [key: string]: any };
        append(nodes: ElementChild): Element;
        prepend(nodes: ElementChild): Element;
    }

    type ElementChild = Element | Element[] | string | number | boolean;

    export interface XmppOptions {
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

    export interface Bosh {
        url?: string;
        prebind?(error: any, data: any): void;
    }
    
    export enum StanzaType {
        PERSENCE = "presence",
        MESSAGE = "message",
        IQ = "iq",
    }

    export enum ChatType {
        CHAT = "chat",
        GROUPCHAT = "groupchat"
    }

    export function client(options: ClientOptions): client.Client;

    export namespace client {


        export class Client extends EventEmitter {
            static Stanza: Stanza;

            constructor(options: XmppOptions);

            start(): Promise<object>;

            connect(): void;

            disconnect(): void;

            on(event: EventType, c: (e: any, d: any) => any): this;

            send(stanza: Stanza): Promise<any>;
        }

    }

    export function jid(): any;

    export namespace jid {
        class JID {
            constructor(...args: any[]);

            bare(...args: any[]): void;

            equals(...args: any[]): void;

            getDomain(...args: any[]): void;

            getLocal(...args: any[]): void;

            getResource(...args: any[]): void;

            setDomain(...args: any[]): void;

            setLocal(...args: any[]): void;

            setResource(...args: any[]): void;

            toString(...args: any[]): void;

        }

        function detectEscape(local: any): any;

        function equal(a: any, b: any): any;

        function escapeLocal(local: any): any;

        function jid(args: any): any;

        function parse(s: any): any;

        function unescapeLocal(local: any): any;

    }

    export function xml(name: string,
        attrs?: string | { [key: string]: any },
        ...children: Element[]
    ): Element;

    export namespace xml {
        class Element {
            constructor(...args: any[]);

            append(...args: any[]): void;

            prepend(...args: any[]): void;

            setAttrs(...args: any[]): void;

        }

        class Parser {
            constructor(...args: any[]);

            end(...args: any[]): void;

            onEndElement(...args: any[]): void;

            onStartElement(...args: any[]): void;

            onText(...args: any[]): void;

            write(...args: any[]): void;

            static XMLError(...args: any[]): void;

            static defaultMaxListeners: number;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static usingDomains: boolean;

        }

        function XMLError(...args: any[]): void;

        function escapeXML(s: any): any;

        function escapeXMLText(s: any): any;

        function unescapeXML(s: any): any;

        function unescapeXMLText(s: any): any;

        function x(name: any, attrs: any, children: any): any;

        namespace Parser {
            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: number;

                static init(): void;

                static listenerCount(emitter: any, type: any): any;

                static once(emitter: any, name: any): any;

                static usingDomains: boolean;

            }

            namespace XMLError {
                const stackTraceLimit: number;

                function captureStackTrace(p0: any, p1: any): any;

            }

        }

        namespace XMLError {
            const stackTraceLimit: number;
      
            function captureStackTrace (p0: any, p1: any): any;
      
          }

    }
}