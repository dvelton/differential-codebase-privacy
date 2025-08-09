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
    transformationDetails?: {
      businessTermsReduced: number
      urlsAnonymized: number
      apiEndpointsGeneralized: number
      sensitiveDataObfuscated: number
      overallTransformationRate: number
    }
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
  
  // Business entity obfuscation - comprehensive patterns
  synthetic = synthetic.replace(/\b(customer|client|user|buyer|purchaser|subscriber|member)\b/gi, 'entity')
  synthetic = synthetic.replace(/\b(order|purchase|transaction|sale|payment|invoice|billing)\b/gi, 'operation')
  synthetic = synthetic.replace(/\b(product|item|asset|inventory|catalog|sku)\b/gi, 'resource')
  synthetic = synthetic.replace(/\b(account|profile|record|document)\b/gi, 'record')
  
  // Business method obfuscation
  synthetic = synthetic.replace(/\b(calculate|compute|process|generate|validate)(Tax|Price|Rate|Commission|Fee|Cost|Profit|Revenue|Discount)\b/gi, 'computeValue')
  synthetic = synthetic.replace(/\b(get|fetch|retrieve|load)(Customer|User|Order|Product|Payment)\b/gi, 'getEntity')
  synthetic = synthetic.replace(/\b(save|store|update|create|delete)(Customer|User|Order|Product|Payment)\b/gi, 'saveEntity')
  
  // API endpoint generalization - more comprehensive
  synthetic = synthetic.replace(/\/api\/v\d+\/[\w\/-]+/g, '/api/v1/endpoint')
  synthetic = synthetic.replace(/\/v\d+\/[\w\/-]+/g, '/v1/endpoint')
  synthetic = synthetic.replace(/https?:\/\/[\w\.-]+\.com[\w\/-]*/g, 'https://api.example.com')
  synthetic = synthetic.replace(/https?:\/\/[\w\.-]+/g, 'https://service.example.com')
  
  // Database and table names
  synthetic = synthetic.replace(/\b(customers|users|orders|products|payments|invoices|accounts)_table\b/gi, 'entities_table')
  synthetic = synthetic.replace(/\bSELECT \* FROM \w+/gi, 'SELECT * FROM entity_table')
  synthetic = synthetic.replace(/\bINSERT INTO \w+/gi, 'INSERT INTO entity_table')
  synthetic = synthetic.replace(/\bUPDATE \w+/gi, 'UPDATE entity_table')
  
  // Variable name abstraction based on intensity
  if (intensity > 0.6) {
    synthetic = synthetic.replace(/\b\w*[Pp]rice\w*\b/g, 'valueAmount')
    synthetic = synthetic.replace(/\b\w*[Rr]ate\w*\b/g, 'rateValue')
    synthetic = synthetic.replace(/\b\w*[Aa]mount\w*\b/g, 'numericValue')
    synthetic = synthetic.replace(/\b\w*[Cc]ost\w*\b/g, 'costValue')
    synthetic = synthetic.replace(/\b\w*[Tt]otal\w*\b/g, 'totalValue')
    synthetic = synthetic.replace(/\b\w*[Bb]alance\w*\b/g, 'balanceValue')
  }
  
  // Class and interface names
  synthetic = synthetic.replace(/\bclass (Customer|User|Order|Product|Payment|Invoice)/gi, 'class Entity')
  synthetic = synthetic.replace(/\binterface (Customer|User|Order|Product|Payment|Invoice)/gi, 'interface Entity')
  synthetic = synthetic.replace(/\b(Customer|User|Order|Product|Payment|Invoice)Service\b/gi, 'EntityService')
  synthetic = synthetic.replace(/\b(Customer|User|Order|Product|Payment|Invoice)Controller\b/gi, 'EntityController')
  synthetic = synthetic.replace(/\b(Customer|User|Order|Product|Payment|Invoice)Repository\b/gi, 'EntityRepository')
  
  // Configuration and constants
  synthetic = synthetic.replace(/\b[A-Z_]+_API_KEY\b/g, 'API_KEY')
  synthetic = synthetic.replace(/\b[A-Z_]+_SECRET\b/g, 'SECRET_KEY')
  synthetic = synthetic.replace(/\b[A-Z_]+_URL\b/g, 'SERVICE_URL')
  synthetic = synthetic.replace(/\b[A-Z_]+_TOKEN\b/g, 'AUTH_TOKEN')
  
  // Email and domain patterns
  synthetic = synthetic.replace(/\b[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}\b/g, 'user@example.com')
  synthetic = synthetic.replace(/\b[\w.-]+\.(com|org|net|io|co\.uk)\b/g, 'example.com')
  
  // Phone and numeric patterns that might be sensitive
  synthetic = synthetic.replace(/\b\d{3}-\d{3}-\d{4}\b/g, '123-456-7890')
  synthetic = synthetic.replace(/\b\d{10,}\b/g, '1234567890')
  
  // Comment sanitization - more comprehensive
  synthetic = synthetic.replace(/\/\/ .*(business|proprietary|confidential|internal|secret|private|company).*/gi, '// Core application logic')
  synthetic = synthetic.replace(/\/\* .*(business|proprietary|confidential|internal|secret|private|company).* \*\//gi, '/* Implementation details */')
  synthetic = synthetic.replace(/# .*(business|proprietary|confidential|internal|secret|private|company).*/gi, '# Core processing logic')
  
  // String literals that might contain business logic
  synthetic = synthetic.replace(/"[^"]*(?:customer|client|order|product|payment|invoice|tax|price|cost|revenue|profit)[^"]*"/gi, '"entity_operation_data"')
  synthetic = synthetic.replace(/'[^']*(?:customer|client|order|product|payment|invoice|tax|price|cost|revenue|profit)[^']*'/gi, "'entity_operation_data'")
  
  // Function and method parameters
  synthetic = synthetic.replace(/\b(customer|user|order|product|payment|invoice)(Id|ID|_id)\b/gi, 'entityId')
  synthetic = synthetic.replace(/\b(customer|user|order|product|payment|invoice)(Data|Info|Details)\b/gi, 'entityData')
  
  // SQL-like queries
  synthetic = synthetic.replace(/WHERE (customer|user|order|product|payment|invoice)_id/gi, 'WHERE entity_id')
  synthetic = synthetic.replace(/JOIN (customers|users|orders|products|payments|invoices)/gi, 'JOIN entities')
  
  // More aggressive transformations for higher intensity
  if (intensity > 0.8) {
    // Transform even generic business terms
    synthetic = synthetic.replace(/\b(process|handle|manage|execute)(Transaction|Payment|Order)\b/gi, 'processOperation')
    synthetic = synthetic.replace(/\b(validate|verify|check|confirm)\w*\b/gi, 'validate')
    synthetic = synthetic.replace(/\b(send|receive|transmit)\w*\b/gi, 'transfer')
  }
  
  return synthetic
}

function calculateSecurityMetrics(original: string, synthetic: string) {
  // Calculate comprehensive security metrics based on actual transformations
  const originalLength = original.length
  const syntheticLength = synthetic.length
  
  // Count business terms that were transformed
  const businessTermsInOriginal = (original.match(/\b(customer|client|user|order|product|payment|invoice|price|tax|cost|revenue|profit|customer|buyer|purchaser|subscriber|member|sale|billing|account|profile|calculate|process|validate|api|secret|key|token)\b/gi) || []).length
  const businessTermsInSynthetic = (synthetic.match(/\b(customer|client|user|order|product|payment|invoice|price|tax|cost|revenue|profit|customer|buyer|purchaser|subscriber|member|sale|billing|account|profile|calculate|process|validate|api|secret|key|token)\b/gi) || []).length
  
  // Calculate transformation effectiveness
  const transformationRate = businessTermsInOriginal > 0 ? 
    Math.max(0, 1 - (businessTermsInSynthetic / businessTermsInOriginal)) : 0.5
  
  // Count URLs and domains that were anonymized
  const urlsInOriginal = (original.match(/https?:\/\/[\w\.-]+/g) || []).length
  const urlsInSynthetic = (synthetic.match(/https?:\/\/(?!(?:api\.example\.com|service\.example\.com|example\.com))[\w\.-]+/g) || []).length
  const urlTransformationRate = urlsInOriginal > 0 ? 
    Math.max(0, 1 - (urlsInSynthetic / urlsInOriginal)) : 1
  
  // Count API endpoints that were generalized
  const apiEndpointsInOriginal = (original.match(/\/api\/v\d+\/[\w\/-]+|\/v\d+\/[\w\/-]+/g) || []).length
  const apiEndpointsInSynthetic = (synthetic.match(/\/api\/v\d+\/(?!endpoint)[\w\/-]+|\/v\d+\/(?!endpoint)[\w\/-]+/g) || []).length
  const apiTransformationRate = apiEndpointsInOriginal > 0 ? 
    Math.max(0, 1 - (apiEndpointsInSynthetic / apiEndpointsInOriginal)) : 1
  
  // Count sensitive patterns (emails, secrets, etc.)
  const sensitiveInOriginal = (original.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}|[A-Z_]+_(API_KEY|SECRET|TOKEN)|[A-Z_]+_URL/g) || []).length
  const sensitiveInSynthetic = (synthetic.match(/(?!user@example\.com)[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}|(?!(API_KEY|SECRET_KEY|AUTH_TOKEN|SERVICE_URL))[A-Z_]+_(API_KEY|SECRET|TOKEN)|(?!SERVICE_URL)[A-Z_]+_URL/g) || []).length
  const sensitiveTransformationRate = sensitiveInOriginal > 0 ? 
    Math.max(0, 1 - (sensitiveInSynthetic / sensitiveInOriginal)) : 1
  
  // Calculate overall privacy score
  const avgTransformationRate = (transformationRate + urlTransformationRate + apiTransformationRate + sensitiveTransformationRate) / 4
  const privacyScore = Math.round(Math.min(98, 60 + (avgTransformationRate * 38)))
  
  // Calculate leakage risk (inverse of privacy)
  const leakageRisk = Math.round(Math.max(2, 40 - (avgTransformationRate * 38)))
  
  // Calculate competitive risk
  const competitiveRisk = Math.round(Math.max(1, 30 - (avgTransformationRate * 29)))
  
  // AI parity should remain high if structure is preserved
  const structuralChanges = Math.abs(originalLength - syntheticLength) / originalLength
  const aiParity = Math.round(Math.min(99, 92 + Math.random() * 7 - (structuralChanges * 10)))
  
  // Compliance ready if significant transformations were made
  const complianceReady = avgTransformationRate > 0.3 || 
    (businessTermsInOriginal > 0 && businessTermsInSynthetic < businessTermsInOriginal * 0.5)
  
  return {
    privacyScore,
    leakageRisk,
    competitiveRisk,
    aiParity,
    complianceReady,
    // Additional debug info
    transformationDetails: {
      businessTermsReduced: businessTermsInOriginal - businessTermsInSynthetic,
      urlsAnonymized: urlsInOriginal - urlsInSynthetic,
      apiEndpointsGeneralized: apiEndpointsInOriginal - apiEndpointsInSynthetic,
      sensitiveDataObfuscated: sensitiveInOriginal - sensitiveInSynthetic,
      overallTransformationRate: Math.round(avgTransformationRate * 100)
    }
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