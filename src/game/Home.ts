import { Scene, GameObjects } from "phaser";
import { getRank } from "../utils/service"
import { useUserStore } from "@/stores/user";
export class Home extends Scene {
  rankPage: GameObjects.Container;
  beginPage: GameObjects.Container;
  myPage: GameObjects.Container;
  tabBar: GameObjects.Container;
  width: number;
  height: number;
  constructor() {
    super("Home");
  }
  create() {
    let { width, height } = this.cameras.main;
    this.width = width;
    this.height = height;
    this.add.tileSprite(0, 0, width, height, "homeBackground").setOrigin(0, 0);
    // 创建Tab栏容器
    this.tabBar = this.add
      .container(0, height - 59)
      .setDepth(1)
      .setSize(width, 60); // 确保Tab栏在最上层
    let tabBarBackground = this.add
      .image(this.tabBar.x, 0, "tabBarBackground")
      .setDisplaySize(width, this.tabBar.height)
      .setOrigin(0, 0)
      .setAlpha(0.5);
    this.tabBar.add(tabBarBackground);
    const tabs = ["rankTab", "beginTab", "myTab"];
    for (let i = 0; i < tabs.length; i++) {
      let tab = this.add
        .sprite((width / 6) * (2 * i + 1), this.tabBar.height / 2, tabs[i])
        .setScale(0.3)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => this.onTabClick(tabs[i]));
      this.tabBar.add(tab);
    }
    // 创建页面容器
    this.rankPage = this.add.container(0, 0);
    this.beginPage = this.add.container(0, 0);
    this.myPage = this.add.container(0, 0);
    // 初始化页面内容（示例）
    this.initRankPage(this.rankPage);
    this.initBeginPage(this.beginPage);
    this.initMyPage(this.myPage);

