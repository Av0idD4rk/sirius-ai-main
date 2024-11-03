import React from 'react';

const RememberMe: React.FC = () => {
    return (
        <div className="flex gap-3 self-start mt-7 text-xs font-semibold tracking-wide leading-none text-white">
            <input
                type="checkbox"
                id="rememberMe"
                className="object-contain shrink-0 w-6 rounded-none aspect-square"
            />
            <label htmlFor="rememberMe" className="my-auto basis-auto text-black">
                Запомнить меня
            </label>
        </div>
    );
};

export default RememberMe;