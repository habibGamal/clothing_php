
const FAQ = () => {
    const faqs = [
        {
            question: "كيف يمكنني بيع ملابسي المستعملة؟",
            answer: 'يمكنك بيع ملابسك المستعملة بسهولة عن طريق إنشاء حساب، ثم النقر على "إضافة منتج" وملء التفاصيل المطلوبة مثل الصور والوصف والسعر.',
        },
        {
            question: "كيف تعمل المزايدات؟",
            answer: "يمكن للبائعين تحديد منتجاتهم للمزاد. المشترون يمكنهم تقديم عروض أعلى من السعر الحالي. في نهاية المزاد، يفوز صاحب أعلى عرض.",
        },
        {
            question: "ما هي الهدايا المجانية؟",
            answer: "الهدايا المجانية هي منتجات يقدمها البائعون مجاناً. يمكنك إضافتها إلى المفضلة والمشاركة في السحب عليها.",
        },
        {
            question: "كيف أعرف أن المنتج بحالة جيدة؟",
            answer: "يجب على البائعين تحديد حالة المنتج بدقة ونشر صور واضحة. يمكنك أيضاً رؤية تقييمات البائع السابقة.",
        },
        {
            question: "كيف يمكنني التواصل مع البائع؟",
            answer: "بمجرد اهتمامك بمنتج، يمكنك التواصل مع البائع مباشرة عبر نظام المراسلة في المنصة.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-12">
                الأسئلة الشائعة
            </h1>
            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                    >
                        <h2 className="text-xl font-semibold mb-3">
                            {faq.question}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
