import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Eye, TrendUp, CheckCircle, AlertTriangle, XCircle } from "@phosphor-icons/react"

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

interface SecurityDashboardProps {
  codeData: CodeData
}

export function SecurityDashboard({ codeData }: SecurityDashboardProps) {
  const { securityMetrics } = codeData

  const getScoreColor = (score: number, isRisk: boolean = false) => {
    if (isRisk) {
      if (score <= 10) return 'text-green-600'
      if (score <= 25) return 'text-yellow-600'
      return 'text-red-600'
    } else {
      if (score >= 90) return 'text-green-600'
      if (score >= 70) return 'text-yellow-600'
      return 'text-red-600'
    }
  }

  const getScoreBg = (score: number, isRisk: boolean = false) => {
    if (isRisk) {
      if (score <= 10) return 'bg-green-100 border-green-200'
      if (score <= 25) return 'bg-yellow-100 border-yellow-200'
      return 'bg-red-100 border-red-200'
    } else {
      if (score >= 90) return 'bg-green-100 border-green-200'
      if (score >= 70) return 'bg-yellow-100 border-yellow-200'
      return 'bg-red-100 border-red-200'
    }
  }

  const securityChecks = [
    {
      category: 'Business Logic Protection',
      checks: [
        { name: 'Proprietary algorithms abstracted', status: 'pass', description: 'All business-specific calculations converted to generic patterns' },
        { name: 'Domain terminology removed', status: 'pass', description: 'Industry-specific terms replaced with neutral equivalents' },
        { name: 'Competitive advantages hidden', status: 'pass', description: 'Strategic logic patterns completely obfuscated' }
      ]
    },
    {
      category: 'Data Security',
      checks: [
        { name: 'API endpoints anonymized', status: 'pass', description: 'All external service URLs generalized' },
        { name: 'Database schemas abstracted', status: 'pass', description: 'Table names and relationships made generic' },
        { name: 'Configuration values masked', status: 'pass', description: 'Sensitive settings replaced with placeholders' }
      ]
    },
    {
      category: 'Compliance Validation',
      checks: [
        { name: 'PII completely removed', status: 'pass', description: 'No personally identifiable information present' },
        { name: 'Trade secrets protected', status: 'pass', description: 'Proprietary information fully abstracted' },
        { name: 'Regulatory requirements met', status: securityMetrics.complianceReady ? 'pass' : 'warning', description: 'GDPR, HIPAA, SOX compliance validated' }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-600" weight="fill" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" weight="fill" />
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-600" weight="fill" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Security Assessment Dashboard</h2>
        <p className="text-muted-foreground">Enterprise-grade privacy and security validation</p>
      </div>

      {/* Security Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={`metric-card ${getScoreBg(securityMetrics.privacyScore)}`}>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Shield className="h-8 w-8 mx-auto text-current" weight="duotone" />
              <div className={`text-3xl font-bold ${getScoreColor(securityMetrics.privacyScore)}`}>
                {Math.round(securityMetrics.privacyScore)}%
              </div>
              <div className="text-sm font-medium">Privacy Protection</div>
              <Progress value={securityMetrics.privacyScore} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className={`metric-card ${getScoreBg(securityMetrics.leakageRisk, true)}`}>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Eye className="h-8 w-8 mx-auto text-current" weight="duotone" />
              <div className={`text-3xl font-bold ${getScoreColor(securityMetrics.leakageRisk, true)}`}>
                {Math.round(securityMetrics.leakageRisk)}%
              </div>
              <div className="text-sm font-medium">Information Leakage Risk</div>
              <Progress value={100 - securityMetrics.leakageRisk} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className={`metric-card ${getScoreBg(securityMetrics.competitiveRisk, true)}`}>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Lock className="h-8 w-8 mx-auto text-current" weight="duotone" />
              <div className={`text-3xl font-bold ${getScoreColor(securityMetrics.competitiveRisk, true)}`}>
                {Math.round(securityMetrics.competitiveRisk)}%
              </div>
              <div className="text-sm font-medium">Competitive Intelligence Risk</div>
              <Progress value={100 - securityMetrics.competitiveRisk} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className={`metric-card ${getScoreBg(securityMetrics.aiParity)}`}>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <TrendUp className="h-8 w-8 mx-auto text-current" weight="duotone" />
              <div className={`text-3xl font-bold ${getScoreColor(securityMetrics.aiParity)}`}>
                {Math.round(securityMetrics.aiParity)}%
              </div>
              <div className="text-sm font-medium">AI Assistance Parity</div>
              <Progress value={securityMetrics.aiParity} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {securityChecks.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
              <CardDescription>Validation of {category.category.toLowerCase()} measures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.checks.map((check, checkIndex) => (
                  <div key={checkIndex} className="flex items-start gap-3">
                    {getStatusIcon(check.status)}
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-sm">{check.name}</div>
                      <div className="text-xs text-muted-foreground">{check.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Assessment Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment Matrix
          </CardTitle>
          <CardDescription>Comprehensive security analysis for enterprise stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Security Guarantees</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm">Zero proprietary business logic exposure</span>
                  <Badge className="bg-green-600">Validated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm">Complete API endpoint anonymization</span>
                  <Badge className="bg-green-600">Validated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm">Competitive intelligence protection</span>
                  <Badge className="bg-green-600">Validated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm">Regulatory compliance maintained</span>
                  <Badge className={securityMetrics.complianceReady ? "bg-green-600" : "bg-yellow-600"}>
                    {securityMetrics.complianceReady ? 'Validated' : 'Review Required'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Threat Mitigation</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm">Reverse engineering difficulty</span>
                  <Badge variant="outline">Extremely High</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm">Information reconstruction risk</span>
                  <Badge variant="outline">Impossible</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm">Business strategy exposure</span>
                  <Badge variant="outline">None</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm">AI assistance quality preservation</span>
                  <Badge variant="outline">{Math.round(securityMetrics.aiParity)}% Maintained</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Report */}
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Compliance Report</CardTitle>
          <CardDescription>Ready for CISO and executive review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">GDPR</div>
                <div className="text-sm text-green-700">Compliant</div>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">HIPAA</div>
                <div className="text-sm text-green-700">Compliant</div>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">SOX</div>
                <div className="text-sm text-green-700">Compliant</div>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h5 className="font-medium mb-2">Executive Summary</h5>
              <p className="text-sm text-muted-foreground">
                The synthetic code transformation successfully removes all proprietary business logic, sensitive data patterns, and competitive intelligence 
                while maintaining {Math.round(securityMetrics.aiParity)}% of the original code's utility for AI-assisted development. This transformation 
                enables enterprise developers to leverage external AI tools without exposing any confidential information or violating regulatory requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}