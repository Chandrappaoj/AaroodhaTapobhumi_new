import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SevaCard } from "@/components/common/SevaCard";
import { EventCard } from "@/components/common/EventCard";
import { QuoteCard } from "@/components/common/QuoteCard";
import { Layout } from "@/components/layout/Layout";
import {
  Clock,
  Heart,
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  Utensils,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { fetchSiteImageBySection } from "@/services/siteImagesAPI";
import { getImageUrl, eventsAPI } from "@/services/api";
import heroImage from "@/assets/hero-ashrama.jpg";
import swamijiImage from "@/assets/swamiji-portrait.jpg";
import annadanamImage from "@/assets/annadanam.jpg";
import meditationImage from "@/assets/meditation.jpg";
import templeImage from "@/assets/temple-interior.jpg";

const Index = () => {
  const [heroBgImage, setHeroBgImage] = useState<string>(heroImage);
  const [annadanamBgImage, setAnnadanamBgImage] = useState<string>(annadanamImage);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    // Fetch hero background image
    const loadHeroImage = async () => {
      try {
        const heroData = await fetchSiteImageBySection('hero_bg');
        if (heroData && heroData.image_url) {
          setHeroBgImage(getImageUrl(heroData.image_url));
        }
      } catch (error) {
        console.error('Failed to load hero background:', error);
        // Fallback to default image (already set in state)
      }
    };

    // Fetch annadanam image
    const loadAnnadanamImage = async () => {
      try {
        const annadanamData = await fetchSiteImageBySection('annadanam');
        if (annadanamData && annadanamData.image_url) {
          setAnnadanamBgImage(getImageUrl(annadanamData.image_url));
        }
      } catch (error) {
        console.error('Failed to load annadanam image:', error);
        // Fallback to default image (already set in state)
      }
    };

    // Fetch upcoming events
    const loadEvents = async () => {
      try {
        const response = await eventsAPI.getUpcoming();
        const events = response.data || response.events || [];
        setUpcomingEvents(events.slice(0, 3)); // Show only 3 events on home page
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setEventsLoading(false);
      }
    };

    loadHeroImage();
    loadAnnadanamImage();
    loadEvents();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-brown/80 via-earth-brown/60 to-earth-brown/90" />
        <div className="relative z-10 container-custom text-center py-20">
          <div className="animate-fade-in">
            <span className="inline-block font-kn-body text-lg md:text-xl text-saffron-light mb-4 animate-fade-in">
              ಓಂ ನಮಃ ಶಿವಾಯ
            </span>
            <span className="inline-block font-en-body text-sm md:text-base text-saffron-light/80 mb-4 ml-2 animate-fade-in">
              | Om Namah Shivaya
            </span>
            <h1 className="font-kn-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-2 leading-tight animate-slide-up">
              ಆರೂಢ ತಪೋಭೂಮಿ, ಜಗದ್ಗುರು ಶ್ರೀ ಸಿದ್ದಾರೂಢ ಸ್ವಾಮಿ ಮಹಾಸಂಸ್ಥಾನ
            </h1>
            <h2 className="font-kn-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-saffron-light mb-4 animate-slide-up">
              ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ
            </h2>
            <h1 className="font-en-heading text-lg md:text-xl lg:text-2xl font-medium text-cream/80 mb-6 animate-slide-up">
              Aaroodha Tapobhumi, Jagadguru Sri Siddaroodha Swami Mahasamsthana
            </h1>
            <h2 className="font-en-heading text-lg md:text-xl lg:text-2xl font-medium text-saffron-light/80 mb-6 animate-slide-up">
              Sukshetra Khanderayanahalli
            </h2>
            <div className="text-lg md:text-xl text-cream/90 max-w-3xl mx-auto mb-8 leading-relaxed space-y-3 animate-fade-in">
              <p className="font-kn-body">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಜೀವನ, ಉಪದೇಶಗಳು ಮತ್ತು ದಿವ್ಯ ಪರಂಪರೆಯಿಂದ ಪ್ರೇರಿತವಾದ ಪವಿತ್ರ ತಪೋಭೂಮಿ. ಭಕ್ತಿ, ಆತ್ಮಜ್ಞಾನ ಮತ್ತು ಸೇವೆಯ ಮಾರ್ಗದಲ್ಲಿ ಸಾಧಕರಿಗೆ ದಾರಿದೀಪವಾಗಿ, ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿಯಲ್ಲಿ{" "}
                <span className="highlight-text">ಶ್ರೀ ನಾಗರಾಜಾನಂದ ಅಪ್ಪಾಜಿ</span> ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಮತ್ತು{" "}
                <span className="highlight-text">ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ ಅಪ್ಪಾಜಿ</span> ಅವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರ.
              </p>
              <p className="font-en-body text-base md:text-lg text-cream/80">
                A sacred spiritual center inspired by the life, teachings, and divine legacy of Sri Siddharoodha Swamiji. Serving as a guiding light for seekers on the path of devotion, self-knowledge, and service, under the leadership of{" "}
                <span className="highlight-text">Sri Nagarajananda Appaji</span> and the guidance of{" "}
                <span className="highlight-text">Sri Shivananda Bharati Appaji</span>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-bounce-in">
              <Link to="/about">
                <Button variant="hero" size="xl">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-kn-button text-base">ಆಶ್ರಮದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ</span>
                    <span className="text-xs opacity-80 font-en-body">Explore Ashrama</span>
                  </div>
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/donate">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-kn-button text-base">ನಮ್ಮ ಸೇವೆಗೆ ಸಹಕರಿಸಿ</span>
                    <span className="text-xs opacity-80 font-en-body">Support Our Mission</span>
                  </div>
                  <Heart size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-cream/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="font-kannada text-primary text-sm block mb-2">
                ನಮ್ಮ ಪರಂಪರೆ
              </span>
              <h2 className="font-kannada text-3xl md:text-4xl font-bold text-foreground mb-2">
                ಆಧ್ಯಾತ್ಮಿಕ ಜ್ಞಾನಗಳ ಪರಂಪರೆ
              </h2>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary/80 mb-6">
                A Legacy of Spiritual Wisdom
              </h3>
              <p className="font-kannada text-foreground leading-relaxed mb-3">
                ಕರ್ನಾಟಕದ ಪವಿತ್ರ ಭೂಮಿಯಲ್ಲಿ ಸ್ಥಿತವಾಗಿರುವ ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ, ಶ್ರೀ ಸಿದ್ಧರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಆಧ್ಯಾತ್ಮಿಕ ಪರಂಪರೆ, ಜೀವನ ಮೌಲ್ಯಗಳು ಮತ್ತು ಉಪದೇಶಗಳನ್ನು ಜೀವಂತವಾಗಿಟ್ಟುಕೊಂಡಿರುವ ತಪೋಕ್ಷೇತ್ರವಾಗಿದೆ.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Located on the sacred soil of Karnataka, Sri Aaroodha Tapobhumi stands as a living embodiment of the spiritual legacy, life values, and teachings of Sri Siddharoodha Swamiji.
              </p>
              <p className="font-kannada text-foreground leading-relaxed mb-3">
                ಭಕ್ತಿ, ಸೇವೆ ಮತ್ತು ಆತ್ಮಸಾಕ್ಷಾತ್ಕಾರದ ಮೂಲ ತತ್ವಗಳ ಮೇಲೆ ಸ್ಥಾಪಿತವಾದ ಈ ಆಶ್ರಮವು, ಸಾಧಕರು ಮತ್ತು ಭಕ್ತರಿಗೆ ಧ್ಯಾನ, ಪ್ರಾರ್ಥನೆ ಮತ್ತು ನಿರಂತರ ಸೇವೆಯ ಮೂಲಕ ಆತ್ಮೋನ್ನತಿಯ ಮಾರ್ಗವನ್ನು ನೀಡುತ್ತಿದೆ.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Founded on the core principles of devotion, service, and self-realization, the Ashrama continues to guide devotees and seekers through prayer, meditation, and dedicated selfless service on the path of spiritual growth.
              </p>
              <Link to="/about">
                <Button variant="default" size="lg">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-kannada text-base">ನಮ್ಮ ಇತಿಹಾಸವನ್ನು ತಿಳಿಯಿರಿ</span>
                    <span className="text-xs opacity-80">Learn Our History</span>
                  </div>
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img
                src={templeImage}
                alt="Temple interior with ornate pillars"
                className="rounded-2xl shadow-elevated w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-card hidden md:block">
                <div className="text-4xl font-display font-bold">100+</div>
                <div className="text-sm opacity-90">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Timings Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="ಭೇಟಿ ಸಮಯಗಳು"
            titleKn="Visiting Hours"
            subtitle="ಈ ಪವಿತ್ರ ಸಮಯಗಳಲ್ಲಿ ಆಶ್ರಮದ ದಿವ್ಯ ವಾತಾವರಣವನ್ನು ಅನುಭವಿಸಿ | Experience the divine atmosphere of the Ashrama during these sacred hours"
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                time: "5:00 AM - 6:30 AM",
                title: "ಬೆಳಗಿನ ಪೂಜೆ",
                titleEn: "Morning Prayers",
                desc: "ಸುಪ್ರಭಾತಂ ಮತ್ತು ಬೆಳಗಿನ ಆರತಿ",
                descEn: "Suprabhatam & Morning Aarti",
              },
              {
                time: "12:00 PM",
                title: "ಮಧ್ಯಾಹ್ನದ ಆರತಿ",
                titleEn: "Afternoon Aarti",
                desc: "ಮಧ್ಯಾಹ್ನದ ಪೂಜೆ ಮತ್ತು ಆಶೀರ್ವಾದ",
                descEn: "Noon prayers and blessings",
              },
              {
                time: "6:00 PM - 8:30 PM",
                title: "ಸಂಜೆ ಪೂಜೆ",
                titleEn: "Evening Prayers",
                desc: "ಸಂಧ್ಯಾ ಆರತಿ ಮತ್ತು ಭಜನೆಗಳು",
                descEn: "Sandhya Aarti & Bhajans",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl p-6 text-center shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-primary" size={24} />
                </div>
                <div className="text-primary font-semibold mb-2">{item.time}</div>
                <h3 className="font-kannada text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="font-display text-sm text-primary/70 mb-2">
                  {item.titleEn}
                </p>
                <p className="font-kannada text-sm text-muted-foreground">
                  {item.desc}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seva Activities Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="ನಮ್ಮ ಸೇವಾ ಕಾರ್ಯಗಳು"
            titleKn="Our Seva"
            subtitle="ವಿವಿಧ ಆಧ್ಯಾತ್ಮಿಕ ಮತ್ತು ಸಾಮಾಜಿಕ ಚಟುವಟಿಕೆಗಳ ಮೂಲಕ ಮಾನವತೆಗೆ ನಿಸ್ವಾರ್ಥ ಸೇವೆ | Selfless service to humanity through spiritual and social initiatives"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SevaCard
              icon={<Utensils size={28} />}
              title="ಅನ್ನದಾನ"
              titleKn="Annadanam"
              description="ಪ್ರತಿದಿನ ಸಾವಿರಾರು ಭಕ್ತರು ಮತ್ತು ಯಾತ್ರಿಕರಿಗೆ ಉಚಿತ ಅನ್ನಸೇವೆ, ಆಹಾರವೇ ಮಹಾದಾನ ಎಂಬ ಪರಂಪರೆಯನ್ನು ಮುಂದುವರಿಸುತ್ತಿದೆ. | Daily free meals served to thousands of devotees and pilgrims, continuing the sacred tradition."
            />
            <SevaCard
              icon={<Sparkles size={28} />}
              title="ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು"
              titleKn="Spiritual Programs"
              description="ಭಜನೆಗಳು, ಪ್ರವಚನಗಳು ಮತ್ತು ಧ್ಯಾನ ಶಿಬಿರಗಳ ಮೂಲಕ ಆತ್ಮಶಕ್ತಿ ವೃದ್ಧಿ. | Regular bhajans, discourses, and meditation sessions for spiritual growth."
            />
            <SevaCard
              icon={<Heart size={28} />}
              title="ಸಾಮಾಜಿಕ ಸೇವೆ"
              titleKn="Social Service"
              description="ಆರೋಗ್ಯ ಶಿಬಿರಗಳು, ವಿಪತ್ತು ಪರಿಹಾರ ಮತ್ತು ಹಿಂದುಳಿದ ಸಮುದಾಯಗಳಿಗೆ ಸಹಾಯ. | Healthcare camps, disaster relief, and support for underprivileged communities."
            />
            <SevaCard
              icon={<GraduationCap size={28} />}
              title="ಶಿಕ್ಷಣ ಬೆಂಬಲ (ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ)"
              titleKn="Education Support (Coming Soon)"
              description="ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾಭ್ಯಾಸ ಸಹಾಯ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ. | Scholarships and educational assistance for deserving students."
            />
          </div>
          <div className="text-center mt-10">
            <Link to="/seva">
              <Button variant="outline" size="lg">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-kannada text-base">ಎಲ್ಲಾ ಸೇವೆಗಳನ್ನು ನೋಡಿ</span>
                  <span className="text-xs opacity-80">Explore All Activities</span>
                </div>
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${annadanamBgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-brown/90 to-earth-brown/60" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="max-w-lg text-cream">
            <h3 className="font-kannada text-2xl md:text-3xl font-bold mb-2">
              ಅನ್ನದಾನ – ಮಹಾದಾನ
            </h3>
            <h4 className="font-display text-xl md:text-2xl font-semibold text-cream/90 mb-4">
              Annadanam: The Sacred Gift
            </h4>
            <p className="font-kannada text-cream/90 leading-relaxed mb-2">
              "ಅನ್ನದಾನ ಮಹಾದಾನ" — ಹಸಿದವರಿಗೆ ಆಹಾರ ನೀಡುವುದು ಅತ್ಯುನ್ನತ ಸೇವೆ. ಈ ಪವಿತ್ರ ಸೇವೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿ ಮಾನವತೆಗೆ ಸೇವೆ ಸಲ್ಲಿಸಿ.
            </p>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              "Annadanam Maha Daanam" — The gift of food is the greatest gift. Join us in feeding the hungry and serving humanity through this noble service.
            </p>
            <Link to="/seva">
              <Button variant="hero" size="lg">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-kannada text-base">ಅನ್ನದಾನದ ಕುರಿತು ತಿಳಿಯಿರಿ</span>
                  <span className="text-xs opacity-80">Learn About Annadanam</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು"
            titleKn="Upcoming Events"
            subtitle="ಆಧ್ಯಾತ್ಮಿಕ ಸಂಭ್ರಮಗಳು ಮತ್ತು ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ | Join us in celebrating sacred occasions and spiritual gatherings"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsLoading ? (
              <p className="col-span-full text-center font-en-body text-muted-foreground">Loading events...</p>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title_english}
                  titleKn={event.title_kannada || ""}
                  date={event.event_date}
                  time={event.event_time || ""}
                  location={event.location_kannada && event.location_english ? `${event.location_kannada} | ${event.location_english}` : (event.location_kannada || event.location_english || "Main Temple")}
                  description={event.description_kannada && event.description_english ? `${event.description_kannada} | ${event.description_english}` : (event.description_kannada || event.description_english || "")}
                  featured={false}
                />
              ))
            ) : (
              // Fallback to static events if no dynamic events
              <>
                <EventCard
                  title="Maha Shivaratri Celebration"
                  titleKn="ಮಹಾ ಶಿವರಾತ್ರಿ ಆಚರಣೆ"
                  date="ಫೆಬ್ರವರಿ 26, 2025"
                  time="All Day & Night"
                  location="ಮುಖ್ಯ ದೇವಾಲಯ ಮಂದಿರ | Main Temple Hall"
                  description="ನಿರಂತರ ಭಜನೆ, ಅಭಿಷೇಕ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರವಚನಗಳೊಂದಿಗೆ ಮಹಾ ಶಿವರಾತ್ರಿ ಆಚರಣೆ. | Special all-night vigil with continuous bhajans, abhishekam, and spiritual discourses."
                  featured
                />
                <EventCard
                  title="Swamiji Jayanti"
                  titleKn="ಸ್ವಾಮೀಜಿ ಜಯಂತಿ"
                  date="ಮಾರ್ಚ್ 15, 2025"
                  time="6:00 AM onwards"
                  location="ಆಶ್ರಮ ಆವರಣ | Ashrama Premises"
                  description="ಶ್ರೀ ಸಿದ್ಧರೂಢ ಸ್ವಾಮೀಜಿಯವರ ಜಯಂತಿಯನ್ನು ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಪ್ರಸಾದ ವಿತರಣೆಯೊಂದಿಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ. | Annual celebration with special puja and prasadam distribution."
                />
                <EventCard
                  title="Weekly Satsang"
                  titleKn="ವಾರದ ಸತ್ಸಂಗ"
                  date="ಪ್ರತೀ ಶನಿವಾರ"
                  time="6:00 PM - 8:00 PM"
                  location="ಧ್ಯಾನ ಮಂದಿರ | Meditation Hall"
                  description="ಭಜನೆ, ಪ್ರವಚನ, ಸಮೂಹ ಧ್ಯಾನ, ಮತ್ತು ಪ್ರಸಾದ. | Regular spiritual gathering with bhajans, pravachan, meditation, and prasadam."
                />
              </>
            )}
          </div>
          <div className="text-center mt-10">
            <Link to="/events">
              <Button variant="default" size="lg">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-kannada text-base">ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ</span>
                  <span className="text-xs opacity-80">View All Events</span>
                </div>
                <Calendar size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom max-w-4xl">
          <QuoteCard
            quote="Service to humanity is service to God. In selfless seva, we find our true purpose and divine connection."
            quoteKn="ಮಾನವ ಸೇವೆಯೇ ಮಾದವ ಸೇವೆ. ನಿಸ್ವಾರ್ಥ ಸೇವೆಯಲ್ಲಿ ನಾವು ನಮ್ಮ ನಿಜವಾದ ಉದ್ದೇಶವನ್ನು ಮತ್ತು ದೈವಿಕ ಸಂಪರ್ಕವನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತೇವೆ."
            author="Sri Siddharoodha Swamiji"
            authorKn="ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ"
          />
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Photo Gallery"
            titleKn="ಫೋಟೋ ಗ್ಯಾಲರಿ"
            subtitle="Glimpses of life, celebrations, and divine moments at the Ashrama"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[heroImage, templeImage, annadanamImage, meditationImage].map(
              (img, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-xl group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )
            )}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                View Full Gallery
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-saffron-dark text-primary-foreground">
        <div className="container-custom text-center">
          <span className="font-kn-body text-saffron-light text-sm block mb-2">
            ದಾನ ಮಾಡಿ
          </span>
          <h2 className="font-kn-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            ನಮ್ಮ ಪವಿತ್ರ ಸೇವೆಗೆ ಬೆಂಬಲ ನೀಡಿ
          </h2>
          <h3 className="font-en-heading text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 opacity-90">
            Support Our Sacred Mission
          </h3>
          <p className="font-kn-body text-lg text-primary-foreground/95 max-w-2xl mx-auto mb-3 leading-relaxed">
            ನಿಮ್ಮ ಉದಾರ ದೇಣಿಗೆಗಳು ಅನ್ನದಾನ, ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ಸೇವೆಗಳ ಮೂಲಕ ನಮ್ಮ ಸೇವಾ ಕಾರ್ಯವನ್ನು ಮುಂದುವರಿಸಲು ಸಹಕಾರಿಯಾಗುತ್ತವೆ. ಪ್ರತಿ ದೇಣಿಗೆಯೂ ಮಹತ್ವದ್ದಾಗಿದೆ.
          </p>
          <p className="font-en-body text-base text-primary-foreground/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your generous contributions help us continue the noble work of annadanam, spiritual programs, and social service. Every donation, big or small, makes a meaningful difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/donate">
              <Button variant="hero" size="xl">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-kn-button text-base">ದೇಣಿಗೆ ನೀಡಿ</span>
                  <span className="font-en-body text-xs opacity-80">Donate Now</span>
                </div>
                <Heart size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-kn-button text-base">ಸೇವೆಗೆ ಸಂಪರ್ಕಿಸಿ</span>
                  <span className="font-en-body text-xs opacity-80">Contact for Seva</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Swamiji Preview Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={swamijiImage}
                alt="Sri Siddaroodha Swamiji"
                className="rounded-2xl shadow-elevated w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <span className="font-kn-body text-primary text-sm block mb-2">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ
              </span>
              <span className="font-en-body text-primary/70 text-xs block mb-4">
                Sri Siddharoodha Swamiji
              </span>
              <h2 className="font-kn-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿಯ ದಿವ್ಯ ಪ್ರಕಾಶ
              </h2>
              <h3 className="font-en-heading text-2xl md:text-3xl font-semibold text-primary mb-6">
                The Divine Light of Sri Siddharoodha Swamiji
              </h3>
              <p className="font-kn-body text-muted-foreground leading-relaxed mb-4">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮೀಜಿ (1836–1929) ಅವರು ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಸಂತರಲ್ಲಿ ಒಬ್ಬರಾಗಿದ್ದು, ಅಪಾರ ತ್ಯಾಗ, ತಪಸ್ಸು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಸಾಧನೆಯ ಮೂಲಕ ಅನೇಕ ಭಕ್ತರ ಜೀವನಕ್ಕೆ ಬೆಳಕು ನೀಡಿದ ಮಹಾನ್ ಗುರು.
              </p>
              <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed mb-4">
                Sri Siddharoodha Swamiji (1836–1929) was one of Karnataka's most revered saints, whose life of renunciation, intense spiritual practice, and divine wisdom illuminated the lives of countless devotees.
              </p>
              <p className="font-kn-body text-muted-foreground leading-relaxed mb-4">
                ಅವರು ಜಾತಿ, ವರ್ಣ, ಧರ್ಮದ ಭೇದವಿಲ್ಲದೆ ಎಲ್ಲರಿಗೂ ಸಮಾನ ಪ್ರೀತಿ ಮತ್ತು ಆಶೀರ್ವಾದವನ್ನು ನೀಡಿದವರು. ಭಕ್ತಿ, ನಿಸ್ವಾರ್ಥ ಸೇವೆ ಮತ್ತು ಆತ್ಮಜ್ಞಾನವೇ ಅವರ ಉಪದೇಶಗಳ ಕೇಂದ್ರವಾಗಿದ್ದು, ಇಂದು ಸಹ ಅವರ ದಿವ್ಯ ಸಂದೇಶಗಳು ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿಯ ಮಾರ್ಗದರ್ಶಕ ತತ್ವಗಳಾಗಿವೆ.
              </p>
              <p className="font-en-body text-sm text-muted-foreground/80 leading-relaxed mb-8">
                He transcended all distinctions of caste, creed, and religion, spreading a message of universal love, selfless service, and spiritual awakening. His teachings continue to guide the philosophy and spiritual practices of Sri Aaroodha Tapobhumi to this day.
              </p>
              <Link to="/swamiji">
                <Button variant="default" size="lg">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-kn-button text-base">ಸ್ವಾಮೀಜಿಯ ಕುರಿತು ತಿಳಿಯಿರಿ</span>
                    <span className="font-en-body text-xs opacity-80">Learn About Swamiji</span>
                  </div>
                  <BookOpen size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                title="Visit Us"
                titleKn="ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ"
                subtitle="ನಮ್ಮ ಆಶ್ರಮದ ಶಾಂತಿ ಮತ್ತು ಆಶೀರ್ವಾದಗಳನ್ನು ಅನುಭವಿಸಲು ಎಲ್ಲರನ್ನು ಸ್ವಾಗತಿಸುತ್ತೇವೆ | We welcome all seekers to experience the peace and blessings of the Ashrama"
                centered={false}
              />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-kn-subheading text-lg font-semibold text-foreground mb-1">
                      ಎಲ್ಲರಿಗೂ ತೆರೆಯಲಾಗಿದೆ
                    </h4>
                    <h5 className="font-en-heading text-sm font-medium text-foreground/70 mb-2">
                      Open to All
                    </h5>
                    <p className="font-kn-body text-sm text-muted-foreground mb-1">
                      ಯಾವುದೇ ಪೂರ್ವ ನಿಯೋಜನೆ ಇಲ್ಲದೆ ಎಲ್ಲಾ ಭಕ್ತರು ದರ್ಶನ ಪಡೆಯಬಹುದು.
                    </p>
                    <p className="font-en-body text-xs text-muted-foreground/80">
                      Devotees of all faiths are welcome. No prior appointment required for darshan.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-kn-subheading text-lg font-semibold text-foreground mb-1">
                      ದೈನಂದಿನ ದರ್ಶನ
                    </h4>
                    <h5 className="font-en-heading text-sm font-medium text-foreground/70 mb-2">
                      Daily Darshan
                    </h5>
                    <p className="font-kn-body text-sm text-muted-foreground mb-1">
                      ಬೆಳಿಗ್ಗೆ: 5:00 AM – 12:00 PM
                      <br />
                      ಸಂಜೆ: 4:00 PM – 8:30 PM
                    </p>
                    <p className="font-en-body text-xs text-muted-foreground/80">
                      Morning: 5:00 AM – 12:00 PM
                      <br />
                      Evening: 4:00 PM – 8:30 PM
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="https://maps.app.goo.gl/WvmWXH7vfRGLZsJh7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" size="lg">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="font-kn-button text-base">ದಾರಿದರ್ಶನ ಪಡೆಯಿರಿ</span>
                      <span className="font-en-body text-xs opacity-80">Get Directions</span>
                    </div>
                    <ArrowRight size={18} />
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-background rounded-2xl overflow-hidden shadow-lg h-80 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30891.095863781993!2d75.77030990491038!3d14.577011487701487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2a65a0ec0a8b%3A0x16986948de763052!2sShri%20Siddharudha%20Math!5e0!3m2!1sen!2sin!4v1767770821173!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shri Siddharudha Math Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="section-padding bg-gradient-to-br from-saffron/10 via-cream to-saffron/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Kannada Quote - Primary */}
            <div className="mb-8">
              <p className="font-kn-heading text-3xl md:text-4xl lg:text-5xl font-bold text-earth-brown leading-relaxed mb-6">
                "ಒಂದಾಗಿ ಬಾಳಿರಿ, ವಿಶ್ವಶಾಂತಿ ಪಡೆಯಿರಿ."
              </p>

              {/* English Quote - Secondary */}
              <p className="font-en-body text-lg md:text-xl text-earth-brown/70 uppercase tracking-wide mb-8">
                "Live in unity, and attain universal peace."
              </p>
            </div>

            {/* Attribution */}
            <div className="pt-6 border-t-2 border-saffron/20">
              <p className="font-kn-body text-xl md:text-2xl text-saffron font-semibold mb-2">
                — ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತಿ ಸ್ವಾಮೀಜಿ
              </p>
              <p className="font-en-body text-sm md:text-base text-saffron/80">
                — Shri Shivanand Bharati Swamiji
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
