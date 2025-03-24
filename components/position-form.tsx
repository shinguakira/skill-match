"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Position, Skill } from "@/lib/types"
import { skillOptions } from "@/lib/data"

interface PositionFormProps {
  onSubmit: (position: Position) => void
}

export default function PositionForm({ onSubmit }: PositionFormProps) {
  const [title, setTitle] = useState("")
  const [department, setDepartment] = useState("")
  const [requiredSkills, setRequiredSkills] = useState<Skill[]>([])
  const [currentSkill, setCurrentSkill] = useState<string>("")
  const [currentLevel, setCurrentLevel] = useState<string>("3")

  const handleAddSkill = () => {
    if (!currentSkill) return

    // 同じスキルが既に追加されている場合は追加しない
    if (requiredSkills.some((skill) => skill.name === currentSkill)) return

    setRequiredSkills([...requiredSkills, { name: currentSkill, level: Number.parseInt(currentLevel) }])
    setCurrentSkill("")
    setCurrentLevel("3")
  }

  const handleRemoveSkill = (skillName: string) => {
    setRequiredSkills(requiredSkills.filter((skill) => skill.name !== skillName))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !department || requiredSkills.length === 0) return

    const position: Position = {
      id: "",
      title,
      department,
      requiredSkills,
    }

    onSubmit(position)

    // フォームをリセット
    setTitle("")
    setDepartment("")
    setRequiredSkills([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">ポジション名</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="フロントエンドエンジニア"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="department">部署</Label>
          <Input
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Webアプリケーション開発部"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>必要スキル</Label>

        <div className="flex gap-2">
          <Select value={currentSkill} onValueChange={setCurrentSkill}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="スキルを選択" />
            </SelectTrigger>
            <SelectContent>
              {skillOptions.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentLevel} onValueChange={setCurrentLevel}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="レベル" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>

          <Button type="button" variant="outline" size="icon" onClick={handleAddSkill} disabled={!currentSkill}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>

        {requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {requiredSkills.map((skill) => (
              <div key={skill.name} className="bg-muted flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                {skill.name} ({skill.level})
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.name)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={!title || !department || requiredSkills.length === 0}>
        ポジション情報を登録
      </Button>
    </form>
  )
}

