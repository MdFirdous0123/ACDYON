import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onGetStarted }) {
    return (
        <section id="final-cta" className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="reveal relative bg-gradient-to-br from-navy via-navy-light to-navy rounded-3xl px-6 py-16 sm:px-12 sm:py-20 text-center overflow-hidden noise">
                    {/* Background glow effects */}
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 text-indigo-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/10">
                            <Sparkles size={14} />
                            Free to get started
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            Your next opportunity starts here.
                        </h2>
                        <p className="mt-4 text-indigo-200/80 max-w-md mx-auto">
                            Join ApplyAI and take control of your job search — for free.
                        </p>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 mt-8 bg-white hover:bg-gray-100 text-navy font-semibold px-8 py-3.5 rounded-xl transition-all text-base cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            onClick={onGetStarted}
                        >
                            Start for Free
                            <ArrowRight size={18} />
                        </button>
                        <p className="mt-4 text-xs text-indigo-300/60">No credit card required · Free forever</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
