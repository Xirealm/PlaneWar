import { Scene } from "phaser";
import { ChooseSkill } from "./ChooseSkill";
import { Main } from "./Main"
export class Pause extends Scene {
  constructor() {
    super("Pause");
  }
  create() {
    let { width, height } = this.cameras.main;
    this.add
      .rectangle(0, 0, width, height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0.5);;
    // 当前得分
    this.add
      .text(width / 2, height / 2 - 50, "继续游戏", {
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
      .text(width / 2, height / 2 , "重新开始", {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.game.scene.stop("Pause");
        this.scene.start("Main");
      });
    this.add
      .text(width / 2, height / 2 + 50, "回到首页", {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
         this.scene.stop("Main");
         this.scene.switch("Home");
      });
  }
}
