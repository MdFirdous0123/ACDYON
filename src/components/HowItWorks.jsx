import { Upload, ListChecks, Rocket } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Upload,
        title: 'Upload',
        description: 'Upload your resume and let ApplyAI analyze it for improvements.',
        gradient: 'from-indigo-500 to-indigo-600',
    },
    {
        number: '02',
        icon: ListChecks,
        title: 'Track',
        description: 'Organize and improve your applications in one dashboard.',
        gradient: 'from-violet-500 to-violet-600',
    },
    {
        number: '03',
        icon: Rocket,
        title: 'Prepare',
        description: 'Prepare for interviews and apply with confidence.',
        gradient: 'from-cyan-500 to-cyan-600',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 reveal">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">How It Works</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-navy">Three steps to your next interview</h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        From resume upload to interview prep — no spreadsheets required.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
                    {/* Connector line – desktop only */}
                    <div className="hidden md:block absolute top-10 left-[25%] right-[25%] h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200" aria-hidden="true" />

                    {steps.map(({ number, icon: Icon, title, description, gradient }, i) => (
                        <div
                            key={number}
                            className="reveal relative text-center group"
                            style={{ transitionDelay: `${i * 120}ms` }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm mb-5 relative z-10 group-hover:shadow-lg group-hover:-translate-y-1 transition-all">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                                    <Icon size={20} className="text-white" />
                                </div>
                            </div>
                            <span className="block text-xs font-bold text-primary mb-1 tracking-wider">{number}</span>
                            <h3 className="text-lg font-semibold text-navy mb-1.5">{title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
