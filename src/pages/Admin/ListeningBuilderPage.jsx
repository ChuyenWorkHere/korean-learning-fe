import React, { useState } from 'react';
import { ArrowLeft, PlayCircle, Subtitles, Edit3, HelpCircle, PlusCircle, Sparkles, Loader2 } from 'lucide-react';
import BlockPalette from '../../components/admin/builder/shared/BlockPalette';
import BlockWrapper from '../../components/admin/builder/shared/BlockWrapper';

// Imports các Component phần ruột của Listening
import MediaPlayerBlock from '../../components/admin/builder/listening/MediaPlayerBlock';
import TranscriptBlock from '../../components/admin/builder/listening/TranscriptBlock';
import DictationBlock from '../../components/admin/builder/listening/DictationBlock';
import QuizBlock from '../../components/admin/builder/listening/QuizBlock';
import { LISTENING_ELEMENTS } from '../../components/admin/constants';
import { useParams } from 'react-router';
import { useLessonData } from '../../hooks/useLessonData';
import toast from 'react-hot-toast';
import { lessonService } from '../../services/lessonService';
import { fileService } from '../../services/fileService';
import { formatMsToTime } from '../../utils/helpers';



const ListeningBuilderPage = () => {
  const { lessonId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { lesson, setLesson, blocks, setBlocks, isFetching } = useLessonData(lessonId);

  // Logic quản lý mảng Blocks
  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    if (type === 'media') newBlock.audioUrl = '';
    if (type === 'transcript') newBlock.rows = [{ id: `r-${Date.now()}`, time: '', speaker: '', ko: '', en: '' }];
    if (type === 'dictation') newBlock.text = '';
    if (type === 'quiz') {
      newBlock.question = '';
      newBlock.options = [
        { id: `opt-${Date.now()}-1`, text: '', isCorrect: true }, { id: `opt-${Date.now()}-2`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-3`, text: '', isCorrect: false }, { id: `opt-${Date.now()}-4`, text: '', isCorrect: false }
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
      console.log(error);
      toast.error("Cập nhật thất bại");
    } finally {
      setIsSaving(false);
    }
  }

  // --- LOGIC GỌI AI ASSEMBLY ---
  const handleAutoGenerate = async (blockIndex) => {
    const targetBlock = blocks[blockIndex];

    if (targetBlock.type === 'dictation') {
      const transcriptBlock = blocks.find(b => b.type === 'transcript');

      // Kiểm tra xem Transcript đã có dữ liệu chưa (có row và row đầu tiên không bị rỗng)
      const hasTranscriptData = transcriptBlock &&
        transcriptBlock.rows &&
        transcriptBlock.rows.length > 0 &&
        transcriptBlock.rows[0].ko.trim() !== '';

      if (hasTranscriptData) {
        // Gom toàn bộ chữ tiếng Hàn (ko) từ các dòng lại thành 1 đoạn văn hoàn chỉnh
        const fullText = transcriptBlock.rows
          .map(row => row.ko.trim())
          .filter(text => text !== '') // Loại bỏ các dòng rỗng
          .join(' '); // Ghép lại bằng dấu cách

        // Cập nhật thẳng vào Dictation
        updateBlockData(blockIndex, 'text', fullText);
        toast.success("Lấy văn bản từ Transcript thành công!");
        return; // DỪNG Ở ĐÂY, KHÔNG CẦN GỌI API NỮA!
      }
    }


    const mediaBlock = blocks?.find(b => b.type === 'media');
    const audioUrl = mediaBlock?.audioUrl;

    if (!audioUrl) {
      toast.error("Vui lòng upload Audio ở khối Media Player trước!");
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading("AI đang nghe và chép lời... Quá trình này có thể mất 10-30 giây.");

    try {
      // Gọi API Spring Boot
      const aiResult = await fileService.autoTranscribe(audioUrl);

      // Nếu bấm AI từ khối TRANSCRIPT
      if (targetBlock.type === 'transcript') {
        if (aiResult.utterances && aiResult.utterances.length > 0) {
          const newRows = [];
          let isFirst = true;
          let row = { id: `r-${Date.now()}`, time: '', speaker: '', ko: '', en: '' };

          // Logic chia câu cũ của bạn (Giữ nguyên)
          for (let index = 0; index < aiResult.words.length; index++) {
            const element = aiResult.words[index];
            if (element.text.includes('.', '?')) {
              row = { ...row, id: `r-${Date.now()}-${index}`, ko: `${row.ko} ${element.text}`, speaker: element.speaker };
              newRows.push(row);
              row = { id: `r-${Date.now()}`, time: '', speaker: '', ko: '', en: '' };
              isFirst = true;
            } else {
              if (isFirst) {
                if (index === 0) {
                  row = { ...row, time: "00:00", ko: `${row.ko} ${element.text}` };
                } else {
                  row = { ...row, time: formatMsToTime(element.start), ko: `${row.ko} ${element.text}` };
                }
              } else {
                row = { ...row, ko: `${row.ko} ${element.text}` };
              }
              isFirst = false;
            }
          }

          updateBlockData(blockIndex, 'rows', newRows);
          toast.success("Tạo phụ đề bằng AI thành công!", { id: toastId });
        } else {
          toast.error("AI không nhận diện được giọng nói nào.", { id: toastId });
        }
      }
      // Nếu bấm AI từ khối DICTATION (nhưng Transcript trống)
      else if (targetBlock.type === 'dictation') {
        // Tùy vào API Assembly của bạn, thường sẽ có trường aiResult.text chứa trọn bộ văn bản
        const fullText = aiResult.text || aiResult.words.map(w => w.text).join(' ');
        updateBlockData(blockIndex, 'text', fullText);
        toast.success("Tạo đoạn văn bằng AI thành công!", { id: toastId });
      }

    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi gọi AI. Vui lòng thử lại.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderEssayHeaderActions = (block, index) => (
    <>
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
          <h1 className="text-lg font-semibold tracking-tight text-[#5e5836] dark:text-[#f0ede4] whitespace-nowrap">Listening: </h1>
          <input
            className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold outline-none w-full md:w-96 text-[#1b190d] dark:text-[#eecd2b] truncate"
            placeholder='Ex. Listening - Basic Conversation'
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
        <BlockPalette elements={LISTENING_ELEMENTS} onAddBlock={handleAddBlock} />

        {/* Canvas Chính */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {blocks.map((block, index) => {
            if (block.type === 'media') {
              return (
                <BlockWrapper key={block.id} index={index} totalBlocks={blocks.length} icon={PlayCircle} title="Media Player" onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDelete={() => deleteBlock(index)}>
                  <MediaPlayerBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
                </BlockWrapper>
              );
            }
            if (block.type === 'transcript') {
              return (
                <BlockWrapper
                  key={block.id}
                  index={index}
                  totalBlocks={blocks.length}
                  icon={Subtitles}
                  title="Audio Transcript"
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDelete={() => deleteBlock(index)}
                  extraHeaderActions={renderEssayHeaderActions(block, index)}
                >
                  <TranscriptBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} isGenerating={isGenerating} />
                </BlockWrapper>
              );
            }
            if (block.type === 'dictation') {
              return (
                <BlockWrapper
                  key={block.id}
                  index={index}
                  totalBlocks={blocks.length}
                  icon={Edit3}
                  title="Dictation Activity"
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDelete={() => deleteBlock(index)}
                  extraHeaderActions={renderEssayHeaderActions(block, index)}
                >
                  <DictationBlock data={block} onChange={(field, value) => updateBlockData(index, field, value)} />
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
            return null;
          })}

          <div className="max-w-4xl mx-auto py-4 pb-12">
            <button className="w-full border-2 border-dashed border-[#eecd2b]/30 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#eecd2b]/5 transition-all group">
              <PlusCircle className="w-6 h-6 text-[#eecd2b]/40 group-hover:text-[#eecd2b]" />
              <span className="text-sm font-semibold text-[#5e5836] dark:text-[#f0ede4]/60 group-hover:text-[#1b190d] dark:group-hover:text-white">Add another block from the left panel</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListeningBuilderPage;