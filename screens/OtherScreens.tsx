import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Fingerprint, ArrowRight, Brain, Sparkles, Building2, BookOpen, Users, Play } from 'lucide-react';
import { Button, Card, SectionTitle } from '../components/Shared';
import { analyzeCareerPotential } from '../services/geminiService';
import { UserProfile, Job, Course } from '../types';

// --- Login Screen ---
export const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#6495ED] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#FF8C00] rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-sm text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#1A3E63] to-[#6495ED] rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
             <Sparkles size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">SilverAgent</h1>
        <p className="text-[#CBD5E1] text-lg mb-10">银发智慧 · 人机协同</p>
        
        <Card className="mb-6 !p-8">
           <div className="mb-6 text-left">
             <label className="block text-[#6495ED] text-sm mb-2">用户名</label>
             <div className="text-2xl font-semibold text-white">luoyuan881105</div>
           </div>
           <Button variant="primary" fullWidth onClick={onLogin} icon={ArrowRight}>
             安全登录
           </Button>
        </Card>

        <button onClick={onLogin} className="flex flex-col items-center gap-2 text-[#6495ED] opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full border-2 border-[#6495ED] flex items-center justify-center bg-[#1A3E63]">
            <Fingerprint size={32} />
          </div>
          <span className="text-sm">指纹识别接入</span>
        </button>
      </div>
    </div>
  );
};

