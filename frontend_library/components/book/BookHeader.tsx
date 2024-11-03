import React from 'react';

interface BookHeaderProps {

    category: string;
    coverImage: string;
    onGoBack: () => void;
}

const BookHeader: React.FC<BookHeaderProps> = ({category, coverImage, onGoBack}) => {
    return (
        <>
            <div
                className="flex items-center mt-4 w-full justify-center gap-2.5 px-2.5 py-1.5 bg-violet-400 rounded-3xl text-white">
                <span>{category}</span>
            </div>
            <header
                className="flex gap-10 justify-between items-start self-start max-w-full max-sm:ml-1 overscroll-none">
                <button
                    onClick={onGoBack}
                    aria-label="Go back"
                    className="object-contain shrink-0 bg-no-repeat bg-center bg-contain -ml-10"
                >
                    <BackMark/>
                </button>
                <img
                    loading="lazy"
                    src={coverImage}
                    alt="Book cover"
                    className=" object-contain shrink-0 mt-14 rounded-lg max-w-full aspect-[0.6] w-[153px] max-sm:mr-0 max-sm:ml-1 max-sm:w-[153px]"
                />

            </header>
        </>

    );
};

export default BookHeader;


const BackMark = ({props}: any) => {
    return (
        <svg width={100} height={98} viewBox="0 0 74 72" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="37.5" cy="35.5" r="22.5" fill="#F4F4F4"/>
            <path d="M38.9689 42.92L31.8618 36.4C31.0225 35.63 31.0225 34.37 31.8618 33.6L38.9689 27.08" stroke="black"
                  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )

}