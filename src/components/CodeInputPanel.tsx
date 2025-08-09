import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Code, Play, FileText } from "@phosphor-icons/react"
import { toast } from 'sonner'

interface CodeInputPanelProps {
  onTransform: (code: string, language: string, privacyLevel: string) => Promise<void>
  isTransforming: boolean
}

const SAMPLE_CODES = {
  financial: {
    language: 'javascript',
    title: 'Financial Trading Algorithm',
    description: 'Proprietary trading logic with risk calculations',
    code: `// TradingEngine.js - Proprietary Algorithm
class TradingEngine {
  constructor(apiKey, secretKey) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.riskThreshold = 0.15; // Max 15% portfolio risk
  }

  async calculateTradingSignal(symbol, marketData) {
    // Proprietary momentum calculation
    const momentum = this.calculateMomentumScore(marketData);
    const volatility = this.calculateVolatility(marketData);
    const sentiment = await this.getSentimentScore(symbol);
    
    // Secret sauce: weighted composite score
    const signal = (momentum * 0.4) + (sentiment * 0.35) + (volatility * 0.25);
    
    return this.generateTradeRecommendation(signal, symbol);
  }

  calculatePositionSize(accountBalance, riskLevel) {
    // Kelly Criterion variation - proprietary formula
    const kellyFraction = (this.winRate * this.avgWin - this.lossRate * this.avgLoss) / this.avgWin;
    const adjustedKelly = kellyFraction * riskLevel * this.proprietaryRiskMultiplier;
    
    return Math.min(accountBalance * adjustedKelly, accountBalance * this.riskThreshold);
  }

  async executeTrade(symbol, quantity, side) {
    const orderData = {
      symbol: symbol,
      quantity: quantity,
      side: side,
      type: 'MARKET',
      timestamp: Date.now()
    };

    return await this.sendOrderToExchange(orderData);
  }
}`
  },
  healthcare: {
    language: 'python',
    title: 'Healthcare Data Processing',
    description: 'HIPAA-sensitive patient data analysis',
    code: `# PatientAnalyzer.py - HIPAA Sensitive Module
import pandas as pd
from datetime import datetime
import hashlib

class PatientDataProcessor:
    def __init__(self, hipaa_key):
        self.hipaa_encryption_key = hipaa_key
        self.approved_researchers = ['dr.smith@hospital.com', 'researcher@medcenter.org']
        
    def process_patient_cohort(self, patient_records):
        """Process patient data for clinical research"""
        anonymized_data = []
        
        for patient in patient_records:
            # Remove PII while preserving medical relevance
            processed_record = {
                'patient_hash': self.hash_patient_id(patient['ssn']),
                'age_group': self.categorize_age(patient['birth_date']),
                'diagnosis_codes': patient['icd10_codes'],
                'treatment_response': patient['outcome_score'],
                'comorbidity_count': len(patient['secondary_conditions']),
                'medication_adherence': patient['compliance_rate']
            }
            
            # Apply proprietary risk stratification
            processed_record['risk_score'] = self.calculate_patient_risk(processed_record)
            anonymized_data.append(processed_record)
            
        return self.generate_cohort_insights(anonymized_data)
    
    def calculate_patient_risk(self, patient_data):
        """Proprietary risk calculation algorithm"""
        base_risk = patient_data['age_group'] * 0.3
        comorbidity_factor = patient_data['comorbidity_count'] * 0.25
        adherence_factor = (1 - patient_data['medication_adherence']) * 0.45
        
        # Hospital's proprietary weighting system
        composite_risk = base_risk + comorbidity_factor + adherence_factor
        
        return min(composite_risk, 1.0)  # Cap at 100% risk
    
    def generate_treatment_recommendations(self, risk_score, diagnosis):
        """Generate personalized treatment protocols"""
        if risk_score > 0.8:
            return self.high_risk_protocols[diagnosis]
        elif risk_score > 0.5:
            return self.medium_risk_protocols[diagnosis]
        else:
            return self.standard_protocols[diagnosis]`
  },
  ecommerce: {
    language: 'java',
    title: 'E-commerce Pricing Engine',
    description: 'Competitive pricing algorithms and business rules',
    code: `// PricingEngine.java - Competitive Intelligence Module
public class PricingEngine {
    private final String COMPETITOR_API_KEY = "sk-comp-analytics-2024";
    private final double PROFIT_MARGIN_TARGET = 0.28; // 28% target margin
    private final Map<String, Double> CATEGORY_MULTIPLIERS;
    
    public PricingEngine() {
        // Proprietary category-specific pricing multipliers
        this.CATEGORY_MULTIPLIERS = Map.of(
            "electronics", 1.15,
            "clothing", 1.45,
            "books", 1.08,
            "home_goods", 1.22
        );
    }
    
    public PriceRecommendation calculateOptimalPrice(Product product) {
        // Gather competitive intelligence
        List<CompetitorPrice> competitorPrices = fetchCompetitorPrices(product.getSku());
        double marketMedianPrice = calculateMarketMedian(competitorPrices);
        
        // Apply proprietary pricing algorithm
        double demandElasticity = calculateDemandElasticity(product);
        double inventoryPressure = calculateInventoryPressure(product);
        double seasonalMultiplier = getSeasonalMultiplier(product.getCategory());
        
        // Secret sauce: dynamic pricing formula
        double basePrice = product.getCost() * (1 + PROFIT_MARGIN_TARGET);
        double marketAdjustment = marketMedianPrice * 0.95; // Slightly undercut
        double demandAdjustment = basePrice * (1 + demandElasticity * 0.3);
        double inventoryAdjustment = basePrice * (1 - inventoryPressure * 0.2);
        
        double finalPrice = (demandAdjustment + marketAdjustment + inventoryAdjustment) / 3;
        finalPrice *= seasonalMultiplier;
        finalPrice *= CATEGORY_MULTIPLIERS.get(product.getCategory());
        
        return new PriceRecommendation(finalPrice, calculateConfidenceScore(product));
    }
    
    private double calculateDemandElasticity(Product product) {
        // Proprietary demand analysis based on historical data
        double historicalSales = product.getSalesHistory().stream()
            .mapToDouble(Sale::getQuantity)
            .average()
            .orElse(0.0);
            
        double priceHistory = product.getPriceHistory().stream()
            .mapToDouble(PricePoint::getPrice)
            .average()
            .orElse(0.0);
            
        // Company's secret elasticity calculation
        return Math.log(historicalSales) / Math.log(priceHistory) * -1;
    }
}`
  }
}

