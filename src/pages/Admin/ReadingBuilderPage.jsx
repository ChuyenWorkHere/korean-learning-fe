import React, { useState } from 'react';
import {
  ArrowLeft, Image as ImageIcon, FileText, Sparkles, CheckSquare,
  Headphones, PlusCircle, Wand2, Languages, Lightbulb,
  HelpCircle
} from 'lucide-react';

import BlockPalette from '../../components/admin/builder/shared/BlockPalette';
import BlockWrapper from '../../components/admin/builder/shared/BlockWrapper';

// Imports các Component phần ruột của Reading
import CoverBlock from '../../components/admin/builder/reading/CoverBlock';
import LongTextBlock from '../../components/admin/builder/reading/LongTextBlock';
import TrueFalseQuizBlock from '../../components/admin/builder/reading/TrueFalseQuizBlock';
import QuizBlock from '../../components/admin/builder/listening/QuizBlock';
import { READING_ELEMENTS } from '../../components/admin/constants';
import { useParams } from 'react-router';
import { useLessonData } from '../../hooks/useLessonData';
import VocabBlock from '../../components/admin/builder/reading/VocabBlock';
import toast from 'react-hot-toast';
import { lessonService } from '../../services/lessonService';



const ReadingBuilderPage = () => {

  const { lessonId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const { lesson, setLesson, blocks, setBlocks, isFetching } = useLessonData(lessonId);

  // MOCK DATA CÓ SẴN
  // const [blocks, setBlocks] = useState([
  //   {
  //     id: 'block-1', type: 'cover',
  //     imageUrl: 'https://images.unsplash.com/photo-1590059344498-38bc165158a3?q=80&w=800&auto=format&fit=crop'
  //   },
  //   {
  //     id: 'block-2', type: 'long_text',
  //     content: '옛날 어느 산골에 호랑이 한 마리가 살고 있었습니다. 호랑이는 배가 고파서 마을로 내려왔습니다.\n\n집 안에서 아기가 우는 소리가 들렸습니다.\n"뚝! 자꾸 울면 호랑이가 잡아간다!"\n\n하지만 아기는 울음을 그치지 않았습니다.\n그때 어머니가 말했습니다. "자, 여기 곶감이다!"\n\n그러자 아기가 뚝 울음을 그쳤습니다.\n호랑이는 깜짝 놀랐습니다. \'곶감이 나보다 더 무서운 놈인가 보구나!\''
  //   },
  //   {
  //     id: 'block-3', type: 'tf_quiz',
  //     questions: [
  //       { id: 'q-1', text: 'The tiger was afraid of the crying baby.', isTrue: false },
  //       { id: 'q-2', text: "The tiger thinks '곶감' is a scary creature.", isTrue: true }
  //     ]
  //   }
  // ]);

  // Logic quản lý mảng Blocks
  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    if (type === 'cover') newBlock.imageUrl = '';
    if (type === 'long_text') newBlock.content = '';
    if (type === 'vocab') newBlock.words = [{ id: `v-${Date.now()}`, term: '', meaning: '', example: '' }];
    if (type === 'tf_quiz') newBlock.questions = [{ id: `q-${Date.now()}`, text: '', isTrue: false }];
    if (type === 'quiz') {
      newBlock.question = '';
      newBlock.options = [
        { id: `o1-${Date.now()}`, text: '', isCorrect: true }, { id: `o2-${Date.now()}`, text: '', isCorrect: false },
        { id: `o3-${Date.now()}`, text: '', isCorrect: false }, { id: `o4-${Date.now()}`, text: '', isCorrect: false }
      ];
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
  
    if (isFetching) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )
    }

  return (
    <div className=" text-[#1b190d] dark:text-gray-100 min-h-screen font-display flex flex-col">

      {/* Top Toolbar */}
      <header className="border-b border-[#eecd2b]/20 min-h-[4rem] p-4 flex flex-col md:flex-row md:items-center justify-between shrink-0 z-10 gap-4">

        {/* Ô Input Title */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <h1 className="text-lg font-semibold tracking-tight text-[#5e5836] dark:text-[#f0ede4] whitespace-nowrap">Reading: </h1>
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

        {/* Cột 1: Block Palette (Trái) */}
        <BlockPalette elements={READING_ELEMENTS} onAddBlock={handleAddBlock} />

        {/* Cột 2: Canvas Chính (Giữa) */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {blocks.map((block, index) => {
              if (block.type === 'cover') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={ImageIcon} title="Article Cover" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <CoverBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              if (block.type === 'long_text') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={FileText} title="Long Text Paragraph" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <LongTextBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              // if (block.type === 'tf_quiz') {
              //   return (
              //     <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={CheckSquare} title="Reading Comprehension (T/F)" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
              //       <TrueFalseQuizBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
              //     </BlockWrapper>
              //   );
              // }
              if (block.type === 'vocab') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={Sparkles} title="Vocabulary Highlight" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <VocabBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              if (block.type === 'quiz') {
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={HelpCircle} title="Comprehension Quiz" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <QuizBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                  </BlockWrapper>
                );
              }
              // MOCK BLOCKS
              if (['audio'].includes(block.type)) {
                const Icon = block.type === 'vocab' ? Sparkles : Headphones;
                return (
                  <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={Icon} title={`${block.type} Block`} onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                    <div className="p-8 text-center text-gray-500 font-medium">Interface for {block.type} coming soon.</div>
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

export default ReadingBuilderPage;