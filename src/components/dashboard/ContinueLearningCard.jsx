// src/components/dashboard/ContinueLearningCard.jsx
import React from 'react';
import { PlayCircle } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

const ContinueLearningCard = ({ 
  imageSrc, 
  category, 
  lessonIndex, 
  title, 
  description, 
  progress, 
  totalExercises, 
  completedExercises 
}) => {
  return (
    <div className="space-y-6">
      {/* Header Title */}
      <h3 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
        <PlayCircle className="w-6 h-6 text-primary" />
        Continue Learning
      </h3>

      {/* Card Content */}
      <div className="bg-white dark:bg-white/5 border border-soft-tan dark:border-white/10 rounded-xl shadow-md overflow-hidden group hover:border-primary/50 transition-colors">
        <div className="flex flex-col md:flex-row">
          
          {/* Left: Image Section */}
          <div 
            className="md:w-1/3 aspect-video md:aspect-auto bg-cover bg-center" 
            style={{ backgroundImage: `url('${imageSrc}')` }}
            role="img"
            aria-label={title}
          ></div>

          {/* Right: Info Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/20 text-text-main text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                  {category}
                </span>
                <span className="text-text-muted text-xs">
                  {lessonIndex}
                </span>
              </div>
              <h4 className="text-xl font-bold text-text-main dark:text-white mb-2">
                {title}
              </h4>
              <p className="text-text-muted text-sm mb-6">
                {description}
              </p>
            </div>

            {/* Progress & Action */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-text-main dark:text-white">
                  <span>{progress}% Complete</span>
                  <span>{completedExercises}/{totalExercises} Exercises</span>
                </div>
                {/* Progress Bar */}
                <ProgressBar progress={progress} />
              </div>

              <button className="w-full py-3 bg-primary text-text-main font-bold rounded-lg hover:shadow-lg hover:scale-[1.005] active:scale-[0.99] transition-all">
                Resume Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningCard;