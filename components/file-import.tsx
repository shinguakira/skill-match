"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileSpreadsheet, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Engineer, Position, Skill } from "@/lib/types"
import { parseCSV, parseExcel, parsePDF } from "@/lib/file-parsers"

interface FileImportProps {
  onImportEngineers: (engineers: Engineer[]) => void
  onImportPositions: (positions: Position[]) => void
}

export default function FileImport({ onImportEngineers, onImportPositions }: FileImportProps) {
  const [importType, setImportType] = useState<"engineers" | "positions">("engineers")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      let parsedData: any[] = []

      // ファイルタイプに応じたパーサーを使用
      if (fileType === "csv") {
        parsedData = await parseCSV(file)
      } else if (fileType === "excel") {
        parsedData = await parseExcel(file)
      } else if (fileType === "pdf") {
        parsedData = await parsePDF(file)
      }

      // データの検証と変換
      if (parsedData.length === 0) {
        throw new Error("インポートするデータが見つかりませんでした")
      }

      // インポートタイプに応じてデータを処理
      if (importType === "engineers") {
        const engineers = parsedData.map((item, index) => ({
          id: `import-${Date.now()}-${index}`,
          name: item.name || "名前なし",
          yearsOfExperience: Number.parseInt(item.yearsOfExperience || "0"),
          skills: parseSkills(item.skills),
        }))
        onImportEngineers(engineers)
        setSuccess(`${engineers.length}人のエンジニア情報をインポートしました`)
      } else {
        const positions = parsedData.map((item, index) => ({
          id: `import-${Date.now()}-${index}`,
          title: item.title || "タイトルなし",
          department: item.department || "部署なし",
          requiredSkills: parseSkills(item.requiredSkills),
        }))
        onImportPositions(positions)
        setSuccess(`${positions.length}件のポジション情報をインポートしました`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "ファイルのインポート中にエラーが発生しました")
    } finally {
      setIsLoading(false)
      // ファイル選択をリセット
      event.target.value = ""
    }
  }

  // スキル文字列をパースする関数
  const parseSkills = (skillsStr: string): Skill[] => {
    if (!skillsStr) return []

    try {
      // JSONフォーマットの場合
      if (skillsStr.trim().startsWith("[")) {
        return JSON.parse(skillsStr)
      }

      // カンマ区切りの場合（例: "JavaScript:4,TypeScript:3,React:5"）
      return skillsStr.split(",").map((skill) => {
        const [name, levelStr] = skill.trim().split(":")
        return {
          name: name.trim(),
          level: Number.parseInt(levelStr?.trim() || "3"),
        }
      })
    } catch (e) {
      // パースに失敗した場合は空配列を返す
      console.error("スキルのパースに失敗しました:", e)
      return []
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>データインポート</CardTitle>
        <CardDescription>CSV、Excel、PDFファイルからデータをインポートできます</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={importType} onValueChange={(value) => setImportType(value as "engineers" | "positions")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="engineers">エンジニア情報</TabsTrigger>
            <TabsTrigger value="positions">ポジション情報</TabsTrigger>
          </TabsList>

          <TabsContent value="engineers" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              エンジニア情報のCSV/Excelファイルは以下の列を含む必要があります：
              <br />
              <code>name</code>, <code>yearsOfExperience</code>, <code>skills</code>
              <br />
              スキルは「JavaScript:4,TypeScript:3,React:5」のようなフォーマットで指定してください。
            </p>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ポジション情報のCSV/Excelファイルは以下の列を含む必要があります：
              <br />
              <code>title</code>, <code>department</code>, <code>requiredSkills</code>
              <br />
              必要スキルは「JavaScript:4,TypeScript:3,React:5」のようなフォーマットで指定してください。
            </p>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="file"
                id="csv-upload"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "csv")}
              />
              <label htmlFor="csv-upload">
                <Button variant="outline" className="w-full" asChild>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>CSVインポート</span>
                  </div>
                </Button>
              </label>
            </div>

            <div>
              <input
                type="file"
                id="excel-upload"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "excel")}
              />
              <label htmlFor="excel-upload">
                <Button variant="outline" className="w-full" asChild>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Excelインポート</span>
                  </div>
                </Button>
              </label>
            </div>

            <div>
              <input
                type="file"
                id="pdf-upload"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "pdf")}
              />
              <label htmlFor="pdf-upload">
                <Button variant="outline" className="w-full" asChild>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>PDFインポート</span>
                  </div>
                </Button>
              </label>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="ml-2">処理中...</span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <Upload className="h-4 w-4" />
              <AlertTitle>成功</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-muted-foreground mt-2">
            <p>
              <strong>注意：</strong> PDFからのデータ抽出は構造によって精度が異なります。
              最良の結果を得るには、構造化されたCSVまたはExcelファイルを使用してください。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

