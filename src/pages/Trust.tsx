import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Shield, Heart, Users, HandHeart } from 'lucide-react';
import heroImage from '@/assets/hero-ashrama.jpg';

interface Trustee {
  id: number;
  name_english: string;
  name_kannada?: string;
  position_english: string;
  position_kannada?: string;
  bio_english?: string;
  bio_kannada?: string;
  image_url: string;
  display_order?: number;
  is_active?: number;
}

const Trust = () => {
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrustees = async () => {
      try {
        const response = await fetch('http://localhost/ashrama-api/api/trustees.php');
        if (!response.ok) throw new Error('Failed to fetch trustees');
        const data = await response.json();
        setTrustees(data.trustees || data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trustees');
      } finally {
        setLoading(false);
      }
    };

    fetchTrustees();
  }, []);

  const responsibilities = [
    {
      icon: Shield,
      titleKannada: 'ಆಡಳಿತ',
      titleEnglish: 'Governance',
      descriptionKannada: 'ಆಶ್ರಮದ ನಿರ್ವಹಣೆ, ಸಂಪನ್ಮೂಲ ಬಳಕೆ ಮತ್ತು ಆಡಳಿತಾತ್ಮಕ ಕಾರ್ಯಗಳನ್ನು ಸಮರ್ಪಕವಾಗಿ ನಿರ್ವಹಿಸುವುದು.',
      descriptionEnglish: 'Ensuring proper management and administration of the Ashrama\'s activities and resources.',
    },
    {
      icon: Heart,
      titleKannada: 'ಸಮುದಾಯ ಸೇವೆ',
      titleEnglish: 'Community Service',
      descriptionKannada: 'ಅನ್ನದಾನ, ಆರೋಗ್ಯ ಶಿಬಿರಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುವುದು.',
      descriptionEnglish: 'Overseeing Annadanam, healthcare camps, and other social welfare programs.',
    },
    {
      icon: Users,
      titleKannada: 'ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು',
      titleEnglish: 'Spiritual Programs',
      descriptionKannada: 'ಹಬ್ಬಗಳು, ಸತ್ಸಂಗಗಳು ಮತ್ತು ಪರಂಪರಾಗತ ಆಧ್ಯಾತ್ಮಿಕ ಆಚರಣೆಗಳನ್ನು ಆಯೋಜಿಸುವುದು.',
      descriptionEnglish: 'Organizing festivals, satsangs, and maintaining spiritual traditions of the Ashrama.',
    },
    {
      icon: HandHeart,
      titleKannada: 'ಭಕ್ತರ ಕಲ್ಯಾಣ',
      titleEnglish: 'Devotee Welfare',
      descriptionKannada: 'ಆಶ್ರಮಕ್ಕೆ ಭೇಟಿ ನೀಡುವ ಭಕ್ತರ ಆರಾಮ ಮತ್ತು ಆತ್ಮೀಯ ವಾತಾವರಣವನ್ನು ಖಚಿತಪಡಿಸುವುದು.',
      descriptionEnglish: 'Ensuring the comfort and spiritual growth of devotees visiting the Ashrama.',
    },
  ];

  // Helper function to get full image URL
  const getImageUrl = (url: string | undefined) => {
    if (!url) return '/placeholder-avatar.jpg';
    if (url.startsWith('http')) return url;
    // Handle paths that already include /ashrama-api/
    if (url.startsWith('/ashrama-api/')) {
      return `http://localhost${url}`;
    }
    return `http://localhost/ashrama-api${url}`;
  };

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
          <h1 className="font-kn-heading text-5xl md:text-6xl font-bold text-cream mb-4">
            ಟ್ರಸ್ಟ್ ಮಂಡಳಿ
          </h1>
          <p className="font-en-heading text-2xl md:text-3xl font-medium text-saffron-light mb-4">
            Trust & Management
          </p>
          <p className="font-en-body text-lg text-cream/80 max-w-2xl mx-auto">
            Dedicated individuals serving the Ashrama with devotion and integrity
          </p>
        </div>
      </section>

      {/* Our Trustees Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-kn-heading text-4xl md:text-5xl font-bold text-earth-brown mb-3">
              ನಮ್ಮ ಟ್ರಸ್ಟಿಗಳು
            </h2>
            <p className="font-en-heading text-2xl font-semibold text-saffron mb-2">
              Our Trustees
            </p>
            <p className="font-en-body text-lg text-earth-brown/70">
              Serving with dedication and devotion
            </p>
          </div>

          {/* Trustees Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-saffron border-t-transparent"></div>
              <p className="mt-4 font-en-body text-earth-brown/70">Loading trustees...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="font-en-body text-red-600">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {trustees.map((trustee) => (
                <div
                  key={trustee.id}
                  className="bg-secondary rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                >
                  {/* Larger Profile Photo */}
                  <div className="mb-6">
                    <img
                      src={getImageUrl(trustee.image_url)}
                      alt={trustee.name_kannada || trustee.name_english}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-saffron/20 shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-avatar.jpg';
                      }}
                    />
                  </div>

                  {/* Name - Kannada Primary, English Secondary */}
                  <div className="mb-2">
                    <h3 className="font-kn-body text-2xl font-bold text-earth-brown mb-1">
                      {trustee.name_kannada || trustee.name_english}
                    </h3>
                    {trustee.name_english && (
                      <p className="font-en-body text-sm text-earth-brown/60">
                        {trustee.name_english}
                      </p>
                    )}
                  </div>

                  {/* Position */}
                  <p className="font-en-heading text-lg font-semibold text-saffron mb-4">
                    {trustee.position_english || trustee.position_kannada}
                  </p>

                  {/* Bio - Kannada */}
                  {trustee.bio_kannada && (
                    <p className="font-kn-body text-base text-earth-brown/80 leading-relaxed mb-3">
                      {trustee.bio_kannada}
                    </p>
                  )}

                  {/* Bio - English */}
                  {trustee.bio_english && (
                    <p className="font-en-body text-sm text-earth-brown/60 leading-relaxed">
                      {trustee.bio_english}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Responsibilities Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-kn-heading text-4xl md:text-5xl font-bold text-earth-brown mb-3">
              ಟ್ರಸ್ಟ್ ಜವಾಬ್ದಾರಿಗಳು
            </h2>
            <p className="font-en-heading text-2xl font-semibold text-saffron mb-2">
              Trust Responsibilities
            </p>
            <p className="font-en-body text-lg text-earth-brown/70">
              Guiding the Ashrama's mission and activities
            </p>
          </div>

          {/* Responsibilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {responsibilities.map((resp, index) => {
              const Icon = resp.icon;
              return (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron to-saffron-dark rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title - Kannada */}
                  <h3 className="font-kn-body text-2xl font-bold text-earth-brown mb-2">
                    {resp.titleKannada}
                  </h3>

                  {/* Title - English */}
                  <p className="font-en-heading text-xl font-semibold text-saffron mb-4">
                    {resp.titleEnglish}
                  </p>

                  {/* Description - Kannada */}
                  <p className="font-kn-body text-base text-earth-brown/80 leading-relaxed mb-3">
                    {resp.descriptionKannada}
                  </p>

                  {/* Description - English */}
                  <p className="font-en-body text-sm text-earth-brown/60 leading-relaxed">
                    {resp.descriptionEnglish}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About the Trust Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-en-heading text-4xl font-bold text-earth-brown mb-8 text-center">
              About the Trust
            </h2>

            <div className="bg-secondary rounded-2xl p-10 shadow-lg">
              <p className="font-en-body text-lg text-earth-brown/80 leading-relaxed mb-6">
                The Sri Siddaroodha Swamiji Ashrama Trust was established to preserve and promote the spiritual legacy of Sri Siddaroodha Swamiji. The Trust comprises dedicated individuals who have taken upon themselves the sacred responsibility of managing the Ashrama's affairs with transparency, integrity, and devotion.
              </p>

              <p className="font-en-body text-lg text-earth-brown/80 leading-relaxed mb-6">
                All activities are aligned with the spiritual teachings of Sri Siddaroodha Swamiji, while serving society through various seva and welfare initiatives. Financial matters are handled with complete transparency, and regular audits are conducted to maintain the highest standards of accountability.
              </p>

              <p className="font-en-body text-lg text-earth-brown/80 leading-relaxed">
                The Trust is committed to upholding the values of service, compassion, and spiritual growth, ensuring that the Ashrama continues to be a beacon of light for devotees and seekers from all walks of life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trust;

