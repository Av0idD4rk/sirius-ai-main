import React, {useEffect, useState} from 'react';
import {AuthActions} from "@/lib/auth/utils";

interface BookDescriptionProps {
    title: string;
    author: string;
    rating: number;
    description: string;
    bookId: number;
}

const BookDescription: React.FC<BookDescriptionProps> = ({title, author, rating, description, bookId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(()=>{
        AuthActions().getToken("access").then((accessToken) =>
        {
            fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/books/" + bookId + "/favorite/", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            }).then((res) => res.json()).then((data)=>{setIsFavorite(data.is_favorite); setIsLoading(false);});
        })
    })

    const toggleFavorite = async () => {
        if (isFavorite){
            setIsFavorite(false);
        } else {
            setIsFavorite(true);
        }
        const accessToken = await AuthActions().getToken("access")
        await fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/books/" + bookId + "/favorite/", {
            method: "POST",
            headers:{
                "Authorization": "Bearer " + accessToken
            }
        })
    }


    if (isLoading) return <p>Loading...</p>;
    return (
        <section className="w-full">
            <div className="flex gap-5 justify-between mt-10 w-full font-bold">
                <div className="flex gap-4">
                    <h1 className="grow text-2xl text-black">{title}</h1>
                </div>
                <button onClick={toggleFavorite}>
                    <LikeIcon fill={isFavorite ? "black" : "none"}
                              className="object-contain shrink-0 self-start mt-2.5 aspect-[0.9] w-[30px]"/>
                </button>
            </div>
            <div className="flex gap-5 justify-between mt-2">
                <p className="self-start mt-1 ml-2.5 text-xs text-black">
                    {author}
                </p>

                <div className="flex gap-1.5 my-auto text-xs text-pink-400 whitespace-nowrap">
                    <StarIcon className="object-contain shrink-0 self-start aspect-[0.93] w-[13px]"/>
                    <span>{rating}/5</span>
                </div>
            </div>

            <p className="mt-3 text-xs text-neutral-400">
                {description}
            </p>
        </section>
    );
};

export default BookDescription;

const StarIcon = ({props}: any) => {
    return (
        <svg width={17} height={18} viewBox="0 0 17 18" fill="" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.82675 0.981109L9.0012 3.39193C9.16135 3.72753 9.58842 4.04943 9.94877 4.11107L12.0775 4.47406C13.4388 4.70693 13.7591 5.72057 12.7781 6.72051L11.1232 8.41905C10.843 8.7067 10.6895 9.26147 10.7762 9.6587L11.25 11.7613C11.6237 13.4256 10.7629 14.0694 9.32818 13.1996L7.33294 11.9873C6.9726 11.7682 6.3787 11.7682 6.01168 11.9873L4.01645 13.1996C2.58842 14.0694 1.72093 13.4188 2.09462 11.7613L2.5684 9.6587C2.65515 9.26147 2.50167 8.7067 2.2214 8.41905L0.566495 6.72051C-0.407767 5.72057 -0.0941345 4.70693 1.26716 4.47406L3.39586 4.11107C3.74953 4.04943 4.1766 3.72753 4.33675 3.39193L5.51121 0.981109C6.15182 -0.327036 7.19281 -0.327036 7.82675 0.981109Z"
                fill="#FF87C7"/>
        </svg>
    )

}

const LikeIcon = ({fill, ...props}: any) => {
    return (
        <svg width={31} height={33} {...props} viewBox="0 0 31 33" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.558 16.9191C12.252 17.027 11.748 17.027 11.442 16.9191C8.832 16.0292 3 12.3169 3 6.02472C3 3.24719 5.241 1 8.004 1C9.642 1 11.091 1.79101 12 3.01348C12.909 1.79101 14.367 1 15.996 1C18.759 1 21 3.24719 21 6.02472C21 12.3169 15.168 16.0292 12.558 16.9191Z"
                stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}