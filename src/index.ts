import {Server} from "./libs/server";
import {InMemory} from "./libs/inMemory";

const memoryInstance: InMemory = new InMemory();

const serverInstance = new Server({
    port: 4040,
    memory: memoryInstance
});

serverInstance.listen().then(r=> {
    console.log(r)
})