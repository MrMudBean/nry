# Npm RegistrY

[![version](<https://img.shields.io/npm/v/nry.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/nry) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/MrMudBean/nry/issues)

一个用于 npm、yarn、pnpm registry 切换及管理的工具。

## 安装

可全局安装，亦可直接使用 `npx` 使用即可

```bash
npm install -g nry
```

## 使用

本应用使用 [a-command](https://www.npmjs.com/package/a-command) ，所以屏蔽了 `Ctrl + C` 、`Ctrl + D` ，但可采用*双击 `Esc` 退出*。

执行能力可能根据当前执行的包管理器有关，

- 使用 `npm` 时使用 `npx`调用执行
- 使用 `yarn` 时使用 `yarn dlx` 调用执行
- 使用 `pnpm` 时使用 `pnpm dlx` 调用执行

| 调用子项        | 缩写项       | 释义                   |
| :-------------- | :----------- | :--------------------- |
| `-- nry`        | --           | 切换 registry 源       |
| `-- nry add`    | `-- nry a`   | 添加自定义 registry 源 |
| `-- nry delete` | `-- nry del` | 删除 registry 源       |
| `-- nry edit`   | `-- nry ed`  | 修改 registry 源       |
| `-- nry list`   | `-- nry ls`  | 展示 registry 源       |
| `-- nry manage` | `-- nry mg`  | 管理 registry 源显隐   |
| `-- nry reset`  | `-- nry re`  | 重置 registry 源       |

相应的，对应的包管理器调用执行仅用于设置本包管理器的 `registry`。

## 文档地址

参看 [nry](https://earthnut.dev/npm/nry)
