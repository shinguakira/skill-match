import type { Engineer, Position } from "./types"
import { generateEngineers, generatePositions } from "./generate-mock-data"

export const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "Next.js",
  "Nuxt.js",
  "HTML",
  "CSS",
  "Sass/SCSS",
  "Tailwind CSS",
  "Java",
  "Spring",
  "Python",
  "Django",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "REST API",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "CI/CD",
  "Git",
  "GitHub Actions",
  "Jenkins",
  "Agile/Scrum",
  "TDD",
  "Jest",
  "Cypress",
  "Selenium",
  "WebRTC",
  "WebSockets",
  "PWA",
  "Electron",
  "React Native",
  "Flutter",
  "Unity",
  "Unreal Engine",
  "Machine Learning",
  "AI",
  "Data Science",
  "Blockchain",
  "AR/VR",
  "IoT",
  "Firebase",
  "Oracle",
  "SQLite",
  "Terraform",
  "Android",
  "iOS",
  "Xamarin",
  "TensorFlow",
]

// 基本的なモックデータ（少数）
const baseEngineers: Engineer[] = [
  {
    id: "eng-1",
    name: "山田 太郎",
    yearsOfExperience: 5,
    skills: [
      { name: "JavaScript", level: 4 },
      { name: "TypeScript", level: 3 },
      { name: "React", level: 4 },
      { name: "Node.js", level: 3 },
      { name: "AWS", level: 2 },
    ],
  },
  {
    id: "eng-2",
    name: "佐藤 花子",
    yearsOfExperience: 3,
    skills: [
      { name: "Python", level: 4 },
      { name: "Django", level: 3 },
      { name: "SQL", level: 4 },
      { name: "Docker", level: 2 },
      { name: "Git", level: 3 },
    ],
  },
  {
    id: "eng-3",
    name: "鈴木 一郎",
    yearsOfExperience: 7,
    skills: [
      { name: "Java", level: 5 },
      { name: "Spring", level: 4 },
      { name: "SQL", level: 4 },
      { name: "AWS", level: 3 },
      { name: "Kubernetes", level: 3 },
    ],
  },
  {
    id: "eng-4",
    name: "高橋 次郎",
    yearsOfExperience: 2,
    skills: [
      { name: "HTML", level: 4 },
      { name: "CSS", level: 4 },
      { name: "JavaScript", level: 3 },
      { name: "Vue.js", level: 3 },
      { name: "Tailwind CSS", level: 4 },
    ],
  },
  {
    id: "eng-5",
    name: "田中 三郎",
    yearsOfExperience: 8,
    skills: [
      { name: "C#", level: 5 },
      { name: ".NET", level: 4 },
      { name: "SQL", level: 4 },
      { name: "Azure", level: 4 },
      { name: "Docker", level: 3 },
    ],
  },
  {
    id: "eng-6",
    name: "伊藤 美咲",
    yearsOfExperience: 4,
    skills: [
      { name: "React", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "GraphQL", level: 3 },
      { name: "Tailwind CSS", level: 4 },
    ],
  },
]

const basePositions: Position[] = [
  {
    id: "pos-1",
    title: "フロントエンドエンジニア",
    department: "Webアプリケーション開発部",
    requiredSkills: [
      { name: "JavaScript", level: 4 },
      { name: "TypeScript", level: 3 },
      { name: "React", level: 4 },
      { name: "HTML", level: 3 },
      { name: "CSS", level: 3 },
    ],
  },
  {
    id: "pos-2",
    title: "バックエンドエンジニア",
    department: "サーバーサイド開発部",
    requiredSkills: [
      { name: "Java", level: 4 },
      { name: "Spring", level: 3 },
      { name: "SQL", level: 4 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 2 },
    ],
  },
  {
    id: "pos-3",
    title: "データサイエンティスト",
    department: "AI研究開発部",
    requiredSkills: [
      { name: "Python", level: 4 },
      { name: "Machine Learning", level: 3 },
      { name: "SQL", level: 3 },
      { name: "Data Science", level: 4 },
      { name: "TensorFlow", level: 3 },
    ],
  },
  {
    id: "pos-4",
    title: "フルスタックエンジニア",
    department: "プロダクト開発部",
    requiredSkills: [
      { name: "JavaScript", level: 4 },
      { name: "React", level: 3 },
      { name: "Node.js", level: 3 },
      { name: "MongoDB", level: 3 },
      { name: "Docker", level: 2 },
    ],
  },
  {
    id: "pos-5",
    title: "モバイルアプリ開発者",
    department: "モバイルアプリ開発部",
    requiredSkills: [
      { name: "Swift", level: 4 },
      { name: "Kotlin", level: 4 },
      { name: "React Native", level: 3 },
      { name: "Firebase", level: 3 },
      { name: "Git", level: 3 },
    ],
  },
]

// 大量のモックデータを生成
const additionalEngineers = generateEngineers(94) // 基本の6人 + 94人 = 100人
const additionalPositions = generatePositions(295) // 基本の5つ + 295個 = 300個

// モックデータを結合
export const mockEngineers: Engineer[] = [...baseEngineers, ...additionalEngineers]
export const mockPositions: Position[] = [...basePositions, ...additionalPositions]

/**
 * サンプルCSVデータを生成する関数（デモ用）
 */
export function generateSampleCSV(type: "engineers" | "positions"): string {
  if (type === "engineers") {
    return `name,yearsOfExperience,skills
山田太郎,5,JavaScript:4,TypeScript:3,React:5
佐藤花子,3,Python:4,Django:3,SQL:4
鈴木一郎,7,Java:5,Spring:4,AWS:3`
  } else {
    return `title,department,requiredSkills
フロントエンドエンジニア,Web開発部,JavaScript:4,TypeScript:4,React:3
バックエンドエンジニア,サーバー開発部,Java:3,Spring:3,SQL:4
データサイエンティスト,AI研究部,Python:4,TensorFlow:3,SQL:3`
  }
}

