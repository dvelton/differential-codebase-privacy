# Privacy-Preserving Synthetic Codebase Generator

A React/TypeScript application that transforms enterprise codebases into synthetic versions that protect proprietary IP while maintaining full AI assistance capabilities.

**Experience Qualities**:
1. **Professional** - Enterprise-grade interface that instills confidence in security teams and CTOs
2. **Transparent** - Clear visualization of transformations and security metrics that build trust through understanding
3. **Powerful** - Sophisticated analysis capabilities that prove equivalent AI assistance on synthetic code

**Complexity Level**: Complex Application (advanced functionality, enterprise security features)
- Requires sophisticated code transformation engines, real-time AI comparison, and enterprise-grade security validation

## Essential Features

### Code Input Interface
- **Functionality**: Multi-language code editor with file upload and sample examples
- **Purpose**: Provide flexible input methods for enterprise developers to test real codebases
- **Trigger**: User pastes code, uploads files, or selects sample scenarios
- **Progression**: Code input → Language detection → Syntax validation → Ready for transformation
- **Success criteria**: Accepts various code formats and provides clear feedback on readiness

### Privacy-First Transformation Engine
- **Functionality**: Deep abstraction of business logic while preserving architectural DNA
- **Purpose**: Remove all proprietary information while maintaining AI-assistable structure
- **Trigger**: User clicks "Generate Synthetic Version" with selected privacy level
- **Progression**: Parse AST → Extract business patterns → Apply obfuscation → Preserve structure → Validate privacy
- **Success criteria**: 0% business logic exposure with >90% utility retention

### Real-time Security Dashboard
- **Functionality**: Live privacy metrics and competitive intelligence risk assessment
- **Purpose**: Provide quantifiable proof of security protection for enterprise stakeholders
- **Trigger**: Automatic updates during transformation process
- **Progression**: Analyze original → Calculate risks → Track transformations → Display security scores
- **Success criteria**: Clear executive-level security validation with detailed technical metrics

### AI Assistance Equivalence Demo
- **Functionality**: Parallel AI analysis on original vs synthetic code using GitHub Models
- **Purpose**: Prove synthetic code enables identical AI-powered productivity
- **Trigger**: User initiates AI comparison test
- **Progression**: Submit both versions → Collect AI responses → Compare quality → Display parity metrics
- **Success criteria**: >95% equivalence in AI assistance quality and usefulness

### Enterprise Configuration Panel
- **Functionality**: Configurable privacy levels and compliance presets
- **Purpose**: Adapt to specific enterprise security requirements and regulatory needs
- **Trigger**: User selects privacy profile or customizes sensitivity rules
- **Progression**: Select preset → Customize rules → Preview impact → Apply configuration
- **Success criteria**: Flexible adaptation to enterprise policies with clear trade-off visualization

## Edge Case Handling
- **Malformed Code Input**: Graceful error handling with specific syntax guidance
- **API Rate Limiting**: Intelligent queuing and retry logic for GitHub Models calls
- **Large File Processing**: Streaming and chunked processing for enterprise-scale codebases
- **Network Failures**: Offline mode with cached transformations and local analysis
- **Unknown Language Detection**: Fallback parsing strategies and user override options

## Design Direction
The interface should feel like a professional enterprise security tool that CTOs and CISOs would trust with sensitive codebases - clean, authoritative, and transparent about its security guarantees while being sophisticated enough to handle complex enterprise requirements.

## Color Selection
Complementary (opposite colors) - Professional blue-gray primary with warm orange accents to create trust and highlight security achievements.

- **Primary Color**: Deep Professional Blue `oklch(0.25 0.08 250)` - Communicates enterprise trustworthiness and security
- **Secondary Colors**: Cool Gray `oklch(0.85 0.02 250)` for backgrounds and Muted Blue `oklch(0.65 0.06 250)` for supporting elements
- **Accent Color**: Warm Orange `oklch(0.70 0.15 45)` for success states, security achievements, and call-to-action elements
- **Foreground/Background Pairings**: 
  - Background (Light Gray #F8F9FA): Dark Blue text (#1A237E) - Ratio 12.8:1 ✓
  - Primary (Deep Blue #1A237E): White text (#FFFFFF) - Ratio 12.8:1 ✓
  - Accent (Warm Orange #E8965A): White text (#FFFFFF) - Ratio 4.8:1 ✓
  - Card (White #FFFFFF): Dark Blue text (#1A237E) - Ratio 12.8:1 ✓

## Font Selection
Typography should convey technical precision and enterprise credibility - clean, highly legible sans-serif that works well for both code display and executive dashboards.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing  
  - H3 (Subsections): Inter Medium/18px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height
  - Code Display: JetBrains Mono Regular/14px/monospace
  - Metrics/Numbers: Inter Bold/20px for emphasis

## Animations
Subtle, professional animations that enhance understanding of complex transformations without feeling frivolous - focus on data visualization transitions and security validation feedback.

- **Purposeful Meaning**: Motion reinforces trust through smooth, predictable transitions that feel secure and controlled
- **Hierarchy of Movement**: Transformation progress gets primary animation focus, with subtle hover states on interactive elements

## Component Selection
- **Components**: Cards for transformation panels, Tabs for different views (Code/Security/AI Demo), Progress indicators for transformations, Badges for security metrics, Tooltips for technical explanations, Dialogs for detailed analysis, Tables for comparison matrices
- **Customizations**: Custom Monaco Editor wrapper, enterprise-style metric cards with security color coding, specialized diff viewer for before/after code comparison
- **States**: Transform buttons with loading/success states, security metrics with color-coded risk levels, code editor with syntax highlighting and error states
- **Icon Selection**: Shield icons for security, Code icons for transformation, Chart icons for metrics, Eye icons for analysis
- **Spacing**: Generous padding (24px) for main sections, tight spacing (8px) for related metrics, consistent gaps (16px) between cards
- **Mobile**: Responsive tabs that stack vertically, collapsible panels for detailed metrics, priority content first on smaller screens