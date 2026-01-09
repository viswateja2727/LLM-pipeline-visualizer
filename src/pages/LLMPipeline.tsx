import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Custom shape components instead of emojis
const PromptIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <motion.rect 
      x="4" y="8" width="32" height="24" rx="4" 
      fill="url(#promptGrad)" 
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M10 16H30M10 22H24" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <defs>
      <linearGradient id="promptGrad" x1="4" y1="8" x2="36" y2="32">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
  </svg>
);

const TokenIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
      <motion.rect x="8" y="8" width="10" height="10" rx="2" fill="#A855F7" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
      <motion.rect x="22" y="8" width="10" height="10" rx="2" fill="#9333EA" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
      <motion.rect x="8" y="22" width="10" height="10" rx="2" fill="#7C3AED" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
      <motion.rect x="22" y="22" width="10" height="10" rx="2" fill="#8B5CF6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
    </motion.g>
  </svg>
);

const EmbeddingIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="embedGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#EC4899" />
        <stop offset="1" stopColor="#F472B6" />
      </linearGradient>
    </defs>
    {/* 3D cube effect */}
    <motion.path 
      d="M20 4L36 14V30L20 40L4 30V14L20 4Z" 
      fill="url(#embedGrad)"
      animate={{ rotateY: [0, 180, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <motion.path 
      d="M20 4L36 14L20 24L4 14L20 4Z" 
      fill="#F9A8D4" 
      opacity="0.6"
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M20 24V40M20 24L4 14M20 24L36 14" 
      stroke="white" 
      strokeWidth="1.5"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const TransformerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="transGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <motion.polygon 
      points="20,4 36,20 20,36 4,20" 
      fill="url(#transGrad)"
      animate={{ rotate: [0, 90, 180, 270, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: 'center' }}
    />
    <motion.circle 
      cx="20" cy="20" r="6" 
      fill="white"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const LogitsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="logitsGrad" x1="0" y1="40" x2="40" y2="0">
        <stop stopColor="#22C55E" />
        <stop offset="1" stopColor="#16A34A" />
      </linearGradient>
    </defs>
    <motion.rect x="6" y="24" width="6" height="12" rx="2" fill="#22C55E" animate={{ height: [8, 16, 8], y: [28, 20, 28] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
    <motion.rect x="14" y="20" width="6" height="16" rx="2" fill="#16A34A" animate={{ height: [12, 20, 12], y: [24, 16, 24] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
    <motion.rect x="22" y="12" width="6" height="24" rx="2" fill="url(#logitsGrad)" animate={{ height: [20, 28, 20], y: [16, 8, 16] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
    <motion.rect x="30" y="16" width="6" height="20" rx="2" fill="#4ADE80" animate={{ height: [16, 24, 16], y: [20, 12, 20] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }} />
  </svg>
);

const SoftmaxIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="softmaxGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#14B8A6" />
        <stop offset="1" stopColor="#0D9488" />
      </linearGradient>
    </defs>
    <motion.circle 
      cx="20" cy="20" r="16" 
      fill="none" 
      stroke="url(#softmaxGrad)" 
      strokeWidth="3"
      animate={{ strokeDasharray: ['0 100', '100 0'] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle 
      cx="20" cy="20" r="8" 
      fill="url(#softmaxGrad)"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M20 8L22 18L32 20L22 22L20 32L18 22L8 20L18 18L20 8Z" 
      fill="white"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: 'center' }}
    />
  </svg>
);

const OutputIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="outputGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#E11D48" />
      </linearGradient>
    </defs>
    <motion.polygon 
      points="20,2 38,14 32,38 8,38 2,14" 
      fill="url(#outputGrad)"
      animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{ transformOrigin: 'center' }}
    />
    <motion.circle 
      cx="20" cy="20" r="6" 
      fill="white"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const ContextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <motion.rect 
      x="2" y="2" width="20" height="20" rx="3" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeDasharray="4 2"
      fill="none"
      animate={{ strokeDashoffset: [0, -24] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <motion.path 
      d="M10 2C6 2 3 5 3 9C3 13 6 16 10 18C14 16 17 13 17 9C17 5 14 2 10 2Z" 
      fill="white"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M7 8C7 8 8 10 10 10C12 10 13 8 13 8" 
      stroke="#9333EA" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const pipelineSteps = [
  { 
    id: 'prompt', 
    label: 'Prompt', 
    Icon: PromptIcon, 
    color: 'from-blue-400 to-blue-600',
    description: "You type a prompt - your question or instruction to the AI"
  },
  { 
    id: 'tokens', 
    label: 'Tokens', 
    Icon: TokenIcon, 
    color: 'from-purple-400 to-purple-600',
    description: "Your prompt gets split into small pieces called TOKENS"
  },
  { 
    id: 'embeddings', 
    label: 'Embeddings', 
    Icon: EmbeddingIcon, 
    color: 'from-pink-400 to-pink-600',
    description: "Each token becomes a number pattern called an EMBEDDING"
  },
  { 
    id: 'transformer', 
    label: 'Transformer', 
    Icon: TransformerIcon, 
    color: 'from-amber-400 to-amber-600',
    description: "Transformer layers process and understand the meaning"
  },
  { 
    id: 'logits', 
    label: 'Logits', 
    Icon: LogitsIcon, 
    color: 'from-green-400 to-green-600',
    description: "The model calculates LOGITS - scores for each possible next word"
  },
  { 
    id: 'softmax', 
    label: 'Softmax', 
    Icon: SoftmaxIcon, 
    color: 'from-teal-400 to-teal-600',
    description: "SOFTMAX converts scores to probabilities (must add up to 100%)"
  },
  { 
    id: 'output', 
    label: 'Next Word', 
    Icon: OutputIcon, 
    color: 'from-rose-400 to-rose-600',
    description: "The model picks the most likely NEXT WORD!"
  },
];

const tokenExamples = ['Hello', ',', ' how', ' are', ' you', '?'];

const LLMPipeline = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeToken, setActiveToken] = useState(0);

  const resetAnimation = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setActiveToken(0);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev < pipelineSteps.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  // Auto-play animation - SLOWED DOWN from 2500ms to 4500ms
  useEffect(() => {
    if (!isPlaying) return;
    
    if (currentStep >= pipelineSteps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      nextStep();
    }, 4500);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, nextStep]);

  // Token animation - SLOWED DOWN from 400ms to 800ms
  useEffect(() => {
    if (currentStep === 1) {
      const tokenTimer = setInterval(() => {
        setActiveToken(prev => (prev + 1) % tokenExamples.length);
      }, 800);
      return () => clearInterval(tokenTimer);
    }
  }, [currentStep]);

  const handlePlay = () => {
    if (currentStep >= pipelineSteps.length - 1) {
      resetAnimation();
      setTimeout(() => {
        setIsPlaying(true);
        setCurrentStep(0);
      }, 100);
    } else {
      setIsPlaying(true);
      if (currentStep === -1) {
        setCurrentStep(0);
      }
    }
  };

  const getCurrentDescription = () => {
    if (currentStep === -1) {
      return "Let's see how a Large Language Model (LLM) works inside! Press play to start";
    }
    return pipelineSteps[currentStep]?.description || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-foreground">LLM Pipeline Explorer</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Inside an LLM: How Words Become AI Magic
          </h2>
          <p className="text-muted-foreground text-lg">
            Prompt → Tokens → Embeddings → Transformer → Logits → Softmax → Next Word
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-8">
          <Button
            onClick={handlePlay}
            className="flex items-center gap-2"
            size="lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pause' : currentStep >= pipelineSteps.length - 1 ? 'Replay' : 'Play'}
          </Button>
          <Button
            variant="outline"
            onClick={nextStep}
            disabled={currentStep >= pipelineSteps.length - 1}
            size="lg"
            className="flex items-center gap-2"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={resetAnimation}
            size="lg"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Current Step Description */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`p-6 rounded-2xl border-2 text-center ${
            currentStep >= 0 
              ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-purple-300 dark:border-purple-700' 
              : 'bg-muted border-border'
          }`}>
            <div className="flex items-center justify-center gap-3">
              {currentStep >= 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {(() => {
                    const StepIcon = pipelineSteps[currentStep]?.Icon;
                    return StepIcon ? <StepIcon /> : null;
                  })()}
                </motion.div>
              )}
              <p className="text-xl font-semibold text-foreground">
                {getCurrentDescription()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Pipeline Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Context Window Container */}
          <motion.div
            className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-4 border-dashed border-primary/40"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Context Window Label */}
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContextIcon />
              Context Window (Memory Limit)
            </motion.div>

            {/* Prompt Input */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: currentStep >= 0 ? 1 : 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`flex items-center gap-4 p-4 rounded-xl border-3 transition-all duration-500 ${
                currentStep === 0 
                  ? 'bg-blue-200 dark:bg-blue-800/50 border-blue-500 shadow-lg shadow-blue-500/30 scale-[1.02]' 
                  : 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
              }`}>
                <PromptIcon />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Prompt</p>
                  <p className="text-foreground font-medium text-lg">"Hello, how are you?"</p>
                </div>
              </div>
            </motion.div>

            {/* LLM Box */}
            <motion.div
              className="relative p-6 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 rounded-2xl border-3 border-purple-400 dark:border-purple-600 shadow-xl"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: currentStep >= 1 ? 1 : 0.4 }}
              transition={{ duration: 0.6 }}
            >
              {/* LLM Label */}
              <div className="absolute -top-3 left-4 px-4 py-1 bg-purple-500 text-white rounded-lg text-sm font-bold flex items-center gap-2">
                <BrainIcon />
                LLM Brain
              </div>

              {/* Pipeline Steps */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {pipelineSteps.slice(1).map((pStep, index) => {
                  const stepIndex = index + 1;
                  const isActive = currentStep >= stepIndex;
                  const isCurrent = currentStep === stepIndex;
                  const StepIcon = pStep.Icon;
                  
                  return (
                    <motion.div
                      key={pStep.id}
                      className="relative"
                      initial={{ opacity: 0.3, scale: 0.9 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.3, 
                        scale: isCurrent ? 1.15 : isActive ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <motion.div
                        className={`flex flex-col items-center p-4 rounded-xl bg-gradient-to-br ${pStep.color} text-white min-w-[90px] shadow-lg transition-all duration-500`}
                        animate={isCurrent ? {
                          boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 40px rgba(255,255,255,0.7)', '0 0 0px rgba(255,255,255,0)']
                        } : {}}
                        transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <StepIcon />
                        <span className="text-sm font-bold mt-1">{pStep.label}</span>
                      </motion.div>
                      
                      {/* Arrow between steps */}
                      {index < pipelineSteps.length - 2 && (
                        <motion.div
                          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isActive ? 1 : 0.3 }}
                          transition={{ duration: 0.4 }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <motion.path 
                              d="M2 8H14M14 8L10 4M14 8L10 12" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              className="text-purple-500 dark:text-purple-300"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Token Visualization */}
              {currentStep === 1 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Breaking into tokens:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tokenExamples.map((token, i) => (
                      <motion.span
                        key={i}
                        className={`px-3 py-2 rounded-lg text-base font-mono transition-all duration-400 ${
                          i === activeToken 
                            ? 'bg-purple-500 text-white scale-110 shadow-lg' 
                            : 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-200'
                        }`}
                        animate={i === activeToken ? { 
                          y: [0, -8, 0],
                          boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.6)', '0 0 0px rgba(168,85,247,0)']
                        } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        "{token}"
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3D Embedding Visualization */}
              {currentStep === 2 && (
                <motion.div
                  className="mt-6 p-6 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-4 font-medium">Tokens become 3D vector representations:</p>
                  <div className="flex justify-center gap-6">
                    {[0, 1, 2, 3].map((cubeIndex) => (
                      <motion.div
                        key={cubeIndex}
                        className="relative w-16 h-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: cubeIndex * 0.3, duration: 0.8 }}
                      >
                        <svg width="64" height="80" viewBox="0 0 64 80" fill="none" className="drop-shadow-lg">
                          {/* 3D Cube */}
                          <motion.g
                            animate={{ rotateY: [0, 360] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: cubeIndex * 0.5 }}
                            style={{ transformOrigin: 'center' }}
                          >
                            {/* Top face */}
                            <motion.path 
                              d="M32 10L56 24L32 38L8 24L32 10Z" 
                              fill={`hsl(${320 + cubeIndex * 15}, 80%, 65%)`}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, delay: cubeIndex * 0.2 }}
                            />
                            {/* Left face */}
                            <motion.path 
                              d="M8 24L32 38V70L8 56V24Z" 
                              fill={`hsl(${320 + cubeIndex * 15}, 70%, 55%)`}
                              animate={{ opacity: [0.6, 0.9, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, delay: cubeIndex * 0.2 + 0.3 }}
                            />
                            {/* Right face */}
                            <motion.path 
                              d="M56 24V56L32 70V38L56 24Z" 
                              fill={`hsl(${320 + cubeIndex * 15}, 60%, 45%)`}
                              animate={{ opacity: [0.5, 0.8, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, delay: cubeIndex * 0.2 + 0.6 }}
                            />
                            {/* Edges */}
                            <path d="M32 10L56 24M32 10L8 24M32 38L8 24M32 38L56 24M32 38V70M8 24V56L32 70M56 24V56L32 70" stroke="white" strokeWidth="1" opacity="0.5" />
                          </motion.g>
                        </svg>
                        {/* Floating numbers */}
                        <motion.div 
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono text-pink-600 dark:text-pink-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          [{(Math.random() * 2 - 1).toFixed(2)}]
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Transformer Visualization - Enhanced */}
              {currentStep === 3 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Attention layers processing:</p>
                  <div className="flex justify-center items-center gap-3">
                    {[1, 2, 3, 4, 5].map((layerNum, i) => (
                      <motion.div
                        key={i}
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                      >
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="drop-shadow-lg">
                          {/* Diamond shape */}
                          <motion.polygon 
                            points="26,4 48,26 26,48 4,26" 
                            fill={`url(#layerGrad${i})`}
                            animate={{ 
                              rotate: [0, 180, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                            style={{ transformOrigin: 'center' }}
                          />
                          <motion.circle 
                            cx="26" cy="26" r="10" 
                            fill="white"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <text x="26" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#D97706">L{layerNum}</text>
                          <defs>
                            <linearGradient id={`layerGrad${i}`} x1="0" y1="0" x2="52" y2="52">
                              <stop stopColor="#F59E0B" />
                              <stop offset="1" stopColor="#D97706" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Connection lines */}
                        {i < 4 && (
                          <motion.div
                            className="absolute top-1/2 -right-3 w-3 h-0.5 bg-amber-400"
                            animate={{ scaleX: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Logits Visualization - Enhanced */}
              {currentStep === 4 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Raw scores (logits) for possible words:</p>
                  <div className="space-y-3 max-w-xs mx-auto">
                    {[
                      { word: 'doing', score: 4.2 },
                      { word: 'feeling', score: 3.1 },
                      { word: 'today', score: 1.8 },
                      { word: 'fine', score: 1.2 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3, duration: 0.6 }}
                      >
                        <span className="text-sm w-16 text-right text-foreground font-medium">{item.word}</span>
                        <div className="flex-1 h-7 bg-green-200 dark:bg-green-900/50 rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.score / 5) * 100}%` }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.2 }}
                          />
                          <motion.div
                            className="absolute inset-0 bg-white/30"
                            animate={{ x: ['0%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            style={{ width: '30%' }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-10 font-mono">{item.score}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Softmax Probability Visualization - Enhanced */}
              {currentStep === 5 && (
                <motion.div
                  className="mt-6 p-4 bg-white/60 dark:bg-black/30 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm text-center text-muted-foreground mb-3 font-medium">Softmax converts to probabilities (adds to 100%):</p>
                  <div className="space-y-3 max-w-xs mx-auto">
                    {[
                      { word: 'doing', prob: 52 },
                      { word: 'feeling', prob: 28 },
                      { word: 'today', prob: 12 },
                      { word: 'other...', prob: 8 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3, duration: 0.6 }}
                      >
                        <span className="text-sm w-16 text-right text-foreground font-medium">{item.word}</span>
                        <div className="flex-1 h-7 bg-teal-200 dark:bg-teal-900/50 rounded-full overflow-hidden relative">
                          <motion.div
                            className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-teal-400'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.prob}%` }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.2 }}
                          />
                          {i === 0 && (
                            <motion.div
                              className="absolute inset-0 bg-white/40"
                              animate={{ opacity: [0.2, 0.5, 0.2] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground w-12 font-mono">{item.prob}%</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Output - Updated format: "{prompt}" + "{next word}" */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: currentStep >= 6 ? 1 : 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`flex items-center gap-4 p-4 rounded-xl border-3 transition-all duration-500 ${
                currentStep === 6 
                  ? 'bg-green-200 dark:bg-green-800/50 border-green-500 shadow-lg shadow-green-500/30 scale-[1.02]' 
                  : 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
              }`}>
                <OutputIcon />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Output</p>
                  <motion.div 
                    className="flex items-center gap-1 text-lg font-medium"
                    animate={currentStep >= 6 ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentStep >= 6 ? (
                      <>
                        <span className="text-foreground">"Hello, how are you?"</span>
                        <span className="text-foreground mx-1">+</span>
                        <motion.span 
                          className="text-primary font-bold px-2 py-1 bg-primary/20 rounded-lg"
                          animate={{ 
                            backgroundColor: ['hsl(var(--primary) / 0.2)', 'hsl(var(--primary) / 0.4)', 'hsl(var(--primary) / 0.2)'],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          "doing"
                        </motion.span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">???</span>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {pipelineSteps.map((step, i) => (
            <motion.button
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === currentStep 
                  ? 'bg-primary scale-125' 
                  : i < currentStep 
                    ? 'bg-primary/60' 
                    : 'bg-muted'
              }`}
              onClick={() => setCurrentStep(i)}
              whileHover={{ scale: 1.4 }}
              title={step.label}
            />
          ))}
        </div>

        {/* Completion Message */}
        {currentStep >= pipelineSteps.length - 1 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl font-bold text-primary">
              This process repeats for every word the AI generates!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default LLMPipeline;
