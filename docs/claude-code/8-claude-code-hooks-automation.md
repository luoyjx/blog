---
title: "8 个 Claude Code Hooks 自动化实践"
description: "8 个 Claude Code Hooks 自动化实践"
---

## Summary
文章对比了 CLAUDE.md（建议性指令，约 80% 生效率）与 Hooks（强制执行的自动化操作）的区别，指出对于关键操作应使用 Hooks 而非依赖 CLAUDE.md。作者总结了 8 个实用的 Hook 场景，覆盖代码格式化、安全防护、测试自动化和版本控制等方面。核心理念是：CLAUDE.md 是建议，Hooks 是强制执行；对于不可妥协的操作，必须用 Hooks 来保障。

## Key Concepts
- **Claude Code Hooks** - Claude Code 中的强制执行机制，自动触发指定操作
- **CLAUDE.md** - Claude Code 的项目级指令文件，属建议性质，约 80% 生效率
- **Pre commit Hooks** - 提交前强制执行的检查和操作
- **Developer Automation** - 开发流程中的自动化实践

## Detailed Content

### CLAUDE.md vs Hooks
- **CLAUDE.md**：建议性指令，约 80% 的时间生效
- **Hooks**：自动执行的可靠操作，100% 强制执行

### 8 个 Hook 实践

#### 代码质量
1. **自动格式化** - 使用 Prettier 自动格式化 Claude 修改的每个文件
6. **自动 Lint 并报告错误** - 自动运行 ESLint 并报告

#### 安全防护
2. **阻止危险命令** - 拦截 `rm -rf`、`DROP TABLE` 等危险操作
3. **保护敏感文件** - 防止修改 `.env`、`package-lock.json` 等文件

#### 测试保障
4. **编辑后自动测试** - 每次编辑后自动运行测试
5. **PR 前必须通过测试** - 创建 PR 前要求测试通过

#### 工作流自动化
7. **记录所有命令** - 带时间戳记录每条命令
8. **任务完成后自动提交** - 每个任务完成后自动 git commit

## Related Topics
- **Claude Code Configuration**
- **Git Hooks**
- **CI/CD Pipeline**
- **Code Quality Automation**
- **Developer Experience**
