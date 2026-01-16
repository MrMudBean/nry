import { selection, SelectionParamObjectData } from 'a-command';
import { isUndefined, isFalse, isBusinessEmptyString } from 'a-type-of-js';
import { magentaPen } from 'color-pen';
import { dog } from './aided/dog';
import { qqi } from './aided/qqi';
import { exitProgram } from './aided/utils';
import { dataStore } from './data';
import { getOriginData } from './data/getOriginData';
import { localAdd } from './data/localAdd';
import { getCurrentRegistry } from './getCurrentRegistry';

/**
 * 获得要编辑的项
 *
 * @param [info='请选择想使用的新的 npm registry']  展示的信息
 * @param [filter=true]  是否过滤不可用值
 * @param [allowCurrent=true]  是否允许当前值被选择。默认允许
 *  */
export async function getTarget(
  info: string = '',
  filter: boolean = true,
  allowCurrent: boolean = true,
): Promise<SelectionParamObjectData<string>> {
  if (isBusinessEmptyString(info))
    info = `请选择想使用的新的 ${dataStore.pkgManager} registry 源`;

  /**  是否有当前值  */
  let hasCurrentValue: boolean = false;
  /**  数据  */
  const originData: SelectionParamObjectData<string>[] = getOriginData();

  const currentValue = await getCurrentRegistry();

  if (!isUndefined(currentValue)) {
    for (const e of originData) {
      if (e.value === currentValue) {
        e.label = e.label.toString() + `（${magentaPen`当前使用`}）`;
        e.disable = !allowCurrent;
        hasCurrentValue = true;
        break;
      }
    }
    if (isFalse(hasCurrentValue)) {
      const newItem = {
        value: currentValue,
        label: '当前使用值',
        disable: !allowCurrent,
      };
      originData.push(newItem);
      // 当前本地可写
      if (qqi.available) {
        localAdd({ value: currentValue, label: '曾用值' });
      }
    }
  }
  dog('处理完的数据', originData);

  const data = filter
    ? originData.filter(
        e => !e.disable || (e.disable && e.value === currentValue),
      )
    : originData.map(e => {
        if (e.value === currentValue) {
          e.disable = !allowCurrent;
        } else {
          e.disable = false;
        }
        return e;
      });
  /**  选择交互  */
  const result = await selection(
    {
      data,
      info,
    },
    'number',
  );

  dog('用户选择的项', result);

  if (isUndefined(result)) return await exitProgram();

  dog('当前用户选择为', data[result]);
  return data[result];
}
