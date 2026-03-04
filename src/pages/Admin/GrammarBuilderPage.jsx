import React, { useEffect, useState } from 'react';
import { AlignLeft, Sigma, List, HelpCircle, ArrowLeft, PlusCircle, CheckCircle } from 'lucide-react';
import BlockPalette from '../../components/admin/builder/shared/BlockPalette';
import BlockWrapper from '../../components/admin/builder/shared/BlockWrapper';

// Imports các Component phần ruột của Grammar
import TheoryBlock from '../../components/admin/builder/grammar/TheoryBlock';
import FormulaBlock from '../../components/admin/builder/grammar/FormulaBlock';
import UsageNoteBlock from '../../components/admin/builder/grammar/UsageNoteBlock';
import ExamplesBlock from '../../components/admin/builder/grammar/ExamplesBlock';
import QuizBlock from '../../components/admin/builder/listening/QuizBlock';

import { useParams } from 'react-router';
import { lessonService } from '../../services/lessonService';
import toast from 'react-hot-toast';
import { GRAMMAR_ELEMENTS } from '../../components/admin/constants';
import { useLessonData } from '../../hooks/useLessonData';



const GrammarBuilderPage = () => {
  const { lessonId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const { lesson, setLesson, blocks, setBlocks, isFetching } = useLessonData(lessonId);


  // Logic quản lý mảng Blocks
  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    if (type === 'theory') newBlock.content = '';
    if (type === 'formula') { newBlock.pattern = ''; newBlock.meaning = ''; }
    if (type === 'usage_note') newBlock.notes = [{ id: `n-${Date.now()}`, text: '' }];
    if (type === 'examples') newBlock.rows = [{ id: `r-${Date.now()}`, ko: '', en: '' }];
    if (type === 'quiz') {
      newBlock.question = ''; newBlock.explanation = '';
      newBlock.options = [{ id: `opt-${Date.now()}-1`, text: '', isCorrect: true }, { id: `opt-${Date.now()}-2`, text: '', isCorrect: false }, { id: `opt-${Date.now()}-3`, text: '', isCorrect: false }, { id: `opt-${Date.now()}-4`, text: '', isCorrect: false }];
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
    <div className=" text-[#1b190d] dark:text-[#f0ede4] min-h-screen font-display flex flex-col">

      <header className="border-b border-[#eecd2b]/20 min-h-[4rem] p-4 flex flex-col md:flex-row md:items-center justify-between shrink-0 z-10 gap-4">

        {/* Ô Input Title */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <h1 className="text-lg font-semibold tracking-tight text-[#5e5836] dark:text-[#f0ede4] whitespace-nowrap">Grammar: </h1>
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

      <div className="flex flex-col md:flex-row flex-1 w-full overflow-hidden">
        {/* Cột trái (Tái sử dụng) */}
        <BlockPalette elements={GRAMMAR_ELEMENTS} onAddBlock={handleAddBlock} />

        {/* Canvas Chính */}
        <main className="flex-1 overflow-y-auto py-4 md:p-8 space-y-8">
          {blocks.map((block, index) => {

            // XÁC ĐỊNH LOẠI BLOCK ĐỂ RENDER
            if (block.type === 'theory') {
              return (
                <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={AlignLeft} title="Theory Block" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                  <TheoryBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            if (block.type === 'formula') {
              return (
                <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={Sigma} title="Formula Box" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                  <FormulaBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            if (block.type === 'usage_note') {
              return (
                <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={CheckCircle} title="Usage Notes" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                  <UsageNoteBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            if (block.type === 'examples') {
              return (
                <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={List} title="Examples Table" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                  <ExamplesBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            return (
              <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={HelpCircle} title="Quick Quiz" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                {/* <div className="p-6 text-center text-gray-500">Quiz Component is ready to be extracted.</div> */}
                <QuizBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
              </BlockWrapper>
            );

          })}

          <div className="max-w-4xl mx-auto py-4 pb-12">
            <button
              onClick={() => handleAddBlock('theory')}
              className="w-full border-2 border-dashed border-[#eecd2b]/30 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#eecd2b]/5 transition-all group">
              <PlusCircle className="w-6 h-6 text-[#eecd2b]/40 group-hover:text-[#eecd2b]" />
              <span className="text-sm font-semibold text-[#5e5836] dark:text-[#f0ede4]/60 group-hover:text-[#1b190d] dark:group-hover:text-white">Add another block from the left panel</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GrammarBuilderPage;