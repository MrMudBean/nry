import { Dog } from '@vvi/log';
import { isFalse } from '@vvi/is';

export const dog = new Dog({
  name: 'nry',
  type: false,
});

/**  是够为正式环境  */
export const dun = isFalse(dog.type);
