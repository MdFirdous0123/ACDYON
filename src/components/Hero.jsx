import { ArrowRight, FileText, Briefcase, CalendarCheck, Sparkles } from 'lucide-react';

export default function Hero({ onGetStarted }) {
    return (
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 hero-gradient overflow-hidden noise">
            {/* Ambient blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
            <div className="absolute top-40 right-1/4 w-48 h-48 bg-violet-400/8 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left – copy */}
                    <div className="text-center lg:text-left animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-primary/15">
                            <Sparkles size={14} />
                            AI-Powered Job Search
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-navy leading-[1.1] tracking-tight">
                            Apply Smarter.{' '}
                            <span className="gradient-text">Get Hired Faster.</span>
                        </h1>
                        <p className="mt-5 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Analyze your resume, track every application, and prepare for interviews — so you can focus on landing the role, not managing spreadsheets.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <button
                                type="button"
                                onClick={onGetStarted}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-indigo-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 cursor-pointer"
                            >
                                Start for Free
                                <ArrowRight size={18} />
                            </button>
                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-navy font-semibold px-7 py-3.5 rounded-xl transition-all text-base hover:bg-gray-50 hover:-translate-y-0.5"
                            >
                                See How It Works
                            </a>
                        </div>

                        {/* Honest social proof — no fake numbers */}
                        <p className="mt-10 text-sm text-gray-500 max-w-md mx-auto lg:mx-0">
                            Built for job seekers tired of chaotic spreadsheets. Free to get started — no credit card, no catch.
                        </p>
                    </div>

                    {/* Right – Mini product preview */}
                    <div className="animate-fade-up-d2">
                        <div className="glass-card rounded-2xl shadow-xl p-6 max-w-md mx-auto lg:mx-0 lg:ml-auto animate-float animate-glow-pulse">
                            {/* Window bar */}
                            <div className="flex items-center gap-1.5 mb-5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs text-gray-400 font-medium">ApplyAI Dashboard</span>
                            </div>

                            {/* Stat cards */}
                            <div className="grid grid-cols-3 gap-3 mb-5">
                                <MiniStat icon={<FileText size={16} className="text-primary" />} label="Resume Score" value="78/100" />
                                <MiniStat icon={<Briefcase size={16} className="text-emerald-500" />} label="Applications" value="12" />
                                <MiniStat icon={<CalendarCheck size={16} className="text-amber-500" />} label="Interviews" value="3" />
                            </div>

                            {/* Mini pipeline */}
                            <div className="space-y-2.5">
                                <PipelineRow label="Applied" count={12} pct={100} color="bg-primary" />
                                <PipelineRow label="Screening" count={5} pct={42} color="bg-amber-500" />
                                <PipelineRow label="Interview" count={3} pct={25} color="bg-emerald-500" />
                                <PipelineRow label="Offer" count={1} pct={8} color="bg-violet-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MiniStat({ icon, label, value }) {
    return (
        <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-1">{icon}</div>
            <p className="text-lg font-bold text-navy">{value}</p>
            <p className="text-[11px] text-gray-500 font-medium">{label}</p>
        </div>
    );
}

function PipelineRow({ label, count, pct, color }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">{label}</span>
                <span>{count}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
