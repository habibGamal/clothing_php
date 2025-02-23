import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { FormInput } from '../../Components/Form/FormInput';
import { Button } from '../../Components/UI/Button';

interface Props extends PageProps {
    mustVerifyEmail: boolean;
    status?: string;
    user: {
        name: string;
        email: string;
        provider?: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        postal_code?: string;
    };
}

export default function Edit({ mustVerifyEmail, status, user }: Props) {
    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        postal_code: user.postal_code || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/profile');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
            <Head title="الملف الشخصي" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">المعلومات الشخصية</h2>
                        <p className="text-gray-600">قم بتحديث معلومات حسابك وعنوان بريدك الإلكتروني.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <FormInput
                            label="الاسم"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <div className="space-y-2">
                            <FormInput
                                label="البريد الإلكتروني"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                required
                                disabled={Boolean(user.provider)}
                                className={`${user.provider ? 'bg-gray-50 text-gray-500' : ''}`}
                            />
                            {user.provider && (
                                <div className="flex items-center text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        هذا البريد الإلكتروني مرتبط بحساب {user.provider === 'google' ? 'جوجل' : 'فيسبوك'} ولا يمكن تغييره
                                    </span>
                                </div>
                            )}
                        </div>

                        {status && (
                            <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                                {status}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                حفظ التغييرات
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Shipping Information Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">معلومات التوصيل</h2>
                        <p className="text-gray-600">قم بإضافة عنوان التوصيل الخاص بك لإتمام عمليات الشراء.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <FormInput
                            label="رقم الجوال"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            error={errors.phone}
                            required
                            dir="ltr"
                        />

                        <FormInput
                            label="العنوان"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            error={errors.address}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormInput
                                label="المدينة"
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                error={errors.city}
                                required
                            />

                            <FormInput
                                label="المنطقة"
                                type="text"
                                value={data.state}
                                onChange={(e) => setData('state', e.target.value)}
                                error={errors.state}
                                required
                            />

                            <FormInput
                                label="الرمز البريدي"
                                type="text"
                                value={data.postal_code}
                                onChange={(e) => setData('postal_code', e.target.value)}
                                error={errors.postal_code}
                                required
                                dir="ltr"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                حفظ التغييرات
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
