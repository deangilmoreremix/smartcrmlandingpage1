import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, Lock, Server, Database, FileCheck, AlertCircle, FileText, Award, Clock, ArrowRight, DollarSign } from 'lucide-react';
import AnimatedElement from './AnimatedElement';
import AnimatedIconsGroup from './AnimatedIconsGroup';

interface ComplianceCertification {
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'Certified' | 'Compliant' | 'In Process';
  year: number;
  details?: string[];
}

interface SecurityFeature {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  plans?: ('Starter' | 'Professional' | 'Enterprise')[];
}

const securityFeatures: SecurityFeature[] = [
  {
    name: "End-to-End Encryption",
    description: "All data is encrypted in transit and at rest using AES-256 bit encryption.",
    icon: <Lock size={24} />,
    category: "Data Protection",
    plans: ['Starter', 'Professional', 'Enterprise']
  },
  {
    name: "Role-Based Access Controls",
    description: "Granular permissions that ensure users can only access appropriate data and functions.",
    icon: <Shield size={24} />,
    category: "Access Management",
    plans: ['Starter', 'Professional', 'Enterprise']
  },
  {
    name: "Two-Factor Authentication",
    description: "Add an extra layer of security with code-based verification on login.",
    icon: <Lock size={24} />,
    category: "Access Management",
    plans: ['Starter', 'Professional', 'Enterprise']
  },
  {
    name: "Single Sign-On (SSO)",
    description: "Integrate with your identity provider using SAML or OAuth for secure authentication.",
    icon: <Lock size={24} />,
    category: "Access Management",
    plans: ['Enterprise']
  },
  {
    name: "Audit Logs",
    description: "Comprehensive logs of all system activities for security monitoring and compliance.",
    icon: <FileCheck size={24} />,
    category: "Monitoring & Auditing",
    plans: ['Professional', 'Enterprise']
  },
  {
    name: "IP Restrictions",
    description: "Limit system access to specified IP addresses for enhanced security.",
    icon: <Server size={24} />,
    category: "Access Management",
    plans: ['Enterprise']
  },
  {
    name: "Data Residency Options",
    description: "Choose where your data is stored to meet regional compliance requirements.",
    icon: <Database size={24} />,
    category: "Data Protection",
    plans: ['Enterprise']
  },
  {
    name: "Automatic Session Timeout",
    description: "Automatically log out inactive users to prevent unauthorized access.",
    icon: <Clock size={24} />,
    category: "Access Management",
    plans: ['Starter', 'Professional', 'Enterprise']
  },
  {
    name: "Regular Security Updates",
    description: "Continuous security patches and updates to protect against emerging threats.",
    icon: <Shield size={24} />,
    category: "Infrastructure",
    plans: ['Starter', 'Professional', 'Enterprise']
  },
  {
    name: "Regular Penetration Testing",
    description: "Independent security testing to identify and address potential vulnerabilities.",
    icon: <AlertCircle size={24} />,
    category: "Monitoring & Auditing",
    plans: ['Professional', 'Enterprise']
  },
  {
    name: "Data Loss Prevention",
    description: "Controls to prevent sensitive data from leaving the system inappropriately.",
    icon: <Database size={24} />,
    category: "Data Protection",
    plans: ['Professional', 'Enterprise']
  },
  {
    name: "Security Information & Event Management",
    description: "Real-time monitoring and alerts for security events and potential threats.",
    icon: <AlertCircle size={24} />,
    category: "Monitoring & Auditing",
    plans: ['Enterprise']
  }
];

