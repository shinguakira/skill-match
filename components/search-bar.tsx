"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder} className="pl-8 pr-8" value={value} onChange={(e) => onChange(e.target.value)} />
      {value && (
        <button
          className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
          onClick={() => onChange("")}
          aria-label="検索をクリア"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

