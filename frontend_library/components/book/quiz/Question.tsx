import AnswerOption from './AnswerOption';

interface AnswerOption {
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    text: string;
    options: AnswerOption[];
}

interface QuestionProps {
    question: Question;
    onAnswer: (isCorrect: boolean) => void;
}

export default function Question({ question, onAnswer }: QuestionProps) {
    return (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{question.text}</h2>
            <div className="space-y-2">
                {question.options.map((option, index) => (
                    <AnswerOption
                        key={index}
                        option={option}
                        onSelect={() => onAnswer(option.isCorrect)}
                    />
                ))}
            </div>
        </div>
    );
}
