"use client"
import React from 'react';
import {useRouter} from "next/navigation";

interface Book {
    id: number;
    title: string;
    cover_image: string;
    rating: number;
}

interface RecommendationCardProps {
    book: Book;
    isFirst: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ book, isFirst }) => {
    const router = useRouter();
    const onClick = () =>{
        router.push(`/books/${book.id}`);
    }

    return (
        <button onClick={onClick} className={`flex flex-col items-center mt-5 bg-white rounded-3xl w-[150px] max-sm:pt-3 max-sm:mt-1.5`}>
                    <img loading="lazy" src={book.cover_image} alt={`Cover of ${book.title}`} className="object-contain rounded-md aspect-[0.66] w-[62px] max-sm:mt-0" />
                    <img loading="lazy" src={`https://cdn.builder.io/api/v1/image/assets/TEMP/cc3d65549712eee0a6c84ed8469e0c70d2fa14cfca32ea105bbdc7f0db410438?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7`} alt={`Rating: ${book.rating}`} className="object-contain aspect-[5.43] w-[76px] max-sm:mt-1.5" />
                    <div className="flex gap-5 self-stretch px-4 py-3 mt-3 text-xs text-center items-center text-white bg-black rounded-b-3xl h-full max-sm:mt-1"><span className="max-sm:mx-auto max-sm:-mt-0.5">{book.title}</span>
                    </div>
        </button>
    );
};

export default RecommendationCard;