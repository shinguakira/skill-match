'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Engineer, Position } from '@/lib/types';

interface MatchingFilterProps {
  engineers: Engineer[];
  positions: Position[];
  onFilter: (selectedEngineers: string[], selectedPositions: string[]) => void;
}

export default function MatchingFilter({ engineers, positions, onFilter }: MatchingFilterProps) {
  const [engineerSearchTerm, setEngineerSearchTerm] = useState('');
  const [positionSearchTerm, setPositionSearchTerm] = useState('');
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // エンジニア検索結果
  const filteredEngineers = engineers.filter((engineer) =>
    engineer.name.toLowerCase().includes(engineerSearchTerm.toLowerCase())
  );

  // ポジション検索結果
  const filteredPositions = positions.filter((position) =>
    position.title.toLowerCase().includes(positionSearchTerm.toLowerCase())
  );

  // エンジニア選択の切り替え
  const toggleEngineer = (engineerId: string) => {
    setSelectedEngineers((prev) =>
      prev.includes(engineerId) ? prev.filter((id) => id !== engineerId) : [...prev, engineerId]
    );
  };

  // ポジション選択の切り替え
  const togglePosition = (positionId: string) => {
    setSelectedPositions((prev) =>
      prev.includes(positionId) ? prev.filter((id) => id !== positionId) : [...prev, positionId]
    );
  };

  // すべてのエンジニアを選択/解除
  const toggleAllEngineers = () => {
    if (selectedEngineers.length === filteredEngineers.length) {
      setSelectedEngineers([]);
    } else {
      setSelectedEngineers(filteredEngineers.map((e) => e.id));
    }
  };

  // すべてのポジションを選択/解除
  const toggleAllPositions = () => {
    if (selectedPositions.length === filteredPositions.length) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions(filteredPositions.map((p) => p.id));
    }
  };

  // フィルタを適用してマッチング実行
  const applyFilter = () => {
    // 選択されていない場合は全て選択したとみなす
    const engineerIds =
      selectedEngineers.length > 0 ? selectedEngineers : engineers.map((e) => e.id);

    const positionIds =
      selectedPositions.length > 0 ? selectedPositions : positions.map((p) => p.id);

    onFilter(engineerIds, positionIds);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>マッチング対象の選択</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-1" />
            {showFilters ? 'フィルターを隠す' : 'フィルターを表示'}
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* エンジニアフィルター */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="engineer-search">エンジニア検索</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="engineer-search"
                    placeholder="名前で検索..."
                    className="pl-8"
                    value={engineerSearchTerm}
                    onChange={(e) => setEngineerSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto">
                <div className="flex items-center space-x-2 pb-2 mb-2 border-b">
                  <Checkbox
                    id="select-all-engineers"
                    checked={
                      selectedEngineers.length === filteredEngineers.length &&
                      filteredEngineers.length > 0
                    }
                    onCheckedChange={toggleAllEngineers}
                  />
                  <label
                    htmlFor="select-all-engineers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    すべて選択
                  </label>
                </div>

                {filteredEngineers.length > 0 ? (
                  <div className="space-y-2">
                    {filteredEngineers.map((engineer) => (
                      <div key={engineer.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`engineer-${engineer.id}`}
                          checked={selectedEngineers.includes(engineer.id)}
                          onCheckedChange={() => toggleEngineer(engineer.id)}
                        />
                        <label
                          htmlFor={`engineer-${engineer.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {engineer.name}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    検索結果がありません
                  </p>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                {selectedEngineers.length > 0
                  ? `${selectedEngineers.length}人のエンジニアを選択中`
                  : '選択なし（すべてのエンジニアが対象）'}
              </div>
            </div>

            {/* ポジションフィルター */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="position-search">ポジション検索</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="position-search"
                    placeholder="タイトルで検索..."
                    className="pl-8"
                    value={positionSearchTerm}
                    onChange={(e) => setPositionSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto">
                <div className="flex items-center space-x-2 pb-2 mb-2 border-b">
                  <Checkbox
                    id="select-all-positions"
                    checked={
                      selectedPositions.length === filteredPositions.length &&
                      filteredPositions.length > 0
                    }
                    onCheckedChange={toggleAllPositions}
                  />
                  <label
                    htmlFor="select-all-positions"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    すべて選択
                  </label>
                </div>

                {filteredPositions.length > 0 ? (
                  <div className="space-y-2">
                    {filteredPositions.map((position) => (
                      <div key={position.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`position-${position.id}`}
                          checked={selectedPositions.includes(position.id)}
                          onCheckedChange={() => togglePosition(position.id)}
                        />
                        <label
                          htmlFor={`position-${position.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {position.title}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    検索結果がありません
                  </p>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                {selectedPositions.length > 0
                  ? `${selectedPositions.length}件のポジションを選択中`
                  : '選択なし（すべてのポジションが対象）'}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={applyFilter}>マッチング実行</Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
