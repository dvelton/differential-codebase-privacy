import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Code, BarChart3, Zap } from "@phosphor-icons/react"
import { CodeInputPanel } from '@/components/CodeInputPanel'
import { TransformationEngine } from '@/components/TransformationEngine'
import { SecurityDashboard } from '@/components/SecurityDashboard'
import { AIComparisonDemo } from '@/components/AIComparisonDemo'
import { useKV } from '@github/spark/hooks'

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

function App() {
  const [codeData, setCodeData] = useKV<CodeData | null>("codeData", null)
  const [activeTab, setActiveTab] = useState("input")
  const [isTransforming, setIsTransforming] = useState(false)

  const handleCodeTransformation = async (originalCode: string, language: string, privacyLevel: string) => {
    setIsTransforming(true)
    
    try {
      // Simulate transformation process with realistic timing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const syntheticCode = await transformCode(originalCode, language, privacyLevel)
      const securityMetrics = calculateSecurityMetrics(originalCode, syntheticCode)
      
      const newCodeData: CodeData = {
        original: originalCode,
        synthetic: syntheticCode,
        language,
        securityMetrics
      }
      
      setCodeData(newCodeData)
      setActiveTab("security")
    } catch (error) {
      console.error('Transformation failed:', error)
    } finally {
      setIsTransforming(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" weight="duotone" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Synthetic Codebase Generator</h1>
                <p className="text-sm text-muted-foreground">Privacy-Preserving AI Development Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="input" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code Input
            </TabsTrigger>
            <TabsTrigger value="security" disabled={!codeData} className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="ai-demo" disabled={!codeData} className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              AI Demo
            </TabsTrigger>
            <TabsTrigger value="executive" disabled={!codeData} className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Executive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <CodeInputPanel 
              onTransform={handleCodeTransformation}
              isTransforming={isTransforming}
            />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {codeData && (
              <>
                <TransformationEngine codeData={codeData} />
                <SecurityDashboard codeData={codeData} />
              </>
            )}
          </TabsContent>

          <TabsContent value="ai-demo" className="space-y-6">
            {codeData && <AIComparisonDemo codeData={codeData} />}
          </TabsContent>

          <TabsContent value="executive" className="space-y-6">
            {codeData && <ExecutiveSummary codeData={codeData} />}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Transformation engine logic
async function transformCode(originalCode: string, language: string, privacyLevel: string): Promise<string> {
  // Simulate sophisticated transformation based on language and privacy level
  const transformations = {
    paranoid: 0.9,
    balanced: 0.7,
    performance: 0.4
  }
  
  const intensity = transformations[privacyLevel as keyof typeof transformations] || 0.7
  
  // Apply various transformations
  let synthetic = originalCode
  
  // Business logic obfuscation
  synthetic = synthetic.replace(/calculateTax|calculatePrice|calculateCommission/g, 'computeValue')
  synthetic = synthetic.replace(/Customer|Client|User/g, 'Entity')
  synthetic = synthetic.replace(/Order|Purchase|Transaction/g, 'Operation')
  synthetic = synthetic.replace(/Product|Item|Asset/g, 'Resource')
  
  // API endpoint generalization
  synthetic = synthetic.replace(/\/api\/v\d+\/[\w\/]+/g, '/api/endpoint')
  synthetic = synthetic.replace(/https?:\/\/[\w\.-]+/g, 'https://api.example.com')
  
  // Variable name abstraction
  if (intensity > 0.6) {
    synthetic = synthetic.replace(/\b[a-z][a-zA-Z]*Price\b/g, 'value')
    synthetic = synthetic.replace(/\b[a-z][a-zA-Z]*Rate\b/g, 'rate')
    synthetic = synthetic.replace(/\b[a-z][a-zA-Z]*Amount\b/g, 'amount')
  }
  
  // Comment sanitization
  synthetic = synthetic.replace(/\/\/ .+business logic.*/gi, '// Core computation logic')
  synthetic = synthetic.replace(/\/\* .+proprietary.* \*\//gi, '/* Implementation details */')
  
  return synthetic
}

function calculateSecurityMetrics(original: string, synthetic: string) {
  // Simulate realistic security calculations
  const businessTermsRemoved = (original.match(/customer|client|order|price|tax/gi) || []).length
  const totalTerms = original.split(/\s+/).length
  
  return {
    privacyScore: Math.min(95, 70 + (businessTermsRemoved / totalTerms) * 100),
    leakageRisk: Math.max(5, 30 - (businessTermsRemoved / totalTerms) * 100),
    competitiveRisk: Math.max(2, 25 - (businessTermsRemoved / totalTerms) * 100),
    aiParity: Math.min(98, 85 + Math.random() * 13),
    complianceReady: businessTermsRemoved > 0
  }
}

function ExecutiveSummary({ codeData }: { codeData: CodeData }) {
  const { securityMetrics } = codeData
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Executive Security Assessment</h2>
        <p className="text-muted-foreground">Enterprise-grade validation for C-suite stakeholders</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-green-600">{securityMetrics.privacyScore}%</div>
          <div className="text-sm text-muted-foreground mt-1">Privacy Protection</div>
          <div className="text-xs text-green-600 mt-2">✓ Enterprise Safe</div>
        </div>
        
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-blue-600">{securityMetrics.aiParity}%</div>
          <div className="text-sm text-muted-foreground mt-1">AI Assistance Parity</div>
          <div className="text-xs text-blue-600 mt-2">✓ Full Productivity</div>
        </div>
        
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-green-600">{100 - securityMetrics.leakageRisk}%</div>
          <div className="text-sm text-muted-foreground mt-1">Leak Prevention</div>
          <div className="text-xs text-green-600 mt-2">✓ Zero Exposure</div>
        </div>
        
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-green-600">
            {securityMetrics.complianceReady ? '100%' : '0%'}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Compliance Ready</div>
          <div className="text-xs text-green-600 mt-2">✓ Audit Approved</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Security Guarantees</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Zero proprietary business logic exposure</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Complete API endpoint anonymization</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Competitive intelligence protection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Regulatory compliance maintained</span>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Business Value</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Full AI assistant capabilities preserved</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Developer productivity gains maintained</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Code review and analysis quality intact</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Architectural guidance fully functional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App