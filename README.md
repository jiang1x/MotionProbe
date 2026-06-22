# MotionProbe

MotionProbe 是一个面向 HCI 实验的“文生视频输入层探针系统”。它不生成视频，而是记录参与者如何通过文本、首帧图、草图、箭头、区域与文字标签表达运动和物理意图。

本版本已经依据实验案例表更新为 **21 个案例、8 个研究类别**。

## 技术栈

- React + Vite + TypeScript
- Tailwind CSS
- Konva / react-konva
- JSZip
- localStorage（无后端）

## 本地运行

```bash
npm install
npm run dev
```

构建检查：

```bash
npm run lint
npm run build
npm run preview
```

## 21 个案例素材

源码包不包含首帧图和视频。请将附件中的原始文件按以下规则放置：

```text
public/
└── cases/
    ├── start-images/
    │   ├── C1-01.png
    │   ├── C1-02.png
    │   └── ...
    └── text-only-videos/
        ├── C1-01.mp4
        ├── C1-02.mp4
        └── ...
```

完整的 21 个文件名和路径见：

```text
MEDIA_PLACEMENT.md
```

案例配置位于：

```text
src/data/cases.ts
```

每个案例保留以下表格信息：

- 案例编号
- 类别编号
- 类别名称
- 英文原始 Prompt
- 中文任务文本
- 首帧图路径
- Text-only 视频路径
- 研究者内部备注

## 研究信息显示开关

配置文件：

```text
src/config/experiment.ts
```

默认设置：

- 显示研究类别；
- 不显示研究者内部备注。

如担心类别名称对被试产生提示，可将 `showResearchCategory` 改为 `false`。

## 画布与数据

- 画布固定为 768 × 432，适配 16:9；
- 支持首帧背景和空白画布；
- 支持画笔、箭头、曲线路径、矩形区域、文字标签和橡皮；
- 支持撤销、重做、清空、颜色和线宽；
- 案例内容自动保存到 localStorage；
- 刷新后可恢复参与者、当前进度和所有案例内容。

## 导出结构

点击“导出全部数据”后生成：

```text
participantId_motionprobe_export.zip
├── participant_metadata.json
├── C1-01.json
├── C1-01_canvas.png
├── C1-02.json
├── C1-02_canvas.png
├── ...
├── C8-03.json
└── C8-03_canvas.png
```

每个案例 JSON 除参与者输入外，还包含案例标题、类别、英文 Prompt、中文任务文本和媒体路径，便于后续分析时独立识别案例。

## 部署到 Vercel

1. 将项目推送至 GitHub；
2. 在 Vercel 中导入仓库；
3. Framework Preset 选择 `Vite`；
4. Build Command 使用 `npm run build`；
5. Output Directory 使用 `dist`；
6. 部署。

Vercel 会直接发布 `public` 中的案例素材。因此请在推送 GitHub 前确认 42 个媒体文件均已放到正确目录。

## 后续接入视频生成

预留函数位于：

```text
src/services/video.ts
```

`generateVideoFromInputs()` 当前不调用任何真实视频生成 API，后续可直接接入服务。
