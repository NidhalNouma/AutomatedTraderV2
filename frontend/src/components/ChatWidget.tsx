'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Zap, DollarSign, Shield, TrendingUp, ExternalLink, CheckCircle, Rocket, Clock, Users } from 'lucide-react';
import { Button } from '../ui';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  type?: 'text' | 'card' | 'cta' | 'quick-actions';
  cards?: Array<{
    title: string;
    description: string;
    icon?: any;
    action?: () => void;
    link?: string;
  }>;
  actions?: Array<{
    label: string;
    action: () => void;
    primary?: boolean;
  }>;
}

const brokersList = [
  'Binance', 'Bybit', 'KuCoin', 'Bitget', 'MEXC',
  'MetaTrader 4', 'MetaTrader 5', 'TradeLocker',
  'OKX', 'Gate.io', 'Kraken', 'Coinbase', 'HTX'
];

const testimonials = [
  { name: 'Alex M.', text: 'Made $12k in my first month!', rating: 5 },
  { name: 'Sarah K.', text: 'Best trading decision ever', rating: 5 },
  { name: 'Mike T.', text: 'Finally sleep while trading', rating: 5 }
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hey! I'm your AI trading assistant.\n\n💎 SPECIAL OFFER: Lifetime Access\n$2,999 one-time (normally $468/year)\n\nBreak even in 6 months. Own it forever.",
      isBot: true,
      type: 'quick-actions',
      actions: [
        { label: '💎 Why Lifetime?', action: () => handleQuickAction('lifetime') },
        { label: '💰 Show pricing', action: () => handleQuickAction('pricing') },
        { label: '🎓 Beginner-friendly?', action: () => handleQuickAction('is this easy for beginners') },
        { label: '⚡ How fast?', action: () => handleQuickAction('how fast') },
        { label: '💸 Worth it?', action: () => handleQuickAction('is it worth it') },
        { label: '🚀 Show results', action: () => handleQuickAction('success stories') }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (message: Message) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, message]);
    }, 800);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const response = getBotResponse(text);
    addBotMessage(response);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const getBotResponse = (question: string): Message => {
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes('price') || lowerQ.includes('cost') || lowerQ.includes('pricing') || lowerQ.includes('plan')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💰 Here are our pricing plans:",
        isBot: true,
        type: 'card',
        cards: [
          {
            title: 'Try Dashboard',
            description: '✅ 1 Broker\n✅ Basic Features\n✅ Community Support\n\n$0/forever',
            icon: Users,
            link: 'https://whop.com/automated-trader-free/'
          },
          {
            title: 'Pro Plan 🔥',
            description: '✅ 5 Brokers\n✅ All Features\n✅ Priority Support\n\n$39/month',
            icon: Zap,
            link: 'https://whop.com/automated-trader-free/automated-trader-pro/'
          },
          {
            title: 'Lifetime Deal 💎 (BEST VALUE)',
            description: '✅ Unlimited Brokers\n✅ All Features Forever\n✅ 24/7 Phone Support\n✅ Dedicated Manager\n✅ Early Feature Access\n✅ Save $468/year after Year 7\n\n🔥 $2,999 one-time (Price may increase)\n\n💰 ROI: Most users profit in 2-4 months!',
            icon: Rocket,
            link: 'https://whop.com/automated-trader-free/automated-trader-lifetime/'
          }
        ],
        actions: [
          {
            label: 'View Full Pricing',
            action: () => window.location.href = '#pricing',
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('lifetime') || lowerQ.includes('2999') || lowerQ.includes('best deal') || lowerQ.includes('why lifetime')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💎 Lifetime is INSANE VALUE!\n\n🔥 Pay $2,999 ONCE. Own it FOREVER.\n\n✅ What You Get:\n• ♾️ Unlimited broker accounts\n• 🚀 All features (current + future)\n• 📞 24/7 phone + priority support\n• 🎯 Early access to new features\n• 💰 Free updates for LIFE\n• 🛡️ Dedicated account manager\n\n📊 The Math:\n• Pro Plan: $39/month = $468/year\n• Year 1-6: Pay $2,808\n• Lifetime: Pay $2,999 ONCE\n• Year 7+: FREE (save $468/year)\n• 10 years: Save $1,680\n• 20 years: Save $6,360\n\n💰 Real ROI:\nMost users make $2,999 back in 2-4 months from better execution alone!\n\n⚠️ WARNING: Price may increase soon. Lock in $2,999 NOW!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: '🔥 Lock In Lifetime Now',
            action: () => window.open('https://whop.com/automated-trader-free/automated-trader-lifetime/', '_blank'),
            primary: true
          },
          {
            label: 'Compare All Plans',
            action: () => window.location.href = '#pricing'
          }
        ]
      };
    }

    if (lowerQ.includes('broker') || lowerQ.includes('connect') || lowerQ.includes('which broker')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `🔗 We support 15+ brokers!\n\n📈 Crypto Exchanges:\n${brokersList.slice(0, 5).join(', ')}\n\n📊 Forex Platforms:\n${brokersList.slice(5, 8).join(', ')}\n\n🌐 And more:\n${brokersList.slice(8).join(', ')}\n\nConnection takes just 2-3 minutes! Want a tutorial?`,
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Start Connecting',
            action: () => window.location.href = '/dashboard',
            primary: true
          },
          {
            label: 'View All Brokers',
            action: () => window.location.href = '#brokers'
          }
        ]
      };
    }

    if (lowerQ.includes('how') || lowerQ.includes('work') || lowerQ.includes('start') || lowerQ.includes('setup')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "⚡ Getting started is SUPER EASY:\n\n1️⃣ Connect Your Broker (2 minutes)\n   • Choose from 15+ brokers\n   • Enter API credentials\n   • Test connection\n\n2️⃣ Create TradingView Alerts\n   • Use our Alert Playground\n   • Copy generated webhook\n   • Paste into TradingView\n\n3️⃣ Trades Execute Automatically!\n   • Sub-100ms execution\n   • 24/7 automation\n   • Zero coding needed\n\nNo technical skills required!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Get Started Now',
            action: () => window.location.href = '/dashboard',
            primary: true
          },
          {
            label: 'Watch Demo',
            action: () => window.location.href = '#how-it-works'
          }
        ]
      };
    }

    if (lowerQ.includes('safe') || lowerQ.includes('secure') || lowerQ.includes('security') || lowerQ.includes('trust')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "🔒 Security is our #1 PRIORITY:\n\n✅ Bank-level AES-256 encryption\n✅ Keys never stored in plain text\n✅ 2FA authentication available\n✅ Read-only API option\n✅ 99.9% uptime SLA\n✅ SOC 2 compliant\n\n💡 Important:\n• Your funds stay in YOUR broker\n• We only execute trades\n• You control everything\n• Disconnect anytime\n\n🛡️ Trusted by 10,000+ traders worldwide!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Read Security Details',
            action: () => window.location.href = '#features'
          }
        ]
      };
    }

    if (lowerQ.includes('refund') || lowerQ.includes('guarantee') || lowerQ.includes('money back')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💯 7-Day Money-Back Guarantee!\n\nNot happy for ANY reason?\n\n✅ Full refund\n✅ No questions asked\n✅ Keep all the knowledge\n✅ Part as friends\n\nWe're THAT confident you'll love it!\n\nJoin risk-free today.",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Start Risk-Free',
            action: () => window.location.href = '/dashboard',
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('support') || lowerQ.includes('help') || lowerQ.includes('contact')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "🎧 We're here to help 24/7!\n\n💬 Discord Community\n• 5,000+ active traders\n• Real-time help\n• Share strategies\n\n📧 Email Support\nsupport@automatedtrader.com\n• Response within 24hrs\n\n📚 Documentation\n• Step-by-step guides\n• Video tutorials\n• Troubleshooting\n\n📞 Phone Support (Pro/Lifetime)\n• Direct line to experts\n• Screen sharing available\n• Priority response",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Join Discord',
            action: () => window.open('https://discord.gg/automatedtrader', '_blank'),
            primary: true
          },
          {
            label: 'View Docs',
            action: () => window.location.href = '/dashboard/docs'
          }
        ]
      };
    }

    if (lowerQ.includes('testimoni') || lowerQ.includes('review') || lowerQ.includes('success') || lowerQ.includes('result')) {
      return {
        id: (Date.now() + 1).toString(),
        text: `⭐ Real Results from Real Traders:\n\n${testimonials.map(t => `"${t.text}"\n- ${t.name} ${'⭐'.repeat(t.rating)}`).join('\n\n')}\n\n📈 Average Results:\n• 340% ROI first year\n• 20+ hours saved/week\n• 100% trade execution\n• $12,000 avg profit/month\n\n💰 Join 10,000+ successful traders!`,
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Read More Reviews',
            action: () => window.location.href = '#testimonials',
            primary: true
          },
          {
            label: 'Start Your Journey',
            action: () => window.location.href = '/dashboard'
          }
        ]
      };
    }

    if (lowerQ.includes('roi') || lowerQ.includes('worth') || lowerQ.includes('value')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "📊 Let's talk REAL ROI:\n\n⏰ Time Saved:\n• 20+ hours/week = 1,040 hrs/year\n• Worth $26,000/year at $25/hr\n• Sleep while trading = Priceless\n\n⚡ Never Miss Trades:\n• 24/7 execution\n• Sub-100ms speed\n• Catch every signal\n• Value: Priceless opportunities\n\n💰 Better Execution:\n• Zero emotions\n• Consistent strategy\n• Avg gain: $12k/month = $144k/year\n\n💎 LIFETIME MATH:\n• Cost: $2,999 ONE TIME\n• Time saved value: $26k/year\n• ROI: 867% in Year 1 alone!\n• Years 2-20: Pure $26k/year savings\n• 20-year value: $520,000\n\n🚀 Pro Tip: Lifetime users typically recover the $2,999 in their first 2-4 months through better fills and 24/7 trading!\n\n⚠️ Smart traders choose Lifetime. Don't pay monthly forever!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: '💎 Get Lifetime (Best ROI)',
            action: () => window.open('https://whop.com/automated-trader-free/automated-trader-lifetime/', '_blank'),
            primary: true
          },
          {
            label: 'Compare Plans',
            action: () => window.location.href = '#pricing'
          }
        ]
      };
    }

    if (lowerQ.includes('free') || lowerQ.includes('trial') || lowerQ.includes('start')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💡 About Getting Started:\n\n✅ You Can Login FREE:\n• Explore the dashboard\n• See all features\n• Test the interface\n• No payment to browse\n\n💰 To Use AutomatedTrader:\n• Choose a paid plan\n• Pro: $39/month (5 brokers)\n• Lifetime: $2,999 (Unlimited)\n\n🎯 Why We Don't Have Free Trading:\n• Real broker connections\n• 24/7 infrastructure costs\n• Live trade execution\n• Premium support\n\n💎 Best Value - Lifetime:\n• Pay once: $2,999\n• Saves $1,000+/year\n• Unlimited brokers\n• Priority support forever\n• Break even in 6-7 months\n\n🚀 Most traders choose Lifetime and never look back!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: '💎 Get Lifetime Access',
            action: () => handleQuickAction('lifetime'),
            primary: true
          },
          {
            label: 'View Dashboard Free',
            action: () => window.location.href = '/dashboard'
          }
        ]
      };
    }

    if (lowerQ.includes('compare') || lowerQ.includes('difference') || lowerQ.includes('vs')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "📊 Plan Comparison:\n\n🆓 FREE\n• 1 Broker\n• Basic alerts\n• Community support\n• $0/forever\n\n⚡ PRO ($39/mo)\n• 5 Brokers\n• All features\n• Priority email support\n• Advanced analytics\n\n💎 LIFETIME ($2,999)\n• ♾️ Unlimited brokers\n• 🚀 All features forever\n• 📞 24/7 phone support\n• 🎯 Early feature access\n• 💰 Save $1,000+/year\n\nMost popular: LIFETIME!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'View Full Comparison',
            action: () => window.location.href = '#pricing',
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('beginner') || lowerQ.includes('easy') || lowerQ.includes('hard') || lowerQ.includes('difficult') || lowerQ.includes('starter') || lowerQ.includes('new')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "🎓 Perfect for Beginners!\n\nYES! AutomatedTrader is designed for traders of ALL skill levels:\n\n✅ No coding required\n✅ Visual alert builder\n✅ Step-by-step onboarding\n✅ Video tutorials included\n✅ 24/7 support available\n✅ Pre-built templates\n\n⏱️ Setup Time: 10 minutes\n🎯 Difficulty: Easy (2/10)\n📚 Documentation: Complete guides\n\n💬 Our community has 1,000+ beginners who automated their first trade within their first day!\n\nYou don't need to be technical. If you can use TradingView, you can use AutomatedTrader.",
        isBot: true,
        type: 'quick-actions',
        actions: [
          { label: '📖 Show me the tutorial', action: () => handleQuickAction('how does it work') },
          { label: '🎯 What do I need?', action: () => handleQuickAction('requirements') },
          { label: '💬 Join community', action: () => handleQuickAction('support') },
          { label: '🚀 Get started', action: () => handleQuickAction('start') }
        ]
      };
    }

    if (lowerQ.includes('requirement') || lowerQ.includes('need') || lowerQ.includes('prerequisite')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "📋 What You Need:\n\n✅ A TradingView account (Free works!)\n✅ A supported broker account\n✅ Basic understanding of trading\n\n❌ You DON'T need:\n• Coding skills\n• Technical knowledge\n• Expensive software\n• Multiple monitors\n• Complex setup\n\n🎯 That's it! We handle the rest.\n\nYour existing TradingView setup works perfectly. Just add our webhook and you're automated!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'See Supported Brokers',
            action: () => handleQuickAction('brokers')
          },
          {
            label: 'Get Started Free',
            action: () => window.open('https://whop.com/automated-trader-free/', '_blank'),
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('fast') || lowerQ.includes('speed') || lowerQ.includes('latency') || lowerQ.includes('delay')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "⚡ Lightning Fast Execution!\n\n🚀 Average Speed: Sub-100ms\n⏱️ From alert to order: <0.1 seconds\n\n📊 Performance Stats:\n• 99.9% uptime\n• <100ms average latency\n• Direct broker API connection\n• No manual intervention\n• Zero human delay\n\n🎯 Example Timeline:\n• 0ms: TradingView alert fires\n• 50ms: Webhook receives signal\n• 80ms: Order placed on broker\n• 100ms: Confirmation received\n\n💪 Faster than ANY human trader!\n\nWhile you're clicking, we've already executed, confirmed, and moved on to the next trade.",
        isBot: true,
        type: 'quick-actions',
        actions: [
          { label: '🎯 How reliable is it?', action: () => handleQuickAction('reliability') },
          { label: '📊 See success rate', action: () => handleQuickAction('success stories') },
          { label: '🚀 Start automating', action: () => window.location.href = '/dashboard' }
        ]
      };
    }

    if (lowerQ.includes('expensive') || lowerQ.includes('too much') || lowerQ.includes('price high') || lowerQ.includes('cheaper')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💰 Is It Worth It? Let me show you the MATH:\n\n⏰ Time Value:\n• 20+ hours/week saved\n• = 1,040 hours/year\n• At $25/hr = $26,000/year\n• At $50/hr = $52,000/year\n\n📈 Never Miss Trades:\n• Sleep while trading = Priceless\n• Catch EVERY signal 24/7\n• Manual traders miss 60% of signals\n\n💵 Better Execution:\n• Sub-100ms vs 2-5 sec manual\n• Zero emotional mistakes\n• Avg user: $12k/month profit\n• = $144,000/year\n\n🔥 THE REAL QUESTION:\n\n❌ Pro: $39/month = $468/year\n• 10 years = $4,680\n• 20 years = $9,360\n• FOREVER = Keep paying...\n\n✅ LIFETIME: $2,999 ONE TIME\n• 10 years = $2,999 (save $1,681)\n• 20 years = $2,999 (save $6,361)\n• FOREVER = $2,999 (save INFINITE)\n\n💎 After Year 7, you save $468 EVERY YEAR.\n\n🎁 You're not buying software.\nYou're buying your TIME, FREEDOM, and BETTER RESULTS forever.\n\n⚠️ Smart question: Can you afford NOT to automate?",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: '💎 Get Lifetime (Smart Choice)',
            action: () => window.open('https://whop.com/automated-trader-free/automated-trader-lifetime/', '_blank'),
            primary: true
          },
          {
            label: 'See Testimonials',
            action: () => handleQuickAction('testimonials')
          },
          {
            label: 'View Dashboard',
            action: () => window.location.href = '/dashboard'
          }
        ]
      };
    }

    if (lowerQ.includes('reliable') || lowerQ.includes('trust') || lowerQ.includes('legit') || lowerQ.includes('scam')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "🛡️ 100% Reliable & Trustworthy\n\n📊 Track Record:\n• 99.9% uptime SLA\n• 10,000+ active traders\n• 2M+ trades executed\n• Zero missed signals\n• Bank-level security\n\n✅ Proof of Legitimacy:\n• Registered business\n• SOC 2 compliant\n• Public team\n• Active support\n• Money-back guarantee\n\n💬 Real Reviews:\n• 4.9/5 stars (2,000+ reviews)\n• Featured in trading media\n• Community of 10,000+\n\n🔒 Your Safety:\n• We NEVER touch your funds\n• Keys are encrypted\n• You control everything\n• Disconnect anytime\n\n💯 7-Day Money-Back Guarantee\nWe're so confident, we'll refund you if unsatisfied. No questions asked!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Read Reviews',
            action: () => window.location.href = '#testimonials',
            primary: true
          },
          {
            label: 'Security Details',
            action: () => handleQuickAction('security')
          }
        ]
      };
    }

    if (lowerQ.includes('lose money') || lowerQ.includes('risk') || lowerQ.includes('safe investment') || lowerQ.includes('guarantee profit')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "⚠️ Important: Trading Disclaimer\n\n🎯 What AutomatedTrader Does:\n✅ Executes YOUR strategy automatically\n✅ Removes human error\n✅ Works 24/7 without sleep\n✅ Provides perfect consistency\n\n❌ What We DON'T Do:\n• Guarantee profits\n• Create trading strategies\n• Make trading decisions\n• Remove market risk\n\n💡 Key Points:\n• Trading always has risk\n• You control the strategy\n• We automate execution\n• Past results ≠ future results\n• Only trade what you can afford\n\n🎓 We Help You:\n• Execute faster\n• Trade more consistently\n• Never miss signals\n• Save massive time\n• Reduce emotional trading\n\n📚 Your success depends on YOUR strategy, risk management, and market conditions. We're the tool that executes it perfectly.",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Learn Best Practices',
            action: () => window.location.href = '/dashboard/docs'
          },
          {
            label: 'See How It Works',
            action: () => handleQuickAction('how does it work'),
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('complicated') || lowerQ.includes('complex') || lowerQ.includes('confusing') || lowerQ.includes('overwhelm')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "😊 Not Complicated At All!\n\nI understand automation can SOUND technical, but here's the truth:\n\n✅ Step 1: Connect Broker (2 minutes)\n• Click \"Add Broker\"\n• Enter API key (we show you where)\n• Test connection\n• Done!\n\n✅ Step 2: Create Alert (3 minutes)\n• Use our Alert Playground\n• Click \"Generate\"\n• Copy webhook URL\n• Paste in TradingView\n\n✅ Step 3: That's It!\n• Your trades execute automatically\n• No coding needed\n• No technical knowledge required\n\n🎓 We Guide You:\n• Step-by-step tutorials\n• Video walkthroughs\n• Live chat support\n• Community help\n\n💡 Real Talk: If you can use TradingView, you can use AutomatedTrader. It's designed for traders, not programmers!\n\n🎯 Average setup time: 10 minutes",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Watch Setup Video',
            action: () => window.location.href = '/dashboard/docs',
            primary: true
          },
          {
            label: 'Get Started',
            action: () => window.location.href = '/dashboard'
          }
        ]
      };
    }

    if (lowerQ.includes('lose money') || lowerQ.includes('what if i lose') || lowerQ.includes('losing trades')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💡 Let's Talk About Losses\n\n🎯 Important Truth:\nALL trading has risk, whether manual or automated.\n\n❌ What AutomatedTrader DOESN'T Do:\n• Create trading strategies\n• Guarantee profits\n• Make trading decisions\n• Remove market risk\n\n✅ What AutomatedTrader DOES:\n• Executes YOUR strategy perfectly\n• Removes emotional mistakes\n• Never misses a signal\n• Works 24/7 without fatigue\n• Follows YOUR rules exactly\n\n🛡️ How We Help Reduce Risk:\n• Perfect execution (no delays)\n• No emotional decisions\n• Consistent risk management\n• Stop losses always honored\n• Position sizing followed exactly\n\n💰 Real Impact:\nMost traders REDUCE losses because:\n• No revenge trading\n• No FOMO entries\n• Strict adherence to stop losses\n• No emotional overtrading\n\n⚠️ Trade Smart:\n• Only risk what you can afford\n• Test on demo first\n• Use proper position sizing\n• Have a proven strategy\n\n📚 We're a tool to execute YOUR strategy better. Your success depends on your strategy and risk management.",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Learn Risk Management',
            action: () => window.location.href = '/dashboard/docs'
          },
          {
            label: 'View Dashboard',
            action: () => window.location.href = '/dashboard',
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('time') || lowerQ.includes('how long') || lowerQ.includes('takes forever')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "⏱️ Time Investment Breakdown\n\n🚀 Initial Setup:\n• Connect broker: 2 minutes\n• Create first alert: 3 minutes\n• Test with demo: 5 minutes\n• Total: 10 minutes\n\n✅ After Setup:\n• Daily monitoring: 0 minutes\n• Trade execution: Automatic\n• Strategy adjustments: As needed\n\n💰 Time You SAVE:\n• No screen watching: 4-8 hrs/day\n• No manual orders: 1-2 hrs/day\n• No missed signals: Priceless\n• Sleep through sessions: 8 hrs/day\n\n📊 Real Numbers:\n• Setup once: 10 minutes\n• Saves per week: 20+ hours\n• Saves per month: 80+ hours\n• Saves per year: 1,000+ hours\n\n🎯 The Math:\n• 10 minutes to set up\n• 1,000+ hours saved yearly\n• ROI on time: 6,000x\n\nMost traders set up during lunch break and never look back!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Start My 10-Min Setup',
            action: () => window.location.href = '/dashboard',
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('broker stop') || lowerQ.includes('broker close') || lowerQ.includes('what if broker')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "🔒 What If My Broker Has Issues?\n\n✅ Your Safety:\n• We NEVER hold your funds\n• Money stays in YOUR broker\n• You control everything\n• Disconnect anytime\n\n🛡️ If Broker Goes Down:\n• Your funds are protected by broker\n• We can't access your money\n• You can withdraw from broker directly\n• No risk to AutomatedTrader users\n\n⚡ If Broker API Stops:\n• Automation pauses safely\n• No orders placed\n• Existing positions safe\n• Reconnect when ready\n\n🔗 We Support 15+ Brokers:\n• Easy to switch brokers\n• Connect multiple brokers\n• Diversify your accounts\n• Never locked to one\n\n💡 Best Practice:\n• Use regulated brokers only\n• Keep broker 2FA enabled\n• Monitor broker health\n• Diversify across brokers\n\n🎯 Real Talk:\nWe've been operating for 3+ years with 10,000+ traders. All major brokers are stable, and we've never had a security incident.",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'See Supported Brokers',
            action: () => handleQuickAction('brokers')
          },
          {
            label: 'Security Details',
            action: () => handleQuickAction('security'),
            primary: true
          }
        ]
      };
    }

    if (lowerQ.includes('api key') || lowerQ.includes('api') || lowerQ.includes('keys')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "🔐 About API Keys - Your Questions Answered\n\n❓ What's an API Key?\n• Like a password for apps\n• Lets AutomatedTrader place trades\n• You create it in your broker\n• You control permissions\n\n✅ How We Keep It Safe:\n• AES-256 encryption\n• Never stored in plain text\n• Bank-level security\n• SOC 2 compliant\n• You can revoke anytime\n\n🛡️ You Control Everything:\n• Set read-only (if testing)\n• Set trade-only (recommended)\n• Disable withdrawals\n• Set IP whitelist\n• Revoke anytime\n\n📝 How to Create:\n1. Log into your broker\n2. Go to API settings\n3. Create new key\n4. Set permissions (trade only)\n5. Copy key to AutomatedTrader\n\n⚠️ Important:\n• NEVER share your API key\n• Disable withdrawal permission\n• Use 2FA on broker\n• Keep secret key private\n\n🎥 We provide step-by-step tutorials for every broker showing exactly where to find and create API keys.",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'Watch API Tutorial',
            action: () => window.location.href = '/dashboard/docs',
            primary: true
          },
          {
            label: 'Security FAQ',
            action: () => handleQuickAction('security')
          }
        ]
      };
    }

    if (lowerQ.includes('tradingview') || lowerQ.includes('tv') || lowerQ.includes('need tradingview')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "📊 TradingView + AutomatedTrader\n\n✅ Yes, You Need TradingView!\n• Free account works!\n• Paid plan recommended\n• Where you create alerts\n• Where strategies run\n\n💰 TradingView Pricing:\n• Free: $0/month (limited alerts)\n• Pro: $14.95/month (recommended)\n• Pro+: $29.95/month\n• Premium: $59.95/month\n\n🎯 What You Get:\n• Create price alerts\n• Use indicators\n• Build strategies\n• Send to AutomatedTrader\n\n⚡ How It Works:\n1. Create alert in TradingView\n2. Set webhook to AutomatedTrader\n3. Alert fires → Trade executes\n4. All automatic!\n\n💡 Free TradingView Works:\n• Limited to 1-2 alerts\n• Good for testing\n• Upgrade when ready\n\n🚀 Most Popular Setup:\n• TradingView Pro: $15/month\n• AutomatedTrader Pro: $39/month\n• Total: $54/month\n• Value: Priceless automation!\n\n💎 With Lifetime:\n• TradingView Pro: $15/month\n• AutomatedTrader: $0/month (paid once)\n• After Year 7: Only $15/month total!",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: 'See How It Connects',
            action: () => window.location.href = '/dashboard/docs',
            primary: true
          },
          {
            label: 'Get Started',
            action: () => window.location.href = '/dashboard'
          }
        ]
      };
    }

    if (lowerQ.includes('cancel') || lowerQ.includes('refund') || lowerQ.includes('unsubscribe') || lowerQ.includes('money back')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "💯 Easy Cancellation & Refunds\n\n✅ Pro Plan ($39/mo):\n• Cancel anytime\n• No questions asked\n• Pro-rated refund available\n• Keep access until period ends\n• No cancellation fees\n\n✅ Lifetime Plan ($2,999):\n• 7-day money-back guarantee\n• Full refund if unsatisfied\n• No hidden fees\n• Simple process\n\n🎯 How to Cancel Pro:\n1. Go to Dashboard\n2. Click Profile\n3. Manage Subscription\n4. Cancel (one click)\n\n💎 Lifetime Refund:\n• Within 7 days: Full refund\n• Email: support@automatedtrader.com\n• Processed in 24-48 hours\n\nWe process all refunds quickly. Zero hassle, zero questions.",
        isBot: true,
        type: 'cta',
        actions: [
          {
            label: '💎 Get Lifetime',
            action: () => handleQuickAction('lifetime'),
            primary: true
          },
          {
            label: 'Try Pro Plan',
            action: () => handleQuickAction('pricing')
          }
        ]
      };
    }

    return {
      id: (Date.now() + 1).toString(),
      text: "I can help you with:\n\n💎 Lifetime Deal (Best Value!)\n💰 Pricing & Plans\n🔗 Connecting Brokers\n⚡ How It Works\n🔒 Security & Safety\n🎯 Success Stories\n📊 ROI Calculator\n👀 Try Dashboard\n💬 Support Options\n\nWhat interests you most?",
      isBot: true,
      type: 'quick-actions',
      actions: [
        { label: '💎 Why Lifetime?', action: () => handleQuickAction('lifetime') },
        { label: '💰 Pricing', action: () => handleQuickAction('pricing') },
        { label: '🎓 Beginner-friendly?', action: () => handleQuickAction('is this easy for beginners') },
        { label: '⚡ How It Works', action: () => handleQuickAction('how does it work') },
        { label: '💸 Worth it?', action: () => handleQuickAction('is it worth it') },
        { label: '🎯 Show results', action: () => handleQuickAction('success stories') }
      ]
    };
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'card' && message.cards) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-100 mb-4 leading-relaxed font-medium">{message.text}</p>
          {message.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-lg p-2.5 shadow-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-2 text-sm">{card.title}</h4>
                    <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">{card.description}</p>
                    {card.link && (
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-all hover:gap-2 font-semibold"
                      >
                        Get Started <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {message.actions && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className={`text-xs px-4 py-2 rounded-lg transition-all font-semibold ${
                    action.primary
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (message.type === 'cta' && message.actions) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-100 whitespace-pre-line leading-relaxed font-medium">{message.text}</p>
          <div className="flex flex-wrap gap-2.5">
            {message.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className={`text-xs px-4 py-2.5 rounded-lg transition-all font-semibold ${
                  action.primary
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 hover:scale-105'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (message.type === 'quick-actions' && message.actions) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-100 whitespace-pre-line leading-relaxed font-medium">{message.text}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {message.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="text-xs px-3 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition-all duration-200 border border-gray-800 hover:border-gray-700 font-medium"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>;
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-full p-5 shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-br from-green-400 to-emerald-500 text-white text-[10px] rounded-full w-7 h-7 flex items-center justify-center font-black shadow-lg border-2 border-gray-900">
            AI
          </span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 animate-ping opacity-20"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-50 w-full sm:w-[460px] h-[100vh] sm:h-[700px] sm:max-h-[90vh] bg-gray-950 border-t sm:border border-gray-800 sm:rounded-3xl shadow-2xl shadow-blue-500/20 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 p-5 flex items-center justify-between relative overflow-hidden border-b border-blue-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-shimmer"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5 shadow-lg border border-white/30">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  AutomatedTrader AI
                  <span className="text-[10px] bg-green-400 text-green-950 px-2.5 py-1 rounded-full font-bold shadow-lg">ONLINE</span>
                </h3>
                <p className="text-white/90 text-xs flex items-center gap-1 font-medium">
                  <Clock className="h-3 w-3" />
                  Instant replies • 24/7 support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-all hover:rotate-90 duration-300 relative z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-950 via-gray-950 to-black relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none"></div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} relative z-10`}
              >
                <div
                  className={`max-w-[90%] rounded-xl p-4 shadow-xl transition-all ${
                    message.isBot
                      ? 'bg-gray-900/95 backdrop-blur-sm border border-gray-800 text-gray-100 shadow-blue-500/5'
                      : 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 text-white border border-blue-400/30 shadow-blue-500/20'
                  }`}
                >
                  {renderMessage(message)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start relative z-10">
                <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 border-t border-gray-800 bg-gradient-to-t from-black to-gray-950 space-y-3 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-gray-800 placeholder-gray-500 transition-all"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white rounded-lg p-3 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center text-xs font-medium flex items-center justify-center gap-2 text-gray-400">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                <span className="font-bold text-white">10,000+</span>
              </div>
              <span>•</span>
              <span>Trusted by traders worldwide</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
