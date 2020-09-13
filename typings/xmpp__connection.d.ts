
declare module "@xmpp/connection" {
    import { EventEmitter } from "events";
    import * as xmpp__xml from "@xmpp/xml";

    export class Connection extends EventEmitter {

        constructor(options: any);

        /**
         * Opens the socket then opens the stream.
         * First, call connect() method to create a scoket connection and emit 'online' event.
         * second, call open() method to open stream.
         */
        public start(): Promise<any>;


        /**
         * Connects the socket.
         * 
         * @param service 
         */
        public connect(service: string): Promise<any>;

        /**
         * Opens the stream and emit 'open' event.
         * 
         * @param options 
         */
        public open(options: any): Promise<any>;


        /**
         * Disconnects the socket
         * @param timeout 
         */
        public disconnect(timeout: number): Promise<any>;


        /**
        * Closes the stream then closes the socket
        * https://xmpp.org/rfcs/rfc6120.html#streams-close
        * https://tools.ietf.org/html/rfc7395#section-3.6
         */
        public stop(): Promise<any>;

        /**
         * Closes the stream and wait for the server to close it
         * https://xmpp.org/rfcs/rfc6120.html#streams-close
         * https://tools.ietf.org/html/rfc7395#section-3.6
         */      
        public close(timeout: number): Promise<any>;

        /**
         * Restart the stream
         * https://xmpp.org/rfcs/rfc6120.html#streams-negotiation-restart
         */
        public restart(): Promise<any>;

        /**
         * Send element by sotcket.
         * 
         * @param element 
         */
        public send(element: object): Promise<any>;

        /**
         * Send element and receive response by emit 'element' event.
         * 
         * @param elemet 
         * @param timeout 
         */
        public sendReceive(elemet: object, timeout: number): Promise<any>;

        /**
         * Write data as string to socket.
         * 
         * @param data 
         */
        public write(data: any): Promise<any>;

        /**
         * Check if element is stanza('iq' or 'message' or 'presence').
         * 
         * @param element 
         */
        public isStanza(element: object): boolean;

        /**
         * Check if element is not stanza.
         * @param element 
         */
        public isNonza(element: object): boolean;

        /**
         * 
         * @param element 
         */
        public header(element: object): string;

        /**
         * 
         */
        public headerElement(): xmpp__xml.Element;

        public footer(element: object): string;

        public footerElement(): xmpp__xml.Element;

        public socketParameters(): object;
    }

}