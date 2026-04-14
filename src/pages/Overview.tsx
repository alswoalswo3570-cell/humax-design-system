import { ArrowRight, CheckCircle2, Code, Layers, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      {/* Hero Section */}
      <section className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
          UX Guide & Design System
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          A machine-readable, implementation-friendly design system built for AI-assisted product development.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link 
            to="/tokens" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          >
            View Design Tokens
          </Link>
          <Link 
            to="/components" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Browse Components
          </Link>
        </div>
      </section>

      {/* Core Principles */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PrincipleCard 
            icon={<Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Machine-Readable First"
            description="All tokens and component contracts are defined in structured JSON, making them easily consumable by AI assistants and automated tools."
          />
          <PrincipleCard 
            icon={<Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Semantic Naming"
            description="Tokens use semantic names (e.g., color.background.surface) rather than raw visual names, ensuring consistency across themes."
          />
          <PrincipleCard 
            icon={<CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Documentation + Implementation"
            description="The design system bridges the gap between design intent and code implementation, keeping tokens, rules, and previews aligned."
          />
          <PrincipleCard 
            icon={<Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Cross-Platform Ready"
            description="Component contracts include specific mapping notes for platforms like Flutter, ensuring native implementations match the design intent."
          />
        </div>
      </section>

      {/* Design Tone */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Design Tone</h2>
        <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p>
            Our visual language is designed to be <strong>clean, practical, modern, and enterprise-friendly</strong>. 
            We prioritize readability and low cognitive load over decorative effects.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>Do:</strong> Use ample whitespace, clear typography hierarchy, and purposeful color for actions and feedback.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span><strong>Don't:</strong> Use overly playful visuals, flashy marketing styles, heavy gradients, or unnecessary shadows.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* How to Use This Guide */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">How to Use This Guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">For PMs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reference the <Link to="/patterns" className="text-indigo-600 dark:text-indigo-400 hover:underline">Patterns</Link> and <Link to="/components" className="text-indigo-600 dark:text-indigo-400 hover:underline">Components</Link> pages to understand standard flows and capabilities. Use this guide to write clear, component-driven requirements.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">For Designers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the <Link to="/tokens" className="text-indigo-600 dark:text-indigo-400 hover:underline">Design Tokens</Link> and <Link to="/layout" className="text-indigo-600 dark:text-indigo-400 hover:underline">Layout & Grid</Link> rules as the foundation for your Figma files. Ensure your designs map directly to the established semantic names.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">For Flutter Developers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consult the <Link to="/flutter" className="text-indigo-600 dark:text-indigo-400 hover:underline">Flutter Reference</Link> and raw JSON contracts to implement components. The mapping notes provide direct guidance for Material 3 widgets.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">For AI Assistants</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Read the raw JSON files in the repository as the source of truth. Use the structured contracts to generate consistent, token-bound UI code without hallucinating values.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Getting Started</h2>
        <div className="space-y-4">
          <Link to="/tokens" className="group block bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">1. Understand the Tokens</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Review the foundational colors, typography, and spacing.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          
          <Link to="/components" className="group block bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">2. Explore Components</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">See how tokens are applied to interactive UI elements.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link to="/flutter" className="group block bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">3. Implement in Flutter</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Use the JSON contracts to build native components.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

function PrincipleCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 flex-1">{description}</p>
    </div>
  );
}
