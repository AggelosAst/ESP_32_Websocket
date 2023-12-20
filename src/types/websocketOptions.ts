import {WebSocketServer} from "ws";
import {InMemory} from "../libs/inMemory";

export interface WebsocketOptions {
    ws: WebSocketServer,
    memory: InMemory
}