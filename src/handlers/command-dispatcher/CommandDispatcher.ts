import { Message } from 'amqp-ts';
import { createCommandHandler } from '../../factories/commandHandler.factory';

import { ICommandDispatcher } from './ICommandDispatcher';

export class CommandDispatcher implements ICommandDispatcher {
  async dispatch(message: Message) {
    const content = message.getContent();

    const handler = createCommandHandler(content);
    
    if (!handler) throw Error('Unregistered handler');

    await handler.handle(content);
  }
}
