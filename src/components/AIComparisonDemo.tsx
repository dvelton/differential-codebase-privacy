import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Robot, Code, Zap, CheckCircle, TrendUp, MessageSquare } from "@phosphor-icons/react"
import { toast } from 'sonner'

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

interface AIComparisonDemoProps {
  codeData: CodeData
}

interface AIResponse {
  query: string
  originalResponse: string
  syntheticResponse: string
  similarityScore: number
  usefulness: number
}

const AI_TEST_QUERIES = [
  {
    id: 'code-review',
    title: 'Code Review & Bug Detection',
    description: 'Find potential bugs, security issues, and code quality problems',
    query: 'Please review this code for potential bugs, security vulnerabilities, and suggest improvements. Focus on code quality, performance, and best practices.'
  },
  {
    id: 'architecture',
    title: 'Architecture Analysis',
    description: 'Analyze system design and suggest architectural improvements',
    query: 'Analyze the architecture and design patterns in this code. What are the strengths and weaknesses? How could the structure be improved for better maintainability and scalability?'
  },
  {
    id: 'refactoring',
    title: 'Refactoring Recommendations',
    description: 'Suggest code organization and refactoring improvements',
    query: 'How could this code be refactored to be more maintainable, readable, and follow better software engineering practices? Suggest specific improvements and explain the benefits.'
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Identify performance bottlenecks and optimization opportunities',
    query: 'Analyze this code for performance bottlenecks and optimization opportunities. What specific changes would improve execution speed, memory usage, or resource efficiency?'
  },
  {
    id: 'testing',
    title: 'Testing Strategy',
    description: 'Recommend comprehensive testing approaches and test cases',
    query: 'What testing strategy would you recommend for this code? Suggest specific test cases, testing patterns, and approaches to ensure comprehensive coverage and reliability.'
  }
]

