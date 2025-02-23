import React from "react";
import { SocialLoginCard } from "../Components/Auth/SocialLoginCard";
import { Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const Login = () => {
    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        window.location.href = `/auth/${provider}/redirect`;
    };

    return (
        <>
            <Head title="تسجيل الدخول" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
                    {/* Login Form Section */}
                    <div className="space-y-8 order-2 md:order-1 bg-white p-8 rounded-2xl shadow-sm">
                        <div>
                            <h2 className="text-center text-3xl font-bold text-gray-900">
                                مرحباً بك مجدداً
                            </h2>
                            <p className="mt-3 text-center text-base text-gray-600">
                                انضم إلينا لبيع وشراء الملابس المستعملة بكل
                                سهولة
                            </p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <SocialLoginCard
                                provider="google"
                                onClick={() => handleSocialLogin('google')}
                            />
                            <SocialLoginCard
                                provider="facebook"
                                onClick={() => handleSocialLogin('facebook')}
                            />
                            <p className="mt-4 text-center text-sm text-gray-500">
                                بالتسجيل، أنت توافق على
                                <a
                                    href="/terms"
                                    className="font-medium text-blue-600 hover:text-blue-500 mx-1"
                                >
                                    شروط الاستخدام
                                </a>
                                و
                                <a
                                    href="/privacy"
                                    className="font-medium text-blue-600 hover:text-blue-500 mx-1"
                                >
                                    سياسة الخصوصية
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="order-1 md:order-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
                            <div
                                className="w-full aspect-square bg-cover bg-center rounded-2xl shadow-lg"
                                style={{
                                    backgroundImage: 'url("/assets/hero.jpeg")',
                                }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
