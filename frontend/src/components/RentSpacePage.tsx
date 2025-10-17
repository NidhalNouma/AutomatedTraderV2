import React, { useState } from 'react';
import { 
  ExternalLink,
  ArrowRight,
  DollarSign,
  Users,
  Target,
  Zap
} from 'lucide-react';
import { Card, Button } from '../ui';

const RentSpacePage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    budget: '',
    goals: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Whop signup with form data
    const whopUrl = 'https://whop.com/automated-trader-free/automatedtrader-promo/';
    window.open(whopUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Advertise with AutomatedTrader</h1>
            <p className="text-gray-400 mt-1">Reach 50,000+ serious automated traders worldwide</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Hero Content */}
          <div>
            <Card variant="gradient" padding="xl">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                    <Target className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Premium Advertising</h2>
                    <p className="text-gray-400">Reach serious automated traders</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="h-6 w-6 text-purple-400" />
                      <h3 className="text-xl font-bold text-white">$999 per week</h3>
                    </div>
                    <p className="text-purple-300/80 text-sm mb-4">
                      All-inclusive premium advertising package with guaranteed results
                    </p>
                    <ul className="space-y-2 text-purple-300/70 text-sm">
                      <li>• Featured banner placement across all pages</li>
                      <li>• Premium marketplace listing with reviews</li>
                      <li>• Sponsored content with editorial support</li>
                      <li>• Real-time analytics and performance tracking</li>
                      <li>• Dedicated account manager and 24/7 support</li>
                      <li>• Multi-platform distribution and promotion</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-bold text-white">Target Audience</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-blue-300 font-medium">50K+ Active Traders</div>
                        <div className="text-blue-300/70">Engaged automated traders</div>
                      </div>
                      <div>
                        <div className="text-blue-300 font-medium">85% Conversion</div>
                        <div className="text-blue-300/70">Industry-leading performance</div>
                      </div>
                      <div>
                        <div className="text-blue-300 font-medium">24/7 Global</div>
                        <div className="text-blue-300/70">Worldwide audience coverage</div>
                      </div>
                      <div>
                        <div className="text-blue-300 font-medium">High Income</div>
                        <div className="text-blue-300/70">Professional traders</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://whop.com/automated-trader-free/automatedtrader-promo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl"
                    >
                      <Zap className="h-6 w-6" />
                      Start Advertising Now
                      <ArrowRight className="h-6 w-6" />
                    </a>
                    <p className="text-gray-400 text-sm mt-3">
                      24-hour setup • 4-week minimum • Guaranteed results
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card variant="gradient" padding="lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Get Started Today</h3>
                <p className="text-gray-400">Tell us about your advertising goals</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    <option value="trading-signals">Trading Signals</option>
                    <option value="trading-software">Trading Software</option>
                    <option value="broker">Broker/Exchange</option>
                    <option value="education">Trading Education</option>
                    <option value="prop-firm">Prop Trading Firm</option>
                    <option value="indicators">Indicators/Tools</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Budget *
                  </label>
                  <select
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select your budget</option>
                    <option value="4000-8000">$4,000 - $8,000 (1-2 months)</option>
                    <option value="8000-16000">$8,000 - $16,000 (2-4 months)</option>
                    <option value="16000-32000">$16,000 - $32,000 (4-8 months)</option>
                    <option value="32000+">$32,000+ (8+ months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Advertising Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="What are your main advertising goals? (e.g., increase subscribers, drive sales, brand awareness)"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={ExternalLink}
                  className="w-full"
                >
                  Submit Application
                </Button>

                <p className="text-gray-500 text-xs text-center">
                  By submitting, you'll be redirected to our secure partner portal to complete your application
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentSpacePage;