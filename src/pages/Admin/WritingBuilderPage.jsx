import React, { useState } from 'react';
import { Languages, FileEdit, Grid3X3, ArrowLeft, PlusCircle, BrainCircuit, Sparkles, Loader2 } from 'lucide-react';
import BlockPalette from '../../components/admin/builder/shared/BlockPalette';
import BlockWrapper from '../../components/admin/builder/shared/BlockWrapper';
import TranslationBlock from '../../components/admin/builder/writing/TranslationBlock';
import EssayBlock from '../../components/admin/builder/writing/EssayBlock';
import WongojiBlock from '../../components/admin/builder/writing/WongojiBlock';
import AiGradingBlock from '../../components/admin/builder/writing/AiGradingBlock';
import { lessonService } from '../../services/lessonService';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { useLessonData } from '../../hooks/useLessonData';
import { WRITING_ELEMENTS } from '../../components/admin/constants';
import { aiService } from '../../services/aiService';
import WongojiEditor from '../../components/admin/builder/writing/WongojiEditor';



const WritingBuilderPage = () => {

  const { lessonId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const { lesson, setLesson, blocks, setBlocks, isFetching } = useLessonData(lessonId);

  // --- LOGIC ---
  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    if (type === 'translation') {
      newBlock.english = ''; newBlock.korean = ''; newBlock.variations = []; newBlock.tempVariation = '';
    }
    if (type === 'essay') {
      newBlock.title = ''; newBlock.instructions = ''; newBlock.minWords = 200; newBlock.maxWords = 300; newBlock.timeLimit = 30; newBlock.difficulty = 'Intermediate (Level 3-4)'; newBlock.aiGrading = false;
    }
    if (type === 'wongoji') {
      newBlock.rows = 20; newBlock.cols = 20; newBlock.showGrid = true;
    }
    if (type === 'ai_grading') {
      newBlock.rubric = ''; newBlock.strictness = 'Medium (Standard TOPIK rules)';
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

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAutoGenerate = async (blockIndex) => {
    // Cho admin nhập từ khóa chủ đề (hoặc nếu bỏ trống thì random)
    const topic = prompt("Nhập từ khóa chủ đề (VD: Environment, Education, Social Media):", "Modern Society");
    if (topic === null) return; // Nhấn Cancel

    setIsGenerating(true);
    const toastId = toast.loading("Gemini đang tạo đề bài TOPIK...");

    try {
      const aiResult = await aiService.generateWritingPrompt(topic);

      // Đổ dữ liệu AI sinh ra vào Form
      updateBlockData(blockIndex, 'title', aiResult.title || '');
      updateBlockData(blockIndex, 'instructions', aiResult.instructions || '');
      updateBlockData(blockIndex, 'minWords', aiResult.minWords || 200);
      updateBlockData(blockIndex, 'maxWords', aiResult.maxWords || 300);
      updateBlockData(blockIndex, 'timeLimit', aiResult.timeLimit || 30);
      updateBlockData(blockIndex, 'difficulty', aiResult.difficulty || 'Intermediate (Level 3-4)');
      
      toast.success("Tạo đề bài thành công!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tạo đề bằng AI.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  // Nút phụ (Toggle AI) truyền vào header của EssayBlock
  const renderEssayHeaderActions = (block, index) => (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer mr-4"
        onClick={() => updateBlockData(index, 'aiGrading', !block.aiGrading)}
      >
        <span className="text-xs font-medium text-[#5e5836] dark:text-[#f0ede4]/70">AI Auto-Grading</span>
        <div className={`w-10 h-5 rounded-full relative p-1 transition-colors ${block.aiGrading ? 'bg-[#eecd2b]' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${block.aiGrading ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
      </div>
      <button
        onClick={() => handleAutoGenerate(index)}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-[#f0ede4]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Sparkles className="w-4 h-4" />
      </button>
    </>
  );

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }



  return (
    <div className=" text-[#1b190d] dark:text-[#f0ede4] min-h-screen font-display flex flex-col">

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
        {/* Cột trái */}
        <BlockPalette elements={WRITING_ELEMENTS} onAddBlock={handleAddBlock} />

        {/* Canvas Chính */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {blocks.map((block, index) => {

            // XÁC ĐỊNH LOẠI BLOCK ĐỂ RENDER
            if (block.type === 'essay') {
              return (
                <BlockWrapper
                  key={block.id} index={index} totalBlocks={blocks.length}
                  icon={FileEdit} title="Essay Prompt"
                  extraHeaderActions={renderEssayHeaderActions(block, index)}
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDelete={() => deleteBlock(index)}
                >
                  <EssayBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            if (block.type === 'translation') {
              return (
                <BlockWrapper
                  key={block.id} index={index} totalBlocks={blocks.length}
                  icon={Languages} title="Sentence Translation"
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDelete={() => deleteBlock(index)}
                >
                  <TranslationBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            if (block.type === 'wongoji') {
              return (
                <BlockWrapper
                  key={block.id} index={index} totalBlocks={blocks.length}
                  icon={Grid3X3} title="Wongoji Grid Setup"
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDelete={() => deleteBlock(index)}
                >
                  <WongojiBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            if (block.type === 'ai_grading') {
              return (
                <BlockWrapper
                  key={block.id} index={index} totalBlocks={blocks.length}
                  icon={BrainCircuit} title="AI Grading Rules"
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDelete={() => deleteBlock(index)}
                >
                  <AiGradingBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }

            return null;
          })}

          <div className="max-w-4xl mx-auto py-4 pb-12">
            <button className="w-full border-2 border-dashed border-[#eecd2b]/30 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#eecd2b]/5 hover:border-[#eecd2b] transition-all group">
              <PlusCircle className="w-6 h-6 text-[#eecd2b]/40 group-hover:text-[#eecd2b]" />
              <span className="text-sm font-semibold text-[#5e5836] dark:text-[#f0ede4]/60 group-hover:text-[#1b190d] dark:group-hover:text-white">Add another block from the left panel</span>
            </button>
          </div>
        </main>
      </div>
      {/* --- MODAL LOADING UPLOAD --- */}
      {isGenerating && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#2d2916] p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-[#eecd2b]/20 animate-in fade-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-[#eecd2b] animate-spin mb-4" />
            <h3 className="text-lg font-bold text-[#1b190d] dark:text-white mb-2">
              Generating topic...
            </h3>
            <p className="text-sm text-center text-[#5e5836] dark:text-[#f0ede4]/70">
              Please wait while AI is generating the topic. This may take a few moments depending on your network connection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingBuilderPage;