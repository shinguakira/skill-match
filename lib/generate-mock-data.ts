import type { Engineer, Position, Skill } from './types';

// 日本人の名字リスト
const lastNames = [
  '佐藤',
  '鈴木',
  '高橋',
  '田中',
  '伊藤',
  '渡辺',
  '山本',
  '中村',
  '小林',
  '加藤',
  '吉田',
  '山田',
  '佐々木',
  '山口',
  '松本',
  '井上',
  '木村',
  '林',
  '斎藤',
  '清水',
  '山崎',
  '森',
  '池田',
  '橋本',
  '阿部',
  '石川',
  '山下',
  '中島',
  '前田',
  '藤田',
  '後藤',
  '小川',
  '岡田',
  '村上',
  '長谷川',
  '近藤',
  '石井',
  '斉藤',
  '坂本',
  '遠藤',
  '藤井',
  '青木',
  '福田',
  '三浦',
  '西村',
  '藤原',
  '太田',
  '松田',
  '原田',
  '岡本',
  '中川',
  '中野',
  '酒井',
  '久保',
  '河野',
  '金子',
  '杉本',
  '水野',
  '増田',
  '小島',
  '小山',
  '大野',
  '高木',
  '藤本',
  '谷口',
  '安藤',
  '丸山',
  '今井',
  '高田',
  '菅原',
  '工藤',
  '武田',
  '内田',
  '横山',
  '宮崎',
  '上野',
  '宮本',
  '大塚',
  '新井',
  '平野',
  '松井',
  '浜田',
  '小松',
  '菊地',
  '野口',
  '渡部',
  '榎本',
  '大西',
  '森田',
  '菅野',
  '村田',
  '大久保',
  '岩崎',
  '松尾',
  '佐野',
  '木下',
  '野村',
  '松村',
  '森本',
  '永井',
];

// 日本人の名前リスト
const firstNames = [
  '翔太',
  '拓也',
  '健太',
  '大輔',
  '直樹',
  '和也',
  '達也',
  '健',
  '裕太',
  '亮',
  '優',
  '誠',
  '浩二',
  '健一',
  '真一',
  '豊',
  '茂',
  '明',
  '浩',
  '淳',
  '美咲',
  'さくら',
  '陽子',
  '真由美',
  '裕子',
  '恵',
  '愛',
  '彩',
  '麻衣',
  '舞',
  '由美子',
  '久美子',
  '智子',
  '和子',
  '京子',
  '恵子',
  '洋子',
  '幸子',
  '香織',
  '真美',
  '大輝',
  '悠斗',
  '悠真',
  '陽翔',
  '蓮',
  '湊',
  '陸',
  '颯真',
  '悠人',
  '陽太',
  '結菜',
  '陽菜',
  '凛',
  '咲良',
  '葵',
  '心春',
  '陽葵',
  '紬',
  '結愛',
  '莉子',
];

// 部署名リスト
const departments = [
  'Webアプリケーション開発部',
  'モバイルアプリ開発部',
  'フロントエンド開発部',
  'バックエンド開発部',
  'インフラストラクチャー部',
  'クラウドサービス部',
  'AI研究開発部',
  'データサイエンス部',
  'IoT開発部',
  'セキュリティ対策部',
  'QA/テスト部',
  'DevOps部',
  'プロダクト開発部',
  'エンタープライズソリューション部',
  'ゲーム開発部',
  'AR/VR開発部',
  'ブロックチェーン開発部',
  'システムインテグレーション部',
  'UX/UIデザイン部',
  'テクニカルサポート部',
];

// ポジションタイトルのプレフィックスとサフィックス
const positionPrefixes = [
  'シニア',
  'ジュニア',
  'リード',
  'チーフ',
  'プリンシパル',
  'スタッフ',
  'アソシエイト',
  'エキスパート',
  'コンサルタント',
  'スペシャリスト',
];

const positionSuffixes = [
  'エンジニア',
  'デベロッパー',
  'アーキテクト',
  'アナリスト',
  'マネージャー',
  'ディレクター',
  'コーディネーター',
  'プログラマー',
  'テスター',
  'アドミニストレーター',
];

// スキルカテゴリとそれに関連するスキル
const skillCategories = {
  frontend: [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue.js',
    'Angular',
    'HTML',
    'CSS',
    'Sass/SCSS',
    'Tailwind CSS',
    'Next.js',
    'Nuxt.js',
  ],
  backend: [
    'Node.js',
    'Express',
    'Java',
    'Spring',
    'Python',
    'Django',
    'C#',
    '.NET',
    'PHP',
    'Laravel',
    'Ruby',
    'Rails',
    'Go',
  ],
  database: [
    'SQL',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'GraphQL',
    'Oracle',
    'SQLite',
    'Firebase',
  ],
  devops: [
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'GCP',
    'CI/CD',
    'Git',
    'GitHub Actions',
    'Jenkins',
    'Terraform',
  ],
  mobile: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Android', 'iOS', 'Xamarin'],
  other: [
    'Agile/Scrum',
    'TDD',
    'Jest',
    'Cypress',
    'Selenium',
    'WebRTC',
    'WebSockets',
    'PWA',
    'Electron',
    'Machine Learning',
    'AI',
    'Data Science',
    'Blockchain',
    'AR/VR',
    'IoT',
  ],
};

