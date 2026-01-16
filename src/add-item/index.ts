import { question } from 'a-command';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { brightBlackPen, brightRedPen } from 'color-pen';
import { qqi } from '../aided/qqi';
import { exitProgram } from '../aided/utils';
import { getOriginData } from '../data/getOriginData';
import { dataStore } from '../data/index';
import { localAdd } from '../data/localAdd';
import { list } from '../list';
import { getLabel } from './inputLabel';
import { getValue } from './inputValue';

/**  添加新的项  */
export async function addItem() {
  if (!qqi.available) return await exitProgram('读写受限，正在退出');
  const { pkgManager } = dataStore;
  const originData = getOriginData();
  const value = await getValue(originData);
  const label = await getLabel(originData);
  if (
    localAdd({
      value,
      label,
    })
  ) {
    _p(brightBlackPen`当前的 ${pkgManager} registry 源列表为`);
    await list();
    const tip = ['退出', '继续添加'];
    const result = await question({
      text: '添加完成，是否持续添加',
      tip,
    });
    if (isUndefined(result) || result === tip[0]) return await exitProgram('');
    return await addItem();
  }
  return await exitProgram(`写入${brightRedPen`失败`}，原因未知`);
}
