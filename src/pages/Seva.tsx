import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SevaCard } from "@/components/common/SevaCard";
import {
  Utensils,
  Sparkles,
  Heart,
  GraduationCap,
  Stethoscope,
  Home,
  BookOpen,
  Users,
} from "lucide-react";
import { fetchSiteImageBySection } from "@/services/siteImagesAPI";
import { getImageUrl } from "@/services/api";
import annadanamImage from "@/assets/annadanam.jpg";
import meditationImage from "@/assets/meditation.jpg";
import heroImage from "@/assets/hero-ashrama.jpg";

const Seva = () => {
  const [annadanamImg, setAnnadanamImg] = useState<string>(annadanamImage);
  const [meditationImg, setMeditationImg] = useState<string>(meditationImage);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Fetch annadanam image (used for seva_puja section)
        const annadanamData = await fetchSiteImageBySection('seva_puja');
        if (annadanamData && annadanamData.image_url) {
          setAnnadanamImg(getImageUrl(annadanamData.image_url));
        }

        // Fetch meditation/spiritual programs image
        const meditationData = await fetchSiteImageBySection('seva_education');
        if (meditationData && meditationData.image_url) {
          setMeditationImg(getImageUrl(meditationData.image_url));
        }
      } catch (error) {
        console.error('Failed to load seva images:', error);
        // Fallback to default images (already set in state)
      }
    };

    loadImages();
  }, []);

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
            ಸೇವಾ ಚಟುವಟಿಕೆಗಳು
          </span>
          <h1 className="font-kn-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-3">
            ಸೇವೆ ಮತ್ತು ಚಟುವಟಿಕೆಗಳು
          </h1>
          <h2 className="font-en-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-cream/90 mb-6">
            Seva & Activities
          </h2>
          <p className="font-kn-body text-lg text-cream/90 max-w-2xl mx-auto mb-2">
            ಆಧ್ಯಾತ್ಮಿಕ, ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಾಮಾಜಿಕ ಸೇವೆಗಳ ಮೂಲಕ ಮಾನವತೆಗೆ ನಿಸ್ವಾರ್ಥ ಸೇವೆ.
          </p>
          <p className="font-en-body text-base text-cream/75 max-w-2xl mx-auto">
            Selfless service to humanity through spiritual, educational, and social welfare programs.
          </p>
        </div>
      </section>

      {/* Annadanam Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-kn-body text-primary text-sm block mb-2">
                ಅನ್ನದಾನ
              </span>
              <h2 className="font-kn-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                ಅನ್ನವೇ ಮಹಾದಾನ
              </h2>
              <h3 className="font-en-heading text-2xl md:text-3xl font-semibold text-primary mb-6">
                Annadanam – The Sacred Gift of Food
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-kn-body text-base">
                  "ಅನ್ನದಾನ ಮಹಾದಾನ" ಎಂಬ ತತ್ತ್ವವನ್ನು ಅನುಸರಿಸಿ, ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿಯಲ್ಲಿ ಪ್ರತಿದಿನ ಸಾವಿರಾರು ಭಕ್ತರು, ಯಾತ್ರಿಕರು ಮತ್ತು ಅಗತ್ಯವಿರುವವರಿಗೆ ಉಚಿತ ಭೋಜನವನ್ನು ನೀಡಲಾಗುತ್ತದೆ. ಪ್ರೇಮ, ಭಕ್ತಿ ಮತ್ತು ಸೇವಾಭಾವದಿಂದ ಸಿದ್ಧಗೊಳಿಸಲಾದ ಪೌಷ್ಟಿಕ ಆಹಾರದಿಂದ ಇಲ್ಲಿ ಯಾರೂ ಹಸಿದವರು ಹಿಂತಿರುಗುವುದಿಲ್ಲ.
                </p>
                <p className="font-en-body text-sm text-muted-foreground/80">
                  Following the sacred principle of "Annadanam Maha Danam", the Ashrama serves free, nutritious meals every day to thousands of devotees, pilgrims, and the needy. No one who comes to the Ashrama leaves hungry.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-secondary rounded-xl">
                  <div className="text-3xl font-en-heading font-bold text-primary">
                    5000+
                  </div>
                  <div className="text-sm font-en-body text-muted-foreground">
                    Meals Served Daily
                  </div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-xl">
                  <div className="text-3xl font-en-heading font-bold text-primary">
                    365
                  </div>
                  <div className="text-sm font-en-body text-muted-foreground">
                    Days a Year
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={annadanamImg}
                alt="Annadanam - Community meal service"
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Programs Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={meditationImg}
                alt="Meditation and spiritual programs"
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="font-kn-body text-primary text-sm block mb-2">
                ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು
              </span>
              <h2 className="font-kn-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು
              </h2>
              <h3 className="font-en-heading text-2xl md:text-3xl font-semibold text-primary mb-6">
                Spiritual Programs
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-kn-body text-base">
                  ಆತ್ಮಶುದ್ಧಿ ಮತ್ತು ದೈವಸಂಪರ್ಕವನ್ನು ಗಾಢಗೊಳಿಸುವ ಉದ್ದೇಶದಿಂದ, ಆಶ್ರಮದಲ್ಲಿ ನಿಯಮಿತವಾಗಿ ವಿವಿಧ ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸಲಾಗುತ್ತದೆ.
                </p>
                <p className="font-en-body text-sm text-muted-foreground/80">
                  The Ashrama offers a rich calendar of spiritual programs designed to nourish the soul and deepen one's connection with the Divine.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { kn: "ಪ್ರಾತಃಕಾಲ ಮತ್ತು ಸಾಯಂಕಾಲದ ಆರತಿ", en: "Daily Morning & Evening Aarti" },
                  { kn: "ಸಪ್ತಾಹಿಕ ಸತ್ಸಂಗ ಮತ್ತು ಭಜನೆ", en: "Weekly Satsang & Bhajans" },
                  { kn: "ಮಾಸಿಕ ಶಿವಾಭಿಷೇಕ ಮತ್ತು ವಿಶೇಷ ಪೂಜೆಗಳು", en: "Monthly Shiva Abhishekam" },
                  { kn: "ಧ್ಯಾನ ಮತ್ತು ಮಂತ್ರಜಪ", en: "Guided Meditation Sessions" },
                  { kn: "ವೇದಪಾಠ ಮತ್ತು ಪಠಣ", en: "Vedic Chanting Classes" },
                  { kn: "ಹಬ್ಬೋತ್ಸವಗಳು (ಶಿವರಾತ್ರಿ, ನವರಾತ್ರಿ ಇತ್ಯಾದಿ)", en: "Festival Celebrations" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-kn-body text-base text-foreground block">{item.kn}</span>
                      <span className="font-en-body text-sm text-muted-foreground/80">{item.en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Seva Activities */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="All Our Activities"
            titleKn="ನಮ್ಮ ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು"
            subtitle="A comprehensive range of services for spiritual growth and social welfare"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SevaCard
              icon={<Utensils size={28} />}
              title="Annadanam"
              titleKn="ಅನ್ನದಾನ"
              description="ಪ್ರತಿದಿನ ಸಾವಿರಾರು ಭಕ್ತರು ಮತ್ತು ಯಾತ್ರಿಕರಿಗೆ ನಿಸ್ವಾರ್ಥ ಸೇವೆಯಾಗಿ ಉಚಿತ ಅನ್ನವನ್ನು ಅರ್ಪಿಸಲಾಗುತ್ತದೆ. ಅನ್ನದಾನವನ್ನು ಪರಮ ದಾನವೆಂದು ಭಾವಿಸಿ ಭಕ್ತಿಯಿಂದ ನಡೆಸಲಾಗುತ್ತದೆ. | Daily free meals served to thousands of devotees and pilgrims as a sacred act of service."
            />
            <SevaCard
              icon={<Sparkles size={28} />}
              title="Daily Prayers"
              titleKn="ನಿತ್ಯ ಪ್ರಾರ್ಥನೆಗಳು"
              description="ಪ್ರತಿದಿನ ಸುಪ್ರಭಾತ, ಮಧ್ಯಾಹ್ನ ಆರತಿ ಹಾಗೂ ಸಂಜೆ ಸಂಧ್ಯಾ ಪ್ರಾರ್ಥನೆಗಳನ್ನು ಶಾಸ್ತ್ರೀಯ ವೇದ ಸಂಪ್ರದಾಯದಂತೆ ಆಚರಿಸಲಾಗುತ್ತದೆ. | Morning Suprabhatam, noon Aarti, and evening Sandhya prayers conducted with traditional Vedic rituals."
            />
            <SevaCard
              icon={<BookOpen size={28} />}
              title="Spiritual Discourses"
              titleKn="ಆಧ್ಯಾತ್ಮಿಕ ಉಪನ್ಯಾಸಗಳು"
              description="ಧರ್ಮ, ಭಕ್ತಿ, ವೇದಾಂತ ಮತ್ತು ಸ್ವಾಮೀಜಿಯವರ ಉಪದೇಶಗಳ ಕುರಿತು ನಿಯಮಿತ ಉಪನ್ಯಾಸಗಳು ಮತ್ತು ಚರ್ಚೆಗಳು ನಡೆಯುತ್ತವೆ. | Regular talks on scriptures, Swamiji's teachings, and practical spirituality by learned scholars."
            />
            <SevaCard
              icon={<Users size={28} />}
              title="Satsang"
              titleKn="ಸತ್ಸಂಗ"
              description="ಭಕ್ತರಿಗಾಗಿ ನಿಯಮಿತ ಸತ್ಸಂಗಗಳು, ಭಜನೆಗಳು, ಧ್ಯಾನ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಸಂವಾದಗಳು ಸಮೂಹವಾಗಿ ನಡೆಯುತ್ತವೆ. | Weekly gatherings for devotional singing, meditation, and spiritual discussions in the community."
            />
            <SevaCard
              icon={<GraduationCap size={28} />}
              title="Education Support"
              titleKn="ಶೈಕ್ಷಣಿಕ ಸಹಾಯ"
              description="ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾಭ್ಯಾಸಕ್ಕಾಗಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಹಾಗೂ ಶೈಕ್ಷಣಿಕ ನೆರವು ಒದಗಿಸಲಾಗುತ್ತದೆ. | Scholarships and educational assistance for deserving students from economically weaker backgrounds."
            />
            <SevaCard
              icon={<Stethoscope size={28} />}
              title="Healthcare Camps"
              titleKn="ಆರೋಗ್ಯ ಶಿಬಿರಗಳು"
              description="ಗ್ರಾಮೀಣ ಹಾಗೂ ಹಿಂದುಳಿದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳನ್ನು ಆಯೋಜಿಸಿ ಆರೋಗ್ಯ ಸೇವೆಗಳನ್ನು ಒದಗಿಸಲಾಗುತ್ತದೆ. | Regular free medical camps providing healthcare services to underserved communities."
            />
            <SevaCard
              icon={<Heart size={28} />}
              title="Social Welfare"
              titleKn="ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ"
              description="ವಿಪತ್ತು ಪರಿಹಾರ, ಬಟ್ಟೆ ವಿತರಣೆ ಮತ್ತು ಅಗತ್ಯವಿರುವವರಿಗೆ ಸಹಾಯ ಮಾಡುವ ಸಾಮಾಜಿಕ ಸೇವೆಗಳು ನಿರಂತರವಾಗಿ ನಡೆಯುತ್ತವೆ. | Disaster relief, clothing distribution, and support for underprivileged members of society."
            />
            <SevaCard
              icon={<Home size={28} />}
              title="Pilgrim Accommodation"
              titleKn="ಯಾತ್ರಿಕರ ವಸತಿ"
              description="ಆಶ್ರಮಕ್ಕೆ ಭೇಟಿ ನೀಡುವ ಭಕ್ತರು ಮತ್ತು ಯಾತ್ರಿಕರಿಗಾಗಿ ಸರಳ, ಸ್ವಚ್ಛ ಹಾಗೂ ಶಾಂತ ವಸತಿ ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸಲಾಗಿದೆ. | Simple, clean accommodation facilities for pilgrims and devotees visiting the Ashrama."
            />
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-saffron-dark text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-kn-heading text-3xl md:text-4xl font-bold mb-2">
            ನಮ್ಮ ಸೇವೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿ
          </h2>
          <h3 className="font-en-heading text-2xl md:text-3xl font-semibold text-saffron-light mb-4">
            Join Our Seva
          </h3>
          <p className="font-kn-body text-lg text-primary-foreground/95 max-w-2xl mx-auto mb-2">
            ನಿಮ್ಮ ಸಮಯ, ಸಂಪನ್ಮೂಲ ಅಥವಾ ಸೇವಾಭಾವದಿಂದ ನಮ್ಮ ಪವಿತ್ರ ಸೇವಾ ಕಾರ್ಯಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ. ಪ್ರತಿಯೊಂದು ಸೇವೆಯೂ ದೈವಸೇವೆ.
          </p>
          <p className="font-en-body text-base text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Volunteer your time, skills, or resources to support our sacred mission. Every contribution, big or small, makes a meaningful difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-primary font-en-body font-medium py-3 px-8 rounded-full hover:bg-cream transition-colors text-center"
            >
              Donate Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white font-en-body font-medium py-3 px-8 rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Contact for Seva
            </Link>
          </div>
        </div>
      </section>
    </Layout >
  );
};

export default Seva;
