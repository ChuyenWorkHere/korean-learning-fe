import { 
  GraduationCap, BookOpen, BookMarked, Brain, Lightbulb, Languages, Globe, 
  Compass, Target, Trophy, Star, Crown, Rocket, Sparkles, Hexagon, Shield, 
  Mic, Headphones, MessageCircle, Pencil, 
  AlignLeft,
  Sigma,
  CheckCircle,
  List,
  HelpCircle,
  PlayCircle,
  Subtitles,
  Edit3,
  ImageIcon,
  FileText,
  CheckSquare,
  FileEdit,
  Grid3X3,
  BrainCircuit,
  Settings,
  MessageSquare
} from 'lucide-react';

export const AVAILABLE_ICONS = [
  { name: 'GraduationCap', icon: GraduationCap }, { name: 'BookOpen', icon: BookOpen },
  { name: 'BookMarked', icon: BookMarked }, { name: 'Brain', icon: Brain },
  { name: 'Lightbulb', icon: Lightbulb }, { name: 'Languages', icon: Languages },
  { name: 'Globe', icon: Globe }, { name: 'Compass', icon: Compass },
  { name: 'Target', icon: Target }, { name: 'Trophy', icon: Trophy },
  { name: 'Star', icon: Star }, { name: 'Crown', icon: Crown },
  { name: 'Rocket', icon: Rocket }, { name: 'Sparkles', icon: Sparkles },
  { name: 'Hexagon', icon: Hexagon }, { name: 'Shield', icon: Shield },
  { name: 'Mic', icon: Mic }, { name: 'Headphones', icon: Headphones },
  { name: 'MessageCircle', icon: MessageCircle }, { name: 'Pencil', icon: Pencil },
];

export const INITIAL_COURSES = [
  { id: 1, title: "Introduction to Advanced Pollination", level: "Intermediate", units: 12, lessons: 45, enrolled: "1.2k", status: "Published", iconName: "GraduationCap" },
  { id: 2, title: "Hive Security Protocols & Defense", level: "Expert", units: 8, lessons: 24, enrolled: "850", status: "Published", iconName: "Shield" },
  { id: 3, title: "Nectar Collection Fundamentals", level: "Beginner", units: 5, lessons: 18, enrolled: "0", status: "Draft", iconName: "Droplet" }, // Droplet không có trong list 20 icon, nó sẽ fallback về BookOpen
  { id: 4, title: "Queen Communication Signals", level: "Intermediate", units: 15, lessons: 62, enrolled: "2.4k", status: "Published", iconName: "Brain" },
  { id: 5, title: "Honeycomb Structural Engineering", level: "Expert", units: 20, lessons: 88, enrolled: "540", status: "Published", iconName: "Hexagon" },
];

export const GRAMMAR_ELEMENTS = [
  { type: 'theory', label: 'Theory Text', description: 'Grammar explanation', icon: AlignLeft },
  { type: 'formula', label: 'Formula Box', description: 'Pattern & Meaning', icon: Sigma },
  { type: 'usage_note', label: 'Usage Notes', description: 'Rules with checkmarks', icon: CheckCircle },
  { type: 'examples', label: 'Examples Table', description: 'Bilingual sentences', icon: List },
  { type: 'quiz', label: 'Quick Quiz', description: 'Multiple choice', icon: HelpCircle },
];

export const LISTENING_ELEMENTS = [
  { type: 'media', label: 'Media Player', description: 'Audio upload & controls', icon: PlayCircle },
  { type: 'transcript', label: 'Transcript', description: 'Interactive script editor', icon: Subtitles },
  { type: 'dictation', label: 'Dictation', description: 'Fill-in-the-blanks tool', icon: Edit3 },
  { type: 'quiz', label: 'Comprehension Quiz', description: 'Check understanding', icon: HelpCircle },
];

export const READING_ELEMENTS = [
  { type: 'cover', label: 'Article Cover', description: 'Header image', icon: ImageIcon },
  { type: 'long_text', label: 'Long Text', description: 'Story paragraphs', icon: FileText },
  { type: 'vocab', label: 'Vocab Highlight', description: 'Word definitions', icon: Sparkles },
  { type: 'quiz', label: 'Comprehension Quiz', description: 'Check understanding', icon: HelpCircle },
  { type: 'tf_quiz', label: 'True/False Quiz', description: 'Quick assessment', icon: CheckSquare },
  { type: 'audio', label: 'Audio Clip', description: 'Native pronunciation', icon: Headphones },
];

export const WRITING_ELEMENTS = [
  { type: 'essay', label: 'Free-form Essay', description: 'Open response', icon: FileEdit },
  { type: 'translation', label: 'Translation', description: 'Sentence practice', icon: Languages },
  { type: 'wongoji', label: 'Wongoji Grid', description: 'Manuscript paper', icon: Grid3X3 },
  { type: 'ai_grading', label: 'AI Grading Rules', description: 'Auto-eval settings', icon: BrainCircuit },
];

export const SPEAKING_ELEMENTS = [
  { type: 'roleplay_setup', label: 'Roleplay Setup', description: 'Define characters & scene', icon: Settings },
  { type: 'dialogue_sequence', label: 'Dialogue Pair', description: 'A-B Conversation turn', icon: MessageSquare },
  { type: 'pronunciation', label: 'Pronunciation Test', description: 'Target phrase practice', icon: Mic },
];

export const LESSON_TYPE = {
  GRAMMAR: "GRAMMAR",
  LISTENING: "LISTENING",
  SPEAKING: "SPEAKING",
  READING: "READING",
  WRITING: "WRITING"
}

export const LESSON_LEVEL = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced"
}

export const PROGRESS_STATUS = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  NOT_STARTED: "Not Started",
  LOCKED: "Locked"
}

export const PASSING_SCORE = 80;