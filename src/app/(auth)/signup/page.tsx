"use client";

import { ApiResponse } from "@/app/types";
import { outfit } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    type SignupSchema,
    signupSchema,
} from "@/lib/validation_schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PageProps {}

const Signup: React.FC<PageProps> = function () {
    const {
        formState: { isSubmitting, errors },
        register,
        setError,
        handleSubmit,
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const router = useRouter();

    const handleSignup: SubmitHandler<SignupSchema> = async (formData) => {
        try {
            const response = await fetch(`/api/v1/auth/signup`, {
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
                method: "POST",
                cache: "no-store",
            });
            const data = (await response.json()) as ApiResponse;

            if (response.ok && response.status !== 201) {
                setError("root", {
                    message: data.error?.message,
                });
                return;
            }

            router.push("/signin");
        } catch (error: any) {
            setError(
                "root",
                error.message ?? "Something went wrong while signing up"
            );
        }
    };

    return (
        <>
            <main
                className={`${outfit.className} h-screen w-screen flex flex-col flex-nowrap justify-center items-center`}
            >
                <div className="lg:w-[555px] p-5 flex flex-col flex-nowrap tracking-wider">
                    <h2 className="text-center text-[2.5rem] font-semibold">
                        Signup to Students Group
                    </h2>

                    <form
                        className="flex mt-10 flex-col flex-nowrap gap-3.5"
                        onSubmit={handleSubmit(handleSignup)}
                    >
                        <div className="flex flex-col justify-center gap-1.5">
                            <label className="ml-px">Username</label>
                            <Input
                                type="text"
                                className="pl-4 py-[1.4rem] pb-[1.5rem] text-[1.05rem] focus:ring-1 focus:outline-gray-500 focus:ring-offset-1"
                                placeholder="Username"
                                {...register("username")}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-center font-light mt-0.5 text-[.95rem]">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col justify-center gap-1.5">
                            <div className="grow relative">
                                <label className="ml-px">Password</label>
                                <Input
                                    {...register("password")}
                                    type={passwordVisible ? "text" : "password"}
                                    className="mt-[0.375rem] pl-4 py-[1.4rem] pb-[1.5rem] text-[1.05rem] focus:ring-1 focus:outline-gray-500 focus:ring-offset-1"
                                    placeholder="Password"
                                />

                                <span
                                    tabIndex={0}
                                    onClick={() =>
                                        setPasswordVisible((prev) => !prev)
                                    }
                                    className="absolute cursor-pointer top-[54%] right-3"
                                >
                                    {passwordVisible ? (
                                        <EyeIcon />
                                    ) : (
                                        <EyeOffIcon />
                                    )}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-center font-light mt-0.5 text-[.95rem]">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            className="flex select-none py-[1.4rem] pb-[1.5rem] text-[1.15rem] flex-row mt-4 flex-nowrap justify-center lg:gap-2.5 gap-2 items-center"
                            disabled={isSubmitting}
                            variant={"secondary"}
                        >
                            {isSubmitting && (
                                <LoaderCircle className="animate-spin h-[1.35rem]" />
                            )}
                            Signup
                        </Button>

                        {errors.root && (
                            <p className="text-red-500 text-center font-light mt-0.5 text-[.95rem]">
                                {errors.root.message}
                            </p>
                        )}
                    </form>

                    <p className="mt-4 text-[1.075rem]">
                        Already a member ? &nbsp;
                        <Link
                            className="hover:underline text-blue-500 decoration-2 decoration-blue-500 underline-offset-[5.5px]"
                            href={"/signin"}
                        >
                            Signin
                        </Link>
                    </p>
                </div>
            </main>
        </>
    );
};

export default Signup;
