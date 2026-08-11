import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QuoteCard } from "@/components/common/QuoteCard";
import { Target, Eye, Heart, BookOpen } from "lucide-react";
import { fetchSiteImageBySection } from "@/services/siteImagesAPI";
import { getImageUrl } from "@/services/api";
import templeImage from "@/assets/home-about.jpg";
import heroImage from "@/assets/hero-ashrama.jpg";

const About = () => {
  const [aboutBannerImage, setAboutBannerImage] = useState<string>(heroImage);

  useEffect(() => {
    const loadAboutBanner = async () => {
      try {
        const bannerData = await fetchSiteImageBySection('about_banner');
        if (bannerData && bannerData.image_url) {
          setAboutBannerImage(getImageUrl(bannerData.image_url));
        }
      } catch (error) {
        console.error('Failed to load about banner:', error);
        // Fallback to default image (already set in state)
      }
    };

    loadAboutBanner();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutBannerImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-brown/85 to-earth-brown/95" />
        <div className="relative z-10 container-custom text-center">
          <span className="font-kn-body text-saffron-light text-lg block mb-3">
            ನಮ್ಮ ಬಗ್ಗೆ
          </span>
          <h1 className="font-kn-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-3">
            ಆಶ್ರಮದ ಕುರಿತು
          </h1>
          <h2 className="font-en-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-cream/90 mb-6">
            About the Ashrama
          </h2>
          <p className="font-kn-body text-lg text-cream/90 max-w-2xl mx-auto mb-2">
            ಆಧ್ಯಾತ್ಮಿಕ ವಿಕಾಸ, ನಿಸ್ವಾರ್ಥ ಸೇವೆ ಮತ್ತು ಪುರಾತನ ವೇದ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆಗೆ ಸಮರ್ಪಿತ ಪವಿತ್ರ ಕ್ಷೇತ್ರ
          </p>
          <p className="font-en-body text-base text-cream/75 max-w-2xl mx-auto">
            A sacred sanctuary dedicated to spiritual growth, selfless service, and the preservation of ancient Vedic traditions.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="Our History"
                titleKn="ನಮ್ಮ ಇತಿಹಾಸ"
                subtitle="ಶತಮಾನಕ್ಕೂ ಅಧಿಕ ಆಧ್ಯಾತ್ಮಿಕ ಸೇವೆಯ ಪವಿತ್ರ ಪರಂಪರೆ | A sacred legacy of spiritual service spanning over a century"
                centered={false}
              />
              <div className="space-y-2 mb-4">
                <h3 className="font-kn-heading text-2xl font-bold text-foreground">
                  ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ
                </h3>
                <h4 className="font-kn-subheading text-xl font-semibold text-primary">
                  ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ
                </h4>
                <p className="font-en-heading text-lg text-primary/70">
                  Sri Aaroodha Tapobhumi, Sukshetra Khanderayanahalli
                </p>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-kn-body">
                  ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ, ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ, ಮಹಾನ್ ಸಂತ ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಜೀವನ, ಉಪದೇಶಗಳು ಮತ್ತು ದಿವ್ಯ ಪರಂಪರೆಯಿಂದ ಪ್ರೇರಿತವಾದ ಪವಿತ್ರ ತಪೋಕ್ಷೇತ್ರವಾಗಿದೆ. ಈ ಆಶ್ರಮವು ಭಕ್ತಿ, ಆತ್ಮಜ್ಞಾನ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ತತ್ವಗಳನ್ನು ಜೀವಂತವಾಗಿ ಅನುಸರಿಸುತ್ತಿದೆ.
                </p>
                <p className="font-en-body text-sm">
                  Sri Aaroodha Tapobhumi, located at Sukshetra Khanderayanahalli, is a sacred spiritual center inspired by the life, teachings, and divine legacy of the great saint Sri Siddharoodha Swamiji. The Ashrama upholds the timeless principles of devotion, self-knowledge, and selfless service.
                </p>
                <p className="font-kn-body">
                  ಸಾಧಕರಿಗೆ ದಾರಿದೀಪವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಈ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರವು, ಶ್ರೀ ನಾಗರಾಜಾನಂದ ಅಪ್ಪಾಜಿ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಹಾಗೂ ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ ಅಪ್ಪಾಜಿ ಅವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿದ್ದು, ಧ್ಯಾನ, ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಸೇವೆಯ ಮೂಲಕ ಆತ್ಮೋನ್ನತಿಯ ಮಾರ್ಗವನ್ನು ನೀಡುತ್ತಿದೆ.
                </p>
                <p className="font-en-body text-sm">
                  Serving as a guiding light for spiritual seekers, the Ashrama functions under the leadership of Sri Nagarajananda Appaji and the guidance of Sri Shivananda Bharati Appaji, offering a path of inner growth through prayer, meditation, and dedicated service.
                </p>
                <p className="font-kn-body">
                  ಒಂದು ತಪೋಭೂಮಿಯಾಗಿ ಆರಂಭವಾದ ಈ ಕ್ಷೇತ್ರವು ಇಂದು ಭಕ್ತರಿಗೆ ಆಶ್ರಯ, ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಸಮಾಜಸೇವೆಯ ಕೇಂದ್ರವಾಗಿ ಅಭಿವೃದ್ಧಿಯಾಗಿದೆ. ಅನ್ನದಾನ, ಧಾರ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ಸೇವೆಗಳ ಮೂಲಕ ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಸಂದೇಶವನ್ನು ಮುಂದುವರಿಸುತ್ತಿದೆ.
                </p>
                <p className="font-en-body text-sm">
                  What began as a spiritual retreat has evolved into a center of devotion, guidance, and social welfare. Through Annadanam, religious observances, and community service, the Ashrama continues to carry forward the spiritual vision and message of Sri Siddharoodha Swamiji.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={templeImage}
                alt="Temple interior"
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="Mission & Vision"
            titleKn="ಧ್ಯೇಯ ಮತ್ತು ದೃಷ್ಟಿ"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="text-primary" size={28} />
              </div>
              <h3 className="font-kn-subheading text-2xl font-semibold text-foreground mb-2">
                ನಮ್ಮ ಧ್ಯೇಯ
              </h3>
              <h4 className="font-en-heading text-xl font-medium text-foreground/70 mb-4">
                Our Mission
              </h4>
              <p className="font-kn-body text-muted-foreground leading-relaxed mb-3">
                ಶ್ರೀ ಸಿದ್ಧರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಆಧ್ಯಾತ್ಮಿಕ ಉಪದೇಶಗಳನ್ನು ಸಂರಕ್ಷಿಸಿ, ಭಕ್ತರಿಗೆ ಭಕ್ತಿ, ಸೇವೆ ಮತ್ತು ಆತ್ಮೋನ್ನತಿಯ ಪಥವನ್ನು ಒದಗಿಸುವುದು. ಅನ್ನದಾನ, ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಮಾಜಿಕ ಸೇವೆಯ ಮೂಲಕ ಮಾನವತೆಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವುದು.
              </p>
              <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed">
                To preserve and propagate the spiritual teachings of Sri Siddharoodha Swamiji, providing a sacred space for devotees to practice faith and serve humanity through Annadanam, education, and social welfare activities.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="text-primary" size={28} />
              </div>
              <h3 className="font-kn-subheading text-2xl font-semibold text-foreground mb-2">
                ನಮ್ಮ ದೃಷ್ಟಿ
              </h3>
              <h4 className="font-en-heading text-xl font-medium text-foreground/70 mb-4">
                Our Vision
              </h4>
              <p className="font-kn-body text-muted-foreground leading-relaxed mb-3">
                ಆಧ್ಯಾತ್ಮಿಕ ಜ್ಞಾನ ಮತ್ತು ಸೇವೆಯ ಕೇಂದ್ರವಾಗಿ ವಿಶ್ವಮಟ್ಟದಲ್ಲಿ ಗುರುತಿಸಲ್ಪಟ್ಟು, ಭಕ್ತರನ್ನು ಧರ್ಮ, ನೀತಿ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ಮಾರ್ಗದಲ್ಲಿ ಪ್ರೇರೇಪಿಸುವುದು.
              </p>
              <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed">
                To be a globally recognized center of spiritual wisdom and humanitarian service, inspiring millions to walk the path of devotion, righteousness, and selfless service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Values"
            titleKn="ನಮ್ಮ ಮೄಲ್ಯಗಳು"
            subtitle="ನಮ್ಮ ಸೇವೆ ಮತ್ತು ಭಕ್ತಿಗೆ ದಾರಿ ತೋರಿಸುವ ತತ್ವಗಳು | The guiding principles that shape our service and devotion"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart size={24} />,
                title: "Compassion",
                titleKn: "ಕರುಣೆ",
                desc: "Serving all beings with love and empathy",
              },
              {
                icon: <BookOpen size={24} />,
                title: "Wisdom",
                titleKn: "ಜ್ಞಾನ",
                desc: "Pursuing and sharing spiritual knowledge",
              },
              {
                icon: <Target size={24} />,
                title: "Devotion",
                titleKn: "ಭಕ್ತಿ",
                desc: "Unwavering faith in the Divine",
              },
              {
                icon: <Eye size={24} />,
                title: "Service",
                titleKn: "ಸೇವೆ",
                desc: "Selfless action for the welfare of all",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-xl bg-secondary shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h4 className="font-kn-subheading text-lg font-semibold text-foreground mb-1">
                  {value.titleKn}
                </h4>
                <p className="font-en-heading text-sm font-medium text-primary mb-2">
                  {value.title}
                </p>
                <p className="font-en-body text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom max-w-4xl">
          <QuoteCard
            quote="Live together in unity and establish peace in the world."
            quoteKn="ಒಂದಾಗಿ ಬಾಳಿರಿ, ವಿಶ್ವಶಾಂತಿ ನೆಲೆಸಿರಿ."
            author="Shri Shivananda Bharati"
            authorKn="ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ"
          />
        </div>
      </section>

      {/* Second Quote Section */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <QuoteCard
            quote="The Ashrama is not just a place of worship; it is a school of life where we learn to live in harmony with ourselves, with others, and with the Divine."
            quoteKn="ಆಶ್ರಮವು ಕೇವಲ ಪೂಜಾಸ್ಥಳವಲ್ಲ; ಅದು ಜೀವನವನ್ನು ಹೇಗೆ ಸಮನ್ವಯದಿಂದ, ಮಾನವರೊಂದಿಗೆ ಮತ್ತು ದೈವದೊಂದಿಗೆ ಬದುಕಬೇಕು ಎಂಬುದನ್ನು ಕಲಿಸುವ ಪಾಠಶಾಲೆಯಾಗಿದೆ."
            author="Ashrama Tradition"
            authorKn="ಆಶ್ರಮ ಪರಂಪರೆ"
          />
        </div>
      </section>
    </Layout>
  );
};

export default About;
