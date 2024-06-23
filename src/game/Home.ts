import { Scene, GameObjects } from "phaser";

export class Home extends Scene {
  constructor() {
    super("Home");
  }
  create() {
    let { width, height } = this.cameras.main;
    this.add.tileSprite(0, 0, width, height, "homeBackground").setOrigin(0, 0);
    // 创建Tab栏容器
    const tabBar = this.add
      .container(0, height - 59)
      .setDepth(1)
      .setSize(width, 60); // 确保Tab栏在最上层

    let tabBarBackground = this.add
      .image(tabBar.x, 0, "tabBarBackground")
      .setDisplaySize(width, tabBar.height)
      .setOrigin(0, 0)
      .setAlpha(0.8);
    tabBar.add(tabBarBackground);
    const tabs = ["rankTab", "beginTab", "myTab"];
    for (let i = 0; i < tabs.length; i++) {      
      let tab = this.add
        .sprite(width / 6 * (2 * i + 1), tabBar.height / 2, tabs[i])
        .setScale(0.3)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => this.onTabClick(tabs[i]));
      tabBar.add(tab);
    }
    // // 创建页面容器
    // this.pages = this.add.container(0, this.tabBar.height);
    // this.addPage("homePage", this.pages);
    // this.addPage("profilePage", this.pages);
    // this.addPage("settingsPage", this.pages);

    // 初始化当前页面
    // this.showPage("homePage");
    // 开始按钮
    let button = this.add
      .text(width / 2, height / 2 + 50, "开始游戏", {
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
  // createTabButton(tabKey: string,tabBar: GameObjects.Container,x:number) {
  //   // 创建Tab按钮并添加到Tab栏容器
  //   let tab = this.add
  //     .sprite(x, tabBar.height / 2, tabKey)
  //     .setScale(0.3)
  //     .setOrigin(0.5)
  //     .setInteractive()
  //     .on("pointerdown", () => this.onTabClick(tabKey));
  //   tabBar.add(tab);
  // }
  onTabClick(tabKey) {
    console.log(tabKey,"被点击了");
    
  };
}
