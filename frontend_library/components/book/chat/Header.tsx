import React from 'react';
interface HeaderProps {
    onGoBack: () => void;
}

const Header: React.FC<HeaderProps> = ({onGoBack}) => {
    return (
        <header
            className="flex gap-5 justify-between items-start px-3 pt-5 pb-6 w-full text-black bg-neutral-100 rounded-[42px]">
            <div className="flex gap-8 items-start self-start">
                <button
                    onClick={onGoBack}
                    aria-label="Go back"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.08] w-[26px]"
                >
                    <BackMark/>
                </button>
                <div className="flex gap-2 justify-between">
                    <img loading="lazy"
                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/f02f7b170b44f683336cca06ccb9d96dc91811dcf52b02297bbb023a30ad81c0?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7"
                         alt="AI Assistant Avatar"
                         className="object-contain shrink-0 mt-2 aspect-square rounded-[30px] w-[50px]"/>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Диназаврус AI</h1>
                        <p className="self-start text-base text-green-500 font-medium">Online</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

const BackMark = ({props}: any) => {
    return (
        <svg width={60} height={58} viewBox="0 0 74 72" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="37.5" cy="35.5" r="22.5" fill="#F4F4F4"/>
            <path d="M38.9689 42.92L31.8618 36.4C31.0225 35.63 31.0225 34.37 31.8618 33.6L38.9689 27.08" stroke="black"
                  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )

}