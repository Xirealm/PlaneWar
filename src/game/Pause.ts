import { Scene } from "phaser";

export class Pause extends Scene {
  constructor() {
    super("Pause");
  }
  create() {
    let { width, height } = this.cameras.main;
    // 当前得分
    this.add
      .text(width / 2, height / 2 - 10, "继续游戏", {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setInteractive()
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.scene.resume("Main");
        this.game.scene.stop("Pause")
      });

    // 重新开始按钮
    let button = this.add
      .text(width / 2, height / 2 + 50, "重新开始", {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        // 点击事件：关闭当前场景，打开Main场景
        this.scene.start("Main");
      });
  }
}
