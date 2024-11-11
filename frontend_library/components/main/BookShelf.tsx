"use client"
import React from 'react';
import {useRouter} from "next/navigation";

const BookShelf: React.FC = () => {
    const router  = useRouter();
    const onClick = () =>{
        router.push("/books");
    }
    const books = [
        { id: '2', image: "/media/covers/dostoevsky.jpg" },
        { id: '3', image: "/media/covers/otcy-i-dety.jpg" },
        { id: '4', image: "/media/covers/gore-ot-uma.jpg" },
        { id: '5', image: "/media/covers/revisor.jpg" },
    ];

    return (
        <button onClick={onClick} className=" text-xl font-bold mt-8 w-full max-w-[308px]">
            <span className="text-bold">Недавно добавленные</span>
            <div className="flex gap-5">
                {books.map((book) => (
                    <div key={book.id} className="flex mt-5 mb-3 flex-col flex-1">
                        <img loading="lazy" src={book.image} alt={`Book cover ${book.id}`} className="object-contain rounded-md aspect-[0.62] w-[58px]" /></div>
                ))}
            </div>
            <nav className="flex gap-6 mt-4 w-full text-xs font-medium whitespace-nowrap max-w-[314px]">
                <div className="flex flex-1 h-14 gap-2.5 px-7 py-1.5 text-white text-lg items-center justify-center bg-violet-400 rounded-3xl">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a78b1154f6b84d1a705f0b538d78b3dd9620cb61b147516e5b9dd1ab1b8f5ef?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7" alt="" className="object-contain shrink-0 aspect-[1.13] w-[17px]" />
                    <span>Книжная полка</span>
                </div>
            </nav>
        </button>
    );
};

export default BookShelf;