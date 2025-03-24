import type { Engineer, Position, MatchResult, MatchedSkill, Skill } from "./types"

export function calculateMatches(engineers: Engineer[], positions: Position[]): MatchResult[] {
  console.time("マッチング計算時間")

  const results: MatchResult[] = []

  // 各エンジニアと各ポジションの組み合わせに対してマッチングを計算
  for (const engineer of engineers) {
    for (const position of positions) {
      const result = calculateMatch(engineer, position)
      results.push(result)
    }
  }

  console.timeEnd("マッチング計算時間")
  console.log(
    `計算された組み合わせ: ${engineers.length} エンジニア × ${positions.length} ポジション = ${results.length} 結果`,
  )

  return results
}

function calculateMatch(engineer: Engineer, position: Position): MatchResult {
  const matchedSkills: MatchedSkill[] = []
  const missingSkills: Skill[] = []

  // 必要なスキルの総数
  const totalRequiredSkills = position.requiredSkills.length

  // 各必要スキルについて、エンジニアが持っているかチェック
  for (const requiredSkill of position.requiredSkills) {
    const engineerSkill = engineer.skills.find((skill) => skill.name === requiredSkill.name)

    if (engineerSkill) {
      // スキルがマッチした場合
      matchedSkills.push({
        name: requiredSkill.name,
        engineerLevel: engineerSkill.level,
        requiredLevel: requiredSkill.level,
      })
    } else {
      // スキルが不足している場合
      missingSkills.push(requiredSkill)
    }
  }

  // スコアの計算
  let totalScore = 0

  for (const matchedSkill of matchedSkills) {
    // エンジニアのスキルレベルが必要レベル以上の場合は満点
    // 不足している場合は比例配分
    const skillScore = Math.min(matchedSkill.engineerLevel / matchedSkill.requiredLevel, 1) * 100
    totalScore += skillScore
  }

  // 総合スコアの計算 (0-100%)
  const finalScore = totalRequiredSkills > 0 ? Math.round(totalScore / totalRequiredSkills) : 0

  return {
    engineerId: engineer.id,
    positionId: position.id,
    score: finalScore,
    matchedSkills,
    missingSkills,
  }
}