const complianceCertifications: ComplianceCertification[] = [
  {
    name: "SOC 2 Type II",
    description: "Audit certification focused on security, availability, processing integrity, confidentiality, and privacy.",
    icon: <Shield size={24} />,
    status: "Certified",
    year: 2023,
    details: [
      "Annual recertification",
      "Controls for organization, communications, risk management",
      "System operations, change management, and logical access",
      "24/7 monitoring and incident response"
    ]
  },
  {
    name: "GDPR",
    description: "Compliance with EU's General Data Protection Regulation for data privacy and protection.",
    icon: <FileCheck size={24} />,
    status: "Compliant",
    year: 2022,
    details: [
      "Data subject rights management",
      "Data processing documentation",
      "Privacy by design principles",
      "Data protection impact assessments"
    ]
  },
  {
    name: "HIPAA",
    description: "Compliance with Health Insurance Portability and Accountability Act for healthcare data.",
    icon: <FileText size={24} />,
    status: "Compliant",
    year: 2023,
    details: [
      "Business Associate Agreements (BAA) available",
      "Protected Health Information (PHI) safeguards",
      "Access controls and audit trails",
      "Data encryption and secure transmission"
    ]
  },
  {
    name: "ISO 27001",
    description: "International standard for information security management systems (ISMS).",
    icon: <Award size={24} />,
    status: "Certified",
    year: 2023,
    details: [
      "Information security policies",
      "Asset management controls",
      "Access control implementation",
      "Regular risk assessments and audits"
    ]
  },
  {
    name: "CCPA",
    description: "Compliance with California Consumer Privacy Act for consumer data rights.",
    icon: <FileCheck size={24} />,
    status: "Compliant",
    year: 2022,
    details: [
      "Data inventory and mapping",
      "Consumer rights implementation",
      "Consent management",
      "Data retention controls"
    ]
  },
  {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard for handling credit card information.",
    icon: <Lock size={24} />,
    status: "Compliant",
    year: 2023,
    details: [
      "Secure payment processing",
      "Network security measures",
      "Vulnerability management",
      "Regular security testing"
    ]
  },
  {
    name: "ISO 27018",
    description: "Standard for protecting personally identifiable information (PII) in public clouds.",
    icon: <Database size={24} />,
    status: "In Process",
    year: 2024,
    details: [
      "Cloud-specific privacy controls",
      "Transparent data usage policies",
      "Data breach notification protocols",
      "Data residency management"
    ]
  },
  {
    name: "FINRA Compliance",
    description: "Financial Industry Regulatory Authority compliance for financial services organizations.",
    icon: <FileText size={24} />,
    status: "Compliant",
    year: 2023,
    details: [
      "Books and records requirements",
      "Communication archiving",
      "Supervisory controls",
      "Audit trail maintenance"
    ]
  }
];

const SecurityComplianceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'security' | 'compliance'>('security');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<ComplianceCertification | null>(null);
  
  // Get unique security feature categories
  const securityCategories = Array.from(new Set(securityFeatures.map(feature => feature.category)));
  
  // Filter security features by category
  const filteredSecurityFeatures = selectedCategory
    ? securityFeatures.filter(feature => feature.category === selectedCategory)
    : securityFeatures;
  
  // Function to get security features for a specific plan
  const getPlanFeatures = (plan: 'Starter' | 'Professional' | 'Enterprise') => {
    return securityFeatures.filter(feature => feature.plans?.includes(plan));
  };
  
  // Function to open certification details
  const handleCertificationClick = (certification: ComplianceCertification) => {
    setSelectedCertification(certification);
  };
  
  return (
    <section id="security" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950/40 pointer-events-none" />
      
      {/* Animated floating icons for security section */}
      <AnimatedIconsGroup 
        section="pricing" 
        iconCount={15}
        animations={['pulse', 'orbit', 'rotate']} 
        density="medium"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="fadeIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Security & Compliance</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your data security and privacy are our top priorities. Smart CRM meets the highest standards for enterprise-grade protection.
            </p>
          </div>
        </AnimatedElement>
        
        {/* Tabs Navigation */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1">
            <motion.button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('security')}
              whileHover={{ scale: activeTab !== 'security' ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Security Features
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === 'compliance' ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('compliance')}
              whileHover={{ scale: activeTab !== 'compliance' ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Compliance Certifications
            </motion.button>
          </div>
        </div>
        
        {/* Security Features Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Category Filter Sidebar */}
                <div>
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Filter size={18} className="text-blue-400 mr-2" />
                      Security Categories
                    </h3>
                    
                    <div className="space-y-2">
                      <motion.button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        onClick={() => setSelectedCategory(null)}
                        whileHover={{ x: selectedCategory !== null ? 3 : 0 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        All Features
                      </motion.button>
                      
                      {securityCategories.map((category) => (
                        <motion.button
                          key={category}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                            selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                          onClick={() => setSelectedCategory(category)}
                          whileHover={{ x: selectedCategory !== category ? 3 : 0 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Security By Plan */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h3 className="text-white font-semibold mb-4">Security By Plan</h3>
                    
                    {['Starter', 'Professional', 'Enterprise'].map((plan) => (
                      <div key={plan} className="mb-4 last:mb-0">
                        <h4 className="text-white font-medium text-sm mb-2">
                          {plan} Plan
                          {plan === 'Enterprise' && (
                            <span className="ml-2 text-xs bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full">
                              Maximum Security
                            </span>
                          )}
                        </h4>
                        <div className="text-xs text-white/60 mb-2">
                          {getPlanFeatures(plan as any).length} security features
                        </div>
                        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute top-0 left-0 h-full rounded-full ${
                              plan === 'Starter' ? 'bg-blue-500' : 
                              plan === 'Professional' ? 'bg-purple-500' : 
                              'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${plan === 'Starter' ? 60 : plan === 'Professional' ? 80 : 100}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <p className="text-white/60 text-xs mt-4">
                      All plans include essential security features, with additional protections in higher tiers.
                    </p>
                  </div>
                </div>
                
                {/* Security Features Grid */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredSecurityFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 h-full"
                        whileHover={{ 
                          y: -5,
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          borderColor: "rgba(59, 130, 246, 0.3)"
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {feature.icon}
                        </motion.div>
                        
                        <h3 className="text-white font-medium mb-2">{feature.name}</h3>
                        <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {feature.plans?.map((plan) => (
                            <span
                              key={plan}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                plan === 'Starter' ? 'bg-blue-500/20 text-blue-400' :
                                plan === 'Professional' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                              }`}
                            >
                              {plan}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Enterprise Security Highlight */}
              <AnimatedElement animation="fadeIn" delay={0.3}>
                <div className="mt-12 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <motion.div
                      className="p-4 bg-blue-500/20 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Shield className="h-12 w-12 text-blue-400" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-3">Enterprise-Grade Security</h3>
                      <p className="text-white/80 mb-4">
                        Smart CRM's security infrastructure is built to meet and exceed the requirements of even the most security-conscious organizations. Our dedicated security team works around the clock to protect your data.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="font-semibold text-white mb-1">Data Centers</div>
                          <p className="text-sm text-white/70">SOC 2 certified facilities with 24/7 physical security</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="font-semibold text-white mb-1">Encryption</div>
                          <p className="text-sm text-white/70">AES-256 bit encryption at rest and in transit</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="font-semibold text-white mb-1">Monitoring</div>
                          <p className="text-sm text-white/70">24/7 real-time threat detection and response</p>
                        </div>
                      </div>
                      
                      <motion.button 
                        className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Download Security Whitepaper</span>
                        <ArrowRight className="ml-2" size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </motion.div>
          )}
          
          {/* Compliance Certifications Tab Content */}
          {activeTab === 'compliance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {complianceCertifications.map((certification, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 cursor-pointer"
                      whileHover={{ 
                        y: -5,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(59, 130, 246, 0.3)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => handleCertificationClick(certification)}
                    >
                      <div className="flex items-start">
                        <motion.div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                            certification.status === 'Certified' ? 'bg-green-500/20' : 
                            certification.status === 'Compliant' ? 'bg-blue-500/20' : 
                            'bg-yellow-500/20'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {certification.icon}
                        </motion.div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-white font-medium">{certification.name}</h3>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              certification.status === 'Certified' ? 'bg-green-500/20 text-green-400' : 
                              certification.status === 'Compliant' ? 'bg-blue-500/20 text-blue-400' : 
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {certification.status}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mt-1 mb-3">{certification.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-white/50 text-xs">
                              Since {certification.year}
                            </span>
                            <span className="text-blue-400 text-xs flex items-center">
                              View Details
                              <ChevronRight size={12} className="ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div>
                  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <FileCheck size={18} className="text-blue-400 mr-2" />
                      Compliance By Industry
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        {
                          industry: "Healthcare",
                          certifications: ["HIPAA", "SOC 2 Type II"],
                          icon: <Cross size={16} />
                        },
                        {
                          industry: "Financial Services",
                          certifications: ["PCI DSS", "SOC 2 Type II", "FINRA", "ISO 27001"],
                          icon: <DollarSign size={16} />
                        },
                        {
                          industry: "Technology",
                          certifications: ["ISO 27001", "SOC 2 Type II", "GDPR"],
                          icon: <Cpu size={16} />
                        },
                        {
                          industry: "Government",
                          certifications: ["FedRAMP (In Process)", "FIPS 140-2", "ISO 27001"],
                          icon: <Building size={16} />
                        },
                        {
                          industry: "Education",
                          certifications: ["FERPA", "SOC 2 Type II"],
                          icon: <GraduationCap size={16} />
                        }
                      ].map((industry, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-3">
                          <p className="text-white font-medium mb-2">{industry.industry}</p>
                          <div className="flex flex-wrap gap-1">
                            {industry.certifications.map((cert, idx) => (
                              <span key={idx} className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-6">
                    <h3 className="text-white font-semibold mb-3">Need Custom Compliance?</h3>
                    <p className="text-white/70 text-sm mb-4">
                      Our enterprise plan includes support for custom compliance requirements and documentation for your specific industry and location.
                    </p>
                    <motion.button
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Contact Our Compliance Team</span>
                      <ArrowRight size={14} className="ml-2" />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Compliance Timeline */}
              <AnimatedElement animation="fadeIn" delay={0.3}>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">Security & Compliance Timeline</h3>
                  
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/20 transform md:translate-x-px" />
                    
                    {[
                      {
                        year: 2021,
                        title: "SOC 2 Type I",
                        description: "Initial security certification completed",
                        icon: <Shield size={20} />,
                        side: "left"
                      },
                      {
                        year: 2022,
                        title: "GDPR & CCPA Compliance",
                        description: "Privacy frameworks implemented",
                        icon: <FileCheck size={20} />,
                        side: "right"
                      },
                      {
                        year: 2022,
                        title: "ISO 27001 Certification",
                        description: "Information security management certification",
                        icon: <Award size={20} />,
                        side: "left"
                      },
                      {
                        year: 2023,
                        title: "SOC 2 Type II",
                        description: "Ongoing compliance verification",
                        icon: <Shield size={20} />,
                        side: "right"
                      },
                      {
                        year: 2023,
                        title: "HIPAA Compliance",
                        description: "Healthcare data protection standards",
                        icon: <FileText size={20} />,
                        side: "left"
                      },
                      {
                        year: 2024,
                        title: "ISO 27018 Certification",
                        description: "Cloud privacy protection standards",
                        icon: <Database size={20} />,
                        side: "right"
                      },
                      {
                        year: 2024,
                        title: "FedRAMP Certification",
                        description: "In process for government compliance",
                        icon: <Server size={20} />,
                        side: "left",
                        inProgress: true
                      }
                    ].map((item, index) => (
                      <div key={index} className={`relative mb-8 last:mb-0 ${
                        item.side === "left" ? "md:ml-auto md:mr-8 md:pr-12 md:text-right" : "md:ml-8 md:pl-12"
                      } md:w-[calc(50%-32px)]`}>
                        <div className="flex items-center md:block mb-2">
                          <motion.div
                            className={`absolute left-0 md:left-auto ${item.side === "left" ? "md:right-0" : "md:left-0"} -translate-x-1/2 md:translate-x-0 ${
                              item.side === "left" ? "md:translate-x-1/2" : "md:-translate-x-1/2"
                            } w-8 h-8 rounded-full ${
                              item.inProgress ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                            } flex items-center justify-center z-10`}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <p className="text-blue-400 font-bold ml-10 md:ml-0">{item.year}</p>
                        </div>
                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                        <p className="text-white/70 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCertification && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertification(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <motion.div
                      className={`p-3 rounded-lg mr-4 ${
                        selectedCertification.status === 'Certified' ? 'bg-green-500/20 text-green-400' : 
                        selectedCertification.status === 'Compliant' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-yellow-500/20 text-yellow-400'
                      }`}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
                    >
                      {selectedCertification.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedCertification.name}</h3>
                      <div className="flex items-center">
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          selectedCertification.status === 'Certified' ? 'bg-green-500/20 text-green-400' : 
                          selectedCertification.status === 'Compliant' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {selectedCertification.status}
                        </span>
                        <span className="text-white/60 text-sm ml-2">Since {selectedCertification.year}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCertification(null)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="text-white/70" size={20} />
                  </button>
                </div>
                
                <p className="text-white/80 mb-6">{selectedCertification.description}</p>
                
                {selectedCertification.details && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Compliance Controls</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedCertification.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start bg-white/5 p-3 rounded-lg">
                          <CheckCircle size={16} className="text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-medium mb-2">How this benefits your business</h4>
                  <p className="text-white/70 text-sm">
                    {selectedCertification.name} compliance helps your organization maintain regulatory requirements, 
                    build customer trust, and protect sensitive information. Our certification means you can rely on Smart CRM 
                    as a secure platform that meets stringent industry standards.
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedCertification(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Download Certificate</span>
                    <ArrowRight size={14} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Icon components
const Cross = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/>
  </svg>
);


const Cpu = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const Building = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="8" y1="10" x2="16" y2="10"></line>
    <line x1="8" y1="14" x2="16" y2="14"></line>
  </svg>
);

const GraduationCap = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
  </svg>
);

const Filter = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const X = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default SecurityComplianceHub;