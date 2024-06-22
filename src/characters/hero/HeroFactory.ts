import { Physics, Scene } from "phaser";
import { Hero } from "./Hero";
import { HeroA } from "./HeroA";
import { HeroB } from "./HeroB";

export class HeroFactory {
    static createHero(scene: Scene, type: string) {
        if (type === "TypeA") {
            return new HeroA(scene);
        }
        else if (type === "TypeB") {
            return new HeroB(scene);
        }
        throw new Error(`Unknown hero type: ${type}`);
    }
}
