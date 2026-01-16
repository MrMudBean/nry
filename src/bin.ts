#!/usr/bin/env node

import { dog } from './aided/dog';
import { main } from './main';

(async () => {
  try {
    await main();
  } catch (error) {
    dog.error('系统级捕获 错误', error);
    console.log('当前出现未知错误', error);
  }
})();
