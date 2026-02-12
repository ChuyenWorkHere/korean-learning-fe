import React from 'react';

const ProgressBar = ({
    progress
}) => {
    return (
        <div className="h-2 w-full bg-soft-tan dark:bg-white/10 rounded-full overflow-hidden">
            <div
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;