export function CodeInputPanel({ onTransform, isTransforming }: CodeInputPanelProps) {
  const [inputCode, setInputCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [privacyLevel, setPrivacyLevel] = useState('balanced')
  const [inputMethod, setInputMethod] = useState<'paste' | 'upload' | 'sample'>('paste')

  const handleTransform = async () => {
    if (!inputCode.trim()) {
      toast.error('Please enter some code to transform')
      return
    }
    
    toast.success('Starting code transformation...')
    await onTransform(inputCode, selectedLanguage, privacyLevel)
  }

  const loadSampleCode = (sampleKey: string) => {
    const sample = SAMPLE_CODES[sampleKey as keyof typeof SAMPLE_CODES]
    setInputCode(sample.code)
    setSelectedLanguage(sample.language)
    setInputMethod('sample')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 100000) { // 100KB limit
        toast.error('File size must be under 100KB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputCode(content)
        setInputMethod('upload')
        
        // Auto-detect language from file extension
        const extension = file.name.split('.').pop()?.toLowerCase()
        if (extension === 'js' || extension === 'jsx') setSelectedLanguage('javascript')
        else if (extension === 'ts' || extension === 'tsx') setSelectedLanguage('typescript')
        else if (extension === 'py') setSelectedLanguage('python')
        else if (extension === 'java') setSelectedLanguage('java')
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Code Input & Configuration</h2>
        <p className="text-muted-foreground">Upload your enterprise codebase for privacy-preserving transformation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>Set transformation parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Programming Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Privacy Level</label>
              <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paranoid">
                    <div className="flex flex-col">
                      <span>Paranoid</span>
                      <span className="text-xs text-muted-foreground">Maximum security</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="balanced">
                    <div className="flex flex-col">
                      <span>Balanced</span>
                      <span className="text-xs text-muted-foreground">Enterprise standard</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="performance">
                    <div className="flex flex-col">
                      <span>Performance</span>
                      <span className="text-xs text-muted-foreground">AI assistance optimized</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleTransform}
              disabled={isTransforming || !inputCode.trim()}
              className="w-full"
              size="lg"
            >
              {isTransforming ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Transforming...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate Synthetic Code
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Code Input Area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Source Code Input</CardTitle>
                  <CardDescription>Paste, upload, or select sample enterprise code</CardDescription>
                </div>
                <Badge variant={inputMethod === 'sample' ? 'default' : 'secondary'}>
                  {inputMethod === 'paste' && 'Manual Input'}
                  {inputMethod === 'upload' && 'File Upload'}
                  {inputMethod === 'sample' && 'Sample Code'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="paste" onValueChange={(value) => setInputMethod(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="paste">Paste Code</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="sample">Samples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="paste" className="mt-4">
                  <Textarea
                    placeholder="Paste your enterprise code here..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="code-editor min-h-[400px] font-mono"
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="mt-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Upload Code File</h3>
                      <p className="text-sm text-muted-foreground">Max size: 100KB</p>
                      <input
                        type="file"
                        accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.cpp,.c,.php"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          <FileText className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </label>
                    </div>
                  </div>
                  {inputCode && (
                    <div className="mt-4">
                      <Textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="code-editor min-h-[300px] font-mono"
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="sample" className="mt-4">
                  <div className="space-y-3 mb-4">
                    {Object.entries(SAMPLE_CODES).map(([key, sample]) => (
                      <Card key={key} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => loadSampleCode(key)}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{sample.title}</h4>
                              <p className="text-sm text-muted-foreground">{sample.description}</p>
                            </div>
                            <Badge variant="outline">{sample.language}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {inputCode && (
                    <Textarea
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="code-editor min-h-[300px] font-mono"
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}