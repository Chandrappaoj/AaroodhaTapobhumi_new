import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EventCard } from "@/components/common/EventCard";
import { Calendar } from "lucide-react";
import heroImage from "@/assets/hero-ashrama.jpg";
import { eventsAPI } from "@/services/api";

interface Event {
  id: number;
  title_english: string;
  title_kannada?: string;
  event_date: string;
  event_time?: string;
  location_english?: string;
  location_kannada?: string;
  description_english?: string;
  description_kannada?: string;
  image_url?: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const [upcomingData, pastData] = await Promise.all([
          eventsAPI.getUpcoming(),
          eventsAPI.getPast(),
        ]);
        setUpcomingEvents(upcomingData.data || upcomingData.events || []);
        setPastEvents(pastData.data || pastData.events || []);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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
            ಕಾರ್ಯಕ್ರಮಗಳು
          </span>
          <h1 className="font-kn-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-3">
            ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಉತ್ಸವಗಳು
          </h1>
          <h2 className="font-en-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-cream/90 mb-6">
            Events & Programs
          </h2>
          <p className="font-kn-body text-lg text-cream/90 max-w-2xl mx-auto mb-2">
            ಪವಿತ್ರ ಉತ್ಸವಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಪಾಲ್ಗೊಳ್ಳಿ.
          </p>
          <p className="font-en-body text-base text-cream/75 max-w-2xl mx-auto">
            Join us in celebrating sacred festivals and spiritual programs throughout the year.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <p className="font-en-body text-muted-foreground">Loading events...</p>
          </div>
        </section>
      ) : error ? (
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <p className="font-en-body text-red-600">{error}</p>
          </div>
        </section>
      ) : (
        <>
          {/* Upcoming Events */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <SectionHeader
                title="Upcoming Events"
                titleKn="ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು"
                subtitle="Mark your calendars for these sacred celebrations"
              />
              {upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
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
                  ))}
                </div>
              ) : (
                <p className="font-en-body text-center text-muted-foreground">No upcoming events at this time.</p>
              )}
            </div>
          </section>

          {/* Past Events */}
          <section className="section-padding bg-secondary">
            <div className="container-custom">
              <SectionHeader
                title="Past Events"
                titleKn="ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು"
                subtitle="Celebrating our spiritual journey"
              />
              {pastEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
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
                  ))}
                </div>
              ) : (
                <p className="font-en-body text-center text-muted-foreground">No past events to display.</p>
              )}
            </div>
          </section>

          {/* Note */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="bg-card rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-soft">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-en-heading text-2xl font-bold text-foreground mb-4">
                  Stay Updated
                </h3>
                <p className="font-kn-body text-base text-foreground mb-3">
                  ಕಾರ್ಯಕ್ರಮಗಳ ಸಮಯ ಪಂಚಾಂಗದ ಆಧಾರದ ಮೇಲೆ ಬದಲಾಗಬಹುದು. ದಯವಿಟ್ಟು ಕಾರ್ಯಕ್ರಮದ ದಿನಾಂಕದ ಸಮೀಪದಲ್ಲಿ ಆಶ್ರಮ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.
                </p>
                <p className="font-en-body text-sm text-muted-foreground mb-6">
                  Event timings may vary based on the Panchang. Please check with the Ashrama office for exact timings closer to the event date.
                </p>
                <p className="font-en-body text-sm text-muted-foreground">
                  📞 For inquiries: +91 96639 46581
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default Events;
