import { Scene, Math } from "phaser";
import { Supply } from "./Supply";

export class SupplyHp extends Supply {
  supplyType: string = "Hp";
  hpValue: number = 1;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "supplyHp");
  }
  //生成补给
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(200);
  }
  takeSupply(): number {
    this.disableBody(true, true);
    return this.hpValue;
  }
}
