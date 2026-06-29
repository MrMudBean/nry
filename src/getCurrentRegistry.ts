import { runOtherCode } from '@vvi/node';
import { dog } from './aided/dog';
import { dataStore } from './data';

/**  获取当前配置的 本地的 registry  */
export async function getCurrentRegistry() {
  const { pkgManager } = dataStore;

  const code = `${pkgManager} config get registry`;

  dog('执行可写代码', code);

  const result = await runOtherCode(code);

  dog('获取当前的本地配置为', result);
  if (result.success) return result.data.replace(/\s/gm, '');

  return undefined;
}
