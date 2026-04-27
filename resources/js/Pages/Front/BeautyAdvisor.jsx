import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { ChatBubbleLeftRightIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function BeautyAdvisor() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 'q1',
            question: 'Bagaimana kondisi kulit Anda setelah mencuci wajah (tanpa memakai produk apa pun selama 1 jam)?',
            options: [
                { text: 'Terasa kencang dan tertarik', type: 'Dry' },
                { text: 'Mengkilap dan berminyak di seluruh wajah', type: 'Oily' },
                { text: 'Berminyak hanya di area T-Zone (dahi, hidung, dagu)', type: 'Combination' },
                { text: 'Terasa nyaman, tidak kering dan tidak berminyak', type: 'Normal' },
                { text: 'Sering kemerahan, gatal, atau perih', type: 'Sensitive' }
            ]
        },
        {
            id: 'q2',
            question: 'Apa masalah kulit utama yang ingin Anda atasi saat ini?',
            options: [
                { text: 'Jerawat dan bruntusan', type: 'Acne' },
                { text: 'Kusam dan noda hitam/bekas jerawat', type: 'Brightening' },
                { text: 'Garis halus dan tanda penuaan', type: 'AntiAging' },
                { text: 'Kulit kering dan mengelupas', type: 'Hydration' },
                { text: 'Pori-pori besar dan komedo', type: 'Pore' }
            ]
        }
    ];

    const handleAnswer = (type) => {
        const newAnswers = { ...answers, [currentQuestion]: type };
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers) => {
        // Simple logic for dummy result
        const skinType = finalAnswers[0];
        const concern = finalAnswers[1];
        
        setResult({
            skinType: skinType,
            concern: concern,
            recommendation: `Berdasarkan jawaban Anda, jenis kulit Anda cenderung ${skinType === 'Oily' ? 'Berminyak' : skinType === 'Dry' ? 'Kering' : skinType === 'Combination' ? 'Kombinasi' : skinType === 'Sensitive' ? 'Sensitif' : 'Normal'} dengan fokus masalah pada ${concern === 'Acne' ? 'Jerawat' : concern === 'Brightening' ? 'Mencerahkan Kulit' : concern === 'AntiAging' ? 'Anti-Penuaan' : concern === 'Hydration' ? 'Menghidrasi' : 'Pori-pori'}. Kami merekomendasikan produk dengan kandungan Centella Asiatica, Niacinamide, atau Ceramide. Konsultasikan lebih lanjut dengan Beauty Advisor kami secara gratis!`
        });
    };

    return (
        <MainLayout title="Beauty Advisor Virtual - Alana Beauty">
            <Head title="Beauty Advisor Virtual" />

            {/* Hero Section */}
            <div className="bg-[#fd8282] bg-opacity-10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-6">
                        <ChatBubbleLeftRightIcon className="h-8 w-8 text-[#fd8282]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-Palisade text-gray-900 mb-4">Beauty Advisor Virtual</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto font-Raleway text-lg">
                        Bingung memilih skincare yang tepat? Ikuti kuis singkat kami atau konsultasikan langsung masalah kulit Anda dengan tim ahli Alana Beauty secara gratis!
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left Column: Quiz */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-Palisade text-gray-800 mb-2 flex items-center">
                                <SparklesIcon className="h-6 w-6 text-[#fd8282] mr-2" />
                                Kuis Analisa Kulit
                            </h2>
                            <p className="text-gray-500 mb-8 font-Raleway">Ketahui kebutuhan kulit Anda dalam 2 menit.</p>

                            {!quizStarted ? (
                                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                    <button 
                                        onClick={() => setQuizStarted(true)}
                                        className="bg-[#fd8282] text-white px-8 py-3 rounded-full font-RalewayBold hover:bg-red-500 transition-colors shadow-md hover-lift"
                                    >
                                        Mulai Analisa Sekarang
                                    </button>
                                </div>
                            ) : !result ? (
                                <div>
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                                            <span>Pertanyaan {currentQuestion + 1} dari {questions.length}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-[#fd8282] h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-RalewayBold text-gray-800 mb-6">{questions[currentQuestion].question}</h3>
                                    
                                    <div className="space-y-3">
                                        {questions[currentQuestion].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(opt.type)}
                                                className="w-full text-left px-5 py-4 rounded-xl border border-gray-200 hover:border-[#fd8282] hover:bg-red-50 transition-colors font-Raleway text-gray-700 hover:text-[#fd8282]"
                                            >
                                                {opt.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-RalewayBold text-gray-800 mb-4">Hasil Analisa Selesai!</h3>
                                    <div className="bg-red-50 p-6 rounded-2xl text-left border border-red-100 mb-6">
                                        <p className="text-gray-700 leading-relaxed font-Raleway">
                                            {result.recommendation}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setQuizStarted(false);
                                            setCurrentQuestion(0);
                                            setAnswers({});
                                            setResult(null);
                                        }}
                                        className="text-[#fd8282] font-RalewayBold hover:underline"
                                    >
                                        Ulangi Kuis
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Direct WhatsApp Contact */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h2 className="text-3xl font-Palisade text-gray-800 mb-4">Konsultasi Langsung</h2>
                            <p className="text-gray-600 font-Raleway leading-relaxed">
                                Butuh saran yang lebih spesifik? Hubungi Beauty Advisor kami yang sedang bertugas di cabang terdekat Anda. Kami siap membantu Anda menemukan rangkaian produk yang tepat tanpa biaya!
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Branch 1 */}
                            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="flex items-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#fd8282] transition-colors group hover-lift">
                                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-RalewayBold text-gray-800">Cabang Rumbai</h4>
                                    <p className="text-sm text-gray-500">Beauty Advisor: Kak Sinta</p>
                                </div>
                            </a>

                            {/* Branch 2 */}
                            <a href="https://wa.me/6281234567891" target="_blank" rel="noreferrer" className="flex items-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#fd8282] transition-colors group hover-lift">
                                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-RalewayBold text-gray-800">Cabang Air Dingin</h4>
                                    <p className="text-sm text-gray-500">Beauty Advisor: Kak Nisa</p>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
