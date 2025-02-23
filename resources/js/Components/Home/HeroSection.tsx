import React from "react";
import { Button } from "../UI/Button";
import { Logo } from "../UI/Logo";
import { NavMenu } from "../Navigation/NavMenu";
import { router } from "@inertiajs/react";

export const HeroSection = () => {
    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-8 md:mt-8">
            <div className="space-y-6 md:space-y-8 text-center md:text-right">
                <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">اربح المال من خزانة ملابسك</h1>
                <p className="text-lg md:text-xl text-gray-600">سجل الآن: حول موضتك المستدامة إلى أموال</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <Button onClick={()=>router.get('/my-products')} variant="primary" className="w-full md:flex-1">
                        اعرض دولابك
                    </Button>
                    <Button onClick={()=>router.get('/products')} variant="secondary" className="w-full md:flex-1">
                        عرض الأزياء
                    </Button>
                </div>
            </div>
            <div className="relative order-first md:order-last">
                <div
                    className="w-full aspect-square bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: 'url("/assets/hero.jpeg")' }}
                ></div>
            </div>
        </div>
    );
};
