"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Engineer, Position, MatchResult } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MatchingResultsProps {
  results: MatchResult[]
  engineers: Engineer[]
  positions: Position[]
}

export default function MatchingResults({ results, engineers, positions }: MatchingResultsProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>("all")

  const filteredResults =
    selectedPosition === "all" ? results : results.filter((result) => result.positionId === selectedPosition)

  if (engineers.length === 0 || positions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            エンジニアとポジションの情報を登録し、マッチングを実行してください
          </p>
        </CardContent>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            マッチング結果がありません。「マッチング実行」ボタンをクリックしてください
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>マッチング結果</CardTitle>
        <CardDescription>エンジニアとポジションの適合度を表示しています</CardDescription>

        <div className="mt-4">
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="ポジションでフィルター" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのポジション</SelectItem>
              {positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  {position.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>エンジニア</TableHead>
              <TableHead>ポジション</TableHead>
              <TableHead>適合度</TableHead>
              <TableHead>詳細</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length > 0 ? (
              filteredResults
                .sort((a, b) => b.score - a.score)
                .map((result) => {
                  const engineer = engineers.find((e) => e.id === result.engineerId)
                  const position = positions.find((p) => p.id === result.positionId)

                  if (!engineer || !position) return null

                  return (
                    <TableRow key={`${result.engineerId}-${result.positionId}`}>
                      <TableCell className="font-medium">{engineer.name}</TableCell>
                      <TableCell>{position.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${result.score}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{result.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          {result.matchedSkills.map((skill) => (
                            <div key={skill.name} className="flex justify-between">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">
                                エンジニア: {skill.engineerLevel} / 必要: {skill.requiredLevel}
                              </span>
                            </div>
                          ))}
                          {result.missingSkills.length > 0 && (
                            <div className="mt-1 text-destructive">
                              <span>不足スキル: </span>
                              {result.missingSkills.map((skill, index) => (
                                <span key={skill.name}>
                                  {skill.name} (Lv.{skill.level}){index < result.missingSkills.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  選択したポジションに対するマッチング結果がありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

