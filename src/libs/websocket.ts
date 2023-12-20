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
            setInterval(() => {
                socket.send(JSON.stringify({
                    "type": "REQUEST_DATA"
                }))
            }, 1000)
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
                    case "RECEIVE_DATA":
                        console.log(`[R]: ${payload.type}`);
                        break;
                    case "HELLO":
                        break;
                    case "PING":
                        socket.send(JSON.stringify({
                            data: "PONG"
                        }))
                        break;
                }
            })
        })
    }
}