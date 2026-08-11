import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QuoteCard } from "@/components/common/QuoteCard";
import heroImage from "@/assets/hero-ashrama.jpg";

const Quotes = () => {
    const quotes = [
        {
            quote: "Devotion, service, and self-realization are the sacred paths that lead life toward the Divine.",
            quoteKn: "ಭಕ್ತಿ, ಸೇವೆ ಮತ್ತು ಆತ್ಮಜ್ಞಾನವು ಜೀವನವನ್ನು ದೈವಿಕತೆಯತ್ತ ನಡೆಸುವ ಪವಿತ್ರ ಮಾರ್ಗಗಳು.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Serving humanity with selflessness is the truest form of serving God.",
            quoteKn: "ಸೇವೆಯ ಮೂಲಕ ಮಾನವತೆಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವುದು ದೇವರ ಸೇವೆಯೇ ಆಗಿದೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Self-realization is the source of peace, and devotion is its light.",
            quoteKn: "ಆತ್ಮಜ್ಞಾನವು ಶಾಂತಿಯ ಮೂಲ, ಭಕ್ತಿಯು ಅದರ ಬೆಳಕು.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "The Guru’s grace is the divine force that leads life from ignorance to enlightenment.",
            quoteKn: "ಗುರುವಿನ ಕೃಪೆ ಜೀವನವನ್ನು ಅಜ್ಞಾನದಿಂದ ಜ್ಞಾನಕ್ಕೆ ನಡೆಸುವ ದಿವ್ಯ ಶಕ್ತಿ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "The true greatness of the soul is revealed through selfless service.",
            quoteKn: "ನಿಸ್ವಾರ್ಥ ಸೇವೆಯಲ್ಲಿಯೇ ಆತ್ಮದ ನಿಜವಾದ ಮಹತ್ವ ವ್ಯಕ್ತವಾಗುತ್ತದೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Meditation and devotion purify the mind and illuminate the soul.",
            quoteKn: "ಧ್ಯಾನ ಮತ್ತು ಭಕ್ತಿ ಮನಸ್ಸನ್ನು ಶುದ್ಧಗೊಳಿಸಿ ಆತ್ಮವನ್ನು ಪ್ರಕಾಶಮಾನಗೊಳಿಸುತ್ತವೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "An Ashrama is not just a place, but a sacred space of inner peace and divine experience.",
            quoteKn: "ಆಶ್ರಮವು ಕೇವಲ ಸ್ಥಳವಲ್ಲ, ಅದು ಆತ್ಮಶಾಂತಿ ಮತ್ತು ದೈವಿಕ ಅನುಭವದ ಪವಿತ್ರ ಕ್ಷೇತ್ರ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Sri Aaroodha Tapobhumi stands as a divine center of devotion, wisdom, and selfless service.",
            quoteKn: "ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ ಭಕ್ತಿ, ಜ್ಞಾನ ಮತ್ತು ಸೇವೆಯ ದಿವ್ಯ ಕೇಂದ್ರವಾಗಿದೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Those who walk the path of the Guru discover the true purpose of life.",
            quoteKn: "ಗುರು ಮಾರ್ಗದಲ್ಲಿ ನಡೆಯುವವರು ಜೀವನದ ನಿಜವಾದ ಅರ್ಥವನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತಾರೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Inner peace is not found in the outer world; it blossoms through devotion, meditation, and the grace of the Guru.",
            quoteKn: "ಆತ್ಮಶಾಂತಿ ಹೊರಗಿನ ಲೋಕದಲ್ಲಿ ಸಿಗುವುದಿಲ್ಲ; ಅದು ಭಕ್ತಿ, ಧ್ಯಾನ ಮತ್ತು ಗುರುವಿನ ಕೃಪೆಯಲ್ಲಿ ಅರಳುತ್ತದೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "When one walks the path of the Guru, every step leads toward self-realization.",
            quoteKn: "ಗುರುವಿನ ಮಾರ್ಗದಲ್ಲಿ ನಡೆದಾಗ, ಪ್ರತಿಯೊಂದು ಹೆಜ್ಜೆಯೂ ಆತ್ಮಜ್ಞಾನದತ್ತ ಕರೆದೊಯ್ಯುತ್ತದೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        },
        {
            quote: "Selfless devotion purifies the mind and transforms life into a divine experience.",
            quoteKn: "ನಿಸ್ವಾರ್ಥ ಭಕ್ತಿ ಮನಸ್ಸನ್ನು ಶುದ್ಧಗೊಳಿಸಿ, ಜೀವನವನ್ನು ದೈವಿಕ ಅನುಭವವನ್ನಾಗಿ ರೂಪಿಸುತ್ತದೆ.",
            author: "Chandrashekar Odeyar J",
            authorKn: "ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ"
        }
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-earth-brown/85 to-earth-brown/95" />
                <div className="relative z-10 container-custom text-center">
                    <h1 className="font-kn-heading text-4xl md:text-5xl font-bold text-cream mb-2">
                        ಉಲ್ಲೇಖಗಳು
                    </h1>
                    <h2 className="font-en-heading text-2xl md:text-3xl font-semibold text-cream/90 mb-4">
                        Spiritual Quotes
                    </h2>
                    <p className="font-en-body text-base text-cream/80 max-w-2xl mx-auto">
                        Timeless spiritual reflections inspired by the teachings and values of Sri Aaroodha Tapobhumi.
                    </p>
                </div>
            </section>

            {/* Quotes Grid Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quotes.map((quote, index) => (
                            <QuoteCard
                                key={index}
                                quote={quote.quote}
                                quoteKn={quote.quoteKn}
                                author={quote.author}
                                authorKn={quote.authorKn}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Quotes;
