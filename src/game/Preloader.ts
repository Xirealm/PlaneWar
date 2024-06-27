import { Scene } from "phaser";
import backgroundImg from "../assets/image/bg/mainBg.jpg";
import homeBackgroundImg from "../assets/image/interface/homeBg.jpg";
import gameBackgroundImg1 from "../assets/image/bg/bg.jpg";
import gameBackgroundImg2 from "../assets/image/bg/bg0.jpg";
import gameBackgroundImg3 from "../assets/image/bg/bg1.jpg";
import gameBackgroundImg4 from "../assets/image/bg/bg2.jpg";
import titleImg from "../assets/image/interface/title.png";
import beginBtnImg from "../assets/image/interface/beginBtn.png";
import loginPanelImg from "../assets/image/interface/login_panel.png";
import loginPanelJson from "../assets/image/interface/login_panel.json";
import tabBarImg from "../assets/image/interface/tabBar.png";
import beginTabImg from "../assets/image/interface/beginTab.png";
import rankTabImg from "../assets/image/interface/rankTab.png";
import myTabImg from "../assets/image/interface/myTab.png";
import btnPreImg from "../assets/image/interface/btn_pre.png"
import btnNextImg from "../assets/image/interface/btn_next.png"

import btnBlueImg from "../assets/image/interface/button_blue.png"
import btnYellowImg from "../assets/image/interface/button_yellow.png"
import rankBgImg from "../assets/image/interface/bg_rank.png"
import chooseHeroBgImg from "../assets/image/interface/bg_choose_hero.png"

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
import heroBLevel2Img from "../assets/image/hero/hero_b_02.png";
import heroBLevel3Img from "../assets/image/hero/hero_b_03.png";
import heroBLevel4Img from "../assets/image/hero/hero_b_04.png";
import heroBLevel5Img from "../assets/image/hero/hero2.png";
import bulletAImg from "../assets/image/bullet/10.png";
import boomImg from "../assets/image/boom/boom.png";
import boomJson from "../assets/image/boom/boom.json"
import bulletFireBirdImg from "../assets/image/bullet/bulletFireBird.png";
import bulletFireBirdJson from "../assets/image/bullet/bulletFireBird.json";

import supplyExpImg from "../assets/image/hero/article1.png"
import supplyHpImg from "../assets/image/hero/hero_blood.png"
import supplyPowImg from "../assets/image/hero/article2.png"

import numberImg from "../assets/image/interface/number.png"
import levelNumberImg from "../assets/image/interface/levelNumber.png"
import levelNumberJson from "../assets/image/interface/levelNumber.json";

import pauseImg from "../assets/image/interface/pause.png"
import hpLabelImg from "../assets/image/interface/hpLabel.png"
import progressBarBgRedImg from "../assets/image/interface/progress_bar_bg_red.png"
import progressBarContentRedImg from "../assets/image/interface/progress_bar_content_red.png"
import powLabelImg from "../assets/image/interface/powLabel.png"
import progressBarBgYellowImg from "../assets/image/interface/progress_bar_bg_yellow.png"
import progressBarContentYellowImg from "../assets/image/interface/progress_bar_content_yellow.png"
import progressBarBgBlueImg from "../assets/image/interface/progress_bar_bg_blue.png"
import progressBarContentBlueImg from "../assets/image/interface/progress_bar_content_blue.png"

import bgPlace1Img from "../assets/image/interface/bg_place1.png"
import bgPlace2Img from "../assets/image/interface/bg_place2.png"
import bgPlace3Img from "../assets/image/interface/bg_place3.png"
import bgPlace4Img from "../assets/image/interface/bg_place4.png"

import chooseBtnImg from "../assets/image/skill/btn_choose.png"
import cardfireBirdImg from "../assets/image/skill/card_firebird.png";
import iconfireBirdImg from "../assets/image/skill/icon_firebird.png";
import cardBombImg from "../assets/image/skill/card_bomb.png";
import iconBombImg from "../assets/image/skill/icon_bomb.png";
import cardLaserImg from "../assets/image/skill/card_laser.png";
import iconLaserImg from "../assets/image/skill/icon_laser.png";
import cardSuperBulletImg from "../assets/image/skill/card_superBullet.png";
import iconSuperBulletImg from "../assets/image/skill/icon_superBullet.png";
import cardPowImg from "../assets/image/skill/card_pow.png";
import cardHp1Img from "../assets/image/skill/card_hp1.png";
import cardHp2Img from "../assets/image/skill/card_hp2.png";
import cardExpImg from "../assets/image/skill/card_exp.png";
import cardBullet1Img from "../assets/image/skill/card_bullet1.png";
import cardBullet2Img from "../assets/image/skill/card_bullet2.png";
import cardBullet3Img from "../assets/image/skill/card_bullet3.png";

