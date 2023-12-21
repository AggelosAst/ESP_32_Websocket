export type payloadData = {
    id: string;
    data: string;
    type: "RECEIVE_DATA" | "HELLO" | "PING" | "REQUEST_DATA" | "REQUEST_STOP" | "SEND_DATA"
}
export enum payloadEnums {
    "RECEIVE_DATA" = 0,
    "HELLO" = 1,
    "PING" = 2,
    "PONG" = 3,
    "REQUEST_DATA" = 4,
    "REQUEST_STOP" = 5,
    "SEND_DATA" = 6
}