export function AIComparisonDemo({ codeData }: AIComparisonDemoProps) {
  const [activeQuery, setActiveQuery] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [aiResponses, setAIResponses] = useState<Record<string, AIResponse>>({})
  const [currentTest, setCurrentTest] = useState<string>('')

  const runAIComparison = async (queryId: string) => {
    const query = AI_TEST_QUERIES.find(q => q.id === queryId)
    if (!query) return

    setIsRunning(true)
    setCurrentTest(queryId)
    
    try {
      toast.info('Running AI analysis on both code versions...')
      
      // Simulate AI API calls with realistic delays
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResponses = generateMockAIResponses(query, codeData)
      
      setAIResponses(prev => ({
        ...prev,
        [queryId]: mockResponses
      }))
      
      toast.success(`AI comparison completed for ${query.title}`)
    } catch (error) {
      toast.error('AI comparison failed')
      console.error('AI comparison error:', error)
    } finally {
      setIsRunning(false)
      setCurrentTest('')
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    toast.info('Running comprehensive AI assistance comparison...')
    
    for (const query of AI_TEST_QUERIES) {
      setCurrentTest(query.id)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockResponses = generateMockAIResponses(query, codeData)
      setAIResponses(prev => ({
        ...prev,
        [query.id]: mockResponses
      }))
    }
    
    setIsRunning(false)
    setCurrentTest('')
    toast.success('All AI comparisons completed successfully!')
  }

  const averageSimilarity = Object.values(aiResponses).reduce((sum, response) => sum + response.similarityScore, 0) / Object.values(aiResponses).length || 0
  const averageUsefulness = Object.values(aiResponses).reduce((sum, response) => sum + response.usefulness, 0) / Object.values(aiResponses).length || 0

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">AI Assistance Equivalence Demo</h2>
        <p className="text-muted-foreground">Proving synthetic code enables identical AI-powered productivity</p>
      </div>

      {/* Overview Metrics */}
      {Object.keys(aiResponses).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="metric-card bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <TrendUp className="h-8 w-8 mx-auto text-blue-600 mb-2" weight="duotone" />
              <div className="text-3xl font-bold text-blue-600">{Math.round(averageSimilarity)}%</div>
              <div className="text-sm font-medium text-blue-700">Response Similarity</div>
              <Progress value={averageSimilarity} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="metric-card bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" weight="duotone" />
              <div className="text-3xl font-bold text-green-600">{Math.round(averageUsefulness)}%</div>
              <div className="text-sm font-medium text-green-700">Usefulness Parity</div>
              <Progress value={averageUsefulness} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="metric-card bg-purple-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto text-purple-600 mb-2" weight="duotone" />
              <div className="text-3xl font-bold text-purple-600">{Object.keys(aiResponses).length}/{AI_TEST_QUERIES.length}</div>
              <div className="text-sm font-medium text-purple-700">Tests Completed</div>
              <Progress value={(Object.keys(aiResponses).length / AI_TEST_QUERIES.length) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Robot className="h-5 w-5" />
            AI Analysis Test Suite
          </CardTitle>
          <CardDescription>Run parallel AI assistance tests on both code versions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={runAllTests} disabled={isRunning} size="lg">
              {isRunning ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run All AI Tests
                </>
              )}
            </Button>
            <div className="text-sm text-muted-foreground">
              Tests the equivalence of AI assistance between original and synthetic code
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {AI_TEST_QUERIES.map((query) => (
              <Card key={query.id} className={`cursor-pointer transition-all ${
                currentTest === query.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
              }`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{query.title}</h4>
                      {aiResponses[query.id] ? (
                        <Badge className="bg-green-600">
                          {Math.round(aiResponses[query.id].similarityScore)}% match
                        </Badge>
                      ) : currentTest === query.id ? (
                        <Badge variant="outline">Running...</Badge>
                      ) : (
                        <Badge variant="secondary">Ready</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{query.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => runAIComparison(query.id)}
                      disabled={isRunning}
                    >
                      {currentTest === query.id ? (
                        <>
                          <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full mr-2" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-3 w-3 mr-2" />
                          Test AI Response
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Response Comparisons */}
      {Object.entries(aiResponses).map(([queryId, response]) => {
        const query = AI_TEST_QUERIES.find(q => q.id === queryId)
        if (!query) return null

        return (
          <Card key={queryId}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{query.title} - AI Response Comparison</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">{Math.round(response.similarityScore)}% Similar</Badge>
                  <Badge className="bg-green-600">{Math.round(response.usefulness)}% Useful</Badge>
                </div>
              </CardTitle>
              <CardDescription>{query.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="side-by-side">
                <TabsList>
                  <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
                  <TabsTrigger value="original">Original Response</TabsTrigger>
                  <TabsTrigger value="synthetic">Synthetic Response</TabsTrigger>
                </TabsList>
                
                <TabsContent value="side-by-side" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4 text-orange-500" />
                        <span className="font-medium text-sm">AI Response to Original Code</span>
                      </div>
                      <Textarea
                        value={response.originalResponse}
                        readOnly
                        className="min-h-[300px] text-sm bg-orange-50 border-orange-200"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-sm">AI Response to Synthetic Code</span>
                      </div>
                      <Textarea
                        value={response.syntheticResponse}
                        readOnly
                        className="min-h-[300px] text-sm bg-green-50 border-green-200"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="original" className="mt-4">
                  <Textarea
                    value={response.originalResponse}
                    readOnly
                    className="min-h-[400px] text-sm bg-orange-50 border-orange-200"
                  />
                </TabsContent>
                
                <TabsContent value="synthetic" className="mt-4">
                  <Textarea
                    value={response.syntheticResponse}
                    readOnly
                    className="min-h-[400px] text-sm bg-green-50 border-green-200"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function generateMockAIResponses(query: any, codeData: CodeData): AIResponse {
  const responses = {
    'code-review': {
      original: `## Code Review Analysis

**Potential Issues Found:**
1. **Security Concern**: The API key and secret key are stored in plain text in the constructor. Consider using environment variables or a secure key management system.
2. **Error Handling**: The \`getSentimentScore\` and \`sendOrderToExchange\` methods lack proper error handling for network failures.
3. **Magic Numbers**: The risk threshold (0.15) and weighted coefficients (0.4, 0.35, 0.25) should be configurable constants.
4. **Business Logic Exposure**: The proprietary trading algorithm logic is clearly visible and could be reverse-engineered.

**Recommendations:**
- Implement proper error handling with try-catch blocks
- Use configuration files for trading parameters
- Add input validation for all methods
- Consider adding logging for audit purposes
- Implement rate limiting for API calls`,
      synthetic: `## Code Review Analysis

**Potential Issues Found:**
1. **Security Concern**: The API credentials are stored in plain text in the constructor. Consider using environment variables or a secure key management system.
2. **Error Handling**: The \`getAnalysisScore\` and \`sendRequestToEndpoint\` methods lack proper error handling for network failures.
3. **Magic Numbers**: The threshold value (0.15) and weighted coefficients (0.4, 0.35, 0.25) should be configurable constants.
4. **Code Structure**: The calculation logic could benefit from better abstraction and modularity.

**Recommendations:**
- Implement proper error handling with try-catch blocks
- Use configuration files for calculation parameters
- Add input validation for all methods
- Consider adding logging for audit purposes
- Implement rate limiting for API calls`
    },
    'architecture': {
      original: `## Architecture Analysis

**Current Design Strengths:**
- Clear separation of concerns with distinct methods for different calculations
- Object-oriented approach with encapsulated trading logic
- Reasonable abstraction level for a trading engine

**Areas for Improvement:**
1. **Single Responsibility**: The TradingEngine class handles too many responsibilities (signal calculation, position sizing, order execution)
2. **Dependency Injection**: Hard-coded dependencies make testing and configuration difficult
3. **Strategy Pattern**: The proprietary algorithm could benefit from a strategy pattern for different trading approaches

**Recommended Architecture:**
- Split into separate services: SignalCalculator, PositionSizer, OrderExecutor
- Implement interfaces for external dependencies (market data, sentiment analysis)
- Add a TradingStrategy interface to support multiple algorithms
- Consider event-driven architecture for real-time trading`,
      synthetic: `## Architecture Analysis

**Current Design Strengths:**
- Clear separation of concerns with distinct methods for different calculations
- Object-oriented approach with encapsulated business logic
- Reasonable abstraction level for a processing engine

**Areas for Improvement:**
1. **Single Responsibility**: The main class handles too many responsibilities (analysis, calculations, execution)
2. **Dependency Injection**: Hard-coded dependencies make testing and configuration difficult
3. **Strategy Pattern**: The calculation logic could benefit from a strategy pattern for different approaches

**Recommended Architecture:**
- Split into separate services: AnalysisCalculator, ValueProcessor, RequestExecutor
- Implement interfaces for external dependencies (data sources, analysis services)
- Add a ProcessingStrategy interface to support multiple algorithms
- Consider event-driven architecture for real-time processing`
    },
    'refactoring': {
      original: `## Refactoring Recommendations

**Priority 1 - Extract Configuration:**
\`\`\`javascript
class TradingConfig {
  static RISK_THRESHOLD = 0.15;
  static MOMENTUM_WEIGHT = 0.4;
  static SENTIMENT_WEIGHT = 0.35;
  static VOLATILITY_WEIGHT = 0.25;
}
\`\`\`

**Priority 2 - Separate Concerns:**
- Extract \`SignalCalculator\` class for trading signal logic
- Create \`RiskManager\` for position sizing
- Implement \`OrderManager\` for trade execution

**Priority 3 - Improve Error Handling:**
\`\`\`javascript
async calculateTradingSignal(symbol, marketData) {
  try {
    const momentum = await this.calculateMomentumScore(marketData);
    // ... rest of calculation
  } catch (error) {
    this.logger.error(\`Signal calculation failed: \${error.message}\`);
    throw new TradingSignalError(\`Failed to calculate signal for \${symbol}\`);
  }
}
\`\`\``,
      synthetic: `## Refactoring Recommendations

**Priority 1 - Extract Configuration:**
\`\`\`javascript
class ProcessingConfig {
  static THRESHOLD_VALUE = 0.15;
  static PRIMARY_WEIGHT = 0.4;
  static SECONDARY_WEIGHT = 0.35;
  static TERTIARY_WEIGHT = 0.25;
}
\`\`\`

**Priority 2 - Separate Concerns:**
- Extract \`AnalysisCalculator\` class for calculation logic
- Create \`ValueManager\` for sizing calculations
- Implement \`RequestManager\` for execution

**Priority 3 - Improve Error Handling:**
\`\`\`javascript
async calculateAnalysisValue(identifier, data) {
  try {
    const analysis = await this.calculateAnalysisScore(data);
    // ... rest of calculation
  } catch (error) {
    this.logger.error(\`Analysis calculation failed: \${error.message}\`);
    throw new AnalysisError(\`Failed to calculate value for \${identifier}\`);
  }
}
\`\`\``
    },
    'performance': {
      original: `## Performance Optimization Analysis

**Current Bottlenecks:**
1. **Synchronous Calculations**: Multiple sequential API calls in \`calculateTradingSignal\`
2. **Repeated Calculations**: Kelly fraction calculated for every position size request
3. **No Caching**: Sentiment scores and market data fetched repeatedly

**Optimization Strategies:**
1. **Parallel Processing**: Use Promise.all for concurrent API calls
\`\`\`javascript
const [momentum, sentiment, volatility] = await Promise.all([
  this.calculateMomentumScore(marketData),
  this.getSentimentScore(symbol),
  this.calculateVolatility(marketData)
]);
\`\`\`

2. **Caching Layer**: Implement Redis cache for sentiment scores and market data
3. **Memoization**: Cache Kelly fraction calculations based on account state
4. **Connection Pooling**: Reuse HTTP connections for external API calls

**Expected Performance Gains:**
- 60-70% reduction in API response time
- 40% improvement in calculation throughput`,
      synthetic: `## Performance Optimization Analysis

**Current Bottlenecks:**
1. **Synchronous Calculations**: Multiple sequential API calls in \`calculateAnalysisValue\`
2. **Repeated Calculations**: Value calculations performed for every request
3. **No Caching**: Analysis scores and data fetched repeatedly

**Optimization Strategies:**
1. **Parallel Processing**: Use Promise.all for concurrent API calls
\`\`\`javascript
const [analysis, score, variance] = await Promise.all([
  this.calculateAnalysisScore(data),
  this.getScoreValue(identifier),
  this.calculateVariance(data)
]);
\`\`\`

2. **Caching Layer**: Implement Redis cache for scores and data
3. **Memoization**: Cache calculation results based on input state
4. **Connection Pooling**: Reuse HTTP connections for external API calls

**Expected Performance Gains:**
- 60-70% reduction in API response time
- 40% improvement in calculation throughput`
    },
    'testing': {
      original: `## Testing Strategy Recommendations

**Unit Testing Approach:**
1. **Mock External Dependencies**: Create mocks for sentiment API and order execution
2. **Test Edge Cases**: Zero/negative market data, API failures, network timeouts
3. **Validate Business Logic**: Ensure trading signal calculations are mathematically correct

**Test Cases to Implement:**
\`\`\`javascript
describe('TradingEngine', () => {
  test('should calculate valid trading signal with positive sentiment', () => {
    // Test with bullish market conditions
  });
  
  test('should limit position size based on risk threshold', () => {
    // Verify Kelly criterion implementation
  });
  
  test('should handle API failures gracefully', () => {
    // Test error scenarios
  });
});
\`\`\`

**Integration Testing:**
- Test against sandbox trading environment
- Validate order execution flow
- Test risk management limits

**Load Testing:**
- Simulate high-frequency trading scenarios
- Test concurrent order processing
- Validate system performance under load`,
      synthetic: `## Testing Strategy Recommendations

**Unit Testing Approach:**
1. **Mock External Dependencies**: Create mocks for analysis API and request execution
2. **Test Edge Cases**: Zero/negative data, API failures, network timeouts
3. **Validate Calculation Logic**: Ensure analysis calculations are mathematically correct

**Test Cases to Implement:**
\`\`\`javascript
describe('ProcessingEngine', () => {
  test('should calculate valid analysis value with positive conditions', () => {
    // Test with favorable data conditions
  });
  
  test('should limit processing size based on threshold', () => {
    // Verify calculation implementation
  });
  
  test('should handle API failures gracefully', () => {
    // Test error scenarios
  });
});
\`\`\`

**Integration Testing:**
- Test against sandbox environment
- Validate request execution flow
- Test processing limits

**Load Testing:**
- Simulate high-frequency processing scenarios
- Test concurrent request processing
- Validate system performance under load`
    }
  }

  const baseResponse = responses[query.id as keyof typeof responses] || responses['code-review']
  const similarityScore = 92 + Math.random() * 6 // 92-98% similarity
  const usefulness = 88 + Math.random() * 10 // 88-98% usefulness

  return {
    query: query.query,
    originalResponse: baseResponse.original,
    syntheticResponse: baseResponse.synthetic,
    similarityScore,
    usefulness
  }
}