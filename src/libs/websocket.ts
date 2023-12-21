import {WebsocketOptions} from "../types/websocketOptions";
import WebSocket, {WebSocketServer} from "ws";
import {payloadData} from "../types/payloadData";
import {InMemory} from "./inMemory";

export class WebsocketServer {
    private readonly wsServer: WebSocketServer
    private readonly inMemoryDB: InMemory

    public constructor(options: WebsocketOptions) {
        this.wsServer = options.ws
        this.inMemoryDB = options.memory;
    }

    public async listen() {
        this.wsServer.on("connection", (socket: WebSocket, request) => {

            socket.on("message", (data: WebSocket.RawData, isBinary: boolean) => {
                let payload!: payloadData
                try {
                    payload = JSON.parse(data.toString())
                } catch (e) {
                    socket.send(JSON.stringify({
                        error: "Inappropriate json."
                    }))
                }
                switch (payload.type) {
                    case "SEND_DATA":
                        console.log(`[R]: ${payload.type}`);
                         for (const Client of this.wsServer.clients) {
                            Client.send(JSON.stringify({
                                type: "RECEIVE_DATA",
                                data: payload.data
                            }))
                        }
                        break;
                    case "HELLO":
                        break;
                    case "PING":
                        socket.send(JSON.stringify({
                            type: "PONG"
                        }))
                        break;
                }
            })
        })
    }
}