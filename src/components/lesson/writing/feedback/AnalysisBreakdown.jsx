// src/components/writing/feedback/AnalysisBreakdown.jsx
import React from 'react';
import { MessageCircle, Layers, Lightbulb } from 'lucide-react';
import FeedbackSidePanel from './FeedbackSidePanel';

export const BreakdownCard = ({ icon, title, severity, description, children }) => {
    return (
        <div className="group bg-background-light dark:bg-[#2a2719] border border-primary/5 hover:border-primary/30 rounded-xl p-6 transition-all duration-300">
            <div className="flex gap-5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">{title}</h4>
                        <span className="text-xs font-bold uppercase py-1 px-3 rounded-full bg-[#f87171]/10 text-[#f87171]">
                            {severity}
                        </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        {description}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
};

const AnalysisBreakdown = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <span className="w-2 h-6 bg-primary rounded-full"></span>
                Detailed Breakdown
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full'>
                <div className='lg:col-span-7'>
                    {/* Politeness Card */}
                    <BreakdownCard
                        icon={<MessageCircle className="w-6 h-6" />}
                        title="Politeness Level"
                        severity="Correction Needed"
                        description={<>You used <span className="font-bold text-primary">나</span> which is informal (Banmal). Since the sentence ends with the polite suffix <span className="font-bold text-primary">-요</span>, you should use the humble form <span className="font-bold text-primary">저</span>.</>}
                    >
                        <div className="flex gap-4">
                            <div className="px-3 py-1 bg-primary/10 rounded-lg text-xs font-medium">Informal: 나 (Na)</div>
                            <div className="px-3 py-1 bg-[#4ade80]/10 text-[#4ade80] rounded-lg text-xs font-medium">Polite: 저 (Jeo)</div>
                        </div>
                    </BreakdownCard>

                    {/* Particles Card */}
                    <BreakdownCard
                        icon={<Layers className="w-6 h-6" />}
                        title="Missing Particles"
                        severity="Critical Error"
                        description={<>You omitted the object marker <span className="font-bold text-primary">~를</span> after "한국어" (Korean language). Particles define the grammatical role of words in Korean sentences.</>}
                    >
                        <div className="flex items-center gap-2 italic text-sm text-slate-500">
                            <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0" />
                            Practice tip: nouns ending in vowels use "~를", consonants use "~을".
                        </div>
                    </BreakdownCard>
                </div>
                <div className='lg:col-span-5'>
                    <FeedbackSidePanel />
                </div>
                
            </div>

        </div>
    );
};

export default AnalysisBreakdown;