import bgmAudio from "../assets/audio/game_music.ogg";
import boomAudio from "../assets/audio/use_bomb.wav";
// import bulletAudio from "../assets/audio/bullet.mp3";

export class Preloader extends Scene {
  loadStartTime:number;
  constructor() {
    // 游戏预载场景
    super("Preloader");
  }
  // 加载游戏资源
  preload() {
    // 记录加载开始的时间
    this.loadStartTime = Date.now();
    //加载图片资源
    this.load.image("background", backgroundImg);
    this.load.image("gameBackground1", gameBackgroundImg1);
    this.load.image("gameBackground2", gameBackgroundImg2);
    this.load.image("gameBackground3", gameBackgroundImg3);
    this.load.image("gameBackground4", gameBackgroundImg4);
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
    this.load.image("heroBLevel2", heroBLevel2Img);
    this.load.image("heroBLevel3", heroBLevel3Img);
    this.load.image("heroBLevel4", heroBLevel4Img);
    this.load.image("heroBLevel5", heroBLevel5Img);
    this.load.image("bulletA", bulletAImg);
    this.load.image("pause", pauseImg);
    this.load.image("hpLabel", hpLabelImg);
    this.load.image("progressBarBgRed", progressBarBgRedImg);
    this.load.image("progressBarContentRed", progressBarContentRedImg);
    this.load.image("powLabel", powLabelImg);
    this.load.image("progressBarBgYellow", progressBarBgYellowImg);
    this.load.image("progressBarContentYellow", progressBarContentYellowImg);
    this.load.image("progressBarBgBlue", progressBarBgBlueImg);
    this.load.image("progressBarContentBlue", progressBarContentBlueImg);
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
    this.load.image("btnBlue", btnBlueImg);
    this.load.image("btnYellow", btnYellowImg);
    this.load.image("rankBg", rankBgImg);
    this.load.image("chooseHeroBg", chooseHeroBgImg);
    this.load.image("btnPre", btnPreImg);
    this.load.image("btnNext", btnNextImg);
    this.load.image("bgPlace1",bgPlace1Img)
    this.load.image("bgPlace2",bgPlace2Img)
    this.load.image("bgPlace3",bgPlace3Img)
    this.load.image("bgPlace4",bgPlace4Img)
    // 加载技能卡片资源
    this.load.image("chooseBtn", chooseBtnImg);
    this.load.image("cardFirebird", cardfireBirdImg);
    this.load.image("iconFirebird", iconfireBirdImg);
    this.load.image("cardBomb", cardBombImg);
    this.load.image("iconBomb", iconBombImg);
    this.load.image("cardLaser", cardLaserImg);
    this.load.image("iconLaser", iconLaserImg);
    this.load.image("cardSuperBullet", cardSuperBulletImg);
    this.load.image("iconSuperBullet", iconSuperBulletImg);
    this.load.image("cardPow", cardPowImg);
    this.load.image("cardHp1", cardHp1Img);
    this.load.image("cardHp2", cardHp2Img);
    this.load.image("cardExp", cardExpImg);
    this.load.image("cardBullet1", cardBullet1Img);
    this.load.image("cardBullet2", cardBullet2Img);
    this.load.image("cardBullet3", cardBullet3Img);
    // 加载音频资源
    this.load.audio("bgm", bgmAudio);
    this.load.audio("boom", boomAudio);
    //加载纹理图集
    this.load.atlas("loginPanel", loginPanelImg, loginPanelJson);
    this.load.atlas("boom", boomImg, boomJson);
    this.load.atlas("bulletFireBird", bulletFireBirdImg, bulletFireBirdJson);
    this.load.atlas("levelNumber", levelNumberImg, levelNumberJson);
    this.load.spritesheet("number", numberImg, {
      frameWidth: 64,
      frameHeight: 88,
    });
  }
  // preload中的资源全部加载完成后执行
  create() {
    //获取屏幕宽高
    const { width, height } = this.cameras.main;
    //背景图片
    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0, 0);
    // 标题
    this.add
      .image(width / 2, height / 4 - 50, "title")
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
        // this.sound.play("bgm");
        button.destroy()
        this.game.scene.start("Login");
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
    // 记录加载结束的时间
    const loadEndTime = Date.now();
    // 计算加载所需的时间
    const loadTime = loadEndTime - this.loadStartTime;
    console.log(`Resources loaded in ${loadTime} ms`);
  }
}