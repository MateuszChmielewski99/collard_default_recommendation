import 'reflect-metadata';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { bootstrap } from './container-setup';
import { container } from 'tsyringe';
import { IServiceBus } from './service-bus/IServiceBus';
import { ICommandDispatcher } from './handlers/command-dispatcher/ICommandDispatcher';

dotenv.config();

bootstrap();

const app: Application = express();

const serviceBus:IServiceBus = container.resolve('IServiceBus');
const commandDispatcher:ICommandDispatcher = container.resolve('ICommandDispatcher');

serviceBus.receiveMessage('recommendations', async (message) => {
  message.ack();
  await commandDispatcher.dispatch(message);
})

const port = process.env.PORT || 7080;

app.listen(port, () => {
  console.log(`App and running on port ${port}`);
});

