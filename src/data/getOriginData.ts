import { unlinkSync } from 'node:fs';
import { isArray, isBusinessEmptyString, isString } from 'a-type-of-js';

import { QQI } from 'qqi';
import { dog } from '../aided/dog';
import { mustEndWithSlash } from '../aided/utils';
import { LocalConfig, LocalConfigItem } from '../types';
import { originRegistryList } from './origin-registry-list';

const {
  npm,
  'tao-bao': taoBao,
  'ten-xun': tenXun,
  ustclug,
  yarn,
} = originRegistryList;

const originData = [
  {
    value: npm,
    label: '官方',
    tip: npm,
  },
  {
    value: taoBao,
    label: '淘宝',
    tip: taoBao,
  },
  {
    value: tenXun,
    label: '腾讯',
    tip: tenXun,
  },
  {
    value: ustclug,
    label: '中科大',
    tip: ustclug,
  },
  {
    value: yarn,
    label: 'yarn',
    tip: yarn,
  },
];
/**
 * 创建原始的数据
 *
 * @param [reset=false]  是否为重置，该情况下直接返回原始值进行覆盖
 */
export function getOriginData(reset: boolean = false): LocalConfig {
  // 重置默认返回原始值
  if (reset) return [...originData];
  // 读写受限返回原始值
  if (!qqi.available) return [...originData];

  const localConfig = qqi.read();

  if (
    isArray(localConfig) &&
    localConfig.every(
      e =>
        isString(e.value) &&
        !isBusinessEmptyString(e.label) &&
        isString(e.value) &&
        !isBusinessEmptyString(e.value),
    )
  ) {
    // 强制带杠
    const result = localConfig.map(e => {
      e.value = mustEndWithSlash(e.value);
      e.tip = mustEndWithSlash(e.tip);
      return e;
    });

    return result;
  }

  // 默认返回原始值
  return [...originData];
}

/**  构建读写机  */
const _qqi = new QQI('nry');

const filename = 'config';

export const qqi = {
  /**  当前是否可用  */
  available: _qqi.available,
  /**  公共读数据
   *
   * 如果数据不支持则返回默认值
   */
  read(): LocalConfig {
    if (_qqi.available) {
      const localData = _qqi.read(filename) as unknown as LocalConfig;
      // 简单判断当前数据是否有值
      if (isArray(localData)) {
        return localData;
      }
    }
    return getOriginData(true);
  },
  /**
   *  添加新的项
   * @param newItem
   */
  addNew(newItem: LocalConfigItem) {
    if (_qqi.available) {
      /**  当前的旧数据  */
      const localData = this.read();
      // 添加新的项
      localData.push(newItem);
      dog('新写入的数据为', newItem);
      // 写入新的数据
      return this.write(localData);
    }
    return false;
  },
  /**
   *  公共写数据
   * @param data
   */
  write(data: LocalConfig) {
    if (_qqi.available) {
      return _qqi.write(filename, data);
    }
    return false;
  },
  /**  获取当前的数据  */
  getPath(): string {
    return _qqi.getPath(filename);
  },
  /**  清理文件，该项仅出现在非标记的开发环境  */
  clean() {
    const filename = this.getPath();
    dog('将要移除的文件', filename);
    unlinkSync(filename);
  },
};
