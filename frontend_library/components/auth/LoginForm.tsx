import React from 'react';
import InputField from '@/components/auth/form/InputField';
import Button from '@/components/auth/form/Button';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {AuthActions} from "@/lib/auth/utils";
import Link from "next/link";


type FormData = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormData>();
    const router = useRouter();

    const {login, storeToken} = AuthActions();

    const onSubmit = (data: FormData) => {
        login(data.username, data.password)
            .json((json) => {
                storeToken(json.access, "access");
                storeToken(json.refresh, "refresh");

                router.push("/");
            })
            .catch((err) => {
                setError("root", {type: "manual", message: err.json.detail});
            });
    };
    return (
        <main className="flex overflow-hidden flex-col px-10 pt-36 pb-8 mx-auto w-full max-w-[480px] rounded-[30px]">
            <h1 className="self-start text-4xl font-bold text-black mb-5">
                Вход
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField placeholder="Логин/Email" id="usernameEmail" {...register("username", {required: true})}/>
                {errors.username && (
                    <span className="text-xs text-red-600">Требуется имя пользователя</span>
                )}
                <InputField placeholder="Пароль" id="password"
                            type="password" {...register("password", {required: true})}/>
                {errors.password && (
                    <span className="text-xs text-red-600">Требуется пароль</span>
                )}
                {errors.root && (
                    <span className="text-xs text-red-600">{errors.root.message}</span>
                )}

                <div className="flex gap-2 mt-6 text-base tracking-wide leading-none">
                    <Button variant="secondary">Войти</Button>
                    <Button variant="primary" disabled>Войти с VK</Button>
                </div>
                <div className="absolute right-5 mt-5 text-sm text-gray-700">
                    <span>Нет аккаунта? </span>
                    <Link href="/register" className="text-blue-500">
                        Зарегистрироваться
                    </Link>
                </div>
            </form>

        </main>
    );
};

export default LoginForm;