// ランダムな整数を生成する関数
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ランダムな要素を配列から選択する関数
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// ランダムな複数の要素を配列から選択する関数
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ランダムなスキルセットを生成する関数
function generateRandomSkills(minSkills: number, maxSkills: number): Skill[] {
  const skillCount = getRandomInt(minSkills, maxSkills);

  // スキルカテゴリからランダムに1-3個選択
  const categoryKeys = Object.keys(skillCategories) as (keyof typeof skillCategories)[];
  const selectedCategories = getRandomElements(categoryKeys, getRandomInt(1, 3));

  // 選択したカテゴリからスキルを集める
  let availableSkills: string[] = [];
  selectedCategories.forEach((category) => {
    availableSkills = [...availableSkills, ...skillCategories[category]];
  });

  // 重複を排除
  availableSkills = [...new Set(availableSkills)];

  // ランダムにスキルを選択
  const selectedSkillNames = getRandomElements(availableSkills, skillCount);

  // スキルレベルを設定
  return selectedSkillNames.map((name) => ({
    name,
    level: getRandomInt(1, 5),
  }));
}

// ランダムなエンジニアを生成する関数
export function generateRandomEngineer(id: string): Engineer {
  const lastName = getRandomElement(lastNames);
  const firstName = getRandomElement(firstNames);
  const yearsOfExperience = getRandomInt(1, 15);

  return {
    id,
    name: `${lastName} ${firstName}`,
    yearsOfExperience,
    skills: generateRandomSkills(3, 8), // エンジニアは3〜8個のスキルを持つ
  };
}

// ランダムなポジションを生成する関数
export function generateRandomPosition(id: string): Position {
  const prefix = getRandomElement(positionPrefixes);
  const suffix = getRandomElement(positionSuffixes);
  const department = getRandomElement(departments);

  // 特定のポジションに関連するスキルカテゴリを決定
  let primaryCategory: keyof typeof skillCategories;

  if (suffix === 'エンジニア' || suffix === 'デベロッパー' || suffix === 'プログラマー') {
    // 開発系ポジションの場合
    primaryCategory = getRandomElement([
      'frontend',
      'backend',
      'mobile',
    ]) as keyof typeof skillCategories;
  } else if (suffix === 'アーキテクト' || suffix === 'アドミニストレーター') {
    // インフラ系ポジションの場合
    primaryCategory = getRandomElement([
      'backend',
      'devops',
      'database',
    ]) as keyof typeof skillCategories;
  } else if (suffix === 'アナリスト') {
    // 分析系ポジションの場合
    primaryCategory = getRandomElement(['database', 'other']) as keyof typeof skillCategories;
  } else {
    // その他のポジション
    primaryCategory = getRandomElement(
      Object.keys(skillCategories)
    ) as keyof typeof skillCategories;
  }

  // 主要カテゴリからスキルを選択
  const primarySkills = getRandomElements(skillCategories[primaryCategory], getRandomInt(2, 4));

  // 他のカテゴリからもいくつかスキルを選択
  const otherCategories = Object.keys(skillCategories).filter(
    (cat) => cat !== primaryCategory
  ) as (keyof typeof skillCategories)[];
  const secondaryCategory = getRandomElement(otherCategories);
  const secondarySkills = getRandomElements(skillCategories[secondaryCategory], getRandomInt(1, 3));

  // スキルを結合して重複を排除
  const combinedSkillNames = [...new Set([...primarySkills, ...secondarySkills])];

  // スキルレベルを設定
  const requiredSkills = combinedSkillNames.map((name) => ({
    name,
    level: getRandomInt(2, 5), // ポジションは2〜5のスキルレベルを要求
  }));

  return {
    id,
    title: `${prefix}${suffix}`,
    department,
    requiredSkills,
  };
}

// 指定した数のエンジニアを生成する関数
export function generateEngineers(count: number): Engineer[] {
  return Array.from({ length: count }, (_, i) => generateRandomEngineer(`eng-mock-${i + 1}`));
}

// 指定した数のポジションを生成する関数
export function generatePositions(count: number): Position[] {
  return Array.from({ length: count }, (_, i) => generateRandomPosition(`pos-mock-${i + 1}`));
}
