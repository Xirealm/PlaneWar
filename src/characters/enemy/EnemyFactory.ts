import { Scene } from "phaser";
import { EnemyA } from "./EnemyA";
import { EnemyB } from "./EnemyB";
import { EnemyFast } from "./EnemyFast";
import { EnemyBoss } from "./EnemyBoss";

export class EnemyFactory {
    static createEnemy(scene: Scene, type: string) {
        switch (type) {
            case "EnemyA":
                return new EnemyA(scene , 0 , 0 );
            case "EnemyB":
                return new EnemyB(scene , 0 , 0 );
            case "EnemyFast":
                return new EnemyFast(scene , 0 , 0 );
            case "EnemyBoss":
                return new EnemyBoss(scene , 200 , 0 );
            default:
                throw new Error(`敌机类型 ${type} 不支持`);
        }
  }
}
