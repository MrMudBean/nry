import { SelectionParamObjectData } from 'a-command';
import { runOtherCode, _p } from 'a-node-tools';
import { magentaPen, greenPen, bluePen } from 'color-pen';
import { dog } from './aided/dog';
import { mustEndWithSlash, isCanConnect, exitProgram } from './aided/utils';
import { dataStore } from './data/index';
import { getTarget } from './getTarget';

/**  挑选一个域  */
export async function choose() {
  /**  获取靶  */
  const target = await getTarget();

  await setNewRegistry(target);
}

/**
 *  设置新的
 * @param item
 */
async function setNewRegistry(item: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;

  const registry = mustEndWithSlash(item.value);

  if (!(await isCanConnect(registry)))
    return await exitProgram(
      `选择的项 「${magentaPen(registry)}」 不可连接，无法被设置`,
    );

  const code = `${pkgManager} config set registry "${registry}"`;

  dog('设置源执行代码', code);

  const result = await runOtherCode(code);

  if (!result.success) await exitProgram();

  _p(
    `已将 ${pkgManager} registry 更改为 ${greenPen(item.value)}(${bluePen(item.label)})`,
  );
}
