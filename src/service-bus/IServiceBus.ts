import { Message } from 'amqp-ts';

export interface IServiceBus {
  receiveMessage(
    queueName: string,
    handler: (message: Message) => void
  ): IServiceBus;
}
