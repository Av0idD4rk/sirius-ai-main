import React from 'react';
import InputField from './form/InputField';
import Button from './form/Button';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {AuthActions} from "@/lib/auth/utils";
import Link from "next/link";

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormData>();
    const router = useRouter();

    const {register: registerUser, storeToken} = AuthActions();

    const onSubmit = (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {type: "manual", message: "Passwords do not match"});
            return;
        }

        registerUser(data.email, data.username, data.password)
            .json((json: any) => {
                router.push("/login");
            })
            .catch((err) => {
                setError("root", {type: "manual", message: err.json.detail});
            });
    };

    return (
        <main className="flex overflow-hidden flex-col px-10 pt-36 pb-8 mx-auto w-full max-w-[480px] rounded-[30px]">
            <h1 className="self-start text-4xl font-bold text-black mb-5">
                Регистрация
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    placeholder="Логин"
                    id="username"
                    {...register("username", {required: "Требуется имя пользователя"})}
                />
                {errors.username && (
                    <span className="text-xs text-red-600">{errors.username.message}</span>
                )}
                <InputField
                    placeholder="Email"
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Требуется email",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Некорректный email",
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-xs text-red-600">{errors.email.message}</span>
                )}
                <InputField
                    placeholder="Пароль"
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Требуется пароль",
                        minLength: {value: 6, message: "Минимум 6 символов"}
                    })}
                />
                {errors.password && (
                    <span className="text-xs text-red-600">{errors.password.message}</span>
                )}
                <InputField
                    placeholder="Подтвердите пароль"
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {required: "Подтвердите пароль"})}
                />
                {errors.confirmPassword && (
                    <span className="text-xs text-red-600">{errors.confirmPassword.message}</span>
                )}
                {errors.root && (
                    <span className="text-xs text-red-600">{errors.root.message}</span>
                )}
                <div className="flex gap-2 mt-6 text-base tracking-wide leading-none">
                    <Button variant="secondary">Зарегистрироваться</Button>
                </div>
                <div className="absolute right-5 mt-5 text-sm text-gray-700">
                    <span>Уже есть аккаунт? </span>
                    <Link href="/login" className="text-blue-500">
                        Войти
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default RegistrationForm;
