import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, Zap, CheckCircle, AlertTriangle } from "@phosphor-icons/react"

interface CodeData {
  original: string
  synthetic: string
  language: string
  securityMetrics: {
    privacyScore: number
    leakageRisk: number
    competitiveRisk: number
    aiParity: number
    complianceReady: boolean
  }
}

interface TransformationEngineProps {
  codeData: CodeData
}

export function TransformationEngine({ codeData }: TransformationEngineProps) {
  const { original, synthetic, securityMetrics } = codeData

  const transformations = [
    {
      type: 'Business Logic Obfuscation',
      description: 'Replaced domain-specific algorithms with generic operations',
      examples: ['calculateTaxLiability() → computeRateBasedValue()', 'Customer → Entity', 'Order → Transaction'],
      effectiveness: 95
    },
    {
      type: 'API Endpoint Generalization',
      description: 'Abstracted third-party integrations to generic patterns',
      examples: ['/api/v2/customers → /api/endpoint', 'https://payments.stripe.com → https://api.example.com'],
      effectiveness: 98
    },
    {
      type: 'Data Model Anonymization',
      description: 'Transformed business entities into generic domain objects',
      examples: ['UserProfile → EntityProfile', 'ProductCatalog → ResourceCatalog'],
      effectiveness: 92
    },
    {
      type: 'Comment Sanitization',
      description: 'Removed business context while preserving technical intent',
      examples: ['// Proprietary pricing algorithm → // Core computation logic'],
      effectiveness: 88
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Code Transformation Results</h2>
        <p className="text-muted-foreground">Privacy-preserving synthetic code generation complete</p>
      </div>

      {/* Transformation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transformations.map((transform, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{transform.type}</h4>
                  <Badge variant={transform.effectiveness > 90 ? 'default' : 'secondary'}>
                    {transform.effectiveness}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{transform.description}</p>
                <div className="space-y-1">
                  {transform.examples.map((example, i) => (
                    <div key={i} className="text-xs font-mono bg-muted p-1 rounded">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Before/After Code Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Code Comparison
          </CardTitle>
          <CardDescription>Original vs Synthetic code side-by-side</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="side-by-side">
            <TabsList>
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="original">Original Only</TabsTrigger>
              <TabsTrigger value="synthetic">Synthetic Only</TabsTrigger>
            </TabsList>
            
            <TabsContent value="side-by-side" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-sm">Original Code (Sensitive)</span>
                  </div>
                  <Textarea
                    value={original}
                    readOnly
                    className="code-editor min-h-[400px] font-mono bg-red-50 border-red-200"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sm">Synthetic Code (Safe)</span>
                  </div>
                  <Textarea
                    value={synthetic}
                    readOnly
                    className="code-editor min-h-[400px] font-mono bg-green-50 border-green-200"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="original" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-sm">Original Code (Contains Sensitive Business Logic)</span>
                </div>
                <Textarea
                  value={original}
                  readOnly
                  className="code-editor min-h-[500px] font-mono bg-red-50 border-red-200"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="synthetic" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-sm">Synthetic Code (Enterprise Safe)</span>
                </div>
                <Textarea
                  value={synthetic}
                  readOnly
                  className="code-editor min-h-[500px] font-mono bg-green-50 border-green-200"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}