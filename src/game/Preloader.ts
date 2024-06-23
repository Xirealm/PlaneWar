import { Scene } from "phaser";
import backgroundImg from "../assets/image/bg/mainBg.jpg";
import homeBackgroundImg from "../assets/image/interface/homeBg.jpg";
import gameBackgroundImg1 from "../assets/image/bg/bg0.jpg"
import titleImg from "../assets/image/interface/title.png"
import beginBtnImg from "../assets/image/interface/beginBtn.png";

import tabBarImg from "../assets/image/interface/tabBar.png"
import beginTabImg from "../assets/image/interface/beginTab.png"
import rankTabImg from "../assets/image/interface/rankTab.png"
import myTabImg from "../assets/image/interface/myTab.png"

import enemyAImg from "../assets/image/enemy/enemy1.png";
import enemyBImg from "../assets/image/enemy/enemy2.png";
import enemyFastImg from "../assets/image/enemy/enemy11.png";
import enemyBossImg from "../assets/image/enemy/boss.png";

import heroAImg from "../assets/image/hero/hero01.png";
import heroALevel2Img from "../assets/image/hero/hero02.png";
import heroALevel3Img from "../assets/image/hero/hero03.png";
import heroALevel4Img from "../assets/image/hero/hero04.png";
import heroALevel5Img from "../assets/image/hero/hero3.png";
import heroBImg from "../assets/image/hero/hero_b_1.png";
import bulletAImg from "../assets/image/bullet/10.png";
import boomImg from "../assets/image/boom/boom.png";
import boomJson from "../assets/image/boom/boom.json"
import bulletFireBirdImg from "../assets/image/bullet/bulletFireBird.png";
import bulletFireBirdJson from "../assets/image/bullet/bulletFireBird.json";

import supplyExpImg from "../assets/image/hero/article1.png"
import supplyHpImg from "../assets/image/hero/hero_blood.png"
import supplyPowImg from "../assets/image/hero/article2.png"

import numberImg from "../assets/image/interface/number.png"
import pauseImg from "../assets/image/interface/pause.png"

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
    this.load.image("enemyBoss", enemyBossImg);
    this.load.image("heroA", heroAImg);
    this.load.image("heroALevel2", heroALevel2Img);
    this.load.image("heroALevel3", heroALevel3Img);
    this.load.image("heroALevel4", heroALevel4Img);
    this.load.image("heroALevel5", heroALevel5Img);
    this.load.image("heroB", heroBImg);
    this.load.image("bulletA", bulletAImg);
    this.load.image("pause", pauseImg);
    
    //加载补给图片资源
    this.load.image("supplyExp", supplyExpImg);
    this.load.image("supplyHp", supplyHpImg);
    this.load.image("supplyPow", supplyPowImg);
    //加载Home页资源
    this.load.image("homeBackground", homeBackgroundImg);
    this.load.image("tabBarBackground", tabBarImg);
    this.load.image("rankTab", rankTabImg);
    this.load.image("beginTab", beginTabImg);
    this.load.image("myTab", myTabImg);
    // 加载音频资源
    this.load.audio("bgm", bgmAudio);
    this.load.audio("boom", boomAudio);
    //加载纹理图集
    this.load.atlas("boom", boomImg, boomJson);
    this.load.atlas("bulletFireBird", bulletFireBirdImg, bulletFireBirdJson);
    this.load.spritesheet("number", numberImg, { frameWidth: 64, frameHeight: 88 })
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
        this.scene.start("Home");
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
    // 创建火鸟子弹发射动画
    this.anims.create({
      key: "bulletFireBird",
      frames: this.anims.generateFrameNames("bulletFireBird", {
        prefix: "fireBird",
        start: 1,
        end: 8,
        zeroPad: 2,
      }),
      repeat: 0,
      frameRate: 12,
    });
  }
}