import { question } from 'a-command';
import { escapeRegExp } from 'a-js-tools';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { greenPen, cyanPen, reversedPen } from 'color-pen';
import { dog } from '../aided/dog';
import { exitProgram, isCanConnect, mustEndWithSlash } from '../aided/utils';
import { dataStore } from '../data/index';
import { originRegistryList } from '../data/origin-registry-list';
import { LocalConfig } from '../types';

const { npm, yarn } = originRegistryList;

/**
 * 获取用户输入的数据
 * @param originData
 */
export async function getValue(originData: LocalConfig) {
  const { pkgManager } = dataStore;
  const valueVerify: { reg: RegExp; info: string; inverse?: boolean }[] = [
    {
      reg: /\s+/g,
      info: '不允许出现空格',
      inverse: true,
    },
  ];

  originData.forEach(e => {
    valueVerify.push({
      reg: new RegExp(`^${escapeRegExp(e.value)}/*$`, 'mg'),
      info: `${greenPen(e.value)}(${cyanPen(e.label)}) 已存在`,
      inverse: true,
    });
  });

  const value = await question({
    text: '请输入自定义的源地址',
    tip: pkgManager === 'yarn' ? yarn : npm,
    minLen: 5,
    maxLen: 120,
    verify: valueVerify,
    required: false,
  });

  dog('用户输入的地址', value);

  if (isUndefined(value)) return await exitProgram();

  if (!(await isCanConnect(value))) {
    _p(`当前设置 registry 「${reversedPen(value)}」 不可用`);
    _p(`请使用正确的源设置`);

    return await getValue(originData);
  }

  return mustEndWithSlash(value);
}
