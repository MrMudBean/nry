import { addItem } from './add-item';
import { dog } from './aided/dog';
import { parseArg } from './aided/parse';
import { qqi } from './aided/qqi';
import { choose } from './choose';
import { commandParameters } from './data/commandParameters';
import { delItem } from './del-item';
import { editItem } from './edit-item';
import { list } from './list';
import { manageVisible } from './manageVisible';
import { reset } from './reset';

/**  主程序  */
export async function main() {
  parseArg();

  dog('解析参数完毕，开始执行', commandParameters);
  if (commandParameters.noMatch) {
    dog('当前没有匹配值');
    return await choose();
  } else if (commandParameters.reset) {
    dog('重置项');
    return await reset();
  } else if (commandParameters.list) {
    dog('当前为展示项');
    return await list();
  } else if (commandParameters.manage) {
    dog('当前执行状态更改');
    return await manageVisible();
  } else if (commandParameters.add) {
    dog('添加新的项');
    return await addItem();
  } else if (commandParameters.edit) {
    dog('编辑项');
    return await editItem();
  } else if (commandParameters.delete) {
    dog('删除项');
    return await delItem();
  } else if (commandParameters.clean) {
    dog('当前执行清理');
    return qqi.clean();
  }

  return await choose();
}
