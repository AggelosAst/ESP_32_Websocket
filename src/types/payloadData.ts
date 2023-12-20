export type payloadData = {
    id: string;
    data: string;
    type: "RECEIVE_DATA" | "HELLO" | "PING" | "REQUEST_DATA"
}