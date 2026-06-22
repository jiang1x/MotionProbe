# MotionProbe 21 个案例素材放置说明

本项目源码 ZIP **不包含图片和视频**。请从你提供的 `素材.zip` 中取出文件，并保持原始案例编号。

## 目录结构

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

不要修改扩展名和大小写。图片与视频通过相同的案例编号自动配对。

## 完整文件映射

| 序号 | 案例编号 | 首帧图放置位置 | Text-only 视频放置位置 |
|---:|---|---|---|
| 1 | `C1-01` | `public/cases/start-images/C1-01.png` | `public/cases/text-only-videos/C1-01.mp4` |
| 2 | `C1-02` | `public/cases/start-images/C1-02.png` | `public/cases/text-only-videos/C1-02.mp4` |
| 3 | `C2-01` | `public/cases/start-images/C2-01.png` | `public/cases/text-only-videos/C2-01.mp4` |
| 4 | `C2-02` | `public/cases/start-images/C2-02.png` | `public/cases/text-only-videos/C2-02.mp4` |
| 5 | `C2-03` | `public/cases/start-images/C2-03.png` | `public/cases/text-only-videos/C2-03.mp4` |
| 6 | `C3-01` | `public/cases/start-images/C3-01.png` | `public/cases/text-only-videos/C3-01.mp4` |
| 7 | `C3-02` | `public/cases/start-images/C3-02.png` | `public/cases/text-only-videos/C3-02.mp4` |
| 8 | `C3-03` | `public/cases/start-images/C3-03.png` | `public/cases/text-only-videos/C3-03.mp4` |
| 9 | `C4-01` | `public/cases/start-images/C4-01.png` | `public/cases/text-only-videos/C4-01.mp4` |
| 10 | `C4-02` | `public/cases/start-images/C4-02.png` | `public/cases/text-only-videos/C4-02.mp4` |
| 11 | `C5-01` | `public/cases/start-images/C5-01.png` | `public/cases/text-only-videos/C5-01.mp4` |
| 12 | `C5-02` | `public/cases/start-images/C5-02.png` | `public/cases/text-only-videos/C5-02.mp4` |
| 13 | `C5-03` | `public/cases/start-images/C5-03.png` | `public/cases/text-only-videos/C5-03.mp4` |
| 14 | `C6-01` | `public/cases/start-images/C6-01.png` | `public/cases/text-only-videos/C6-01.mp4` |
| 15 | `C6-02` | `public/cases/start-images/C6-02.png` | `public/cases/text-only-videos/C6-02.mp4` |
| 16 | `C7-01` | `public/cases/start-images/C7-01.png` | `public/cases/text-only-videos/C7-01.mp4` |
| 17 | `C7-02` | `public/cases/start-images/C7-02.png` | `public/cases/text-only-videos/C7-02.mp4` |
| 18 | `C7-03` | `public/cases/start-images/C7-03.png` | `public/cases/text-only-videos/C7-03.mp4` |
| 19 | `C8-01` | `public/cases/start-images/C8-01.png` | `public/cases/text-only-videos/C8-01.mp4` |
| 20 | `C8-02` | `public/cases/start-images/C8-02.png` | `public/cases/text-only-videos/C8-02.mp4` |
| 21 | `C8-03` | `public/cases/start-images/C8-03.png` | `public/cases/text-only-videos/C8-03.mp4` |

## 从附件目录复制

附件中的对应关系为：

```text
素材/首帧图/C1-01.png  → public/cases/start-images/C1-01.png
素材/文生视频/C1-01.mp4 → public/cases/text-only-videos/C1-01.mp4
```

其余案例按相同规则复制。放置完成后运行 `npm run dev`，左侧材料区和中间画布会自动读取对应资源。
