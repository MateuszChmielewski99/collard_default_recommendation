import { Connection, Exchange, Message, Queue } from 'amqp-ts';
import { IServiceBus } from './IServiceBus';

export class RabbitMqServiceBus implements IServiceBus {
  public connection: Connection = new Connection(
    process.env.RABBITMQCONNECTION
  );
  private exchange: Exchange;

  constructor() {
    this.exchange = this.connection.declareExchange('CollardMovie');
  }

  receiveMessage(
    queueName: string,
    handler: (message: Message) => void
  ): IServiceBus {
    const queue: Queue = this.connection.declareQueue(queueName);
    queue.bind(this.exchange);
    queue.activateConsumer(handler);

    return this;
  }
}
