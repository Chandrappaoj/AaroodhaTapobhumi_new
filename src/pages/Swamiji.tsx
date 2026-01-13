import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QuoteCard } from "@/components/common/QuoteCard";
import { Star, Heart, Lightbulb, BookOpen } from "lucide-react";
import swamijiImage from "@/assets/swamiji-portrait.jpg";
import shivanandaBharatiImage from "@/assets/shivananda bharathi.png";
import nagarajanandaSwamijiImage from "@/assets/Nagarajananda-Swamiji.png";
import heroImage from "@/assets/hero-ashrama.jpg";

const Swamiji = () => {
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
          <span className="font-kn-body text-saffron-light text-lg block mb-3">
            ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ
          </span>
          <h1 className="font-en-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Sri Siddaroodha Swamiji
          </h1>
          <p className="font-en-body text-lg text-cream/80 max-w-2xl mx-auto">
            A divine master whose spiritual wisdom and compassionate service continue to inspire millions of seekers.
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <img
                src={swamijiImage}
                alt="Sri Siddaroodha Swamiji"
                className="rounded-2xl shadow-elevated w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <div className="mb-6">
                <p className="font-en-body text-sm text-primary/70 mb-1">Life & Biography</p>
                <p className="font-kn-body text-xs text-primary/60">ಜೀವನ ಚರಿತ್ರೆ</p>
              </div>
              <SectionHeader
                title="Sri Siddaroodha Swamiji"
                titleKn="ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-kn-body text-base">
                  ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ ಕರ್ನಾಟಕದ ಪವಿತ್ರ ಭೂಮಿಯಲ್ಲಿ ಜನಿಸಿದ ಮಹಾನ್ ಆತ್ಮಜ್ಞಾನಿ. ಬಾಲ್ಯದಿಂದಲೇ ಅವರು ವೈರಾಗ್ಯ, ಧ್ಯಾನ ಮತ್ತು ತಪಸ್ಸಿನತ್ತ ಆಕರ್ಷಿತರಾಗಿದ್ದರು. ಭೌತಿಕ ಜೀವನವನ್ನು ತ್ಯಜಿಸಿ, ಸತ್ಯಾನ್ವೇಷಣೆಯ ಪಥದಲ್ಲಿ ಭಾರತದೆಲ್ಲೆಡೆ ಸಂಚರಿಸಿ ಅನೇಕ ಗುರುಗಳಿಂದ ಆತ್ಮಜ್ಞಾನವನ್ನು ಪಡೆದರು.
                </p>
                <p className="font-en-body text-sm text-muted-foreground/80">
                  Sri Siddaroodha Swamiji was born in Karnataka and displayed deep spiritual inclination from an early age. Renouncing worldly life, he pursued intense spiritual discipline and later settled in Hubballi, guiding seekers through devotion, service, and wisdom.
                </p>
                <p className="font-kn-body text-base">
                  ಹುಬ್ಬಳ್ಳಿಯಲ್ಲಿ ನೆಲೆಸಿದ ನಂತರ, ಅವರ ದಿವ್ಯ ಸಾನ್ನಿಧ್ಯ, ಕೃಪಾಶಕ್ತಿ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯಿಂದ ಲಕ್ಷಾಂತರ ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸಿದರು. ಅನ್ನದಾನ, ಭಕ್ತಿ ಮತ್ತು ಸೇವೆಯ ಮೂಲಕ ಧರ್ಮವನ್ನು ಬದುಕುವ ಮಾರ್ಗವನ್ನು ಅವರು ತೋರಿಸಿದರು.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section 2 - Image on Right */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="mb-6">
                <p className="font-en-body text-sm text-primary/70 mb-1">Life & Biography</p>
                <p className="font-kn-body text-xs text-primary/60">ಜೀವನ ಚರಿತ್ರೆ</p>
              </div>
              <SectionHeader
                title="Shri Shivanand Bharati Mahaswamiji"
                titleKn="ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ ಮಹಾಸ್ವಾಮೀಜಿ"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-kn-body text-base">
                  ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಜಾಗೃತಿಗೆ ತಮ್ಮ ಜೀವನವನ್ನು ಅರ್ಪಿಸಿದ ಮಹಾನ್ ಸಂತರಾಗಿದ್ದಾರೆ. 1970ರಲ್ಲಿ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳನ್ನು ಸ್ಥಾಪಿಸಿ ಸಾವಿರಾರು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶಿಕ್ಷಣದ ಬೆಳಕು ನೀಡಿದರು.
                </p>
                <p className="font-en-body text-sm text-muted-foreground/80">
                  Shri Shivanand Bharati Mahaswamiji is a revered spiritual leader and educationist who established institutions to uplift rural communities through education and Vedantic wisdom.
                </p>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <img
                src={shivanandaBharatiImage}
                alt="Shri Shivanand Bharati Mahaswamiji"
                className="rounded-2xl shadow-elevated w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section 3 - Image on Left */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <img
                src={nagarajanandaSwamijiImage}
                alt="Nagarajananda Swamiji"
                className="rounded-2xl shadow-elevated w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <div className="mb-6">
                <p className="font-en-body text-sm text-primary/70 mb-1">Life & Biography</p>
                <p className="font-kn-body text-xs text-primary/60">ಜೀವನ ಚರಿತ್ರೆ</p>
              </div>
              <SectionHeader
                title="Nagarajananda Swamiji"
                titleKn="ಶ್ರೀ ನಾಗರಾಜಾನಂದ ಸ್ವಾಮೀಜಿ"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-kn-body text-base">
                  ಖಂಡೇರಾಯನಹಳ್ಳಿ ಪ್ರದೇಶದಲ್ಲಿ ಆಧ್ಯಾತ್ಮಿಕ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಗೌರವಾನ್ವಿತ ಸ್ವಾಮೀಜಿ. ಧ್ಯಾನ, ಭಕ್ತಿ ಮತ್ತು ಸೇವೆಯ ಮೂಲಕ ಭಕ್ತರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಿದ್ದಾರೆ.
                </p>
                <p className="font-en-body text-sm text-muted-foreground/80">
                  Nagarajananda Swamiji is a respected spiritual guide associated with Khanderayanahalli, offering guidance through devotion, meditation, and service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charitre Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-kn-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಚರಿತ್ರೆ
            </h2>
            <p className="font-en-body text-base text-muted-foreground max-w-2xl mx-auto">
              Stories, life events, and spiritual teachings of Sri Siddaroodha Swamiji
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Kannada Charitre Card */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="text-primary" size={32} />
              </div>
              <h3 className="font-kn-subheading text-2xl font-semibold text-foreground text-center mb-2">
                ಕನ್ನಡ ಚರಿತ್ರೆ
              </h3>
              <p className="font-en-heading text-sm text-primary/70 text-center mb-4">
                Kannada Charitre
              </p>
              <p className="font-kn-body text-base text-muted-foreground leading-relaxed mb-2 text-center">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಜೀವನ, ಉಪದೇಶಗಳು ಮತ್ತು ದಿವ್ಯ ಅನುಭವಗಳನ್ನು ಒಳಗೊಂಡ ಪವಿತ್ರ ಕಥೆಗಳು.
              </p>
              <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed mb-6 text-center">
                Sacred stories describing the life, teachings, and divine experiences of Sri Siddaroodha Swamiji.
              </p>
              <button className="w-full bg-primary text-white font-en-body font-medium py-3 px-6 rounded-full hover:bg-primary/90 transition-colors">
                Read Kannada Charitre
              </button>
            </div>

            {/* English Charitre Card */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="text-primary" size={32} />
              </div>
              <h3 className="font-en-heading text-2xl font-semibold text-foreground text-center mb-2">
                English Charitre
              </h3>
              <p className="font-kn-body text-sm text-primary/70 text-center mb-4">
                ಇಂಗ್ಲಿಷ್ ಚರಿತ್ರೆ
              </p>
              <p className="font-en-body text-base text-muted-foreground leading-relaxed mb-2 text-center">
                Inspirational stories and spiritual insights from the life of Sri Siddaroodha Swamiji for global readers.
              </p>
              <p className="font-kn-body text-sm text-muted-foreground/80 leading-relaxed mb-6 text-center">
                ವಿಶ್ವದ ಭಕ್ತರಿಗೆ ಪ್ರೇರಣೆಯಾದ ಸ್ವಾಮೀಜಿಯವರ ಆಧ್ಯಾತ್ಮಿಕ ಕಥೆಗಳು.
              </p>
              <button className="w-full border-2 border-primary text-primary font-en-body font-medium py-3 px-6 rounded-full hover:bg-primary hover:text-white transition-colors">
                Read English Charitre
              </button>
            </div>

            {/* Hindi Charitre Card */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="text-primary" size={32} />
              </div>
              <h3 className="font-en-heading text-2xl font-semibold text-foreground text-center mb-2">
                हिंदी चरित्र
              </h3>
              <p className="font-en-heading text-sm text-primary/70 text-center mb-4">
                Hindi Charitre
              </p>
              <p className="font-en-body text-base text-muted-foreground leading-relaxed mb-2 text-center">
                श्री सिद्धरूढ़ स्वामीजी के जीवन और आध्यात्मिक शिक्षाओं की प्रेरणादायक कहानियाँ।
              </p>
              <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed mb-6 text-center">
                Spiritual stories translated for Hindi-speaking devotees.
              </p>
              <button className="w-full border-2 border-primary text-primary font-en-body font-medium py-3 px-6 rounded-full hover:bg-primary hover:text-white transition-colors">
                Read Hindi Charitre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Teachings Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Teachings & Philosophy"
            titleKn="ಬೋಧನೆಗಳು ಮತ್ತು ತತ್ವಶಾಸ್ತ್ರ"
            subtitle="The timeless wisdom that guides our spiritual journey"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Heart size={28} />,
                title: "Universal Love",
                titleKn: "ಸರ್ವಜೀವ ಪ್ರೀತಿ",
                descKn: "ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯವರು ಪ್ರತಿಯೊಬ್ಬ ಜೀವಿಯಲ್ಲೂ ದೇವರ ಅಸ್ತಿತ್ವವಿದೆ ಎಂದು ಬೋಧಿಸಿದರು. ಎಲ್ಲರಿಗೂ ಪ್ರೀತಿ, ಕರುಣೆ ಮತ್ತು ಸಮಾನ ದೃಷ್ಟಿಯೇ ಸತ್ಯ ಭಕ್ತಿಯಾಗಿದೆ ಎಂದು ತಿಳಿಸಿದರು.",
                desc: "Sri Siddaroodha Swamiji taught that God resides in every living being. Love, compassion, and equality toward all form the foundation of true devotion.",
              },
              {
                icon: <Star size={28} />,
                title: "Selfless Service (Seva)",
                titleKn: "ನಿಸ್ವಾರ್ಥ ಸೇವೆ",
                descKn: "ಸೇವೆಯೇ ಸಾಧನೆಯ ಮಾರ್ಗವೆಂದು ಸ್ವಾಮೀಜಿಯವರು ತಿಳಿಸಿದರು. ಫಲಾಪೇಕ್ಷೆಯಿಲ್ಲದೆ ಸೇವೆ ಸಲ್ಲಿಸುವುದೇ ಮನಶುದ್ಧಿಗೆ ಮತ್ತು ಆತ್ಮೋನ್ನತಿಗೆ ಕಾರಣವೆಂದು ಬೋಧಿಸಿದರು.",
                desc: "Swamiji emphasized Karma Yoga—the path of selfless service. Serving without expectation purifies the heart and leads one toward spiritual liberation.",
              },
              {
                icon: <Lightbulb size={28} />,
                title: "Simple Living & Detachment",
                titleKn: "ಸರಳ ಜೀವನ",
                descKn: "ಸರಳ ಜೀವನ ಮತ್ತು ವೈರಾಗ್ಯವು ಆತ್ಮಶಾಂತಿಯ ಮೂಲವೆಂದು ಸ್ವಾಮೀಜಿಯವರು ಬೋಧಿಸಿದರು. ಭೌತಿಕ ಆಸಕ್ತಿಗಳಿಗಿಂತ ಆತ್ಮಜ್ಞಾನವೇ ನಿಜವಾದ ಸಂತೋಷವೆಂದು ತಿಳಿಸಿದರು.",
                desc: "Swamiji advocated simple living and detachment, teaching that true happiness lies not in material possessions but in inner contentment and self-realization.",
              },
              {
                icon: <BookOpen size={28} />,
                title: "Devotion, Knowledge & Guidance",
                titleKn: "ಭಕ್ತಿ, ಜ್ಞಾನ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
                descKn: "ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಪರಂಪರೆಯನ್ನು ಮುಂದುವರಿಸುತ್ತಾ, ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ ಅಪ್ಪಾಜಿ ಮತ್ತು ಶ್ರೀ ನಾಗರಾಜಾನಂದ ಅಪ್ಪಾಜಿ ಅವರು ಭಕ್ತಿ, ಜ್ಞಾನ ಮತ್ತು ಸೇವೆಯ ಮೂಲಕ ಸಾಧಕರಿಗೆ ದಾರಿದೀಪವಾಗಿದ್ದಾರೆ.",
                desc: "Carrying forward the Siddaroodha spiritual legacy, Sri Shivananda Bharati Appaji and Sri Nagarajananda Appaji guide seekers through devotion, wisdom, and service.",
              },
            ].map((teaching) => (
              <div
                key={teaching.title}
                className="bg-card rounded-2xl p-8 shadow-soft"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  {teaching.icon}
                </div>
                <h3 className="font-kn-subheading text-xl font-semibold text-foreground mb-1">
                  {teaching.titleKn}
                </h3>
                <p className="font-en-heading text-sm text-primary/70 mb-3">
                  {teaching.title}
                </p>
                <p className="font-kn-body text-base text-muted-foreground leading-relaxed mb-3">
                  {teaching.descKn}
                </p>
                <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed">
                  {teaching.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="Divine Teachings"
            titleKn="ದೈವಿಕ ಬೋಧನೆಗಳು"
            subtitle="Words of wisdom from Sri Siddaroodha Swamiji"
          />
          <div className="space-y-8 max-w-4xl mx-auto">
            <QuoteCard
              quote="Service to humanity is service to God. In selfless seva, we find our true purpose."
              quoteKn="ಮಾನವ ಸೇವೆಯೇ ಮಾಧವ ಸೇವೆ. ನಿಸ್ವಾರ್ಥ ಸೇವೆಯಲ್ಲಿ ನಾವು ನಮ್ಮ ನಿಜವಾದ ಉದ್ದೇಶವನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತೇವೆ."
              author="Sri Siddaroodha Swamiji"
              authorKn="ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ"
            />
            <QuoteCard
              quote="The hungry stomach knows no religion. When we feed the hungry, we feed God Himself."
              quoteKn="ಹಸಿದ ಹೊಟ್ಟೆಗೆ ಯಾವುದೇ ಧರ್ಮವಿಲ್ಲ. ಹಸಿದವರಿಗೆ ಆಹಾರ ನೀಡುವಾಗ, ನಾವು ಸ್ವತಃ ದೇವರಿಗೆ ಆಹಾರ ನೀಡುತ್ತೇವೆ."
              author="Sri Siddaroodha Swamiji"
              authorKn="ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ"
            />
            <QuoteCard
              quote="True knowledge is that which leads to humility, compassion, and the realization of the Divine in all."
              quoteKn="ನಿಜವಾದ ಜ್ಞಾನವು ವಿನಮ್ರತೆ, ಕರುಣೆ ಮತ್ತು ಎಲ್ಲದರಲ್ಲೂ ದೈವಿಕತೆಯ ಅರಿವಿಗೆ ಕಾರಣವಾಗುತ್ತದೆ."
              author="Sri Siddaroodha Swamiji"
              authorKn="ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ"
            />
            <QuoteCard
              quote="Live together in harmony, and let universal peace prevail."
              quoteKn="ಒಂದಾಗಿ ಬಾಳಿರಿ, ವಿಶ್ವಶಾಂತಿ ನೆಲೆಸಿರಿ."
              author="Shri Shivanand Bharati Swamiji"
              authorKn="ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ ಸ್ವಾಮೀಜಿ"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Swamiji;
