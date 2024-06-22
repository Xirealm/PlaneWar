import { Scene } from "phaser";
import backgroundImg from "../assets/image/bg/mainBg.jpg";
import gameBackgroundImg1 from "../assets/image/bg/bg0.jpg"
import titleImg from "../assets/image/interface/title.png"
import beginBtnImg from "../assets/image/interface/beginBtn.png";
import enemyAImg from "../assets/image/enemy/enemy1.png";
import enemyBImg from "../assets/image/enemy/enemy2.png";
import enemyFastImg from "../assets/image/enemy/enemy11.png";
import heroAImg from "../assets/image/hero/hero01.png";
import heroALevel2Img from "../assets/image/hero/hero02.png";
import heroALevel3Img from "../assets/image/hero/hero03.png";
import heroALevel4Img from "../assets/image/hero/hero04.png";
import heroALevel5Img from "../assets/image/hero/hero3.png";
import heroBImg from "../assets/image/hero/hero_b_1.png";
import bulletAImg from "../assets/image/bullet/10.png";
import boomImg from "../assets/image/boom/boom.png";
import boomJson from "../assets/image/boom/boom.json"
import supplyExpImg from "../assets/image/hero/article1.png"
import bgmAudio from "../assets/audio/game_music.ogg";
import boomAudio from "../assets/audio/use_bomb.wav";
// import bulletAudio from "../assets/audio/bullet.mp3";

export class Preloader extends Scene {
  constructor() {
    // 游戏预载场景
    super("Preloader");
  }
  // 加载游戏资源
  preload() {
    //加载图片资源
    this.load.image("background", backgroundImg);
    this.load.image("gameBackground1", gameBackgroundImg1);
    this.load.image("title", titleImg);
    this.load.image("beginBtn", beginBtnImg);
    this.load.image("enemyA", enemyAImg);
    this.load.image("enemyB", enemyBImg);
    this.load.image("enemyFast", enemyFastImg);
    this.load.image("heroA", heroAImg);
    this.load.image("heroALevel2", heroALevel2Img);
    this.load.image("heroALevel3", heroALevel3Img);
    this.load.image("heroALevel4", heroALevel4Img);
    this.load.image("heroALevel5", heroALevel5Img);
    this.load.image("heroB", heroBImg);
    this.load.image("bulletA", bulletAImg);
    this.load.image("supplyExp", supplyExpImg);
    // 加载音频资源
    this.load.audio("bgm", bgmAudio);
    this.load.audio("boom", boomAudio);
    //加载纹理图集
    this.load.atlas("boom", boomImg, boomJson);
  }
  // preload中的资源全部加载完成后执行
  create() {
    //获取屏幕宽高
    const { width, height } = this.cameras.main;
    //背景图片
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0, 0);
    // 标题
    this.add
      .image(width / 2, height / 4, "title")
      .setScale(0.6)
      .setOrigin(0.5);
    // 开始按钮
    let button = this.add
      .image(width / 2, (height / 4) * 2.8, "beginBtn")
      .setScale(0.4)
      .setInteractive()
      .on("pointerdown", () => {
        // 点击事件：关闭当前场景，打开Main场景
        // 背景音乐
        this.sound.play("bgm");
        this.scene.start("Main");
      })
      .setOrigin(0.5);
    // 创建爆炸动画
    this.anims.create({
      key: "boom",
      frames: this.anims.generateFrameNames("boom", {
        prefix: "boom",
        start: 1,
        end: 6,
        zeroPad: 2,
      }),
      repeat: 0,
      frameRate: 12,
    });
  }
}