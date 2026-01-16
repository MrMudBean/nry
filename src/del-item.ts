import { question } from 'a-command';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { qqi } from './aided/qqi';
import { exitProgram } from './aided/utils';
import { getOriginData } from './data/getOriginData';
import { getTarget } from './getTarget';
import { list } from './list';

/**
 * 移除项
 */
export async function delItem() {
  if (!qqi.available) return await exitProgram('当前读写受限，即将退出程序');

  const target = await getTarget('请选择要删除的项', false, false);

  const { value, label } = target;

  /// 获取本地的值，防止意外覆盖
  const originData = getOriginData();

  for (const i in originData) {
    const index = Number(i);
    /**  子项  */
    const ele = originData[index];
    /// 检测并删除子项
    if (ele.value === value && ele.label === label) {
      originData.splice(index, 1);
      break;
    }
  }

  const result = qqi.write(originData);

  /// 删除完成后是否循环执行删除
  if (result) {
    _p('删除项后的列表为：');
    await list();
    const tip = ['退出', '继续删除'];
    const result = await question({
      text: '是否继续删除其他项',
      tip,
    });

    if (isUndefined(result) || result === tip[0]) return await exitProgram('');

    return await delItem();
  }
}
