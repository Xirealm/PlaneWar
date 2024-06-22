const BASE_EXP_TO_LEVEL_UP = 2; // 初始升级所需经验值
const EXP_INCREASE_RATE = 2; // 每级所需经验值增长率

export const expRequiredToLevel = (level: number): number => {
  if (level === 1) {
    return 0;
  }
  let exp = Math.floor(
    BASE_EXP_TO_LEVEL_UP * Math.pow(EXP_INCREASE_RATE, level - 1)
  );
  return exp;
}

/**
 * 计算当前经验值对应的等级和剩余经验值
 * @param currentExp 当前经验值
 * @returns {level: number, remainingExp: number} 可以到达的等级的和该等级经验值
 */
export const calcLevelAndRemainingExp = (
  currentExp: number
): {
  newLevel: number;
  expToNextLevel: number;
  } => {
  let level = 0;
  while (currentExp >= expRequiredToLevel(level + 1)) {
    currentExp -= expRequiredToLevel(level + 1);
    level++;
  }
  let expToNextLevel = expRequiredToLevel(level + 1) - currentExp;
  return { newLevel: level, expToNextLevel };
};
