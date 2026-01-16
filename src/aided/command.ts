import { Args } from 'a-command';
import { brightCyanPen, brightRedPen } from 'color-pen';
import { dun } from './dog';

const command = new Args<{
  add: undefined;
  edit: undefined;
  delete: undefined;
  list: undefined;
  manage: undefined;
}>('nry');

/// clean 仅出现在非标记的测试环境
command
  .bind([
    'add <a> (用于添加一个自定义的 npm、yarn、pnpm 源)',
    'edit <ed> (用于编辑源) ',
    (!dun && 'clean (移除本地数据)') || '',
    'delete <del> (用于移除某个或多个自定义的项)',
    'list <ls> (用于展示当前的所有的源)',
    'manage <mg> (用于管理当前源在列表中的显隐)',
    `reset <rs> (重制当前的源，将${brightRedPen`永久移除自定义源`}、${brightCyanPen`恢复已更改的源`})`,
  ])
  .run()
  .isEnd(true);

export { command };
