import { FileText, Briefcase, CalendarCheck, TrendingUp } from 'lucide-react';

const recentApplications = [
    { company: 'Meridian Labs', role: 'Frontend Developer', status: 'Interview Scheduled', statusColor: 'bg-emerald-100 text-emerald-700', date: 'Aug 15' },
    { company: 'Solaris Tech', role: 'UI Engineer', status: 'Under Review', statusColor: 'bg-amber-100 text-amber-700', date: 'Aug 13' },
    { company: 'Northwind Co', role: 'React Developer', status: 'Applied', statusColor: 'bg-blue-100 text-blue-700', date: 'Aug 11' },
    { company: 'Cascade Inc', role: 'Software Engineer', status: 'Applied', statusColor: 'bg-blue-100 text-blue-700', date: 'Aug 10' },
    { company: 'Evergreen HR', role: 'Full-Stack Dev', status: 'Rejected', statusColor: 'bg-gray-100 text-gray-600', date: 'Aug 8' },
];

const pipelineStages = [
    { label: 'Applied', count: 12, color: 'bg-primary' },
    { label: 'Screening', count: 5, color: 'bg-amber-500' },
    { label: 'Interview', count: 3, color: 'bg-emerald-500' },
    { label: 'Offer', count: 1, color: 'bg-violet-500' },
];

export default function Dashboard() {
    return (
        <section id="product" className="py-16 sm:py-24 bg-gray-50/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 reveal">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Product Preview</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-navy">See ApplyAI in action</h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        A clear view of your job search — from resume analysis to interview scheduling.
                    </p>
                </div>

                {/* Dashboard container */}
                <div className="glass-card rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto reveal">
                    {/* Window bar */}
                    <div className="flex items-center gap-1.5 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="ml-3 text-xs text-gray-400 font-medium">dashboard.applyai.app</span>
                    </div>

                    <div className="p-5 sm:p-8">
                        {/* Stat cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <StatCard icon={<FileText size={20} />} label="Resume Score" value="78 / 100" accent="text-primary bg-indigo-50" />
                            <StatCard icon={<Briefcase size={20} />} label="Applications" value="12" accent="text-emerald-600 bg-emerald-50" />
                            <StatCard icon={<CalendarCheck size={20} />} label="Interviews" value="3" accent="text-amber-600 bg-amber-50" />
                            <StatCard icon={<TrendingUp size={20} />} label="Response Rate" value="42%" accent="text-violet-600 bg-violet-50" />
                        </div>

                        <div className="grid lg:grid-cols-5 gap-6">
                            {/* Pipeline */}
                            <div className="lg:col-span-2">
                                <h3 className="text-sm font-semibold text-navy mb-4">Application Pipeline</h3>
                                <div className="space-y-3">
                                    {pipelineStages.map((stage) => (
                                        <div key={stage.label}>
                                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                <span className="font-medium">{stage.label}</span>
                                                <span>{stage.count}</span>
                                            </div>
                                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${stage.color} transition-all duration-700`}
                                                    style={{ width: `${(stage.count / 12) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent applications */}
                            <div className="lg:col-span-3">
                                <h3 className="text-sm font-semibold text-navy mb-4">Recent Applications</h3>

                                {/* Desktop table */}
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                                                <th className="pb-2 font-medium">Company</th>
                                                <th className="pb-2 font-medium">Role</th>
                                                <th className="pb-2 font-medium">Status</th>
                                                <th className="pb-2 font-medium text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentApplications.map((app) => (
                                                <tr key={app.company} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-2.5 font-medium text-navy">{app.company}</td>
                                                    <td className="py-2.5 text-gray-600">{app.role}</td>
                                                    <td className="py-2.5">
                                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${app.statusColor}`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 text-gray-500 text-right">{app.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile card list */}
                                <div className="sm:hidden space-y-3">
                                    {recentApplications.map((app) => (
                                        <div key={app.company} className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-medium text-navy text-sm">{app.company}</p>
                                                <span className="text-xs text-gray-500">{app.date}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2">{app.role}</p>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${app.statusColor}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, label, value, accent }) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100/80 transition-colors">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${accent}`}>
                {icon}
            </div>
            <p className="text-2xl font-bold text-navy">{value}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
        </div>
    );
}
