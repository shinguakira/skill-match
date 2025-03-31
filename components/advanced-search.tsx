'use client';

import { useState } from 'react';
import { Search, X, ChevronDown, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { skillOptions } from '@/lib/data';

interface AdvancedSearchProps {
  keywordPlaceholder: string;
  keywordValue: string;
  onKeywordChange: (value: string) => void;
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export default function AdvancedSearch({
  keywordPlaceholder,
  keywordValue,
  onKeywordChange,
  selectedSkills,
  onSkillsChange,
}: AdvancedSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // スキルの選択/解除
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  // 選択されたスキルをすべて解除
  const clearSelectedSkills = () => {
    onSkillsChange([]);
  };

  // 検索条件をすべてクリア
  const clearAllFilters = () => {
    onKeywordChange('');
    onSkillsChange([]);
  };

  // 検索結果をフィルタリング
  const filteredSkills = skillOptions.filter((skill) =>
    skill.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* キーワード検索 */}
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={keywordPlaceholder}
            className="pl-8 pr-8"
            value={keywordValue}
            onChange={(e) => onKeywordChange(e.target.value)}
          />
          {keywordValue && (
            <button
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
              onClick={() => onKeywordChange('')}
              aria-label="検索をクリア"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* スキル検索 */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between min-w-[200px]">
              <span>スキルで絞り込み</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput
                placeholder="スキルを検索..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>スキルが見つかりません</CommandEmpty>
                <CommandGroup>
                  {filteredSkills.map((skill) => (
                    <CommandItem key={skill} value={skill} onSelect={() => toggleSkill(skill)}>
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                            selectedSkills.includes(skill)
                              ? 'bg-primary border-primary'
                              : 'opacity-50'
                          }`}
                        >
                          {selectedSkills.includes(skill) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span>{skill}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <div className="border-t p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    clearSelectedSkills();
                    setOpen(false);
                  }}
                >
                  選択をクリア
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 選択されたスキルの表示 */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <button
                onClick={() => toggleSkill(skill)}
                className="text-muted-foreground hover:text-foreground ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={clearSelectedSkills}
          >
            クリア
          </Button>
        </div>
      )}

      {/* 検索条件が設定されている場合にクリアボタンを表示 */}
      {(keywordValue || selectedSkills.length > 0) && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            すべての検索条件をクリア
          </Button>
        </div>
      )}
    </div>
  );
}
