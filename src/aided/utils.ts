import { cursorShow, typewrite } from 'a-node-tools';
import { isBusinessEmptyString } from 'a-type-of-js';
import { command } from './command';
import { dog } from './dog';

/**
 *  退出程序
 * @param str
 */
export async function exitProgram(
  str: string = '好的，即将退出',
): Promise<never> {
  if (!isBusinessEmptyString(str)) await typewrite(str);

  cursorShow();
  return command.end();
}

/**
 * 必须有尾斜杠
 * @param value
 */
export function mustEndWithSlash(value: string) {
  return value.endsWith('/') ? value : value + '/';
}

// TODO 后期将方法迁移到 a-node-tools
/**
 * 测试给出的 npm registry 的连通性
 * @param url
 */
export async function isCanConnect(url: string): Promise<boolean> {
  return new Promise(resolve => {
    let _url;
    try {
      _url = new URL(url);
      return resolve(true);
    } catch {
      dog.error('当前传入的', url, '有误');
      return resolve(false);
    }
    //   const options = {
    //     hostname: _url.hostname,
    //     path: mustEndWithSlash(_url.pathname),
    //     port: 443,
    //     method: 'GET',
    //     timeout: 5000,
    //     headers: {
    //       'sec-fetch-dest': 'empty',
    //       'X-Spiferacl': '1',
    //     },
    //   };
    //   dog('请求的测试参数为', options);

    //   const req = https.get(options, response => {
    //     response.on('data', data => dog(data.toString()));
    //     response.on('end', () => resolve(response.statusCode === 200));
    //     response.on('error', error => {
    //       dog.error(error);
    //       return resolve(false);
    //     });
    //     response.on('timeout', () => {
    //       req.destroy(); // 关闭请求
    //       return resolve(false);
    //     });
    //   });
    //   req.end();
  });
}
