import { useState, useRef } from 'react';
import { FileText, Briefcase, CalendarCheck, TrendingUp, Upload, Search, Bell, Settings, LogOut, Plus, BarChart3, Star, Clock, ChevronRight, Sparkles, MessageSquare, CheckCircle, FileUp, X, Loader2 } from 'lucide-react';

const recentApplications = [
    { company: 'Meridian Labs', role: 'Frontend Developer', status: 'Interview Scheduled', statusColor: 'bg-emerald-100 text-emerald-700', date: 'Aug 15', logo: '#6366f1' },
    { company: 'Solaris Tech', role: 'UI Engineer', status: 'Under Review', statusColor: 'bg-amber-100 text-amber-700', date: 'Aug 13', logo: '#3b82f6' },
    { company: 'Northwind Co', role: 'React Developer', status: 'Applied', statusColor: 'bg-blue-100 text-blue-700', date: 'Aug 11', logo: '#10b981' },
    { company: 'Cascade Inc', role: 'Software Engineer', status: 'Applied', statusColor: 'bg-blue-100 text-blue-700', date: 'Aug 10', logo: '#f59e0b' },
    { company: 'Evergreen HR', role: 'Full-Stack Dev', status: 'Rejected', statusColor: 'bg-gray-100 text-gray-600', date: 'Aug 8', logo: '#ef4444' },
];

const pipelineStages = [
    { label: 'Applied', count: 12, color: 'bg-primary', percentage: 100 },
    { label: 'Screening', count: 5, color: 'bg-amber-500', percentage: 42 },
    { label: 'Interview', count: 3, color: 'bg-emerald-500', percentage: 25 },
    { label: 'Offer', count: 1, color: 'bg-violet-500', percentage: 8 },
];

const upcomingEvents = [
    { title: 'Interview with Meridian Labs', time: 'Tomorrow, 2:00 PM', type: 'interview' },
    { title: 'Follow up — Solaris Tech', time: 'Wed, Aug 20', type: 'followup' },
    { title: 'Application deadline — ArctiqAI', time: 'Thu, Aug 21', type: 'deadline' },
];

export default function DashboardPage({ user, onSignOut }) {
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [resumeFileName, setResumeFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (file) => {
        if (!file) return;
        setResumeFileName(file.name);
        setUploading(true);

        // Simulate upload
        setTimeout(() => {
            setUploading(false);
            setAnalyzing(true);
            // Simulate AI analysis
            setTimeout(() => {
                setAnalyzing(false);
                setResumeUploaded(true);
            }, 2000);
        }, 1500);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
            handleFileSelect(file);
        }
    };

    const onFileInput = (e) => {
        const file = e.target.files[0];
        if (file) handleFileSelect(file);
    };

    const quickActions = resumeUploaded
        ? [
            { icon: Search, label: 'Find Jobs', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
            { icon: MessageSquare, label: 'Mock Interview', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50' },
            { icon: BarChart3, label: 'View Analytics', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
            { icon: Upload, label: 'Update Resume', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
        ]
        : [
            { icon: Upload, label: 'Upload Resume', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', primary: true },
            { icon: Search, label: 'Browse Jobs', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
            { icon: MessageSquare, label: 'Practice Interview', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50' },
            { icon: BarChart3, label: 'Explore Features', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
        ];

    return (
        <div className="min-h-screen bg-gray-50/80">
            {/* Top bar */}
            <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                                <span className="text-white text-sm font-bold">A</span>
                            </div>
                            <span className="font-bold text-xl text-navy">ApplyAI</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="relative p-2.5 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-xl transition-all">
                                <Bell size={20} />
                                {resumeUploaded && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />}
                            </button>
                            <button className="p-2.5 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-xl transition-all">
                                <Settings size={20} />
                            </button>
                            <div className="h-8 w-px bg-gray-200 mx-1" />
                            <div className="flex items-center gap-3 pl-1">
                                <div className="w-9 h-9 bg-gradient-to-br from-primary to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                    {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold text-navy leading-tight">{user?.name || 'User'}</p>
                                    <p className="text-xs text-gray-500 leading-tight">{user?.email || ''}</p>
                                </div>
                                <button
                                    onClick={onSignOut}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome banner */}
                <div className="bg-gradient-to-r from-navy via-navy-light to-navy rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden animate-fade-up">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-200 text-xs font-medium px-3 py-1 rounded-full mb-3 border border-white/10">
                            <Sparkles size={12} />
                            Dashboard
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
                        </h1>
                        <p className="text-blue-200/80 text-sm sm:text-base">
                            {resumeUploaded
                                ? 'You have 3 interviews lined up this week. Keep the momentum going!'
                                : 'Upload your resume to get started with AI-powered job search insights.'}
                        </p>
                    </div>
                </div>

                {/* Resume upload prompt — only if not uploaded */}
                {!resumeUploaded && !uploading && !analyzing && (
                    <div
                        className={`upload-zone rounded-2xl p-8 sm:p-12 mb-8 text-center animate-fade-up ${dragOver ? 'dragging' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={onDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={onFileInput}
                        />
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <FileUp size={28} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">Upload your resume to get started</h3>
                        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                            Drop your PDF or DOCX file here, or click below to browse. Our AI will analyze it and give you a personalized score with improvement suggestions.
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-700 hover:from-primary-dark hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                        >
                            <Upload size={18} />
                            Choose File
                        </button>
                        <p className="mt-3 text-xs text-gray-400">PDF, DOC, DOCX · Max 5MB</p>
                    </div>
                )}

                {/* Upload / Analyzing state */}
                {(uploading || analyzing) && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 mb-8 text-center animate-scale-in">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <Loader2 size={28} className="text-primary animate-spin" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">
                            {uploading ? 'Uploading your resume…' : 'Analyzing with AI…'}
                        </h3>
                        <p className="text-gray-500 text-sm mb-5">
                            {uploading
                                ? `Uploading ${resumeFileName}`
                                : 'Our AI is reading your resume and generating insights. This takes a few seconds.'}
                        </p>
                        <div className="max-w-xs mx-auto h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r from-primary to-violet-500 rounded-full transition-all duration-1000 ${uploading ? 'w-1/2' : 'w-4/5'}`} />
                        </div>
                    </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-up">
                    {resumeUploaded ? (
                        <>
                            <StatCard icon={<FileText size={20} />} label="Resume Score" value="78 / 100" accent="text-primary bg-blue-50" trend="+5" />
                            <StatCard icon={<Briefcase size={20} />} label="Applications" value="12" accent="text-emerald-600 bg-emerald-50" trend="+3" />
                            <StatCard icon={<CalendarCheck size={20} />} label="Interviews" value="3" accent="text-amber-600 bg-amber-50" trend="+1" />
                            <StatCard icon={<TrendingUp size={20} />} label="Response Rate" value="42%" accent="text-violet-600 bg-violet-50" trend="+8%" />
                        </>
                    ) : (
                        <>
                            <StatCardEmpty icon={<FileText size={20} />} label="Resume Score" hint="Upload resume" accent="text-gray-400 bg-gray-100" />
                            <StatCardEmpty icon={<Briefcase size={20} />} label="Applications" hint="0 tracked" accent="text-gray-400 bg-gray-100" />
                            <StatCardEmpty icon={<CalendarCheck size={20} />} label="Interviews" hint="None yet" accent="text-gray-400 bg-gray-100" />
                            <StatCardEmpty icon={<TrendingUp size={20} />} label="Response Rate" hint="—" accent="text-gray-400 bg-gray-100" />
                        </>
                    )}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {quickActions.map(({ icon: Icon, label, color, bg, primary }, i) => (
                        <button
                            key={label}
                            onClick={primary && !resumeUploaded ? () => fileInputRef.current?.click() : undefined}
                            className={`flex items-center gap-3 rounded-xl p-4 transition-all text-left group ${primary
                                    ? 'bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1'
                                    : 'bg-white border border-gray-200 hover:shadow-md hover:-translate-y-0.5'
                                }`}
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${primary ? 'bg-white/20' : bg}`}>
                                {primary ? (
                                    <Icon size={18} className="text-white" />
                                ) : (
                                    <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${color} flex items-center justify-center`}>
                                        <Icon size={14} className="text-white" />
                                    </div>
                                )}
                            </div>
                            <span className={`text-sm font-medium ${primary ? 'text-white' : 'text-navy group-hover:text-primary'} transition-colors`}>
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Pipeline + applications */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Pipeline */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm animate-fade-up">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-semibold text-navy">Application Pipeline</h2>
                                {resumeUploaded && (
                                    <button className="text-xs text-primary hover:text-primary-dark font-medium transition-colors">View All</button>
                                )}
                            </div>
                            {resumeUploaded ? (
                                <div className="space-y-4">
                                    {pipelineStages.map((stage, i) => (
                                        <div key={stage.label} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                                                <span className="font-medium">{stage.label}</span>
                                                <span className="font-semibold text-navy">{stage.count}</span>
                                            </div>
                                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${stage.color} animate-progress-fill`}
                                                    style={{ width: `${stage.percentage}%`, animationDelay: `${i * 150}ms` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    icon={<BarChart3 size={24} className="text-gray-300" />}
                                    title="No applications tracked yet"
                                    description="Start applying to jobs and track your progress here."
                                />
                            )}
                        </div>

                        {/* Recent applications table */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm animate-fade-up">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-semibold text-navy">Recent Applications</h2>
                                {resumeUploaded && (
                                    <button className="inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/15 font-medium px-3 py-1.5 rounded-lg transition-colors">
                                        <Plus size={14} />
                                        Add New
                                    </button>
                                )}
                            </div>

                            {resumeUploaded ? (
                                <>
                                    {/* Desktop table */}
                                    <div className="hidden sm:block overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                                                    <th className="pb-3 font-medium">Company</th>
                                                    <th className="pb-3 font-medium">Role</th>
                                                    <th className="pb-3 font-medium">Status</th>
                                                    <th className="pb-3 font-medium text-right">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentApplications.map((app, i) => (
                                                    <tr key={app.company} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/80 transition-colors group">
                                                        <td className="py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: app.logo }}>
                                                                    {app.company.charAt(0)}
                                                                </div>
                                                                <span className="font-medium text-navy group-hover:text-primary transition-colors">{app.company}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 text-gray-600">{app.role}</td>
                                                        <td className="py-3">
                                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${app.statusColor}`}>
                                                                {app.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-gray-500 text-right">{app.date}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile cards */}
                                    <div className="sm:hidden space-y-3">
                                        {recentApplications.map((app) => (
                                            <div key={app.company} className="bg-gray-50 rounded-xl p-3.5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: app.logo }}>
                                                        {app.company.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-navy text-sm truncate">{app.company}</p>
                                                        <p className="text-xs text-gray-500">{app.role}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-400">{app.date}</span>
                                                </div>
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${app.statusColor}`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <EmptyState
                                    icon={<Briefcase size={24} className="text-gray-300" />}
                                    title="No applications yet"
                                    description="Once you start applying, your applications will appear here with status tracking."
                                />
                            )}
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-6">
                        {/* Resume score */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm animate-fade-up">
                            <h2 className="text-lg font-semibold text-navy mb-4">Resume Score</h2>
                            {resumeUploaded ? (
                                <>
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="relative w-32 h-32">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                                <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                                <circle cx="60" cy="60" r="52" fill="none" stroke="url(#scoreGradient)" strokeWidth="8" strokeLinecap="round"
                                                    strokeDasharray={`${78 * 3.27} ${100 * 3.27}`}
                                                    className="transition-all duration-1000"
                                                />
                                                <defs>
                                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#2563eb" />
                                                        <stop offset="100%" stopColor="#7c3aed" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-bold text-navy">78</span>
                                                <span className="text-xs text-gray-500">out of 100</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <ScoreItem label="Keywords" score="Good" color="text-emerald-600" />
                                        <ScoreItem label="Formatting" score="Great" color="text-primary" />
                                        <ScoreItem label="Length" score="Needs Work" color="text-amber-600" />
                                    </div>
                                    <button className="w-full mt-4 text-sm text-primary hover:text-primary-dark font-medium py-2.5 rounded-lg hover:bg-primary/5 transition-colors">
                                        Improve Your Resume →
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="relative w-28 h-28 mx-auto mb-4">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                            <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-gray-300">—</span>
                                            <span className="text-xs text-gray-400">no data</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Upload your resume to get an AI-powered score</p>
                                    <button
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                                    >
                                        Upload Resume ↑
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Upcoming */}
                        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm animate-fade-up">
                            <h2 className="text-lg font-semibold text-navy mb-4">Upcoming</h2>
                            {resumeUploaded ? (
                                <div className="space-y-1">
                                    {upcomingEvents.map((event, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${event.type === 'interview' ? 'bg-emerald-500' :
                                                    event.type === 'followup' ? 'bg-amber-500' : 'bg-red-500'
                                                }`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-navy truncate">{event.title}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <Clock size={11} />
                                                    {event.time}
                                                </p>
                                            </div>
                                            <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors mt-0.5" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    icon={<CalendarCheck size={20} className="text-gray-300" />}
                                    title="No upcoming events"
                                    description="Your interviews and deadlines will show here."
                                    compact
                                />
                            )}
                        </div>

                        {/* Pro tip */}
                        <div className="bg-gradient-to-br from-primary/5 to-violet-500/5 rounded-2xl border border-primary/10 p-5 shadow-sm animate-fade-up">
                            <div className="flex items-center gap-2 mb-2">
                                <Star size={16} className="text-primary" />
                                <span className="text-sm font-semibold text-navy">Pro Tip</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {resumeUploaded
                                    ? 'Companies with follow-ups within 48 hours have a 40% higher response rate. Don\'t forget to follow up!'
                                    : 'A well-optimized resume gets 3x more interview callbacks. Upload yours to get AI-powered suggestions!'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, accent, trend }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
                    {icon}
                </div>
                {trend && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-navy">{value}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
        </div>
    );
}

function StatCardEmpty({ icon, label, hint, accent }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200/60 border-dashed p-4">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
                    {icon}
                </div>
            </div>
            <p className="text-xl font-bold text-gray-300">{hint}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
        </div>
    );
}

function ScoreItem({ label, score, color }) {
    return (
        <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-gray-600">{label}</span>
            <span className={`text-xs font-semibold ${color}`}>{score}</span>
        </div>
    );
}

function EmptyState({ icon, title, description, compact }) {
    return (
        <div className={`text-center ${compact ? 'py-4' : 'py-8'}`}>
            <div className={`${compact ? 'w-10 h-10' : 'w-14 h-14'} bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                {icon}
            </div>
            <p className={`font-medium text-gray-500 ${compact ? 'text-xs' : 'text-sm'} mb-1`}>{title}</p>
            <p className={`text-gray-400 ${compact ? 'text-xs' : 'text-xs'}`}>{description}</p>
        </div>
    );
}
