import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';
import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license';

export default {
  input: {
    index: './src/bin.ts', // 默认：聚合导出入口
  },
  output: ['es'].map(e => ({
    format: e, // ESM 模式
    entryFileNames: 'bin.js', // 打包文件名
    preserveModules: false, // 保留独立模块结构（关键）
    // preserveModulesRoot: 'src', // 保持 src 目录结构
    sourcemap: false, // 正式环境：关闭 source map
    // exports: 'named', // 导出模式
    dir: `dist/`,
  })),
  // 配置需要排除或包含的包
  external: external({
    include: [
      '@qqi/log',
      'a-type-of-js',
      'a-command',
      'a-node-tools',
      'color-pen',
      'colored-table',
      'qqi',
      'a-js-tools',
      '@color-pen/static',
      'a-type-of-js/isFunction',
      'a-type-of-js/isNumber',
    ],
    ignore: ['node:'],
  }),
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript(),
    cleanup(),
    terser({
      format: {
        comments: false, // 移除所有注释
      },
    }),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
    license({
      thirdParty: {
        allow: '(MIT OR Apache-2.0 OR BSD-3-Clause)', // 仅允许这些许可证依赖
        output: {
          file: 'dist/THIRD-PARTY-LICENSES.txt',
          template: dependencies =>
            `THIRD-PARTY LICENSE\n${'='.repeat(50)}\n\n`.concat(
              dependencies
                ?.map(
                  dep =>
                    `${dep.name} (${dep.version})\n${'-'.repeat(30)}\n${dep.licenseText}\n`,
                )
                .join('\n'),
            ),
        },
      },
    }),
  ],
};
