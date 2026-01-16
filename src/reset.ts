import { question } from 'a-command';
import { typewrite } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { greenPen } from 'color-pen';
import { qqi } from './aided/qqi';
import { exitProgram } from './aided/utils';
import { getOriginData } from './data/getOriginData';
import { list } from './list';

/**  重制项  */
export async function reset() {
  if (!qqi.available)
    return await exitProgram('当前读写权限受限，正在退出程序');
  const tip = ['退出', '重置'];

  const result = await question({
    text: '请确认是否执行覆盖原数据，该操作无法复原',
    tip,
  });

  if (isUndefined(result) || result === tip[0])
    return await exitProgram('好的，这就退出重置');

  const writeResponse = qqi.write(getOriginData(true));

  if (writeResponse) {
    await typewrite('写入' + greenPen`成功`, 60);
    return await list();
  }
  return await exitProgram('重置未能完成，原因未知');
}
