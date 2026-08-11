import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import heroImage from '@/assets/hero-ashrama.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const CONTACT_INFO = {
    address: {
      kannada: [
        'ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ',
        'ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ',
        'ರಾಣೆಬೆನ್ನೂರು ತಾಲ್ಲೂಕು, ಹಾವೇರಿ ಜಿಲ್ಲೆ',
        'ಪಿನ್ ಕೋಡ್: 581145',
        'ಕರ್ನಾಟಕ, ಭಾರತ'
      ],
      english: [
        'Sri Aaroodha Tapobhumi',
        'Sukshetra Khanderayanahalli',
        'Ranebennur Taluk, Haveri District',
        'Karnataka – 581145, India'
      ]
    },
    phones: [
      { label: 'Office', number: '+91 98808 83852' },
      { label: 'Mobile', number: '+91 96639 46581' }
    ],
    emails: [
      'info@sriaaroodhatapobhomi.com',
      'sriaaroodhatapobhomi@gmail.com'
    ],
    hours: {
      kannada: [
        'ಬೆಳಗ್ಗೆ: 9:00 AM – 12:00 PM',
        'ಸಂಜೆ: 4:00 PM – 7:00 PM',
        '(ಪ್ರಮುಖ ಹಬ್ಬಗಳನ್ನು ಹೊರತುಪಡಿಸಿ)'
      ],
      english: [
        'Morning: 9:00 AM – 12:00 PM',
        'Evening: 4:00 PM – 7:00 PM',
        '(All days except major festivals)'
      ]
    },
    mapUrl: 'https://maps.app.goo.gl/TiwqERRbm5TUuFGaA'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send data to PHP backend
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      setFormStatus('success');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
            ಸಂಪರ್ಕಿಸಿ
          </h1>
          <p className="font-en-heading text-2xl md:text-3xl font-medium text-saffron-light mb-4">
            Contact Us
          </p>
          <p className="font-en-body text-lg text-cream/80 max-w-2xl mx-auto">
            We welcome your inquiries, feedback, and requests for information
          </p>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-kn-heading text-4xl md:text-5xl font-bold text-earth-brown mb-3">
              ಸಂಪರ್ಕದಲ್ಲಿರಿ
            </h2>
            <p className="font-en-heading text-2xl font-semibold text-saffron mb-2">
              Get in Touch
            </p>
            <p className="font-en-body text-lg text-earth-brown/70">
              Reach out to us through any of these channels
            </p>
          </div>

          {/* Contact Details + Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Details */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-secondary rounded-2xl p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-en-heading text-xl font-semibold text-earth-brown mb-3">
                      Address
                    </h3>
                    <div className="space-y-2">
                      {CONTACT_INFO.address.kannada.map((line, idx) => (
                        <p key={idx} className="font-kn-body text-base text-earth-brown/80">
                          {line}
                        </p>
                      ))}
                      <div className="mt-3 pt-3 border-t border-earth-brown/10">
                        {CONTACT_INFO.address.english.map((line, idx) => (
                          <p key={idx} className="font-en-body text-sm text-earth-brown/60">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-secondary rounded-2xl p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-en-heading text-xl font-semibold text-earth-brown mb-3">
                      Phone / WhatsApp
                    </h3>
                    <div className="space-y-2">
                      {CONTACT_INFO.phones.map((phone, idx) => (
                        <p key={idx} className="font-en-body text-base text-earth-brown/80">
                          <span className="font-semibold">{phone.label}:</span>{' '}
                          <a href={`tel:${phone.number}`} className="hover:text-saffron transition-colors">
                            {phone.number}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-secondary rounded-2xl p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-en-heading text-xl font-semibold text-earth-brown mb-3">
                      Email
                    </h3>
                    <div className="space-y-2">
                      {CONTACT_INFO.emails.map((email, idx) => (
                        <p key={idx} className="font-en-body text-base text-earth-brown/80">
                          <a href={`mailto:${email}`} className="hover:text-saffron transition-colors">
                            {email}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-secondary rounded-2xl p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-en-heading text-xl font-semibold text-earth-brown mb-3">
                      Office Hours
                    </h3>
                    <div className="space-y-2">
                      {CONTACT_INFO.hours.kannada.map((line, idx) => (
                        <p key={idx} className="font-kn-body text-base text-earth-brown/80">
                          {line}
                        </p>
                      ))}
                      <div className="mt-3 pt-3 border-t border-earth-brown/10">
                        {CONTACT_INFO.hours.english.map((line, idx) => (
                          <p key={idx} className="font-en-body text-sm text-earth-brown/60">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-secondary rounded-2xl p-8 shadow-md">
              <h3 className="font-en-heading text-2xl font-semibold text-earth-brown mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron-dark text-white font-en-heading font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-saffron/30"
                >
                  Send Message
                </button>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg font-en-body text-sm">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg font-en-body text-sm">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us - Map Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-kn-heading text-4xl md:text-5xl font-bold text-earth-brown mb-3">
              ನಮ್ಮನ್ನು ಹುಡುಕಿ
            </h2>
            <p className="font-en-heading text-2xl font-semibold text-saffron mb-2">
              Find Us
            </p>
            <p className="font-en-body text-lg text-earth-brown/70">
              Visit us at the Ashrama
            </p>
          </div>

          {/* Map Container */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl p-4 shadow-lg">
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30891.095863781993!2d75.77030990491038!3d14.577011487701487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2a65a0ec0a8b%3A0x16986948de763052!2sShri%20Siddharudha%20Math!5e0!3m2!1sen!2sin!4v1767770821173!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shri Siddharudha Math Location"
                />
              </div>
            </div>

            {/* Open in Google Maps Button */}
            <div className="text-center mt-8">
              <a
                href={CONTACT_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white font-en-heading font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-saffron/30"
              >
                <ExternalLink className="w-5 h-5" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
