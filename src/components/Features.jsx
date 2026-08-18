import { FileSearch, LayoutList, MessageSquare, BarChart3, ArrowUpRight } from 'lucide-react';

const features = [
    {
        icon: FileSearch,
        title: 'AI Resume Analysis',
        description: 'Identify areas where your resume can be improved with targeted, actionable suggestions.',
        gradient: 'from-indigo-500 to-indigo-600',
        bg: 'bg-indigo-50',
    },
    {
        icon: LayoutList,
        title: 'Job Application Tracker',
        description: 'Organize every application and track progress from submission to offer.',
        gradient: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-50',
    },
    {
        icon: MessageSquare,
        title: 'Interview Preparation',
        description: 'Prepare for interviews with focused practice questions and structured feedback.',
        gradient: 'from-violet-500 to-violet-600',
        bg: 'bg-violet-50',
    },
    {
        icon: BarChart3,
        title: 'Application Insights',
        description: 'Understand your application activity and progress with clear visual summaries.',
        gradient: 'from-cyan-500 to-cyan-600',
        bg: 'bg-cyan-50',
    },
];

export default function Features() {
    return (
        <section id="features" className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 reveal">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Features</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-navy">
                        Everything you need to land your next role
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        Four focused tools to help you apply smarter and move faster.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {features.map(({ icon: Icon, title, description, gradient, bg }, i) => (
                        <div
                            key={title}
                            className="reveal group glass-card rounded-2xl p-6 card-hover"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                                        <Icon size={18} className="text-white" />
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </div>
                            <h3 className="text-lg font-semibold text-navy mb-1.5">{title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
