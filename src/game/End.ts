import { Scene } from "phaser";
import { useUserStore } from "@/stores/user";
import { sendScore } from "@/utils/service";

export class End extends Scene {
  constructor() {
    super("End");
  }
  async create() {
    const useStore = useUserStore()
    let { width, height } = this.cameras.main;
    // 标题
    this.add
      .text(width / 2, height / 2 - 85, "游戏结束", {
        fontFamily: "Arial",
        fontSize: 24,
      })
      .setOrigin(0.5);

    // 当前得分
    let score = this.registry.get("score");
    const result = await sendScore(useStore.userData.tel, score);
    
    this.add
      .text(width / 2, height / 2 - 10, `得分：${score}`, {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setOrigin(0.5);

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
        this.game.scene.stop("ChooseSkill");
        // this.game.scene.resume("ChooseSkill");
        this.scene.start("Main");
      });
    
   this.add
      .text(width / 2, height / 2 + 100, "回到首页", {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop();
        this.scene.stop("Main");
        this.scene.start("Home");
      });
  }
}
