"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { generateSampleCSV } from "@/lib/file-parsers"

interface SampleDataGeneratorProps {
  type: "engineers" | "positions"
}

export default function SampleDataGenerator({ type }: SampleDataGeneratorProps) {
  const handleGenerateSample = () => {
    const csvContent = generateSampleCSV(type)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.setAttribute("href", url)
    link.setAttribute("download", `sample_${type}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleGenerateSample} className="flex items-center gap-1">
      <Download className="h-3 w-3" />
      <span>サンプルCSVをダウンロード</span>
    </Button>
  )
}

