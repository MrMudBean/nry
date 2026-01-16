import { isFalse, isUndefined } from 'a-type-of-js';
import { commandParameters } from '../data/commandParameters';
import { CommandParameters } from '../types';
import { command } from './command';
import { dog } from './dog';

/**  解析参数  */
export function parseArg() {
  /**  用户启动参数  */
  const args = command.args;

  /**  用户启用参数的 map 形式  */
  const argsMap = args.$map;

  dog('源解析值', args);
  dog('源解析值没有匹配项', args.$isVoid);

  (
    [
      'add',
      'delete',
      'edit',
      'list',
      'manage',
      'reset',
      'clean',
    ] as (keyof CommandParameters & keyof typeof argsMap)[]
  ).forEach(e => (commandParameters[e] = isFalse(isUndefined(argsMap[e]))));
  // 当没有匹配到项
  commandParameters.noMatch = args.$isVoid;

  dog('解析完的值', commandParameters);
}
