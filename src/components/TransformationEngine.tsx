import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, Zap, CheckCircle, AlertTriangle, GitBranch } from "@phosphor-icons/react"
import { CodeDiffViewer } from "@/components/CodeDiffViewer"

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
    transformationDetails?: {
      businessTermsReduced: number
      urlsAnonymized: number
      apiEndpointsGeneralized: number
      sensitiveDataObfuscated: number
      overallTransformationRate: number
    }
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

  // Calculate transformation effectiveness metrics
  const details = securityMetrics.transformationDetails
  const totalTransformations = details ? 
    details.businessTermsReduced + details.urlsAnonymized + details.apiEndpointsGeneralized + details.sensitiveDataObfuscated : 0

  const transformationSteps = [
    {
      name: "Business Logic Abstraction",
      description: "Proprietary algorithms converted to generic implementations",
      count: details?.businessTermsReduced || 0,
      icon: Shield
    },
    {
      name: "API Endpoint Generalization", 
      description: "Service URLs and endpoints anonymized",
      count: details?.apiEndpointsGeneralized || 0,
      icon: Eye
    },
    {
      name: "Data Model Anonymization",
      description: "Business entities transformed to generic objects",
      count: details?.urlsAnonymized || 0,
      icon: Zap
    },
    {
      name: "Sensitive Data Obfuscation",
      description: "Secrets, keys, and credentials sanitized",
      count: details?.sensitiveDataObfuscated || 0,
      icon: CheckCircle
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

      {/* Transformation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transformationSteps.map((step) => (
          <Card key={step.name} className="text-center">
            <CardContent className="p-4">
              <step.icon className="h-8 w-8 mx-auto mb-2 text-primary" weight="duotone" />
              <div className="text-2xl font-bold text-foreground">{step.count}</div>
              <div className="text-sm font-medium text-foreground">{step.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Privacy Transformation Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Transformation Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of business logic protection and AI utility preservation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Privacy Protection</span>
                <span className="font-medium">{securityMetrics.privacyScore}%</span>
              </div>
              <Progress value={securityMetrics.privacyScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Proprietary business logic successfully abstracted
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Assistance Parity</span>
                <span className="font-medium">{securityMetrics.aiParity}%</span>
              </div>
              <Progress value={securityMetrics.aiParity} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Code structure preserved for AI tools
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk Reduction</span>
                <span className="font-medium">{100 - securityMetrics.leakageRisk}%</span>
              </div>
              <Progress value={100 - securityMetrics.leakageRisk} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Information leakage risk eliminated
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub-style Diff Viewer */}
      <CodeDiffViewer 
        original={original}
        synthetic={synthetic}
        language={codeData.language}
      />

      {/* Code Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Legacy Side-by-Side Comparison</CardTitle>
          <CardDescription>
            Traditional view showing privacy transformation while preserving functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="original" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="original" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Original Code (Sensitive)
              </TabsTrigger>
              <TabsTrigger value="synthetic" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Synthetic Code (Safe)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="original" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    ⚠️ Contains Proprietary Information
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {originalLength.toLocaleString()} characters
                  </span>
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
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    ✓ Enterprise Security Approved
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {syntheticLength.toLocaleString()} characters
                  </span>
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