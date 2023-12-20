import {ServerOptions} from "../types/serverOptions";
import express, {Express, NextFunction, Request, Response, Router} from "express";
import WebSocket, { WebSocketServer } from "ws";
import {WebsocketServer} from "./websocket";
import {InMemory} from "./inMemory";


export class Server {
    private readonly port: number;
    private readonly app: Express;
    private readonly router: Router;
    private readonly memoryDB : InMemory
    public constructor(options: ServerOptions) {
        this.port = options.port;
        this.memoryDB = options.memory;
        this.app = express()
        this.router = Router({
            strict: true,
            caseSensitive: false
        });
        this.app.use(this.router);
        this.app.use(express.json());
    }

    private setUp(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
                return res.status(200).json({
                    message: "s"
                })
            })
            resolve()
        })
    }
    public async listen(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await this.setUp()
            const server = this.app.listen(this.port, ()=> {
                console.log("Listening")
                new WebsocketServer({
                    ws: new WebSocket.Server({server}),
                    memory: this.memoryDB
                }).listen()
                resolve(true)
            })
        })
    }
}