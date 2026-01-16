import { _p } from 'a-node-tools';
import { isString } from 'a-type-of-js';
import { brightBlackPen, greenPen, magentaPen } from 'color-pen';
import { Table } from 'colored-table';
import { dataStore } from './data';
import { getOriginData } from './data/getOriginData';
import { getCurrentRegistry } from './getCurrentRegistry';

/**
 *
 * ## 展示项
 *
 * 不单在用户使用命令 `list` 触发时展示，在用户增加、修改、移除 registry 项时都将展示当前的项
 */
export async function list() {
  const { pkgManager } = dataStore;
  /**  当前数据  */
  const data = getOriginData();
  /**  当前的值  */
  const current = await getCurrentRegistry();

  /**  构建表格  */
  const table = new Table({
    header: [`${pkgManager} registry 源`, '别名', '当前可见'],
  });

  /**  是否有当前值  */
  const hasCurrentValue = data.findIndex(e => e.value === current) > -1;

  if (!hasCurrentValue && isString(current)) {
    data.push({
      value: current,
      tip: current,
      label: '曾用值',
    });
  }

  data.forEach(e =>
    table.addRow([
      (current === e.value ? magentaPen`* ` : '  ').concat(e.value),
      (current === e.value ? magentaPen`* ` : '  ').concat(greenPen(e.label)),
      e.disable ? '❌' : '✅',
    ]),
  );

  table(); // 渲染

  _p(brightBlackPen`注：当前可见状态仅影响 npx nry 选择项`);
}
