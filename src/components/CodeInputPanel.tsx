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
  banking: {
    language: 'java',
    title: 'Banking Credit Risk Assessment',
    description: 'Proprietary credit scoring and loan approval algorithms',
    code: `// CreditRiskEngine.java - Proprietary Banking Algorithm
package com.megabank.risk;

import java.math.BigDecimal;
import java.util.*;
import javax.crypto.spec.SecretKeySpec;

public class CreditRiskEngine {
    private static final String FICO_API_ENDPOINT = "https://api.fico.com/v2/credit-score";
    private static final String LEXIS_NEXIS_ENDPOINT = "https://riskview.lexisnexis.com/verify";
    private static final String EQUIFAX_API_KEY = "EFX_PROD_KEY_B78F9A2C";
    private static final String EXPERIAN_SECRET = "EXP_SECRET_9F8E7D6C5B4A";
    
    // Proprietary risk multipliers - competitive advantage
    private static final Map<String, Double> INDUSTRY_RISK_MULTIPLIERS = Map.of(
        "healthcare_professionals", 0.65,    // Low risk - stable income
        "tech_workers", 0.72,               // Low-medium risk
        "restaurant_workers", 1.45,         // High risk - variable income
        "retail_workers", 1.28,             // Medium-high risk
        "oil_gas_workers", 1.67,           // Highest risk - volatile industry
        "government_employees", 0.58        // Lowest risk - job security
    );
    
    private static final BigDecimal BANK_PROFIT_TARGET = new BigDecimal("0.157"); // 15.7% target profit margin
    private static final double DEFAULT_THRESHOLD = 0.073; // 7.3% default rate threshold
    
    public CreditDecision evaluateLoanApplication(LoanApplication application) {
        try {
            // Step 1: Gather credit bureau data
            CreditReport ficoReport = fetchFicoScore(application.getSsn());
            CreditReport experianReport = fetchExperianData(application.getSsn());
            IdentityVerification lexisNexis = verifyIdentity(application);
            
            // Step 2: Apply proprietary scoring algorithm
            double baseScore = calculateBaseCreditScore(ficoReport, experianReport);
            double incomeStabilityScore = assessIncomeStability(application);
            double debtToIncomeRatio = calculateDebtToIncomeRatio(application);
            double propertyValueRisk = assessCollateralRisk(application.getPropertyValue(), application.getZipCode());
            
            // Step 3: Industry-specific risk adjustment (competitive secret)
            String industry = categorizeIndustry(application.getEmployment().getIndustry());
            double industryMultiplier = INDUSTRY_RISK_MULTIPLIERS.getOrDefault(industry, 1.0);
            
            // Step 4: Proprietary composite risk score calculation
            double compositeScore = (
                baseScore * 0.35 +
                incomeStabilityScore * 0.25 +
                (1.0 - debtToIncomeRatio) * 0.20 +
                propertyValueRisk * 0.12 +
                lexisNexis.getTrustScore() * 0.08
            ) * industryMultiplier;
            
            // Step 5: Calculate optimal interest rate using proprietary formula
            double riskPremium = calculateRiskPremium(compositeScore);
            double interestRate = getFederalRate() + riskPremium + BANK_PROFIT_TARGET.doubleValue();
            
            // Step 6: Final approval decision
            boolean approved = compositeScore >= 0.72 && debtToIncomeRatio <= 0.43;
            
            return new CreditDecision(
                approved,
                interestRate,
                compositeScore,
                calculateMaxLoanAmount(application, compositeScore),
                generateRiskFactors(application, compositeScore)
            );
            
        } catch (Exception e) {
            // Log security incident - potential fraud attempt
            logSecurityIncident(application, e);
            throw new CreditProcessingException("Unable to process loan application", e);
        }
    }
    
    private double calculateRiskPremium(double compositeScore) {
        // Proprietary risk-based pricing algorithm
        if (compositeScore >= 0.90) return 0.0125; // Excellent credit: 1.25% premium
        if (compositeScore >= 0.80) return 0.0275; // Good credit: 2.75% premium
        if (compositeScore >= 0.72) return 0.0450; // Fair credit: 4.50% premium
        return 0.0850; // Poor credit: 8.50% premium (if approved)
    }
    
    private double assessIncomeStability(LoanApplication application) {
        Employment employment = application.getEmployment();
        
        // Proprietary employment stability scoring
        double stabilityScore = 0.0;
        
        // Years of employment weighting
        if (employment.getYearsEmployed() >= 5) stabilityScore += 0.40;
        else if (employment.getYearsEmployed() >= 2) stabilityScore += 0.25;
        else stabilityScore += 0.10;
        
        // Income consistency analysis
        List<MonthlyIncome> incomeHistory = employment.getIncomeHistory();
        double incomeVariance = calculateIncomeVariance(incomeHistory);
        stabilityScore += Math.max(0.0, 0.60 - (incomeVariance * 2.0));
        
        return Math.min(1.0, stabilityScore);
    }
    
    private CreditReport fetchFicoScore(String ssn) throws CreditBureauException {
        // Encrypted SSN for FICO API call
        String encryptedSsn = encryptSsn(ssn);
        
        // Call FICO credit scoring API
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + getFicoApiToken());
        headers.set("X-Client-ID", "MEGABANK_PROD_2024");
        
        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        
        return restTemplate.exchange(
            FICO_API_ENDPOINT + "?ssn=" + encryptedSsn,
            HttpMethod.GET,
            entity,
            CreditReport.class
        ).getBody();
    }
}`
  },
  insurance: {
    language: 'python',
    title: 'Insurance Actuarial Modeling',
    description: 'Proprietary risk assessment and premium calculation engine',
    code: `# ActuarialEngine.py - Proprietary Insurance Risk Assessment
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from datetime import datetime, timedelta
import requests
import hashlib
import hmac

class InsuranceActuarialEngine:
    def __init__(self):
        # Proprietary API keys for data enrichment
        self.telematics_api_key = "TMT_INS_PROD_K8F7G6H5"
        self.weather_api_secret = "WTH_SECRET_M9N8B7V6C5"
        self.claim_fraud_endpoint = "https://fraud-detect.insurancetech.com/v3/analyze"
        self.credit_bureau_key = "CB_INSURANCE_API_X4Y7Z2"
        
        # Proprietary risk multipliers (competitive advantage)
        self.demographic_risk_factors = {
            'age_16_25': 2.87,  # Highest risk group
            'age_26_35': 1.42,
            'age_36_50': 0.89,  # Safest group
            'age_51_65': 1.15,
            'age_65_plus': 1.78,
            'male_under_30': 1.67,
            'female_under_30': 1.23,
            'married': 0.82,
            'single': 1.34,
            'divorced': 1.56
        }
        
        # Proprietary vehicle risk scoring
        self.vehicle_risk_matrix = {
            'sports_cars': 3.45,
            'luxury_sedans': 2.12,
            'pickup_trucks': 1.87,
            'suvs': 1.34,
            'economy_cars': 0.67,
            'hybrids': 0.58,
            'minivans': 0.89
        }
        
        # Geographic risk zones (proprietary mapping)
        self.zip_code_risk_multipliers = self._load_proprietary_zip_risk_data()
        
        # Load proprietary ML models
        self.claim_prediction_model = self._load_claim_prediction_model()
        self.fraud_detection_model = self._load_fraud_detection_model()
        
    def calculate_premium(self, policy_application):
        """Main premium calculation using proprietary algorithms"""
        try:
            # Step 1: Gather enrichment data
            driving_data = self._fetch_telematics_data(policy_application.driver_id)
            credit_score = self._get_insurance_credit_score(policy_application.ssn)
            vehicle_history = self._lookup_vehicle_history(policy_application.vin)
            geographic_risk = self._assess_geographic_risk(policy_application.zip_code)
            
            # Step 2: Calculate base risk score using proprietary algorithm
            base_risk = self._calculate_base_risk_score(policy_application)
            
            # Step 3: Apply demographic risk adjustments
            demographic_multiplier = self._calculate_demographic_multiplier(policy_application)
            
            # Step 4: Vehicle-specific risk assessment
            vehicle_risk = self._assess_vehicle_risk(policy_application.vehicle)
            
            # Step 5: Behavioral risk analysis (telematics data)
            behavioral_risk = self._analyze_driving_behavior(driving_data)
            
            # Step 6: Predictive modeling for claim likelihood
            claim_probability = self._predict_claim_probability(policy_application, driving_data)
            
            # Step 7: Fraud risk assessment
            fraud_score = self._assess_fraud_risk(policy_application)
            
            # Step 8: Proprietary composite risk calculation
            composite_risk = (
                base_risk * 0.25 +
                vehicle_risk * 0.20 +
                behavioral_risk * 0.18 +
                claim_probability * 0.15 +
                geographic_risk * 0.12 +
                (1 - credit_score/850) * 0.10  # Higher credit = lower risk
            ) * demographic_multiplier * (1 + fraud_score)
            
            # Step 9: Calculate base premium using actuarial tables
            base_premium = self._get_base_premium_from_actuarial_tables(
                policy_application.coverage_type,
                policy_application.coverage_limits
            )
            
            # Step 10: Apply risk-adjusted pricing
            risk_adjusted_premium = base_premium * (1 + composite_risk)
            
            # Step 11: Add profit margin and regulatory adjustments
            final_premium = self._apply_business_adjustments(
                risk_adjusted_premium,
                policy_application.state,
                composite_risk
            )
            
            return PremiumQuote(
                monthly_premium=final_premium,
                risk_score=composite_risk,
                claim_probability=claim_probability,
                fraud_score=fraud_score,
                rate_factors=self._generate_rate_explanation(policy_application, composite_risk)
            )
            
        except Exception as e:
            self._log_pricing_error(policy_application, e)
            return self._generate_standard_rate_quote(policy_application)
    
    def _analyze_driving_behavior(self, telematics_data):
        """Proprietary driving behavior risk assessment"""
        if not telematics_data:
            return 0.15  # Default risk increase for no telematics
            
        # Analyze driving patterns using proprietary algorithms
        harsh_braking_events = telematics_data.get('harsh_braking_count', 0)
        rapid_acceleration_events = telematics_data.get('rapid_acceleration_count', 0)
        night_driving_miles = telematics_data.get('night_miles', 0)
        highway_vs_city_ratio = telematics_data.get('highway_ratio', 0.5)
        phone_usage_while_driving = telematics_data.get('phone_distraction_minutes', 0)
        
        # Proprietary behavior scoring algorithm
        behavior_score = 0.0
        
        # Harsh events penalty
        if harsh_braking_events > 10:
            behavior_score += 0.25
        elif harsh_braking_events > 5:
            behavior_score += 0.15
            
        # Acceleration patterns
        if rapid_acceleration_events > 15:
            behavior_score += 0.20
        elif rapid_acceleration_events > 8:
            behavior_score += 0.10
            
        # Night driving risk (higher accident rates)
        night_driving_ratio = night_driving_miles / max(telematics_data.get('total_miles', 1), 1)
        if night_driving_ratio > 0.3:
            behavior_score += 0.18
        elif night_driving_ratio > 0.2:
            behavior_score += 0.08
            
        # Phone usage penalty
        if phone_usage_while_driving > 30:  # Minutes per month
            behavior_score += 0.35
        elif phone_usage_while_driving > 10:
            behavior_score += 0.20
            
        # Highway driving bonus (generally safer)
        if highway_vs_city_ratio > 0.7:
            behavior_score -= 0.10
            
        return max(0.0, min(0.8, behavior_score))  # Cap behavior risk impact
    
    def _predict_claim_probability(self, application, telematics_data):
        """Use proprietary ML model to predict claim likelihood"""
        # Feature engineering using proprietary methods
        features = self._engineer_features_for_ml_model(application, telematics_data)
        
        # Apply trained gradient boosting model (proprietary training data)
        claim_probability = self.claim_prediction_model.predict_proba([features])[0][1]
        
        # Apply proprietary probability calibration
        calibrated_probability = self._calibrate_claim_probability(claim_probability, application)
        
        return calibrated_probability
    
    def _assess_fraud_risk(self, application):
        """Proprietary fraud detection algorithm"""
        fraud_indicators = 0
        
        # Check for suspicious patterns
        if self._check_application_inconsistencies(application):
            fraud_indicators += 2
            
        if self._verify_employment_claims(application):
            fraud_indicators += 1
            
        if self._analyze_previous_claims_pattern(application.driver_id):
            fraud_indicators += 3
            
        # Convert to risk multiplier
        if fraud_indicators >= 4:
            return 0.45  # High fraud risk
        elif fraud_indicators >= 2:
            return 0.25  # Medium fraud risk
        else:
            return 0.05  # Low fraud risk
    
    def _fetch_telematics_data(self, driver_id):
        """Fetch proprietary telematics data from connected devices"""
        headers = {
            'Authorization': f'Bearer {self.telematics_api_key}',
            'X-Insurance-Company': 'ACME_INSURANCE_CORP'
        }
        
        response = requests.get(
            f'https://telematics-api.insurancetech.com/v2/driver/{driver_id}/behavior',
            headers=headers
        )
        
        return response.json() if response.status_code == 200 else None`
  },
  pharmaceutical: {
    language: 'python',
    title: 'Pharmaceutical Drug Discovery Pipeline',
    description: 'Proprietary compound analysis and clinical trial optimization',
    code: `# DrugDiscoveryEngine.py - Proprietary Pharmaceutical Research Platform
import numpy as np
import pandas as pd
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors
import requests
import hashlib
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
import sqlite3

class DrugDiscoveryEngine:
    def __init__(self):
        # Proprietary database connections
        self.compound_db_connection = "postgresql://pharma:SECRET_DB_PASS@compounds.pharmatech.internal:5432/molecules"
        self.clinical_trials_api = "https://clinicaltrials.pharmatech.internal/api/v3/"
        self.fda_submission_endpoint = "https://fda-gateway.pharmatech.internal/submissions/"
        
        # Proprietary API keys for external data
        self.pubchem_api_key = "PUBCHEM_PHARMA_K8F7G6H5J4"
        self.drugbank_secret = "DRUGBANK_SECRET_X9Y8Z7W6V5"
        self.patent_search_key = "USPTO_PATENT_API_M4N3B2V1C0"
        
        # Proprietary molecular descriptors and weights (competitive advantage)
        self.proprietary_descriptor_weights = {
            'lipinski_violations': -0.85,      # Drug-likeness
            'bioavailability_score': 0.67,    # Oral absorption
            'blood_brain_barrier': 0.43,      # CNS penetration
            'cyp450_inhibition': -0.78,       # Drug interactions
            'herg_liability': -0.92,          # Cardiac toxicity
            'hepatotoxicity_risk': -0.88,     # Liver toxicity
            'mutagenicity_alerts': -0.95,     # Genetic toxicity
            'synthetic_accessibility': -0.34   # Manufacturing complexity
        }
        
        # Proprietary disease target mappings
        self.target_disease_mappings = {
            'EGFR': {'cancer': 0.89, 'alzheimers': 0.23},
            'DPP4': {'diabetes': 0.92, 'obesity': 0.34},
            'ACE2': {'hypertension': 0.87, 'covid19': 0.76},
            'BACE1': {'alzheimers': 0.94, 'parkinsons': 0.45},
            'PDE5': {'erectile_dysfunction': 0.95, 'pulmonary_hypertension': 0.67}
        }
        
        # Load proprietary ML models
        self.toxicity_prediction_model = self._load_toxicity_model()
        self.efficacy_prediction_model = self._load_efficacy_model()
        self.admet_prediction_model = self._load_admet_model()
        
    def analyze_compound_potential(self, compound_smiles, target_protein, indication):
        """Comprehensive compound analysis using proprietary algorithms"""
        try:
            # Step 1: Molecular structure analysis
            mol = Chem.MolFromSmiles(compound_smiles)
            if not mol:
                raise ValueError("Invalid SMILES structure")
                
            # Step 2: Calculate proprietary molecular descriptors
            molecular_features = self._calculate_proprietary_descriptors(mol)
            
            # Step 3: Predict ADMET properties using proprietary models
            admet_properties = self._predict_admet_properties(mol, molecular_features)
            
            # Step 4: Assess target binding affinity
            binding_affinity = self._predict_target_binding(mol, target_protein)
            
            # Step 5: Evaluate drug-likeness using proprietary scoring
            drug_likeness_score = self._calculate_drug_likeness_score(molecular_features)
            
            # Step 6: Predict toxicity risks
            toxicity_profile = self._assess_toxicity_risks(mol, molecular_features)
            
            # Step 7: Estimate synthetic accessibility and cost
            synthesis_analysis = self._analyze_synthetic_route(mol)
            
            # Step 8: Check patent landscape
            patent_freedom = self._assess_patent_landscape(compound_smiles)
            
            # Step 9: Predict clinical trial success probability
            clinical_success_probability = self._predict_clinical_success(
                molecular_features, 
                admet_properties, 
                toxicity_profile,
                indication
            )
            
            # Step 10: Calculate overall compound score using proprietary algorithm
            overall_score = self._calculate_proprietary_compound_score(
                drug_likeness_score,
                binding_affinity,
                admet_properties,
                toxicity_profile,
                synthesis_analysis,
                patent_freedom,
                clinical_success_probability
            )
            
            return CompoundAnalysisResult(
                compound_id=hashlib.md5(compound_smiles.encode()).hexdigest(),
                overall_score=overall_score,
                drug_likeness=drug_likeness_score,
                binding_affinity=binding_affinity,
                admet_properties=admet_properties,
                toxicity_profile=toxicity_profile,
                synthesis_score=synthesis_analysis,
                patent_score=patent_freedom,
                clinical_probability=clinical_success_probability,
                recommendation=self._generate_development_recommendation(overall_score)
            )
            
        except Exception as e:
            self._log_analysis_error(compound_smiles, target_protein, e)
            raise DrugDiscoveryException(f"Compound analysis failed: {str(e)}")
    
    def _calculate_proprietary_descriptors(self, mol):
        """Calculate proprietary molecular descriptors"""
        descriptors = {}
        
        # Standard descriptors
        descriptors['molecular_weight'] = Descriptors.MolWt(mol)
        descriptors['logp'] = Descriptors.MolLogP(mol)
        descriptors['hbd'] = Descriptors.NumHDonors(mol)
        descriptors['hba'] = Descriptors.NumHAcceptors(mol)
        descriptors['rotatable_bonds'] = Descriptors.NumRotatableBonds(mol)
        descriptors['aromatic_rings'] = rdMolDescriptors.CalcNumAromaticRings(mol)
        descriptors['tpsa'] = Descriptors.TPSA(mol)
        
        # Proprietary descriptors (competitive advantage)
        descriptors['pharma_complexity_score'] = self._calculate_pharma_complexity(mol)
        descriptors['metabolic_stability_prediction'] = self._predict_metabolic_stability(mol)
        descriptors['permeability_score'] = self._calculate_permeability_score(mol)
        descriptors['selectivity_index'] = self._calculate_selectivity_index(mol)
        
        return descriptors
    
    def _predict_admet_properties(self, mol, features):
        """Predict ADMET using proprietary models"""
        # Absorption prediction
        absorption_score = self._predict_gastrointestinal_absorption(features)
        
        # Distribution prediction
        distribution_metrics = {
            'blood_brain_barrier': self._predict_bbb_penetration(mol),
            'protein_binding': self._predict_protein_binding(features),
            'volume_distribution': self._predict_volume_distribution(features)
        }
        
        # Metabolism prediction
        metabolism_profile = {
            'cyp1a2_substrate': self._predict_cyp_interaction(mol, 'CYP1A2'),
            'cyp2d6_substrate': self._predict_cyp_interaction(mol, 'CYP2D6'),
            'cyp3a4_substrate': self._predict_cyp_interaction(mol, 'CYP3A4'),
            'metabolic_clearance': self._predict_metabolic_clearance(features)
        }
        
        # Excretion prediction
        excretion_profile = {
            'renal_clearance': self._predict_renal_clearance(features),
            'biliary_excretion': self._predict_biliary_excretion(mol),
            'half_life_prediction': self._predict_elimination_half_life(features)
        }
        
        # Toxicity prediction using proprietary models
        toxicity_predictions = {
            'hepatotoxicity': self.toxicity_prediction_model.predict_hepatotoxicity(features),
            'cardiotoxicity': self.toxicity_prediction_model.predict_cardiotoxicity(features),
            'nephrotoxicity': self.toxicity_prediction_model.predict_nephrotoxicity(features),
            'mutagenicity': self.toxicity_prediction_model.predict_mutagenicity(mol)
        }
        
        return {
            'absorption': absorption_score,
            'distribution': distribution_metrics,
            'metabolism': metabolism_profile,
            'excretion': excretion_profile,
            'toxicity': toxicity_predictions
        }
    
    def _predict_clinical_success(self, features, admet, toxicity, indication):
        """Proprietary clinical trial success prediction"""
        # Historical success rates by indication (proprietary data)
        indication_success_rates = {
            'oncology': 0.067,          # 6.7% approval rate
            'neurology': 0.082,         # 8.2% approval rate  
            'cardiovascular': 0.145,    # 14.5% approval rate
            'diabetes': 0.198,          # 19.8% approval rate
            'infectious_disease': 0.234  # 23.4% approval rate
        }
        
        base_success_rate = indication_success_rates.get(indication, 0.10)
        
        # Apply proprietary success modifiers
        success_modifiers = 1.0
        
        # ADMET impact on success
        if admet['absorption'] > 0.8:
            success_modifiers *= 1.25
        elif admet['absorption'] < 0.4:
            success_modifiers *= 0.65
            
        # Toxicity impact
        avg_toxicity = np.mean(list(admet['toxicity'].values()))
        if avg_toxicity < 0.2:
            success_modifiers *= 1.35
        elif avg_toxicity > 0.6:
            success_modifiers *= 0.45
            
        # Drug-likeness impact
        if features.get('molecular_weight', 0) > 500:
            success_modifiers *= 0.78
            
        return min(0.95, base_success_rate * success_modifiers)
    
    def optimize_clinical_trial_design(self, compound_id, indication, patient_population):
        """Proprietary clinical trial optimization"""
        # Fetch compound data
        compound_data = self._get_compound_data(compound_id)
        
        # Historical trial data analysis
        similar_trials = self._find_similar_historical_trials(compound_data, indication)
        
        # Proprietary trial design optimization
        optimal_design = {
            'sample_size': self._calculate_optimal_sample_size(compound_data, indication),
            'primary_endpoint': self._select_optimal_primary_endpoint(indication),
            'biomarker_strategy': self._design_biomarker_strategy(compound_data),
            'patient_stratification': self._optimize_patient_stratification(patient_population),
            'dose_escalation': self._design_dose_escalation_strategy(compound_data),
            'trial_duration': self._estimate_optimal_trial_duration(indication),
            'regulatory_pathway': self._recommend_regulatory_pathway(compound_data, indication)
        }
        
        return optimal_design`
  },
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
                    <div className="text-sm text-muted-foreground mb-3">
                      Choose from realistic enterprise code examples that demonstrate comprehensive privacy protection:
                    </div>
                    {Object.entries(SAMPLE_CODES).map(([key, sample]) => (
                      <Card key={key} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => loadSampleCode(key)}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{sample.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{sample.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">{sample.language}</Badge>
                                {key === 'banking' && <Badge variant="secondary" className="text-xs">Financial Services</Badge>}
                                {key === 'insurance' && <Badge variant="secondary" className="text-xs">Actuarial Models</Badge>}
                                {key === 'pharmaceutical' && <Badge variant="secondary" className="text-xs">Drug Discovery</Badge>}
                                {key === 'financial' && <Badge variant="secondary" className="text-xs">Trading Algorithms</Badge>}
                                {key === 'healthcare' && <Badge variant="secondary" className="text-xs">HIPAA Sensitive</Badge>}
                                {key === 'ecommerce' && <Badge variant="secondary" className="text-xs">Competitive Intelligence</Badge>}
                              </div>
                            </div>
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