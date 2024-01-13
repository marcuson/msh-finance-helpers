import { ModuleDef } from '../loader/module-def';
import { stylesheet } from './cc-transactions.module.css';
import {
  startObserveDOM as transactionsInit,
  stopObserveDOM as transactionsStop,
} from './transactions-helpers';

export const moduleDef = {
  name: 'cc-transactions',
  css: stylesheet,
  initFn: () => {
    transactionsInit();
  },
  stopFn: () => {
    transactionsStop();
  },
} as ModuleDef;
