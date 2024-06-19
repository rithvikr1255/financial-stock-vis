import React from 'react';

function ChartFilter({ text, active, onClick, change }) {
    const bg = change.change >= 0 ? "bg-lime-600" : "bg-red-500";
    const border = change.change >= 0 ? "border-lime-700": "border-red-600";
    const lightBorder = change.change >= 0 ? "border-lime-300": "border-red-200";
    const textColor = change.change >= 0 ? "text-lime-600" : "text-red-500";
    return (
        <button onClick={onClick}
                className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer
                 ${active ? `${ bg } ${border} text-white` : `${lightBorder} ${textColor}`}`}>{text}</button>
    );
}

export default ChartFilter;