// --- Assessment Screen ---
export const AssessmentScreen: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Mock Data for Radar Chart
  const data = [
    { subject: '行业经验', A: 95, fullMark: 100 },
    { subject: '人际沟通', A: 85, fullMark: 100 },
    { subject: '判断力', A: 90, fullMark: 100 },
    { subject: '数字技能', A: 40, fullMark: 100 }, // Lower digital skills
    { subject: 'AI协作潜力', A: 75, fullMark: 100 },
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    // Simulate user profile for API
    const profile: UserProfile = {
      id: '1', name: '罗元', age: 68, experienceYears: 35,
      skills: ['历史档案管理', '冲突调解', '质量控制'],
      digitalLiteracyScore: 40, agentSynergyScore: 75
    };
    const result = await analyzeCareerPotential(profile);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-auto pb-24">
      <SectionTitle title="能力评估" subtitle="发现您的数字潜力" />

      {/* Radar Chart */}
      <Card className="mb-6 h-[350px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#6495ED" opacity={0.3} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#CBD5E1', fontSize: 14 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="我的能力" dataKey="A" stroke="#FF8C00" strokeWidth={3} fill="#FF8C00" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* Analysis Section */}
      <Card className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-[#6495ED]/20 rounded-xl">
            <Brain className="text-[#6495ED]" size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold">AI 职业重塑建议</h3>
            <p className="text-gray-400 text-sm mt-1">基于您的 35 年行业经验</p>
          </div>
        </div>
        
        {suggestion ? (
           <div className="p-4 bg-[#1A3E63] rounded-xl border border-[#6495ED]/30 text-lg leading-relaxed animate-fade-in">
             {suggestion}
           </div>
        ) : (
          <Button fullWidth variant="secondary" onClick={handleAnalyze} disabled={loading}>
            {loading ? 'AI 正在分析中...' : '生成重塑建议'}
          </Button>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A3E63] p-4 rounded-2xl border border-white/10 text-center">
          <h4 className="text-3xl font-bold text-[#FF8C00]">35年</h4>
          <p className="text-gray-400 text-sm">沉淀经验</p>
        </div>
        <div className="bg-[#1A3E63] p-4 rounded-2xl border border-white/10 text-center">
           <h4 className="text-3xl font-bold text-[#6495ED]">Lvl 3</h4>
           <p className="text-gray-400 text-sm">数字适应力</p>
        </div>
      </div>
    </div>
  );
};

// --- Job Matching Screen ---
export const JobScreen: React.FC = () => {
  const jobs: Job[] = [
    {
      id: '1', title: '资深历史档案顾问', type: 'Remote', company: '数字文保中心',
      baseSalary: '4k-6k', equity: '项目分红', agentDependency: 70,
      description: '负责指导 AI 整理历史文献，利用您的经验审核 AI 输出的关键错误。',
      tags: ['远程', '经验优先']
    },
    {
      id: '2', title: '智慧养老咨询师', type: 'Consultant', company: '夕阳红科技',
      baseSalary: '300/小时', equity: '期权激励', agentDependency: 50,
      description: '协同 AI 客服处理复杂的家庭矛盾纠纷，提供情感支持。',
      tags: ['半天制', '高时薪']
    }
  ];

  return (
    <div className="h-full overflow-y-auto pb-24">
      <SectionTitle title="精准岗位匹配" subtitle="人机协作型岗位推荐" />

      {/* Filter Chips */}
      <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
        {['全部推荐', '远程办公', '高分红', '低体力'].map((filter, idx) => (
          <span key={idx} className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap ${idx === 0 ? 'bg-[#FF8C00] text-white' : 'bg-white/10 text-gray-300'}`}>
            {filter}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {jobs.map(job => (
          <Card key={job.id} className="relative overflow-hidden group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-gray-300">{job.company}</span>
                </div>
              </div>
              <span className="bg-[#6495ED]/20 text-[#6495ED] text-xs px-2 py-1 rounded-md font-bold uppercase">
                {job.type}
              </span>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

            {/* Agent Dependency Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#6495ED]">AI Agent 辅助率</span>
                <span className="text-white font-mono">{job.agentDependency}%</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-[#6495ED]" style={{ width: `${job.agentDependency}%` }} />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">该岗位 70% 的重复工作由 AI 完成</p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-xl font-bold text-[#FF8C00]">{job.baseSalary}</span>
                <span className="text-xs text-gray-400 block">+ {job.equity}</span>
              </div>
              <Button className="!h-10 !px-6 !text-sm !rounded-xl">一键投递</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// --- Learning Screen ---
export const LearningScreen: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto pb-24">
       <SectionTitle title="终身学习中心" subtitle="跨越数字鸿沟" />

       {/* Progress Card */}
       <div className="bg-gradient-to-r from-[#FF8C00] to-orange-600 rounded-3xl p-6 mb-8 shadow-lg text-white">
         <div className="flex justify-between items-center mb-2">
           <h3 className="text-xl font-bold">数字融入进度</h3>
           <span className="text-2xl font-bold">45%</span>
         </div>
         <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
           <div className="h-full bg-white w-[45%]" />
         </div>
         <p className="mt-2 text-sm opacity-90">再学习 2 门课程即可解锁高级任务</p>
       </div>

       <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
         <BookOpen className="text-[#6495ED]" /> 推荐课程
       </h3>
       
       <div className="space-y-4 mb-8">
         {[
           { title: 'Agent 基础语音交互', duration: '15 分钟', level: '入门' },
           { title: '远程会议软件使用', duration: '30 分钟', level: '初级' },
         ].map((course, idx) => (
           <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold mb-1">{course.title}</h4>
                <div className="flex gap-3 text-sm text-gray-400">
                  <span>{course.duration}</span>
                  <span className="text-[#6495ED]">{course.level}</span>
                </div>
              </div>
              <Button variant="outline" className="!h-10 !w-10 !rounded-full !p-0">
                <Play size={16} fill="currentColor" />
              </Button>
           </div>
         ))}
       </div>

       <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
         <Users className="text-[#FF8C00]" /> 薪火相传社区
       </h3>
       <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
            <img src="https://picsum.photos/100/100" alt="Mentor" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold">老李 (退休工程师)</h4>
            <p className="text-sm text-gray-300 line-clamp-1">分享：我是如何利用 AI 整理 40 年笔记的...</p>
          </div>
          <ArrowRight size={20} className="text-gray-500" />
       </Card>
    </div>
  );
};