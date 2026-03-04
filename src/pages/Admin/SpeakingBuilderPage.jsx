import React, { useState } from 'react';
import { ArrowLeft, Settings, MessageSquare, Mic, PlusCircle } from 'lucide-react';

import BlockPalette from '../../components/admin/builder/shared/BlockPalette';
import BlockWrapper from '../../components/admin/builder/shared/BlockWrapper';

// Imports Components phần ruột của Speaking
import RoleplaySetupBlock from '../../components/admin/builder/speaking/RoleplaySetupBlock';
import DialogueSequenceBlock from '../../components/admin/builder/speaking/DialogueSequenceBlock';
import { useParams } from 'react-router';
import { useLessonData } from '../../hooks/useLessonData';
import toast from 'react-hot-toast';
import { SPEAKING_ELEMENTS } from '../../components/admin/constants';
import PronunciationBlock from '../../components/admin/builder/speaking/PronunciationBlock';



const SpeakingBuilderPage = () => {
  const { lessonId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const { lesson, setLesson, blocks, setBlocks, isFetching } = useLessonData(lessonId);

  // Logic quản lý mảng Blocks
  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    if (type === 'roleplay_setup') {
      newBlock.characterA = { name: 'Person A', avatarUrl: '', voiceType: 'Female (Standard)' };
      newBlock.characterB = { name: 'Person B', avatarUrl: '', isUserControlled: true };
    }
    if (type === 'dialogue_sequence') {
      newBlock.messages = [{ id: `msg-${Date.now()}`, speaker: 'A', korean: '', english: '', isAutoPlay: true, requiresSpeech: false }];
    }
    if (type === 'pronunciation') {
      newBlock.koreanText = '';
      newBlock.englishText = '';
      newBlock.phonetic = '';
      newBlock.passingScore = 80;
      newBlock.timeLimit = 15;
    }
    setBlocks([...blocks, newBlock]);
  };

  const moveBlock = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const deleteBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const updateBlockData = (index, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  const handleUpdateLesson = async (status = 'DRAFT') => {
    try {
      setIsSaving(true);
      const payload = {
        ...lesson,
        status: status,
        content: JSON.stringify(blocks)
      };
      await lessonService.updateLesson(lessonId, payload);
      setLesson(prev => ({ ...prev, status: status }));
      toast.success(status === 'PUBLISHED' ? "Đã xuất bản!" : "Đã lưu nháp!");
    } catch (error) {
      toast.error("Cập nhật thất bại");
    } finally {
      setIsSaving(false);
    }
  }

  // Extra Header Actions cho Block Dialogue Sequence
  const renderDialogueActions = () => (
    <div className="flex items-center gap-2 mr-4 bg-[#eecd2b]/20 px-2 py-1 rounded">
      <span className="text-xs font-medium text-[#1b190d] dark:text-[#eecd2b]">Mode: Automatic</span>
    </div>
  );

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }
  return (
    <div className=" text-[#1b190d] dark:text-gray-100 min-h-screen font-display flex flex-col">

      {/* Header */}
      <header className="border-b border-[#eecd2b]/20 min-h-[4rem] p-4 flex flex-col md:flex-row md:items-center justify-between shrink-0 z-10 gap-4">

        {/* Ô Input Title */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <h1 className="text-lg font-semibold tracking-tight text-[#5e5836] dark:text-[#f0ede4] whitespace-nowrap">Writing: </h1>
          <input
            className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold outline-none w-full md:w-96 text-[#1b190d] dark:text-[#eecd2b] truncate"
            placeholder='Ex. Grammar pattern -고 싶다'
            value={lesson.title}
            onChange={(e) =>
              setLesson({
                ...lesson,
                title: e.target.value
              })}
          />
        </div>

        {/* Cụm Nút bấm */}
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => handleUpdateLesson('DRAFT')}
            disabled={isSaving}
            className="px-5 py-2 text-sm font-medium border border-[#eecd2b] text-[#1b190d] dark:text-[#eecd2b] rounded-lg hover:bg-[#eecd2b]/10 transition-colors">Save Draft</button>
          <button
            onClick={() => handleUpdateLesson('PUBLISHED')}
            disabled={isSaving}
            className="px-5 py-2 text-sm font-medium bg-[#eecd2b] text-[#1b190d] rounded-lg hover:shadow-lg hover:shadow-[#eecd2b]/20 transition-all">Publish</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Cột 1: Block Palette */}
        <BlockPalette elements={SPEAKING_ELEMENTS} onAddBlock={handleAddBlock} />

        {/* Cột 2: Canvas Chính */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {blocks.map((block, index) => {
              if (block.type === 'roleplay_setup') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={Settings} title="Roleplay Setup" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <RoleplaySetupBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              if (block.type === 'dialogue_sequence') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={MessageSquare} title="Dialogue Sequence" extraHeaderActions={renderDialogueActions()} onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <DialogueSequenceBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              if (block.type === 'pronunciation') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={Mic} title="Pronunciation Test" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <PronunciationBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              return null;
            })}

            <div className="pt-4 pb-12">
              <button className="w-full py-10 border-2 border-dashed border-[#eecd2b]/30 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-[#eecd2b]/5 transition-all group">
                <PlusCircle className="w-8 h-8 text-[#eecd2b]/40 group-hover:text-[#eecd2b]" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-[#1b190d] dark:group-hover:text-white">Add another block from the left</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpeakingBuilderPage;