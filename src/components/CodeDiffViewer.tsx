import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitBranch, Eye, Copy, CheckCircle, AlertTriangle } from "@phosphor-icons/react"
import { toast } from 'sonner'

interface DiffLine {
  type: 'add' | 'remove' | 'context' | 'info'
  content: string
  lineNumber?: number
  oldLineNumber?: number
  newLineNumber?: number
}

interface CodeDiffViewerProps {
  original: string
  synthetic: string
  language?: string
}

export function CodeDiffViewer({ original, synthetic, language = "javascript" }: CodeDiffViewerProps) {
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified')
  
  // Generate a simple line-by-line diff
  const generateDiff = (): DiffLine[] => {
    const originalLines = original.split('\n')
    const syntheticLines = synthetic.split('\n')
    const diff: DiffLine[] = []
    
    // Simple algorithm - for each line in original, find if it exists in synthetic
    let syntheticIndex = 0
    let originalIndex = 0
    
    while (originalIndex < originalLines.length || syntheticIndex < syntheticLines.length) {
      const originalLine = originalLines[originalIndex]
      const syntheticLine = syntheticLines[syntheticIndex]
      
      if (originalIndex >= originalLines.length) {
        // Only synthetic lines left
        diff.push({
          type: 'add',
          content: syntheticLine || '',
          newLineNumber: syntheticIndex + 1
        })
        syntheticIndex++
      } else if (syntheticIndex >= syntheticLines.length) {
        // Only original lines left
        diff.push({
          type: 'remove',
          content: originalLine || '',
          oldLineNumber: originalIndex + 1
        })
        originalIndex++
      } else if (originalLine === syntheticLine) {
        // Lines are identical
        diff.push({
          type: 'context',
          content: originalLine,
          oldLineNumber: originalIndex + 1,
          newLineNumber: syntheticIndex + 1
        })
        originalIndex++
        syntheticIndex++
      } else {
        // Lines are different - mark as remove/add
        diff.push({
          type: 'remove',
          content: originalLine,
          oldLineNumber: originalIndex + 1
        })
        diff.push({
          type: 'add',
          content: syntheticLine,
          newLineNumber: syntheticIndex + 1
        })
        originalIndex++
        syntheticIndex++
      }
    }
    
    return diff
  }

  const diffLines = generateDiff()
  const addedLines = diffLines.filter(line => line.type === 'add').length
  const removedLines = diffLines.filter(line => line.type === 'remove').length
  const changedLines = Math.max(addedLines, removedLines)
  const totalLines = Math.max(original.split('\n').length, synthetic.split('\n').length)
  const changePercentage = Math.round((changedLines / totalLines) * 100)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${type} copied to clipboard`)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Code Transformation Diff
            </CardTitle>
            <CardDescription>
              GitHub-style diff showing privacy transformations applied to your code
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'unified' ? 'split' : 'unified')}
            >
              <Eye className="h-4 w-4 mr-2" />
              {viewMode === 'unified' ? 'Split View' : 'Unified View'}
            </Button>
          </div>
        </div>
        
        {/* Diff Statistics */}
        <div className="flex items-center gap-4 pt-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            +{addedLines} additions
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-200">
            -{removedLines} deletions
          </Badge>
          <Badge variant="outline">
            {changePercentage}% of code transformed
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="diff" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diff">
              <GitBranch className="h-4 w-4 mr-2" />
              Unified Diff
            </TabsTrigger>
            <TabsTrigger value="original">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Original (Sensitive)
            </TabsTrigger>
            <TabsTrigger value="synthetic">
              <CheckCircle className="h-4 w-4 mr-2" />
              Synthetic (Safe)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="diff" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing changes that protect proprietary business logic
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(diffLines.map(line => 
                    `${line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}${line.content}`
                  ).join('\n'), 'Diff')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Diff
                </Button>
              </div>
              
              <ScrollArea className="h-[600px] w-full border rounded-lg">
                <div className="font-mono text-sm">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={`flex items-center px-4 py-1 ${
                        line.type === 'add' 
                          ? 'bg-green-50 border-l-4 border-green-400' 
                          : line.type === 'remove'
                          ? 'bg-red-50 border-l-4 border-red-400'
                          : 'bg-background hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 w-20 text-muted-foreground text-xs">
                        {line.type === 'remove' && (
                          <span className="w-8 text-right">{line.oldLineNumber}</span>
                        )}
                        {line.type === 'add' && (
                          <span className="w-8 text-right">{line.newLineNumber}</span>
                        )}
                        {line.type === 'context' && (
                          <>
                            <span className="w-8 text-right">{line.oldLineNumber}</span>
                          </>
                        )}
                        <span className="w-4">
                          {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ''}
                        </span>
                      </div>
                      <div className="flex-1 whitespace-pre-wrap break-all">
                        {line.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="original" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-red-600 border-red-200">
                  ⚠️ Contains Proprietary Information - Enterprise Use Only
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(original, 'Original code')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Original
                </Button>
              </div>
              <ScrollArea className="h-[600px] w-full border rounded-lg">
                <pre className="p-4 font-mono text-sm bg-red-50 whitespace-pre-wrap break-all">
                  {original}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="synthetic" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  ✓ Enterprise Security Approved - Safe for AI Tools
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(synthetic, 'Synthetic code')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Synthetic
                </Button>
              </div>
              <ScrollArea className="h-[600px] w-full border rounded-lg">
                <pre className="p-4 font-mono text-sm bg-green-50 whitespace-pre-wrap break-all">
                  {synthetic}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}