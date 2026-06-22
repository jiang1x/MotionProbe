import type { CaseDefinition } from '../types'

// 本文件依据实验案例表生成。资源文件按案例编号直接匹配。
export const cases: CaseDefinition[] = [
  {
    "caseId": "C1-01",
    "categoryCode": 1,
    "category": "关键物理过程缺失",
    "originalPrompt": "Ice cubes are placed in a glass of hot water, and the ice cubes gradually melt.",
    "taskText": "将冰块放入一杯热水中，冰块逐渐融化。",
    "internalNote": "",
    "title": "冰块在热水中融化",
    "startImage": "/cases/start-images/C1-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C1-01.mp4"
  },
  {
    "caseId": "C1-02",
    "categoryCode": 1,
    "category": "关键物理过程缺失",
    "originalPrompt": "A book slides off the edge of a table, slowing as it rubs against the surface before falling.",
    "taskText": "一本书从桌子边缘滑落，在与桌面摩擦减速后掉下桌面。",
    "internalNote": "",
    "title": "书本摩擦减速后坠落",
    "startImage": "/cases/start-images/C1-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C1-02.mp4"
  },
  {
    "caseId": "C2-01",
    "categoryCode": 2,
    "category": "运动学规律错误",
    "originalPrompt": "An apple falls from a tree branch, accelerating under gravity until it hits the ground.",
    "taskText": "一个苹果从树枝上掉落，在重力作用下加速，直到撞到地面。",
    "internalNote": "",
    "title": "苹果自由落体",
    "startImage": "/cases/start-images/C2-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C2-01.mp4"
  },
  {
    "caseId": "C2-02",
    "categoryCode": 2,
    "category": "运动学规律错误",
    "originalPrompt": "As a pendulum is released from a raised position, it swings downward, accelerating as it reaches its lowest point, and decelerating as it ascends.",
    "taskText": "一个摆从较高位置释放，向下摆动时加速，到达最低点后向上摆动并减速。",
    "internalNote": "",
    "title": "单摆加速与减速",
    "startImage": "/cases/start-images/C2-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C2-02.mp4"
  },
  {
    "caseId": "C2-03",
    "categoryCode": 2,
    "category": "运动学规律错误",
    "originalPrompt": "As a skateboard rolls on the ground, it slows down and the wheels spin slower, and the skateboard eventually stops moving entirely.",
    "taskText": "滑板在地面上滚动，逐渐减速，轮子转速变慢，最终停止。",
    "internalNote": "（新加入）尝试在 prompt 中控制滑板直线行驶，无法遵从语义",
    "title": "滑板减速停止",
    "startImage": "/cases/start-images/C2-03.png",
    "textOnlyVideo": "/cases/text-only-videos/C2-03.mp4"
  },
  {
    "caseId": "C3-01",
    "categoryCode": 3,
    "category": "碰撞响应不合理",
    "originalPrompt": "Two billiard balls collide, bouncing off of each other continuing to move in opposite directions.",
    "taskText": "两个台球相互碰撞，随后反弹并继续朝相反方向运动。",
    "internalNote": "",
    "title": "台球碰撞反弹",
    "startImage": "/cases/start-images/C3-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C3-01.mp4"
  },
  {
    "caseId": "C3-02",
    "categoryCode": 3,
    "category": "碰撞响应不合理",
    "originalPrompt": "Two toy cars collide on a track, causing one to spin while the other continues in a new direction",
    "taskText": "两辆玩具车在轨道上碰撞，其中一辆旋转，另一辆改变方向继续运动。",
    "internalNote": "",
    "title": "玩具车碰撞转向",
    "startImage": "/cases/start-images/C3-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C3-02.mp4"
  },
  {
    "caseId": "C3-03",
    "categoryCode": 3,
    "category": "碰撞响应不合理",
    "originalPrompt": "A child's kick sends a soccer ball moving forward into a collision with another ball, causing the balls to bounce off each other in new directions.",
    "taskText": "一个孩子踢出的足球向前运动并撞上另一个球，两个球随后向新的方向弹开。",
    "internalNote": "",
    "title": "足球碰撞弹开",
    "startImage": "/cases/start-images/C3-03.png",
    "textOnlyVideo": "/cases/text-only-videos/C3-03.mp4"
  },
  {
    "caseId": "C4-01",
    "categoryCode": 4,
    "category": "弹性形变理解不足",
    "originalPrompt": "A basketball is dropped onto the ground, compressing upon impact and rebounding upwards due to stored elastic energy.",
    "taskText": "一个篮球落到地面，触地时被压缩，并因弹性势能向上反弹。",
    "internalNote": "",
    "title": "篮球压缩回弹",
    "startImage": "/cases/start-images/C4-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C4-01.mp4"
  },
  {
    "caseId": "C4-02",
    "categoryCode": 4,
    "category": "弹性形变理解不足",
    "originalPrompt": "A spring is compressed and released, storing potential energy and returning to its original shape when released.",
    "taskText": "一个弹簧被压缩后释放，储存的势能使其恢复到原来的形状。",
    "internalNote": "",
    "title": "弹簧压缩恢复",
    "startImage": "/cases/start-images/C4-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C4-02.mp4"
  },
  {
    "caseId": "C5-01",
    "categoryCode": 5,
    "category": "塑性形变理解不足",
    "originalPrompt": "A metal wire is bent into a spiral shape, undergoing plastic deformation to retain the coiled form.",
    "taskText": "一根金属丝被弯成螺旋形，并因塑性形变保持盘绕后的形态。",
    "internalNote": "",
    "title": "金属丝塑性弯曲",
    "startImage": "/cases/start-images/C5-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C5-01.mp4"
  },
  {
    "caseId": "C5-02",
    "categoryCode": 5,
    "category": "塑性形变理解不足",
    "originalPrompt": "A clay sculpture is reshaped, retaining the new form due to plastic deformation.",
    "taskText": "一个黏土雕塑被重新塑形，并因塑性形变保持新的形状。",
    "internalNote": "",
    "title": "黏土塑性重塑",
    "startImage": "/cases/start-images/C5-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C5-02.mp4"
  },
  {
    "caseId": "C5-03",
    "categoryCode": 5,
    "category": "塑性形变理解不足",
    "originalPrompt": "A metal spoon is bent by hand, undergoing plastic deformation and remaining distorted after the force is applied.",
    "taskText": "一把金属勺被手弯曲，受力后保持弯曲变形的状态。",
    "internalNote": "（新加入）考虑到金属丝形变可能不易表达，加入此新场景",
    "title": "金属勺塑性弯曲",
    "startImage": "/cases/start-images/C5-03.png",
    "textOnlyVideo": "/cases/text-only-videos/C5-03.mp4"
  },
  {
    "caseId": "C6-01",
    "categoryCode": 6,
    "category": "脆性断裂 / 破碎机制错误",
    "originalPrompt": "A delicate, fragile egg is hurled with significant force towards a rugged, solid rock surface, where it collides upon impact.",
    "taskText": "一个脆弱的鸡蛋被用力扔向坚硬岩石表面，撞击后蛋壳破裂、碎片散开，内部流出。",
    "internalNote": "",
    "title": "鸡蛋撞击破裂",
    "startImage": "/cases/start-images/C6-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C6-01.mp4"
  },
  {
    "caseId": "C6-02",
    "categoryCode": 6,
    "category": "脆性断裂 / 破碎机制错误",
    "originalPrompt": "A porcelain vase shatters when dropped on floor, breaking into large, irregular pieces without bending.",
    "taskText": "一个瓷花瓶掉到地面上，未发生明显弯曲就碎成不规则的大块碎片。",
    "internalNote": "（新加入）",
    "title": "瓷花瓶脆性破碎",
    "startImage": "/cases/start-images/C6-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C6-02.mp4"
  },
  {
    "caseId": "C7-01",
    "categoryCode": 7,
    "category": "电磁现象理解不足",
    "originalPrompt": "Two balloons with like charge are placed close together, and they drift away from each other with decreasing acceleration.",
    "taskText": "两个带同种电荷的气球相互靠近后，逐渐远离，且远离的加速度逐渐减小。",
    "internalNote": "",
    "title": "同种电荷气球排斥",
    "startImage": "/cases/start-images/C7-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C7-01.mp4"
  },
  {
    "caseId": "C7-02",
    "categoryCode": 7,
    "category": "电磁现象理解不足",
    "originalPrompt": "A metal ball begins moving slowly but accelerates faster towards a magnet across a table.",
    "taskText": "一个金属球在桌面上缓慢运动，并在接近磁铁时逐渐加速。",
    "internalNote": "（新加入）",
    "title": "金属球受磁力加速",
    "startImage": "/cases/start-images/C7-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C7-02.mp4"
  },
  {
    "caseId": "C7-03",
    "categoryCode": 7,
    "category": "电磁现象理解不足",
    "originalPrompt": "A coil of wire is connected to a battery, pulling nearby paper clips into contact with the coil.",
    "taskText": "一个线圈连接电池后，附近的回形针被吸引并接触到线圈。",
    "internalNote": "（新加入）",
    "title": "通电线圈吸引回形针",
    "startImage": "/cases/start-images/C7-03.png",
    "textOnlyVideo": "/cases/text-only-videos/C7-03.mp4"
  },
  {
    "caseId": "C8-01",
    "categoryCode": 8,
    "category": "周期运动 / 振荡运动失败",
    "originalPrompt": "A pendulum swings back and forth, but gradually slows down and makes smaller and smaller swings, before eventually coming to a stop.",
    "taskText": "一个摆来回摆动，但摆幅逐渐变小，速度逐渐降低，最终停止。",
    "internalNote": "",
    "title": "阻尼摆动停止",
    "startImage": "/cases/start-images/C8-01.png",
    "textOnlyVideo": "/cases/text-only-videos/C8-01.mp4"
  },
  {
    "caseId": "C8-02",
    "categoryCode": 8,
    "category": "周期运动 / 振荡运动失败",
    "originalPrompt": "A marble oscillates in a half-pipe, reaching the same height on both sides, conserving mechanical energy.",
    "taskText": "一颗弹珠在半管中往复振荡，在两侧达到相同高度，体现机械能守恒。",
    "internalNote": "",
    "title": "弹珠半管等高振荡",
    "startImage": "/cases/start-images/C8-02.png",
    "textOnlyVideo": "/cases/text-only-videos/C8-02.mp4"
  },
  {
    "caseId": "C8-03",
    "categoryCode": 8,
    "category": "周期运动 / 振荡运动失败",
    "originalPrompt": "A ball in a bowl rolls back and forth between the two sides, speeding up as it descends into the bowl, and slowing down as it rolls upwards.",
    "taskText": "一个球在碗中两侧来回滚动，向下滚动时加速，向上滚动时减速。",
    "internalNote": "",
    "title": "小球碗中往复滚动",
    "startImage": "/cases/start-images/C8-03.png",
    "textOnlyVideo": "/cases/text-only-videos/C8-03.mp4"
  }
]
