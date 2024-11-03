import React from 'react';

interface InputFieldProps {
    placeholder: string;
    id: string;
    type?: string;

}

const InputField: React.FC<InputFieldProps> = ({placeholder, id, type = 'text',...props}) => {
    return (
        <div className="mb-2">
            <input
                type={type}
                id={id}
                className="bg-transparent border-b-2 border-black placeholder-black text-black outline-none focus:border-b-2 focus:border-gray-500 transition-colors duration-200 self-center mt-4 w-full aspect-[142.86] p-2"
                aria-label={placeholder}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default InputField;