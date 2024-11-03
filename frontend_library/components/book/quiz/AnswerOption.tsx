

export default function AnswerOption({ option, onSelect }:{ option:any, onSelect: any}) {
    return (
        <button
            onClick={onSelect}
            className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-md"
        >
            {option.text}
        </button>
    );
}
