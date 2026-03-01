'use client'

import { useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, ExternalLink, Sparkles, Code, Database, Cpu, Users, Zap, FileText, Download, Star, Award, Rocket, Flame, ArrowRight, Play } from 'lucide-react'
import resourcesData from '@/data/resources.json'
import Link from 'next/link'

type Resource = {
  id: number
  title: string
  description: string
  url: string
  category: string
  color: 'blue' | 'red' | 'yellow' | 'green'
  type: string
}

const categories = ['All', 'Interactive', 'Foundational', 'App Dev', 'AI & Data', 'Infrastructure', 'Community']

const categoryIcons: Record<string, any> = {
  'All': Sparkles,
  'Interactive': Zap,
  'Foundational': Code,
  'App Dev': Cpu,
  'AI & Data': Database,
  'Infrastructure': Database,
  'Community': Users,
}

const typeIcons: Record<string, any> = {
  'Course': Award,
  'Guide': FileText,
  'Framework': Code,
  'Platform': Cpu,
  'API': Zap,
  'Repository': Code,
  'Community': Users,
  'Tutorial': Rocket,
  'Library': Code,
  'Database': Database,
  'PDF Guide': Download,
  'PDF Document': FileText,
  'Workshop': Users,
}

const colorClasses = {
  blue: {
    border: 'hover:border-google-blue',
    glow: 'hover:shadow-[0_0_30px_rgba(66,133,244,0.4)]',
    badge: 'bg-google-blue/20 text-google-blue border-google-blue/30',
  },
  red: {
    border: 'hover:border-google-red',
    glow: 'hover:shadow-[0_0_30px_rgba(234,67,53,0.4)]',
    badge: 'bg-google-red/20 text-google-red border-google-red/30',
  },
  yellow: {
    border: 'hover:border-google-yellow',
    glow: 'hover:shadow-[0_0_30px_rgba(251,188,5,0.4)]',
    badge: 'bg-google-yellow/20 text-google-yellow border-google-yellow/30',
  },
  green: {
    border: 'hover:border-google-green',
    glow: 'hover:shadow-[0_0_30px_rgba(52,168,83,0.4)]',
    badge: 'bg-google-green/20 text-google-green border-google-green/30',
  },
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Separate featured PDFs from regular resources
  const featuredDocs = useMemo(() => {
    return (resourcesData as Resource[]).filter(r => r.type.includes('PDF'))
  }, [])

  const regularResources = useMemo(() => {
    return (resourcesData as Resource[]).filter(r => !r.type.includes('PDF'))
  }, [])

  const filteredResources = useMemo(() => {
    let filtered = regularResources
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(r => r.category === selectedCategory)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }, [selectedCategory, searchQuery, regularResources])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-google-blue rounded-full blur-[120px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-google-red rounded-full blur-[120px] opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-96 h-96 bg-google-yellow rounded-full blur-[120px] opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-google-green rounded-full blur-[120px] opacity-20"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.2, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20 px-6"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-google-blue/20 to-google-red/20 border border-white/20 backdrop-blur-xl mb-8"
            >
              <Flame className="w-5 h-5 text-google-yellow animate-pulse" />
              <span className="text-sm font-semibold text-white">GDG on Campus • North America 2026</span>
              <Star className="w-5 h-5 text-google-green" />
            </motion.div>

            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none"
              style={{
                background: 'linear-gradient(135deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 75%, #4285F4 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Solution Challenge
              <br />
              <span className="text-6xl md:text-7xl lg:text-8xl inline-flex items-center gap-4">
                2026
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-google-yellow" />
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-white font-bold tracking-wide mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Official Resource Directory
            </motion.p>

            <motion.p 
              className="mt-4 text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Your comprehensive guide to Google technologies, learning paths, and community resources.
              <br />
              <span className="text-google-blue font-semibold">Build. Learn. Impact. Win.</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              {[
                { number: '30+', label: 'Resources', icon: Rocket },
                { number: '6', label: 'Categories', icon: Star },
                { number: '100%', label: 'Free', icon: Sparkles },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                >
                  <stat.icon className="w-6 h-6 text-google-blue" />
                  <div className="text-3xl font-black text-white">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Interactive Journey CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-12"
            >
              <Link href="/journey">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-google-blue via-google-red to-google-yellow"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-google-blue/50 via-google-red/50 to-google-yellow/50 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center gap-3 text-white">
                    <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Experience Interactive Journey</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              </Link>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-4 text-sm text-slate-400"
              >
                🎯 Explore Timeline, Prizes, Judging Criteria & More in an Immersive Experience
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sticky Filter Bar */}
      <motion.div 
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl 
                       focus:outline-none focus:border-google-blue focus:bg-white/10 
                       transition-all duration-300 text-white placeholder-slate-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = categoryIcons[category]
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all duration-300
                    flex items-center gap-2 border
                    ${selectedCategory === category 
                      ? 'bg-white/20 border-white/30 text-white shadow-lg' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </motion.button>
              )
            })}
          </div>

          {/* Results Count */}
          <motion.p 
            className="text-center mt-4 text-sm text-slate-400"
            key={filteredResources.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
          </motion.p>
        </div>
      </motion.div>

      {/* Featured Official Documents */}
      <section className="relative px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-google-red/20 to-google-yellow/20 border border-white/20 backdrop-blur-xl rounded-full mb-4">
              <Star className="w-4 h-4 text-google-yellow" />
              <span className="text-sm font-bold text-white">OFFICIAL DOCUMENTS</span>
              <Star className="w-4 h-4 text-google-yellow" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Essential Reading
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Download the official guidelines and terms before submitting your project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {featuredDocs.map((doc, index) => {
              const colors = colorClasses[doc.color]
              const isPrimaryDoc = doc.id === 29 // Submission Guidelines
              return (
                <motion.a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className={`
                    group relative p-8 rounded-3xl overflow-hidden
                    bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl
                    border-2 transition-all duration-500
                    ${colors.border} ${colors.glow}
                    ${isPrimaryDoc ? 'md:col-span-2 border-google-red shadow-[0_0_60px_rgba(234,67,53,0.3)]' : ''}
                  `}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    doc.color === 'red' ? 'from-google-red/20 to-transparent' :
                    doc.color === 'yellow' ? 'from-google-yellow/20 to-transparent' :
                    'from-google-blue/20 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`
                        flex items-center gap-3 px-4 py-2 rounded-xl font-bold border-2
                        ${colors.badge}
                      `}>
                        <Download className="w-5 h-5" />
                        <span className="text-sm uppercase tracking-wider">{doc.type}</span>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ExternalLink className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                      {doc.title}
                    </h3>
                    
                    <p className="text-base text-slate-300 leading-relaxed mb-6">
                      {doc.description}
                    </p>

                    {/* CTA Button */}
                    <div className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-full
                      bg-gradient-to-r font-bold text-white
                      ${doc.color === 'red' ? 'from-google-red to-google-yellow' : 'from-google-yellow to-google-green'}
                      group-hover:shadow-lg group-hover:scale-105 transition-all duration-300
                    `}>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </div>

                    {/* File Size Badge (decorative) */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-xl rounded-full text-xs text-slate-300">
                      PDF
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                </motion.a>
              )
            })}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      </section>

      {/* Bento Grid */}
      <section className="relative px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredResources.map((resource, index) => {
              const colors = colorClasses[resource.color]
              const TypeIcon = typeIcons[resource.type] || FileText
              return (
                <motion.a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -12, transition: { duration: 0.2 } }}
                  className={`
                    group relative p-6 rounded-2xl overflow-hidden
                    bg-white/5 backdrop-blur-xl border border-white/10
                    hover:bg-white/10 transition-all duration-300
                    ${colors.border} ${colors.glow}
                  `}
                >
                  {/* Animated gradient overlay on hover */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-br ${
                      resource.color === 'blue' ? 'from-google-blue/10' :
                      resource.color === 'red' ? 'from-google-red/10' :
                      resource.color === 'yellow' ? 'from-google-yellow/10' :
                      'from-google-green/10'
                    } to-transparent
                  `} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border
                        ${colors.badge}
                      `}>
                        <TypeIcon className="w-3.5 h-3.5" />
                        {resource.type}
                      </div>
                      <motion.div
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </div>

                    {/* Card Content */}
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors leading-tight">
                      {resource.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {resource.description}
                    </p>

                    {/* Category Badge */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        {resource.category}
                      </span>
                      <motion.div
                        className="text-xs text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        whileHover={{ x: 3 }}
                      >
                        Explore <span className="text-lg">→</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className={`
                    absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity
                    bg-gradient-to-br ${
                      resource.color === 'blue' ? 'from-google-blue' :
                      resource.color === 'red' ? 'from-google-red' :
                      resource.color === 'yellow' ? 'from-google-yellow' :
                      'from-google-green'
                    } to-transparent blur-2xl
                  `} />

                  {/* Hover Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 pointer-events-none -z-10
                    blur-xl ${colors.glow}
                  `} />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No resources found</h3>
              <p className="text-slate-400">Try adjusting your search or filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-32 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-google-blue/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo/Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-google-yellow" />
              <span className="font-bold text-white">Solution Challenge 2026</span>
            </motion.div>

            {/* University Info */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Representing{' '}
              <span className="bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent">
                GDG On Campus
              </span>
            </h3>
            <p className="text-lg text-slate-300 mb-3">
              University Of Niagara Falls Canada
            </p>
            
            {/* Creator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
              <p className="text-sm text-slate-400">
                © <span className="text-white font-semibold">Jesun Ahmad Ushno</span>
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mb-6">
              <motion.span whileHover={{ scale: 1.1, color: '#4285F4' }} className="transition-colors">
                Next.js 14
              </motion.span>
              <span>•</span>
              <motion.span whileHover={{ scale: 1.1, color: '#EA4335' }} className="transition-colors">
                Tailwind CSS
              </motion.span>
              <span>•</span>
              <motion.span whileHover={{ scale: 1.1, color: '#FBBC05' }} className="transition-colors">
                Framer Motion
              </motion.span>
              <span>•</span>
              <motion.span whileHover={{ scale: 1.1, color: '#34A853' }} className="transition-colors">
                TypeScript
              </motion.span>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center justify-center gap-2 opacity-40">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-1 h-1 rounded-full bg-white"
                />
              ))}
            </div>

            {/* Build Info */}
            <p className="mt-6 text-xs text-slate-600">
              Built with passion for the developer community 🚀
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-google-blue/50 to-transparent" />
      </footer>
    </main>
  )
}
