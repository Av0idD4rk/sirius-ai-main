"use client"
import React from 'react';
import {useRouter} from "next/navigation";

interface StreakCardProps {
    streakDays: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ streakDays }) => {
    const router  = useRouter();
    const onClick = () =>{
        router.push("/books");
    }
    return (
        <div className="flex gap-2.5 items-start pl-3.5 max-w-full rounded-3xl bg-black bg-opacity-80 w-[310px]">
            <div className="flex z-10 flex-col flex-1 my-auto">
                <div className="text-xl font-bold text-white">
                    Вы читаете {streakDays} дня подряд!
                </div>
                <button onClick={onClick} className="flex gap-2.5 px-5 py-2.5 mt-4 text-xs font-medium text-black bg-yellow-400 rounded-3xl">
          <span className="grow max-sm:-mt-0.5 max-sm:ml-2">
            Продолжить
          </span>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c9a0c17ac0f8804d22965e827e3f8e184d5fd219aa6666b83d2682dac9656b?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7" alt="" className="object-contain shrink-0 self-start aspect-[1.15] w-[15px] max-sm:mt-px max-sm:-ml-1" />
                </button>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/45148c2c3748f7a0d359ff4a2d1ce426b3d659f41acbc4e34567640ba9b57904?placeholderIfAbsent=true&apiKey=2bb03a24bb9549e39a0bb9dc238d55d7" alt="Decorative streak illustration" className="object-contain shrink-0 self-start -mt-4 max-w-full aspect-[0.97] w-[143px] max-sm:ml-px" />
        </div>
    );
};

export default StreakCard;