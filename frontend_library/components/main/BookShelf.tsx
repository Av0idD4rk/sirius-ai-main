"use client"
import React from 'react';
import {useRouter} from "next/navigation";

const BookShelf: React.FC = () => {
    const router  = useRouter();
    const onClick = () =>{
        router.push("/books");
    }
    const books = [
        { id: '1', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4ea410f2bd2b5dcf96925a646febfa907acb6fe88621805331423544010c4725?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7' },
        { id: '2', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bbd3e8f502cba02fb6f0319a7cdc2f1a51132345751f654f9acf655312898d20?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7' },
        { id: '3', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2acccf13b1078cab631599d9876fdc3706e1759ffb444db53be80bf12a65649b?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7' },
        { id: '4', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/de6e2a5dd4e4cd3f7a735b90c7dd61c1459becf025804ae1db08bbf1f508915d?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7' },
    ];

    return (
        <button onClick={onClick} className="mt-14 w-full max-w-[308px]">
            <div className="flex gap-5">
                {books.map((book) => (
                    <div key={book.id} className="flex flex-col flex-1">
                        <img loading="lazy" src={book.image} alt={`Book cover ${book.id}`} className="object-contain rounded-md aspect-[0.62] w-[58px]" /></div>
                ))}
            </div>
            <nav className="flex gap-6 mt-6 w-full text-xs font-medium whitespace-nowrap max-w-[314px]">
                <div className="flex flex-1 h-10 gap-2.5 px-7 py-1.5 text-white text-lg items-center justify-center bg-violet-400 rounded-3xl">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a78b1154f6b84d1a705f0b538d78b3dd9620cb61b147516e5b9dd1ab1b8f5ef?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7" alt="" className="object-contain shrink-0 aspect-[1.13] w-[17px]" />
                    <span>Книжная полка</span>
                </div>
            </nav>
        </button>
    );
};

export default BookShelf;