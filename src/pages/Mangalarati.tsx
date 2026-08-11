import { Layout } from "@/components/layout/Layout";
import mangalaratiBg from "@/assets/mangalarati-bg-v2.png";

const Mangalarati = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-earth-brown/5 py-12 md:py-20">
                <div className="container-custom">

                    {/* Page Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <span className="text-gold text-4xl block drop-shadow-glow mb-2">ॐ</span>
                        <h1 className="font-kn-heading text-3xl md:text-5xl font-bold text-earth-brown mb-2">
                            ಮಂಗಳಾರತಿ
                        </h1>
                        <h2 className="font-kn-heading text-xl md:text-2xl font-semibold text-saffron">
                            ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ
                        </h2>
                    </div>

                    {/* Cards Grid - 3 Columns Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                        {/* Kannada Card */}
                        <div
                            className="relative rounded-[30px] overflow-hidden shadow-2xl border-4 border-saffron/20 h-[800px] group hover:-translate-y-2 transition-transform duration-500"
                            style={{ backgroundImage: `url(${mangalaratiBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            {/* Lighter Overlay */}
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-black/10 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                            <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
                                <h3 className="text-saffron-light font-kn-heading text-2xl font-bold border-b border-white/30 pb-4 mb-6 w-full drop-shadow-md">ಕನ್ನಡ</h3>

                                <div className="flex-1 overflow-y-auto scrollbar-hide w-full space-y-5 font-kn-heading text-lg text-white leading-loose drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
                                    <p>ಗುರುರಾಜ ಸಿದ್ಧಾರೂಢ ಸಮರ್ಥ ಬೆಳಗುವೆನಾರುತಿಯಾ।<br />ಗುರುವರಾ ಬೆಳಗುವೆನಾರುತಿಯಾ॥</p>
                                    <p>ಮೋಕ್ಷಾಪೇಕ್ಷೆಗೆ ತತ್ವಂ ಪದದ ಅರ್ಥವ ಬೋಧಿಸಿದಿ,<br />ಗುರುವರಾ ಅರ್ಥವ ಬೋಧಿಸಿದಿ॥</p>
                                    <p>ಉಕ್ಷಾವಾಹನ ಶಂಕರ ನಾಮೋಚ್ಚಾರವ ಮಾಡಿಸಿದಿ,<br />ಗುರುವರಾ ಉಚ್ಚಾರವ ಮಾಡಿಸಿದಿ॥</p>
                                    <p>ಶ್ಯಾಮಧಾಮ ಶ್ರೀರಾಮ ಭಿನ್ನ ಶಂಕರ ನೀನಿರುವಿ,<br />ಗುರುವರಾ ಶಂಕರ ನೀನಿರುವಿ॥</p>
                                    <p>ಕಾಮ ಕ್ರೋಧವ ನಾಶಿಸಿ ಜಗದೊಳ್ ಶಾಂತಿಯ ಬೀರಿದಿ,<br />ಗುರುವರಾ ಶಾಂತಿಯ ಬೀರಿದಿ॥</p>
                                    <p>ಚರಣ ಭಜಕರಾ ದುರಿತ ವೃಂದವ ತ್ವರಿತದಿ ನಾಶಿಸಿದಿ,<br />ಗುರುವರಾ ತ್ವರಿತದಿ ನಾಶಿಸಿದಿ॥</p>
                                    <p>ವರಭೂಲತಾಪುರ ದೈವದಿಂದ ನಿರುತದಿ ವಾಸಿಸಿದಿ,<br />ಗುರುವರಾ ನಿರುತದಿ ವಾಸಿಸಿದಿ॥</p>
                                    <p className="font-bold text-saffron-light pt-2">ಗುರುರಾಜ ಸಿದ್ಧಾರೂಢ ಸಮರ್ಥ ಬೆಳಗುವೆನಾರುತಿಯಾ।<br />ಗುರುವರಾ ಬೆಳಗುವೆನಾರುತಿಯಾ॥</p>
                                </div>

                                <div className="pt-6 w-full opacity-90">
                                    <p className="text-xs text-white font-kn-body font-bold drop-shadow-md">ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ</p>
                                    <p className="text-[10px] text-white/90 font-en-body tracking-wider mt-1 drop-shadow-md">Sri Aaroodha Tapobhumi Sukshetra Khanderayanahalli</p>
                                </div>
                            </div>
                        </div>

                        {/* English Card */}
                        <div
                            className="relative rounded-[30px] overflow-hidden shadow-2xl border-4 border-saffron/20 h-[800px] group hover:-translate-y-2 transition-transform duration-500 delay-100"
                            style={{ backgroundImage: `url(${mangalaratiBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-black/10 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                            <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
                                <h3 className="text-saffron-light font-en-heading text-xl font-bold border-b border-white/30 pb-4 mb-6 w-full drop-shadow-md">English</h3>

                                <div className="flex-1 overflow-y-auto scrollbar-hide w-full space-y-5 font-en-heading text-base text-white leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium italic">
                                    <p>Gururaj Siddharudha Samartha<br />Belguve Aarutiya<br />Guruvaraa Belguve Aarutiya</p>
                                    <p>Moksha Pekshege Tatvam Padad Arthav Bhodisidi<br />Guruvaraa Arthav Bhodisidi</p>
                                    <p>Ukshavahan Shankar Namoccharav Madisidi<br />Guruvaraa Uchcharav Madisidi</p>
                                    <p>Shyama Dhama Shri Rama Bhinna Shankar Neeniruvi<br />Guruvaraa Shankar Neeniruvi</p>
                                    <p>Kaamakrodhavanashisi Jagadolu<br />Shantiya Biriruvi<br />Guruvaraa Shantiya Biriruvi</p>
                                    <p>Charana Bhajakara Durita Vrandava<br />Twariatadi Naashisidi<br />Guruvaraa Twariatadi Naashisidi</p>
                                    <p>Varabrolataapura Daiwadindali<br />Nirutadi Vaasisidhi<br />Guruvaraa Nirutadi Vaasisidhi</p>
                                </div>

                                <div className="pt-6 w-full opacity-90">
                                    <p className="text-xs text-white font-kn-body font-bold drop-shadow-md">ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ</p>
                                    <p className="text-[10px] text-white/90 font-en-body tracking-wider mt-1 drop-shadow-md">Sri Aaroodha Tapobhumi Sukshetra Khanderayanahalli</p>
                                </div>
                            </div>
                        </div>

                        {/* Hindi Card */}
                        <div
                            className="relative rounded-[30px] overflow-hidden shadow-2xl border-4 border-saffron/20 h-[800px] group hover:-translate-y-2 transition-transform duration-500 delay-200"
                            style={{ backgroundImage: `url(${mangalaratiBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-black/10 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                            <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
                                <h3 className="text-saffron-light font-en-heading text-xl font-bold border-b border-white/30 pb-4 mb-6 w-full drop-shadow-md">Hindi</h3>

                                <div className="flex-1 overflow-y-auto scrollbar-hide w-full space-y-5 font-en-body text-base text-white leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-semibold">
                                    <p>गुरुराज सिद्धारूढ़ा समर्थ<br />बेलगुवे आरुतिया<br />गुरुवर बेलगुवे आरुतिया</p>
                                    <p>मोक्ष पछेगे तत्त्वं पदं अस्त्र भोदिसदि<br />गुरुवारा अर्थव भोदिसदि</p>
                                    <p>उच्छवाहन शंकर नमोभावं मदिसदि<br />गुरुवारा ऊंचाव्र मदिसिदि</p>
                                    <p>श्यामा धम्म श्री राम भिन्ना शंकर नेनिरुवि<br />गुरुवर शंकर नेनिरुवि</p>
                                    <p>कामाक्रोधवनवासि जगदोलु<br />शांति बीरिरुवी<br />गुरुवर शांताय बीरिरुवि</p>
                                    <p>चरन भजकर दुरित वृंदवा<br />तेरातिड़ी नाशीसिडी<br />गुरुवराहं तेरातिदि नाशिसीदि</p>
                                </div>

                                <div className="pt-6 w-full opacity-90">
                                    <p className="text-xs text-white font-kn-body font-bold drop-shadow-md">ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ</p>
                                    <p className="text-[10px] text-white/90 font-en-body tracking-wider mt-1 drop-shadow-md">Sri Aaroodha Tapobhumi Sukshetra Khanderayanahalli</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Mantras Section - Moved to Bottom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Guru Mantra */}
                        <div className="bg-white/80 backdrop-blur-md border border-saffron/20 rounded-2xl p-8 text-center shadow-soft hover:shadow-card transition-all">
                            <h3 className="font-kn-heading text-2xl font-bold text-saffron mb-4">ಗುರು ಮಂತ್ರ</h3>
                            <p className="font-kn-body text-xl text-foreground/90 leading-relaxed font-medium">
                                ಚೈತನ್ಯಂ ಶಾಶ್ವತಂ ಶಾಂತಂ ವ್ಯೋಮಾತೀತಂ ನಿರಂಜನಂ<br />
                                ನಾದಬಿಂದುಕಲಾತೀತಂ ತಸ್ಮೈ ಶ್ರೀ ಗುರುವೇ ನಮಃ॥
                            </p>
                        </div>

                        {/* Gayatri Mantra */}
                        <div className="bg-white/80 backdrop-blur-md border border-saffron/20 rounded-2xl p-8 text-center shadow-soft hover:shadow-card transition-all">
                            <h3 className="font-kn-heading text-2xl font-bold text-saffron mb-4">ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಗಾಯತ್ರಿ ಮಂತ್ರ</h3>
                            <p className="font-kn-body text-xl text-foreground/90 leading-relaxed font-medium">
                                ಆರೂಢಾಯ ನಮೋಸ್ತುತೇ ಜ್ಞಾನ ಸ್ವರೂಪಾಯ ವಿದ್ಮಹೇ<br />
                                ಭ್ರೂಲತ ಪುರೀಶ ಧೀಮಹಿ ತನ್ನೋ ಸದ್ಗುರು ಪ್ರಚೋದಯತ್
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Mangalarati;
