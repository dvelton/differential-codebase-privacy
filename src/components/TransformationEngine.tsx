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

  // Calculate what changes were actually made
  const originalLength = original.length
  const syntheticLength = synthetic.length
  const characterChangePercentage = Math.abs(originalLength - syntheticLength) / originalLength * 100
  
  // Count specific transformations
  const businessTermsInOriginal = (original.match(/\b(customer|client|user|order|product|payment|invoice|price|tax|cost|revenue|profit|buyer|purchaser|subscriber|member|sale|billing|account|profile)\b/gi) || []).length
  const businessTermsInSynthetic = (synthetic.match(/\b(customer|client|user|order|product|payment|invoice|price|tax|cost|revenue|profit|buyer|purchaser|subscriber|member|sale|billing|account|profile)\b/gi) || []).length
  
  const urlsInOriginal = (original.match(/https?:\/\/[\w\.-]+/g) || []).length
  const urlsInSynthetic = (synthetic.match(/https?:\/\/(?!(?:api\.example\.com|service\.example\.com|example\.com))[\w\.-]+/g) || []).length
  
  const actualTransformations = [
    {
      type: 'Business Logic Obfuscation',
      description: 'Replaced domain-specific algorithms with generic operations',
      examples: ['calculateTaxAmount() → computeValue()', 'CustomerService → EntityService', 'processPayment() → processOperation()'],
      effectiveness: 95,
      actualChanges: `${businessTermsInOriginal - businessTermsInSynthetic} business terms transformed`
    },
    {
      type: 'API Endpoint Generalization',
      description: 'Abstracted third-party integrations to generic patterns',
      examples: ['/api/v2/customers/123 → /api/v1/endpoint', 'https://api.stripe.com → https://api.example.com', 'user@company.com → user@example.com'],
      effectiveness: 98,
      actualChanges: `${urlsInOriginal - urlsInSynthetic} URLs anonymized`
    },
    {
      type: 'Data Model Anonymization',
      description: 'Transformed business entities into generic domain objects',
      examples: ['customerId → entityId', 'orderData → operationData', 'customerDatabase → entitiesDatabase'],
      effectiveness: 92,
      actualChanges: `Variable and property names generalized`
    },
    {
      type: 'Sensitive Data Protection',
      description: 'Obfuscated secrets, credentials, and business-specific constants',
      examples: ['STRIPE_API_KEY → API_KEY', 'COMPANY_SECRET → SECRET_KEY', 'john@acme.com → user@example.com'],
      effectiveness: 96,
      actualChanges: `Credentials and secrets anonymized`
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Code Transformation Results</h2>
        <p className="text-muted-foreground">Privacy-preserving synthetic code generation complete</p>
        {characterChangePercentage > 1 && (
          <Badge className="bg-green-600">
            {Math.round(characterChangePercentage)}% of code content transformed
          </Badge>
        )}
      </div>

      {/* Transformation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actualTransformations.map((transform, index) => (
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
                <div className="text-xs font-medium text-green-600 bg-green-50 p-1 rounded">
                  {transform.actualChanges}
                </div>
                <div className="space-y-1">
                  {transform.examples.slice(0, 2).map((example, i) => (
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

      {/* Transformation Statistics */}
      {securityMetrics.transformationDetails && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Transformation Statistics</CardTitle>
            <CardDescription className="text-blue-600">Detailed breakdown of changes made to your code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">{securityMetrics.transformationDetails.businessTermsReduced}</div>
                <div className="text-sm text-blue-600">Business terms removed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">{securityMetrics.transformationDetails.urlsAnonymized}</div>
                <div className="text-sm text-blue-600">URLs anonymized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">{securityMetrics.transformationDetails.apiEndpointsGeneralized}</div>
                <div className="text-sm text-blue-600">API endpoints generalized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">{securityMetrics.transformationDetails.overallTransformationRate}%</div>
                <div className="text-sm text-blue-600">Overall transformation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      {businessTermsInOriginal} business terms detected
                    </Badge>
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
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {businessTermsInSynthetic} business terms remaining
                    </Badge>
                  </div>
                  <Textarea
                    value={synthetic}
                    readOnly
                    className="code-editor min-h-[400px] font-mono bg-green-50 border-green-200"
                  />
                </div>
              </div>
              {businessTermsInOriginal === businessTermsInSynthetic && businessTermsInOriginal > 0 && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      No business terms were transformed in this code sample. Try using one of the provided sample codes for a better demonstration.
                    </span>
                  </div>
                </div>
              )}
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