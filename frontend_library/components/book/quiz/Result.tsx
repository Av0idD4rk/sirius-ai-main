// components/Result.js
"use client"


import {useRouter} from "next/navigation";

export default function Result({ score, total }:{score:number, total:number}) {
    const router = useRouter();
    const onClick = () =>{
        router.back()
    }
    return (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Результат</h2>
            <p className="text-xl mb-4">
                Вы набрали {score} из {total} правильных ответов!
            </p>
            <button
                onClick={onClick}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Вернуться обратно
            </button>
            <button></button>
        </div>
    );
}
