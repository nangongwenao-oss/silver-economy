import React, { useState } from 'react';
import { Mic, Bot, User, CheckCircle, Play, MoreHorizontal } from 'lucide-react';
import { Button, Card, SectionTitle, AgentStatusBadge } from '../components/Shared';
import { decomposeTask } from '../services/geminiService';
import { TaskType, WorkTask } from '../types';

export const WorkstationScreen: React.FC = () => {
  const [tasks, setTasks] = useState<WorkTask[]>([
    { id: '1', content: '整理本周客户咨询记录', type: TaskType.AGENT, status: 'completed', timestamp: '10:00' },
    { id: '2', content: '分析客户情感倾向', type: TaskType.HUMAN, status: 'in-progress', timestamp: '10:05' },
    { id: '3', content: '生成初步回复草稿', type: TaskType.AGENT, status: 'pending', timestamp: '10:15' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceCommand = async () => {
    setIsProcessing(true);
    // Simulate voice input processing
    setTimeout(async () => {
      const newTasks = await decomposeTask("帮我处理关于养老社区的咨询邮件");
      setTasks(prev => [...prev, ...newTasks]);
      setIsProcessing(false);
    }, 1500);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
    ));
  };

  // Calculate efficiency
  const completed = tasks.filter(t => t.status === 'completed').length;
  const efficiency = Math.round((completed / tasks.length) * 100) || 0;

  return (
    <div className="flex flex-col h-full pb-24">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6">
        <SectionTitle title="协同工作台" subtitle="人机共舞，智胜未来" />
        <AgentStatusBadge status={isProcessing ? 'working' : 'idle'} />
      </div>

      {/* Efficiency Dashboard */}
      <Card className="mb-6 !bg-gradient-to-r from-[#1A3E63] to-[#2C5282] border-[#6495ED]/30">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[#6495ED] text-lg mb-1">当前协同效率</p>
            <h3 className="text-5xl font-bold text-white">{efficiency}%</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">已完成任务</p>
            <p className="text-xl font-bold">{completed} / {tasks.length}</p>
          </div>
        </div>
        <div className="w-full bg-black/30 h-3 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-[#FF8C00] transition-all duration-500" 
            style={{ width: `${efficiency}%` }}
          />
        </div>
      </Card>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTaskStatus(task.id)}
            className={`p-5 rounded-2xl border-l-8 flex items-center gap-4 transition-all active:scale-98 ${
              task.type === TaskType.HUMAN 
                ? 'bg-[#FF8C00]/10 border-[#FF8C00]' 
                : 'bg-[#6495ED]/10 border-[#6495ED]'
            }`}
          >
            <div className={`p-3 rounded-full ${
              task.type === TaskType.HUMAN ? 'bg-[#FF8C00]/20 text-[#FF8C00]' : 'bg-[#6495ED]/20 text-[#6495ED]'
            }`}>
              {task.type === TaskType.HUMAN ? <User size={24} /> : <Bot size={24} />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className={`text-sm font-bold tracking-wide ${
                   task.type === TaskType.HUMAN ? 'text-[#FF8C00]' : 'text-[#6495ED]'
                }`}>
                  {task.type === TaskType.HUMAN ? '需要您的智慧' : 'Agent 自动处理'}
                </span>
                <span className="text-xs text-gray-400">{task.timestamp}</span>
              </div>
              <p className={`text-lg leading-tight ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                {task.content}
              </p>
            </div>

            <div className={task.status === 'completed' ? 'text-green-400' : 'text-gray-600'}>
              <CheckCircle size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Voice Action Button (Floating) */}
      <div className="fixed bottom-24 left-0 right-0 px-6 flex justify-center pointer-events-none">
        <button 
          onClick={handleVoiceCommand}
          disabled={isProcessing}
          className={`pointer-events-auto h-20 w-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#1A3E63] transition-all ${
            isProcessing ? 'bg-gray-600 scale-95' : 'bg-[#FF8C00] hover:bg-orange-600 hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          ) : (
            <Mic size={36} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};