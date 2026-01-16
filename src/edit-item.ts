import { question, SelectionParamObjectData } from 'a-command';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { dog } from './aided/dog';
import { qqi } from './aided/qqi';
import { exitProgram, mustEndWithSlash } from './aided/utils';
import { getOriginData } from './data/getOriginData';
import { dataStore } from './data/index';
import { getTarget } from './getTarget';
import { list } from './list';

/**  编辑项  */
export async function editItem() {
  if (!qqi.available)
    return await exitProgram('当前读写权限不足，即将退出程序');

  const target = await getTarget('请选择你想要修改的项', false);

  const { value: originValue, label: originLabel } = target;

  dog('获取用户的选择', target);

  dog('原始的值', originValue);

  dog('原始的标签', originLabel);

  await editValue(target);

  await editLabel(target); // 已经写完毕
  const { value, label } = target;

  dog('更改后的值', value);

  dog('更改的标签', label);

  /// 获取本地的值，防止意外覆盖
  const originData = getOriginData();

  for (const ele of originData) {
    if (ele.value === originValue && ele.label === originLabel) {
      ele.value = value;
      ele.label = label.toString();
      break;
    }
  }

  const result = qqi.write(originData);

  /// 写入后循环问询是否循环修改
  if (result) {
    _p('更改后的列表为：');
    await list();
    const tip = ['退出', '继续修改'];
    const result = await question({
      text: '是否继续修改其他项',
      tip,
    });

    if (isUndefined(result) || result === tip[0]) return await exitProgram('');

    return await editItem();
  }
}

/**
 *  更改当前的 label 值
 * @param target
 */
async function editLabel(target: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;
  const result = await question({
    text: `请更改为新的 ${pkgManager} registry 别名`,
    tip: target.label,
    defaultValue: target.label.toString(),
    required: false,
  });
  dog('新值为', result);
  /**  没有更改  */
  if (isUndefined(result)) return;
  target.label = result;
}

/**
 *  更改值
 * @param target
 */
export async function editValue(target: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;
  const result = await question({
    text: `请更改为新的 ${pkgManager} registry 值`,
    tip: target.value,
    defaultValue: target.value,
    required: false,
  });
  dog('新值为', result);
  /**  没有更改  */
  if (isUndefined(result)) return;

  target.value = target.tip = mustEndWithSlash(result);
}
