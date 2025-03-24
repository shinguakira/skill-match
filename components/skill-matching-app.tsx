"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EngineerForm from "./engineer-form"
import PositionForm from "./position-form"
import MatchingResults from "./matching-results"
import MatchingFilter from "./matching-filter"
import FileImport from "./file-import"
import SampleDataGenerator from "./sample-data-generator"
import AdvancedSearch from "./advanced-search"
import type { Engineer, Position, MatchResult } from "@/lib/types"
import { calculateMatches } from "@/lib/matching-algorithm"
import { mockEngineers, mockPositions } from "@/lib/data"

export default function SkillMatchingApp() {
  // モックデータを初期状態として使用
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [engineerDialogOpen, setEngineerDialogOpen] = useState(false)
  const [positionDialogOpen, setPositionDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 検索状態
  const [engineerKeyword, setEngineerKeyword] = useState("")
  const [engineerSelectedSkills, setEngineerSelectedSkills] = useState<string[]>([])

  const [positionKeyword, setPositionKeyword] = useState("")
  const [positionSelectedSkills, setPositionSelectedSkills] = useState<string[]>([])

  // 非同期でモックデータを読み込む
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      // 非同期処理をシミュレート
      await new Promise((resolve) => setTimeout(resolve, 500))

      setEngineers(mockEngineers)
      setPositions(mockPositions)

      setIsLoading(false)

      console.log(`${mockEngineers.length}人のエンジニアと${mockPositions.length}件のポジションデータを読み込みました`)
    }

    loadData()
  }, [])

  // フィルタリングされたエンジニアとポジション
  const filteredEngineers = useMemo(() => {
    return engineers.filter((engineer) => {
      // キーワード検索（名前）
      const matchesKeyword = !engineerKeyword || engineer.name.toLowerCase().includes(engineerKeyword.toLowerCase())

      // スキル検索
      const matchesSkills =
        engineerSelectedSkills.length === 0 ||
        engineerSelectedSkills.every((selectedSkill) => engineer.skills.some((skill) => skill.name === selectedSkill))

      return matchesKeyword && matchesSkills
    })
  }, [engineers, engineerKeyword, engineerSelectedSkills])

  const filteredPositions = useMemo(() => {
    return positions.filter((position) => {
      // キーワード検索（タイトルまたは部署）
      const matchesKeyword =
        !positionKeyword ||
        position.title.toLowerCase().includes(positionKeyword.toLowerCase()) ||
        position.department.toLowerCase().includes(positionKeyword.toLowerCase())

      // スキル検索
      const matchesSkills =
        positionSelectedSkills.length === 0 ||
        positionSelectedSkills.every((selectedSkill) =>
          position.requiredSkills.some((skill) => skill.name === selectedSkill),
        )

      return matchesKeyword && matchesSkills
    })
  }, [positions, positionKeyword, positionSelectedSkills])

  const addEngineer = (engineer: Engineer) => {
    setEngineers([...engineers, { ...engineer, id: Date.now().toString() }])
    setEngineerDialogOpen(false) // モーダルを閉じる
  }

  const addPosition = (position: Position) => {
    setPositions([...positions, { ...position, id: Date.now().toString() }])
    setPositionDialogOpen(false) // モーダルを閉じる
  }

  const importEngineers = (newEngineers: Engineer[]) => {
    setEngineers([...engineers, ...newEngineers])
  }

  const importPositions = (newPositions: Position[]) => {
    setPositions([...positions, ...newPositions])
  }

  // フィルタリングされたエンジニアとポジションでマッチングを実行
  const runFilteredMatching = (selectedEngineerIds: string[], selectedPositionIds: string[]) => {
    if (selectedEngineerIds.length === 0 || selectedPositionIds.length === 0) {
      return
    }

    // 選択されたエンジニアとポジションのみをフィルタリング
    const filteredEngineers = engineers.filter((engineer) => selectedEngineerIds.includes(engineer.id))

    const filteredPositions = positions.filter((position) => selectedPositionIds.includes(position.id))

    // フィルタリングされたデータでマッチング計算を実行
    const results = calculateMatches(filteredEngineers, filteredPositions)
    setMatchResults(results)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">大量のデータを読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="engineers">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engineers">エンジニア情報</TabsTrigger>
          <TabsTrigger value="positions">ポジション情報</TabsTrigger>
          <TabsTrigger value="import">データインポート</TabsTrigger>
          <TabsTrigger value="matching">マッチング結果</TabsTrigger>
        </TabsList>

        <TabsContent value="engineers" className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">登録済みエンジニア ({engineers.length})</h3>
              <div className="flex gap-2">
                <SampleDataGenerator type="engineers" />

                {/* エンジニア登録モーダル */}
                <Dialog open={engineerDialogOpen} onOpenChange={setEngineerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      新規エンジニア登録
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>エンジニア情報登録</DialogTitle>
                      <DialogDescription>エンジニアの基本情報とスキルを入力してください</DialogDescription>
                    </DialogHeader>
                    <EngineerForm onSubmit={addEngineer} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <AdvancedSearch
              keywordPlaceholder="名前で検索..."
              keywordValue={engineerKeyword}
              onKeywordChange={setEngineerKeyword}
              selectedSkills={engineerSelectedSkills}
              onSkillsChange={setEngineerSelectedSkills}
            />

            <div className="text-sm text-muted-foreground">
              {filteredEngineers.length} 件のエンジニアが表示されています（全 {engineers.length} 件中）
            </div>
          </div>

          {filteredEngineers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEngineers.slice(0, 30).map((engineer) => (
                <div key={engineer.id} className="border rounded-lg p-4 bg-card">
                  <h4 className="font-bold">{engineer.name}</h4>
                  <p className="text-sm text-muted-foreground">経験年数: {engineer.yearsOfExperience}年</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">スキル:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {engineer.skills.map((skill) => (
                        <span key={skill.name} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : engineerKeyword || engineerSelectedSkills.length > 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground mb-4">検索条件に一致するエンジニアが見つかりませんでした</p>
              <Button
                variant="outline"
                onClick={() => {
                  setEngineerKeyword("")
                  setEngineerSelectedSkills([])
                }}
              >
                検索条件をクリア
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground mb-4">エンジニア情報がまだ登録されていません</p>
              <Dialog open={engineerDialogOpen} onOpenChange={setEngineerDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    新規エンジニア登録
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>エンジニア情報登録</DialogTitle>
                    <DialogDescription>エンジニアの基本情報とスキルを入力してください</DialogDescription>
                  </DialogHeader>
                  <EngineerForm onSubmit={addEngineer} />
                </DialogContent>
              </Dialog>
            </div>
          )}

          {filteredEngineers.length > 30 && (
            <div className="text-center py-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">パフォーマンスのため、最初の30件のみ表示しています</p>
              <p className="text-sm text-muted-foreground">検索条件を絞り込むと、より多くの結果を表示できます</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="positions" className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">登録済みポジション ({positions.length})</h3>
              <div className="flex gap-2">
                <SampleDataGenerator type="positions" />

                {/* ポジション登録モーダル */}
                <Dialog open={positionDialogOpen} onOpenChange={setPositionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      新規ポジション登録
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>ポジション情報登録</DialogTitle>
                      <DialogDescription>募集ポジションの詳細と必要なスキルを入力してください</DialogDescription>
                    </DialogHeader>
                    <PositionForm onSubmit={addPosition} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <AdvancedSearch
              keywordPlaceholder="タイトルや部署で検索..."
              keywordValue={positionKeyword}
              onKeywordChange={setPositionKeyword}
              selectedSkills={positionSelectedSkills}
              onSkillsChange={setPositionSelectedSkills}
            />

            <div className="text-sm text-muted-foreground">
              {filteredPositions.length} 件のポジションが表示されています（全 {positions.length} 件中）
            </div>
          </div>

          {filteredPositions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPositions.slice(0, 30).map((position) => (
                <div key={position.id} className="border rounded-lg p-4 bg-card">
                  <h4 className="font-bold">{position.title}</h4>
                  <p className="text-sm text-muted-foreground">{position.department}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">必要スキル:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {position.requiredSkills.map((skill) => (
                        <span key={skill.name} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : positionKeyword || positionSelectedSkills.length > 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground mb-4">検索条件に一致するポジションが見つかりませんでした</p>
              <Button
                variant="outline"
                onClick={() => {
                  setPositionKeyword("")
                  setPositionSelectedSkills([])
                }}
              >
                検索条件をクリア
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground mb-4">ポジション情報がまだ登録されていません</p>
              <Dialog open={positionDialogOpen} onOpenChange={setPositionDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    新規ポジション登録
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>ポジション情報登録</DialogTitle>
                    <DialogDescription>募集ポジションの詳細と必要なスキルを入力してください</DialogDescription>
                  </DialogHeader>
                  <PositionForm onSubmit={addPosition} />
                </DialogContent>
              </Dialog>
            </div>
          )}

          {filteredPositions.length > 30 && (
            <div className="text-center py-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">パフォーマンスのため、最初の30件のみ表示しています</p>
              <p className="text-sm text-muted-foreground">検索条件を絞り込むと、より多くの結果を表示できます</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="import">
          <FileImport onImportEngineers={importEngineers} onImportPositions={importPositions} />
        </TabsContent>

        <TabsContent value="matching">
          <div className="space-y-6">
            {/* マッチングフィルター */}
            <MatchingFilter engineers={engineers} positions={positions} onFilter={runFilteredMatching} />

            {/* マッチング結果 */}
            <MatchingResults results={matchResults} engineers={engineers} positions={positions} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

