# JsMatch3
2022年底大专毕业毕业设计，主要使用html+js+css技术，使用了少量的jQuery和vue的功能
## 介绍：
消消乐+roguelike游戏demo，消除棋子来进行攻击、治疗、增伤,击败怪物时的溢出伤害会转化为金币
<br>
### 1.战斗：
游戏采用了三消的战斗方式，玩家拖动棋子，使相同的棋子连接三个以上，然后棋子就会消除，消除时会发挥棋子的功能，包括攻击敌人、回复自身血量、增加攻击伤害。
<br>
连接在一起的同种棋子大于3，消除时的棋子功效就会翻倍，四个连接时会产生2倍效果，五个连接时会产生10倍效果
### 2.成长：
随着关卡推进，出现的敌人会越来越强，所以玩家的能力值也要不断增强。
<br>
在每一关结束后，玩家会遇到事件、商店、营地中的一种：
<br>
事件:共有十种随机事件,玩家遇到某种情况并选择自己要做什么，根据玩家的选择会获得金钱、物品，也有可能对玩家造成负面效果。
<br>
商店:会提供三个物品供玩家购买，物品可以提升玩家的状态值。
<br>
营地:玩家可以选择一项技能升级，提高技能的能力。
### 3.关卡：
游戏有四个大关卡，每当进入新的大关卡时会更换地图（背景图片），前三个个关卡每关有五个小关，第四大关是最终关卡，击败最终boss游戏胜利。
<br>
每个大关卡都有不同的敌人，每个大关的最后一关都是boss战，boos拥有比小关中敌人更强的生命力，每次进入boss战所有的敌人基础能力也会提升
### 4.敌人：
每回合玩家结束后，敌人会攻击玩家或者对自己回复血量，当敌人攻击玩家后会判断玩家的血量，如果玩家血量小于等于0并且玩家没有复活道具的时候，游戏失败。
<br>
# BUG
1.移动棋子的时候如果鼠标拖到了棋盘外，有可能出现bug导致游戏无法继续。
<br>
2.棋子下落时有几率出现位置错误，无伤大雅。
<br>
3.某些时候会出现棋子看起来的属性和实际属性不同，不知道怎么造成的。
# 
[在线链接](https://mosaic93-cn.github.io/js-match3/)

