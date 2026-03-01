'use client';

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Rocket, Trophy, Target, Lightbulb, Code, Calendar, Award, Star, Zap, CheckCircle, ArrowRight, ChevronDown, Sparkles, BookOpen, Users, Clock, DollarSign, Medal, TrendingUp, BarChart3, MessageSquare, Presentation, Shield } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export default function InteractiveJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const [activeSection, setActiveSection] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const [criteriaScores, setCriteriaScores] = useState({
    impact: 0,
    innovation: 0,
    communication: 0,
    feasibility: 0
  });

  const sections = [
    { id: 'timeline', name: 'Timeline', icon: Calendar },
    { id: 'prizes', name: 'Prizes', icon: Trophy },
    { id: 'criteria', name: 'Judging', icon: Target },
    { id: 'discovery', name: 'Discovery', icon: Lightbulb },
    { id: 'challenges', name: 'Challenges', icon: Code }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950">
      {/* Fixed Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Rocket className="w-6 h-6 text-blue-400 group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-white font-bold text-xl">Solution Challenge 2026</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === idx
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm font-medium">{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(66,133,244,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(234,67,53,0.15),transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mb-8"
          >
            <Sparkles className="w-20 h-20 text-yellow-400" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Interactive Journey
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the 2026 GDG Solution Challenge through an immersive, interactive experience
          </p>

          <motion.button
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16"
          >
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <TimelineSection setActiveSection={setActiveSection} />

      {/* Prizes Section */}
      <PrizesSection setActiveSection={setActiveSection} selectedPrize={selectedPrize} setSelectedPrize={setSelectedPrize} />

      {/* Judging Criteria Section */}
      <JudgingCriteriaSection setActiveSection={setActiveSection} criteriaScores={criteriaScores} setCriteriaScores={setCriteriaScores} />

      {/* Problem Discovery Section */}
      <ProblemDiscoverySection setActiveSection={setActiveSection} />

      {/* Technical Challenges Section */}
      <TechnicalChallengesSection setActiveSection={setActiveSection} />

      {/* Footer CTA */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start creating your solution today and make an impact!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow-2xl shadow-green-500/50"
                >
                  Browse Resources
                </motion.button>
              </Link>
              <motion.a
                href="https://developers.google.com/community/gdg/solutions-challenge"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold hover:bg-white/20 transition-all duration-300"
              >
                Official Challenge →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Timeline Section Component
function TimelineSection({ setActiveSection }: { setActiveSection: (idx: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) setActiveSection(0);
  }, [isInView, setActiveSection]);

  const milestones = [
    {
      title: 'Solution Challenge Launch',
      date: 'February 17, 2026',
      description: 'Participants submit their entries between February 17 April 20, 2026',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500',
      completed: true
    },
    {
      title: 'Initial Submission Deadline',
      date: 'April 20, 2026',
      description: 'Participants submit their entries between February 17 April 20, 2026',
      icon: BookOpen,
      color: 'from-red-500 to-orange-500',
      completed: false
    },
    {
      title: 'Preliminary Judging',
      date: 'April 23 - May 7, 2026',
      description: 'Entries will be evaluated to entries will be ennie evaluated to select 10 entries.',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      completed: false
    },
    {
      title: 'Finalists Submission Deadline',
      date: 'June 12, 2026',
      description: '10 Finalists will have a chance to refine and resubmit entries w12 with mentorship from Google Developer across Product Areas.',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      completed: false
    },
    {
      title: 'Regional Demo Day',
      date: 'July 10, 2026',
      description: 'Top 3 Winners Announced - During Regional Demo Day, winning teams are announced',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      completed: false
    }
  ];

  return (
    <section id="timeline" ref={ref} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Timeline
          </h2>
          <p className="text-xl text-gray-400">Your journey from idea to impact</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block" />

          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`flex items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
              >
                <div className={`w-full md:w-5/12 ${isEven ? 'text-right' : 'text-left'} text-center md:text-inherit`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${milestone.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-lg font-semibold text-purple-400 mb-3">{milestone.date}</p>
                    <p className="text-gray-400">{milestone.description}</p>
                    {milestone.completed && (
                      <div className="mt-4 flex items-center gap-2 justify-center md:justify-end">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Completed</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className="w-2/12 flex justify-center my-4 md:my-0">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg`}
                  >
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </motion.div>
                </div>

                <div className="w-full md:w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Prizes Section Component
function PrizesSection({ setActiveSection, selectedPrize, setSelectedPrize }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) setActiveSection(1);
  }, [isInView, setActiveSection]);

  const prizeTiers = [
    {
      id: 'all',
      title: 'All Contestants',
      color: 'from-gray-500 to-gray-600',
      icon: Users,
      prizes: [
        { name: 'Google Developer Program Badge', icon: Award },
        { name: 'Google Cloud Credits ($5 voucher)', icon: DollarSign }
      ]
    },
    {
      id: 'final10',
      title: 'Final 10',
      color: 'from-purple-500 to-pink-500',
      icon: Medal,
      prizes: [
        { name: 'Expert Mentorship', icon: Users },
        { name: 'Regional Demo Day Presentation', icon: Presentation },
        { name: 'Digital Certificate: Final 10', icon: Award }
      ]
    },
    {
      id: 'peoples',
      title: "People's Choice",
      color: 'from-blue-500 to-cyan-500',
      icon: Star,
      prizes: [
        { name: "Digital Certificate: People's Choice", icon: Award },
        { name: 'Google Cloud Credits', icon: DollarSign },
        { name: 'Featured posts on North America GDG social channel(s)', icon: TrendingUp }
      ]
    },
    {
      id: 'winning3',
      title: 'Winning 3',
      color: 'from-yellow-500 to-orange-500',
      icon: Trophy,
      prizes: [
        { name: 'All expenses paid visit to Google office for 1-day in-person Demo Day experience', icon: Trophy },
        { name: 'Google branded SWAG (ARV >$100)', icon: Award },
        { name: 'Digital Certificate: Winning 3', icon: Award },
        { name: 'Featured posts on North America GDG social channel(s)', icon: TrendingUp }
      ]
    }
  ];

  return (
    <section id="prizes" ref={ref} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Prizes & Rewards
          </h2>
          <p className="text-xl text-gray-400">Amazing prizes await the best solutions!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizeTiers.map((tier, idx) => {
            const Icon = tier.icon;
            const isSelected = selectedPrize === tier.id;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, rotateY: isSelected ? 0 : 5 }}
                onClick={() => setSelectedPrize(isSelected ? null : tier.id)}
                className={`relative cursor-pointer perspective-1000`}
              >
                <div className={`relative bg-gradient-to-br ${tier.color} p-1 rounded-2xl transition-all duration-500 ${
                  isSelected ? 'shadow-2xl scale-105' : 'shadow-lg'
                }`}>
                  <div className="bg-gray-950 rounded-2xl p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8 text-white" />
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </motion.div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-6">{tier.title}</h3>

                    <div className="space-y-3">
                      {tier.prizes.map((prize, pidx) => {
                        const PrizeIcon = prize.icon;
                        return (
                          <motion.div
                            key={pidx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isSelected ? 1 : 0.7, x: 0 }}
                            transition={{ delay: isSelected ? pidx * 0.1 : 0 }}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <PrizeIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{prize.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8"
        >
          Click on any tier to highlight it!
        </motion.p>
      </div>
    </section>
  );
}

// Judging Criteria Section Component
function JudgingCriteriaSection({ setActiveSection, criteriaScores, setCriteriaScores }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) setActiveSection(2);
  }, [isInView, setActiveSection]);

  const criteria = [
    {
      id: 'impact',
      title: 'Impact & Value',
      color: 'from-blue-500 to-cyan-500',
      icon: TrendingUp,
      points: 5,
      questions: [
        'Does the solution offer tangible benefits to the business?',
        'Does the team describe the success of their solution using metrics, goals, outcomes, or cause and effects?',
        'What is the potential reach and significance of the solution?'
      ]
    },
    {
      id: 'innovation',
      title: 'Innovation & Creativity',
      color: 'from-red-500 to-pink-500',
      icon: Lightbulb,
      points: 5,
      questions: [
        'Does the solution effectively leverage Google technology in a creative way?',
        'Does the solution offer a new approach or perspective to the problem?'
      ]
    },
    {
      id: 'communication',
      title: 'Communication & Presentation',
      color: 'from-yellow-500 to-orange-500',
      icon: MessageSquare,
      points: 5,
      questions: [
        'Is the solution explained in a clear, concise, and understandable manner?',
        'Are diagrams, mockups, or prototypes used effectively?',
        'How well is the solution presented? Is it persuasive and engaging?'
      ]
    },
    {
      id: 'feasibility',
      title: 'Feasibility & Functionality',
      color: 'from-green-500 to-emerald-500',
      icon: Shield,
      points: 5,
      questions: [
        'How well does the solution actually solve the stated problem?',
        'Can the solution be realistically implemented with available technology?',
        'Is the technical implementation well-executed with proper coding, design, and architecture?',
        'Does the solution optimize resources (time, cost, labor)?'
      ]
    }
  ];

  return (
    <section id="criteria" ref={ref} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Judging Criteria
          </h2>
          <p className="text-xl text-gray-400">Interactive scoring dashboard - Try adjusting the sliders!</p>
        </motion.div>

        {/* Total Score Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-12 bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-3xl"
        >
          <div className="bg-gray-950 rounded-3xl p-8 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Score</p>
            <motion.p
              key={Object.values(criteriaScores).reduce((a, b) => a + b, 0)}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-black text-white"
            >
              {Object.values(criteriaScores).reduce((a, b) => a + b, 0)}
              <span className="text-3xl text-gray-400"> / 20</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Criteria Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {criteria.map((criterion, idx) => {
            const Icon = criterion.icon;
            const score = criteriaScores[criterion.id as keyof typeof criteriaScores];

            return (
              <motion.div
                key={criterion.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${criterion.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{criterion.title}</h3>
                      <p className="text-sm text-gray-400">{criterion.points} points</p>
                    </div>
                  </div>
                  <motion.div
                    key={score}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-black text-white"
                  >
                    {score}
                  </motion.div>
                </div>

                {/* Interactive Slider */}
                <div className="mb-6">
                  <input
                    type="range"
                    min="0"
                    max={criterion.points}
                    value={score}
                    onChange={(e) => setCriteriaScores({
                      ...criteriaScores,
                      [criterion.id]: parseInt(e.target.value)
                    })}
                    className="w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, 
                        hsl(${(score / criterion.points) * 120}, 70%, 50%) 0%, 
                        hsl(${(score / criterion.points) * 120}, 70%, 50%) ${(score / criterion.points) * 100}%, 
                        rgb(55, 65, 81) ${(score / criterion.points) * 100}%, 
                        rgb(55, 65, 81) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>0</span>
                    <span>{criterion.points}</span>
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-2">
                  {criterion.questions.map((question, qidx) => (
                    <motion.div
                      key={qidx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: qidx * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-400">{question}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Problem Discovery Section Component
function ProblemDiscoverySection({ setActiveSection }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isInView) setActiveSection(3);
  }, [isInView, setActiveSection]);

  const steps = [
    {
      id: 1,
      title: 'Find a Partner',
      description: 'Identify a local non-profit, small business, or community group with a technical challenge.',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      action: 'Identify Local Partner'
    },
    {
      id: 2,
      title: 'Define the Problem',
      description: 'Work with them to understand their needs—whether it\'s automating a workflow, improving accessibility, or analyzing data.',
      icon: Target,
      color: 'from-red-500 to-orange-500',
      action: 'Analyze Requirements'
    },
    {
      id: 3,
      title: 'Build with Google AI',
      description: 'Create a functional prototype using Google AI and ML tools. We encourage the use of two or more Google products (e.g., Gemini API, Vertex AI + Firebase) to maximize impact.',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      action: 'Start Building'
    },
    {
      id: 4,
      title: 'Demonstrate Impact',
      description: 'Demonstrate Impact: Show us how your solution makes their organization more efficient, effective, or reachable.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      action: 'Measure Results'
    }
  ];

  return (
    <section id="discovery" ref={ref} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Problem Discovery Guide
          </h2>
          <p className="text-xl text-gray-400">Your mission: Bridge the gap between Google's cutting-edge AI and local needs</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, idx) => (
              <motion.button
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  idx === currentStep
                    ? `bg-gradient-to-r ${step.color} text-white shadow-2xl scale-125`
                    : idx < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {idx < currentStep ? <CheckCircle className="w-6 h-6" /> : step.id}
              </motion.button>
            ))}
          </div>
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full bg-gradient-to-r ${steps[currentStep].color}`}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`bg-gradient-to-r ${steps[currentStep].color} p-1 rounded-3xl`}>
              <div className="bg-gray-950 rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  {(() => {
                    const StepIcon = steps[currentStep].icon;
                    return <StepIcon className="w-12 h-12 text-white" />;
                  })()}
                  <div>
                    <p className="text-sm text-gray-400">Step {currentStep + 1} of {steps.length}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white">{steps[currentStep].title}</h3>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {steps[currentStep].description}
                </p>

                <div className="flex gap-4">
                  {currentStep > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      ← Previous
                    </motion.button>
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className={`px-6 py-3 rounded-full bg-gradient-to-r ${steps[currentStep].color} text-white font-semibold shadow-lg flex items-center gap-2`}
                    >
                      {steps[currentStep].action}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full bg-gradient-to-r ${steps[currentStep].color} text-white font-semibold shadow-lg flex items-center gap-2`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Complete Guide
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Technical Challenges Section Component
function TechnicalChallengesSection({ setActiveSection }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'ai' | 'data' | 'medical'>('all');

  useEffect(() => {
    if (isInView) setActiveSection(4);
  }, [isInView, setActiveSection]);

  const challenges = [
    {
      id: 1,
      title: 'AI-Driven Platform for CRNAs',
      category: 'ai',
      difficulty: 'Advanced',
      tags: ['Machine Learning', 'Healthcare', 'Real-time Data'],
      description: 'Design an AI-driven platform that accurately aggregates and validates real-time compensation data for Certified Registered Nurse Anesthesiologists (CRNAs) from diverse sources.',
      tech: ['Gemini API', 'BigQuery', 'Firebase'],
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Predictive Power Outage System',
      category: 'data',
      difficulty: 'Intermediate',
      tags: ['ML', 'Real-time Analysis', 'Energy Management'],
      description: 'Design a predictive system that accurately forecasts localized power outages using real-time weather, environmental and historical data.',
      tech: ['Vertex AI', 'Cloud Functions', 'Maps API'],
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      title: 'Voice-Driven Life Insurance Agent',
      category: 'ai',
      difficulty: 'Advanced',
      tags: ['Gemini Multimodal', 'Voice AI', 'Insurance'],
      description: 'Develop a robust, real-time voice-driven life insurance quoting agent using Google\'s Gemini Multimodal API that significantly improves user experience.',
      tech: ['Gemini Multimodal API', 'Cloud Speech-to-Text', 'Dialogflow'],
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Real-Time Audio Stream Search',
      category: 'data',
      difficulty: 'Advanced',
      tags: ['Audio Processing', 'Search', 'Scalability'],
      description: 'Develop a system for real-time indexing and keyword search of thousands of concurrent live audio streams, enabling near-instant discovery of spoken content.',
      tech: ['Cloud Speech-to-Text', 'Cloud Search', 'Pub/Sub'],
      icon: BarChart3,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 5,
      title: 'Critical Medical Event Communication',
      category: 'medical',
      difficulty: 'Advanced',
      tags: ['Healthcare', 'Google Meet', 'BigQuery', 'Real-time'],
      description: 'Develop an integrated communication system that automatically initiates a secure Google Meet session upon detection of a critical medical event.',
      tech: ['Google Meet API', 'BigQuery', 'Cloud Functions', 'Firebase'],
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === filter);

  return (
    <section id="challenges" ref={ref} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Technical Challenges
          </h2>
          <p className="text-xl text-gray-400 mb-8">Real-world challenge prompts from 2025</p>

          {/* Filter Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { id: 'all', label: 'All Challenges', count: challenges.length },
              { id: 'ai', label: 'AI & ML', count: challenges.filter(c => c.category === 'ai').length },
              { id: 'data', label: 'Data & Analytics', count: challenges.filter(c => c.category === 'data').length },
              { id: 'medical', label: 'Healthcare', count: challenges.filter(c => c.category === 'medical').length }
            ].map((f) => (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f.id as any)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f.label} ({f.count})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredChallenges.map((challenge, idx) => {
              const Icon = challenge.icon;
              const isSelected = selectedChallenge === challenge.id;

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedChallenge(isSelected ? null : challenge.id)}
                  className="cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`relative bg-gradient-to-br ${challenge.color} p-1 rounded-2xl transition-all duration-500 ${
                      isSelected ? 'shadow-2xl ring-2 ring-white/50' : 'shadow-lg'
                    }`}
                  >
                    <div className="bg-gray-950 rounded-2xl p-6 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${challenge.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            challenge.difficulty === 'Advanced' 
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">{challenge.title}</h3>
                      
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {challenge.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {challenge.tags.map((tag, tidx) => (
                          <span key={tidx} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-white/10 pt-4 mt-4"
                          >
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Recommended Tech</p>
                            <div className="flex flex-wrap gap-2">
                              {challenge.tech.map((tech, tidx) => (
                                <motion.span
                                  key={tidx}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: tidx * 0.1 }}
                                  className={`px-3 py-1 bg-gradient-to-r ${challenge.color} rounded-full text-xs text-white font-semibold`}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs text-gray-500">Challenge #{challenge.id}</span>
                        <span className="text-xs text-blue-400 font-semibold">
                          {isSelected ? 'Click to collapse' : 'Click to expand'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
