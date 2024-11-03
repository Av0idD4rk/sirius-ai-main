"use client"
import React from 'react';
import {useRouter} from "next/navigation";

interface BookActionsProps {
    bookId: number;
}

const BookActions: React.FC<BookActionsProps> = ({bookId}) => {
    const router = useRouter();
    const Chat = () =>{
        router.push("/books/"+bookId+"/chat")
    }
    const Summary = () =>{
        router.push("/books/"+bookId+"/summary")
    }
    const Quiz =()=>{
        router.push("/books/"+bookId+"/quiz")
    }
    const Read = () =>{
        router.push("/books/"+bookId+"/read")
    }
    return (
        <div>
            <div className="flex gap-2.5 self-start mt-3 text-xs text-center text-white">

                <button onClick={Read} className="px-7 py-1.5 whitespace-nowrap bg-pink-400 rounded-2xl">
                    <span>Читать</span>
                </button>
                <button onClick={Summary} className="flex items-center justify-center gap-2 p-2.5 font-bold bg-yellow-400 rounded-3xl">
                    <StickIcon className="object-contain shrink-0 aspect-square w-[13px]"/>

                    <span>Сократить</span>
                </button>
                <button onClick={Chat} className="flex items-center justify-center bg-purple-300 rounded-full h-10 w-10">
                    <ChatIcon className="object-contain shrink-0 aspect-square w-[18px]"/>
                </button>

            </div>
            <div className="flex items-center justify-center">
                <button
                    onClick={Quiz}
                    className="px-9 py-2 h-10 mt-3 max-w-full text-xs text-white bg-black rounded-[30px] w-[244px]">
                    Пройти тест по произведению
                </button>
            </div>
        </div>
    );
};

export default BookActions;

const ChatIcon = ({props}: any) => {
    return (
        <svg width={20} height={20} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3.6522 2.98321L8.91017 1.23093C11.2697 0.444576 12.5517 1.73247 11.7714 4.09154L10.0187 9.34837C8.84204 12.8839 6.90979 12.8839 5.73309 9.34837L5.21287 7.78804L3.6522 7.26793C0.115932 6.09149 0.115932 4.16584 3.6522 2.98321Z"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 8L8 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
const StickIcon = ({props}: any) => {
    return (
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.15175 11.3673C2.60397 11.8307 3.32807 11.8368 3.77286 11.3809L10.7395 4.24178C11.1843 3.78597 11.1783 3.04398 10.7261 2.58061C10.2738 2.11723 9.54975 2.11113 9.10496 2.56694L2.13832 9.70611C1.69353 10.1619 1.69953 10.9039 2.15175 11.3673Z"
                stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.941 5.06003L8.30646 3.38519" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M4.77279 1.38982L5.58138 1.15301L5.35033 1.98159L5.59481 2.81418L4.78228 2.56371L3.97369 2.80051L4.20474 1.97193L3.96027 1.13934L4.77279 1.38982Z"
                stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M2.63815 4.69393L3.44674 4.45713L3.21569 5.28571L3.46016 6.1183L2.64764 5.86783L1.83905 6.10463L2.0701 5.27605L1.82562 4.44346L2.63815 4.69393Z"
                stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M10.7661 7.53089L11.5747 7.29409L11.3436 8.12267L11.5881 8.95526L10.7756 8.70479L9.96698 8.94159L10.198 8.11301L9.95355 7.28042L10.7661 7.53089Z"
                stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
const ReadIcon = ({props}: any) => {
    return (
        <svg class="stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
            <g id="_31-Book" data-name="31-Book">
                <path
                    d="M29.71,8.29A5.87,5.87,0,0,1,28,5a5.87,5.87,0,0,1,1.71-3.29A1,1,0,0,0,29,0H7A5,5,0,0,0,2,5V27a5,5,0,0,0,5,5H29a1,1,0,0,0,1-1V9A1,1,0,0,0,29.71,8.29ZM7,2H27a6.84,6.84,0,0,0-.84,2H11V6H26.13A6.84,6.84,0,0,0,27,8H7A3,3,0,0,1,7,2ZM28,30H7a3,3,0,0,1-3-3V9a5,5,0,0,0,3,1H28Z"/>
                <rect x="7" y="4" width={2} height={2}/>
                <path d="M7,18a1,1,0,0,0,1,1H24a1,1,0,0,0,1-1V14a1,1,0,0,0-1-1H8a1,1,0,0,0-1,1Zm2-3H23v2H9Z"/>
                <rect x="7" y="22" width={2} height={2}/>
                <rect x="11" y="22" width={2} height={2}/>
                <rect x="17" y="22" width={8} height={2}/>
            </g>
        </svg>
    )
}