import { Message } from "amqp-ts";

export interface ICommandDispatcher {
    dispatch(message:Message):Promise<void>;
}