    // 初始时只显示游戏选择页面
    this.showPage(this.beginPage);
  }
  onTabClick(tabKey: string) {
    switch (tabKey) {
      case "rankTab":
        this.showPage(this.rankPage);
        break;
      case "beginTab":
        this.showPage(this.beginPage);
        break;
      case "myTab":
        this.showPage(this.myPage);
        break;
    }
  }
  showPage(page) {
    // 隐藏所有页面
    this.rankPage.setVisible(false);
    this.beginPage.setVisible(false);
    this.myPage.setVisible(false);
    // 显示选中的页面
    page.setVisible(true);
  }

  initBeginPage(page: GameObjects.Container) {
    const chooseHeroBg = this.add
      .image(this.width / 2, this.height / 3, "chooseHeroBg")
      .setAlpha(0.7)
      .setScale(0.8);
    let i = 0;
    const btnPre = this.add
      .image(this.width / 2 - 150, this.height / 3, "btnPre")
      .setAlpha(0.7)
      .setScale(0.75)
      .setInteractive()
      .on("pointerdown", () => {
        i--;
        if (i === -1) {
          i = heros.getLength() - 1;
        }
        const heroOld = heros.getMatching("visible", true)[0];
        const heroNew = heros.getMatching()[i];
        heroOld.setVisible(false);
        heroNew.setVisible(true);
        this.registry.set("hero", heroNew.name);
      });
    const btnNext = this.add
      .image(this.width / 2 + 150, this.height / 3, "btnNext")
      .setAlpha(0.7)
      .setScale(0.75)
      .setInteractive()
      .on("pointerdown", () => {
        i++;
        if (i === heros.getLength()) {
          i = 0;
        }
        const heroOld = heros.getMatching("visible", true)[0];
        const heroNew = heros.getMatching()[i];
        heroOld.setVisible(false);
        heroNew.setVisible(true);
        this.registry.set("hero", heroNew.name);
      });
    const heros = this.add.group();
    const heroA = this.add
      .sprite(chooseHeroBg.x, chooseHeroBg.y, "heroA")
      .setName("heroA")
      .setOrigin(0.5);
    const heroB = this.add
      .sprite(chooseHeroBg.x, chooseHeroBg.y, "heroB")
      .setName("heroB")
      .setOrigin(0.5)
      .setVisible(false);
    heros.add(heroA);
    heros.add(heroB);
    // heros.add(heroC)
    // heros.add(heroD)
    this.registry.set("hero", "heroA");
    const placeContainer = this.add.container(this.width / 2, 200);
    const bgPlace1 = this.add
      .image(0, 0, "bgPlace1")
      .setDisplaySize(300, 100)
      .setInteractive()
      .on("pointerdown", () => {
        this.registry.set("gameBackground", "gameBackground1");
        this.scene.start("Main");
      });
    const bgPlace2 = this.add
      .image(0, bgPlace1.y + bgPlace1.displayHeight + 20, "bgPlace2")
      .setDisplaySize(300, 100)
      .setInteractive()
      .on("pointerdown", () => {
        this.registry.set("gameBackground", "gameBackground2");
        this.scene.start("Main");
      });
    const bgPlace3 = this.add
      .image(0, bgPlace2.y + bgPlace1.displayHeight + 20, "bgPlace3")
      .setDisplaySize(300, 100)
      .setInteractive()
      .on("pointerdown", () => {
        this.registry.set("gameBackground", "gameBackground3");
        this.scene.start("Main");
      });
    const bgPlace4 = this.add
      .image(0, bgPlace3.y + bgPlace1.displayHeight + 20, "bgPlace4")
      .setDisplaySize(300, 100)
      .setInteractive()
      .on("pointerdown", () => {
        this.registry.set("gameBackground", "gameBackground4");
        this.scene.start("Main");
      });
    placeContainer
      .add([bgPlace1, bgPlace2, bgPlace3, bgPlace4])
      .setVisible(false)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Main");
      });
    const beginBtn = this.add
      .image(this.width / 2, (this.height * 3) / 4, "btnYellow")
      .setInteractive()
      .on("pointerdown", () => {
        this.beginPage.setVisible(false);
        placeContainer.setVisible(true);
        this.tabBar.setVisible(false);
      });
    const beginBtnText = this.add
      .text(beginBtn.x, beginBtn.y, "开始游戏", {
        fontFamily: "Arial",
        fontSize: 20,
      })
      .setOrigin(0.5);
    page.add([
      chooseHeroBg,
      beginBtn,
      beginBtnText,
      heroA,
      heroB,
      btnPre,
      btnNext,
    ]);
  }
  async initRankPage(page: GameObjects.Container) {
    const userStore = useUserStore();
    const result: any = await getRank(userStore.userData.tel);
    console.log(result.data);
    const data = result.data
    console.log(data);
    
    const rankBg = this.add
      .image(this.width / 2, 20, "rankBg")
      .setOrigin(0.5, 0)
      .setDisplaySize(this.width - 10, this.height - 100)
      .setAlpha(0.8);
    const rankData = data.map((item: any) => {
      return {
        rank: item.rank,
        name: item.name,
        score: item.score,
        time: "2024/7/2",
      };
    });
    // const rankData = [
    //   { rank: 1, name: "xirealm", score: 1500, time: "2024/7/2" },
    //   { rank: 2, name: "xirealm", score: 1450, time: "2024/7/2" },
    // ];
    // 列模板样式
    const columnStyle = { fontSize: "13px", color: "#ffffff" };
    // 定义列宽
    const columnWidths = [
      rankBg.displayWidth / 8,
      (rankBg.displayWidth * 3) / 8,
      (rankBg.displayWidth * 5) / 8,
      (rankBg.displayWidth * 7) / 8,
    ];
    // 列标题：排名、玩家名、分数、日期
    const tHeader = this.add.container(0, rankBg.y + 25, [
      this.add.text(columnWidths[0], 0, "排名", columnStyle).setOrigin(0.5, 0),
      this.add
        .text(columnWidths[1], 0, "玩家名", columnStyle)
        .setOrigin(0.5, 0),
      this.add.text(columnWidths[2], 0, "分数", columnStyle).setOrigin(0.5, 0),
      this.add.text(columnWidths[3], 0, "日期", columnStyle).setOrigin(0.5, 0),
    ]);
    page.add(rankBg);
    page.add(tHeader);
    const columnHeight = 30; // 行高
    // 渲染排行榜行
    rankData.forEach((entry, index) => {
      const rowContainer = this.add.container(
        0,
        (index + 1) * columnHeight + 60
      );
      page.add(rowContainer);
      this.renderRankRow(rowContainer, columnWidths, entry, columnStyle);
    });
  }
  renderRankRow(rowContainer, columnWidths, entry, style) {
    // 渲染排名
    rowContainer.add(
      this.add
        .text(columnWidths[0], 0, `#${entry.rank}`, style)
        .setOrigin(0.5, 0)
    );
    // 渲染玩家名
    rowContainer.add(
      this.add.text(columnWidths[1], 0, entry.name, style).setOrigin(0.5, 0)
    );
    // 渲染分数
    rowContainer.add(
      this.add.text(columnWidths[2], 0, entry.score, style).setOrigin(0.5, 0)
    );
    // 渲染时间
    rowContainer.add(
      this.add.text(columnWidths[3], 0, entry.time, style).setOrigin(0.5, 0)
    );
  }
  initMyPage(page: GameObjects.Container) {
    const userStore = useUserStore();
    const logout = this.add.text(this.width / 2, 200, "退出登录").setOrigin(0.5).setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Login");
        userStore.clearUserData()
      });
    page.add(logout)
  }
}