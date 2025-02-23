import React from 'react';
import { Upload, Package, Wallet, Search, CreditCard, Truck } from 'lucide-react';
import { StepCard } from './StepCard';

const sellingSteps = [
  {
    number: "1",
    title: "اعرض مجاناً",
    description: "قم بتحميل التطبيق مجاناً. التقط صوراً لقطعتك، صفها، وحدد السعر. اضغط 'رفع' وسيتم نشر إعلانك.",
    Icon: Upload,
  },
  {
    number: "2",
    title: "بيع واشحن",
    description: "تم البيع! غلف قطعتك، اطبع ملصق الشحن المدفوع مسبقاً، وتوجه إلى نقطة التسليم خلال 5 أيام.",
    Icon: Package,
    hasLearnMore: true,
  },
  {
    number: "3",
    title: "استلم أموالك",
    description: "لا توجد رسوم بيع، لذا ما تكسبه هو لك. سيتم الدفع لك بمجرد أن يؤكد المشتري أن كل شيء على ما يرام.",
    Icon: Wallet,
  },
];

const shoppingSteps = [
  {
    number: "1",
    title: "ابحث عنه",
    description: "قم بتحميل التطبيق مجاناً. تصفح ملايين القطع الفريدة، ابحث في آلاف العلامات التجارية، واعثر على المفضلة لديك.",
    Icon: Search,
    hasLearnMore: true,
  },
  {
    number: "2",
    title: "اشتريه",
    description: "اسأل البائع أي أسئلة، ثم اشترِ بضغطة زر. ادفع بأمان عبر PayPal أو البطاقة المصرفية أو Apple Pay أو رصيد Vinted.",
    Icon: CreditCard,
  },
  {
    number: "3",
    title: "استلمه",
    description: "سترى تاريخ التسليم المتوقع لقطعتك عند الدفع، وسنخبرك عندما يتم إرسالها. في غضون أيام قليلة، ستكون معك.",
    Icon: Truck,
  },
];

export const HowItWorks = () => {
  return (
    <div className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4 space-y-16">
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-center">البيع سهل</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sellingSteps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-center">تسوق بأمان وثقة</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shoppingSteps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
