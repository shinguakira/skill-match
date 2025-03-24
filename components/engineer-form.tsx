"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Engineer, Skill } from "@/lib/types"
import { skillOptions } from "@/lib/data"

interface EngineerFormProps {
  onSubmit: (engineer: Engineer) => void
}

export default function EngineerForm({ onSubmit }: EngineerFormProps) {
  const [name, setName] = useState("")
  const [yearsOfExperience, setYearsOfExperience] = useState("")
  const [skills, setSkills] = useState<Skill[]>([])
  const [currentSkill, setCurrentSkill] = useState<string>("")
  const [currentLevel, setCurrentLevel] = useState<string>("3")

  const handleAddSkill = () => {
    if (!currentSkill) return

    // 同じスキルが既に追加されている場合は追加しない
    if (skills.some((skill) => skill.name === currentSkill)) return

    setSkills([...skills, { name: currentSkill, level: Number.parseInt(currentLevel) }])
    setCurrentSkill("")
    setCurrentLevel("3")
  }

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillName))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !yearsOfExperience || skills.length === 0) return

    const engineer: Engineer = {
      id: "",
      name,
      yearsOfExperience: Number.parseInt(yearsOfExperience),
      skills,
    }

    onSubmit(engineer)

    // フォームをリセット
    setName("")
    setYearsOfExperience("")
    setSkills([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">名前</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="experience">経験年数</Label>
          <Input
            id="experience"
            type="number"
            min="0"
            max="50"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            placeholder="5"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>スキル</Label>

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

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
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

      <Button type="submit" className="w-full" disabled={!name || !yearsOfExperience || skills.length === 0}>
        エンジニア情報を登録
      </Button>
    </form>
  )
}

