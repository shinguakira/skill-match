export interface Skill {
  name: string;
  level: number; // 1-5のスキルレベル
}

export interface Engineer {
  id: string;
  name: string;
  yearsOfExperience: number;
  skills: Skill[];
}

export interface Position {
  id: string;
  title: string;
  department: string;
  requiredSkills: Skill[];
}

export interface MatchedSkill {
  name: string;
  engineerLevel: number;
  requiredLevel: number;
}

export interface MatchResult {
  engineerId: string;
  positionId: string;
  score: number; // 0-100のマッチングスコア
  matchedSkills: MatchedSkill[];
  missingSkills: Skill[]; // エンジニアが持っていないスキル
}
