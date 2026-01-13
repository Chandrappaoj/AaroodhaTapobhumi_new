import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { UtensilsCrossed, GraduationCap, Heart, Building2, Copy, Check } from 'lucide-react';
import heroImage from '@/assets/hero-ashrama.jpg';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: ''
  });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const CONTRIBUTION_CAUSES = [
    {
      id: 'annadanam',
      icon: UtensilsCrossed,
      titleKannada: 'ಅನ್ನದಾನ',
      titleEnglish: 'Annadanam',
      descKannada: 'ಭಕ್ತರು ಮತ್ತು ಯಾತ್ರಿಕರಿಗೆ ಪ್ರತಿದಿನ ಉಚಿತ ಅನ್ನವನ್ನು ಅರ್ಪಿಸುವ ಪವಿತ್ರ ಸೇವೆ.',
      descEnglish: 'Support daily free meal service for devotees and pilgrims.',
      amounts: [501, 1001, 5001]
    },
    {
      id: 'education',
      icon: GraduationCap,
      titleKannada: 'ಶೈಕ್ಷಣಿಕ ಸಹಾಯ',
      titleEnglish: 'Education Support',
      descKannada: 'ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾಭ್ಯಾಸಕ್ಕೆ ನೆರವು.',
      descEnglish: 'Scholarships and educational support for deserving students.',
      amounts: [2001, 5001, 10001]
    },
    {
      id: 'healthcare',
      icon: Heart,
      titleKannada: 'ಆರೋಗ್ಯ ಸೇವೆ',
      titleEnglish: 'Healthcare',
      descKannada: 'ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗಾಗಿ ನೆರವು.',
      descEnglish: 'Medical camps and healthcare services for underserved communities.',
      amounts: [1001, 3001, 7001]
    },
    {
      id: 'infrastructure',
      icon: Building2,
      titleKannada: 'ಆಶ್ರಮ ಮೂಲಸೌಕರ್ಯ',
      titleEnglish: 'Infrastructure',
      descKannada: 'ಆಶ್ರಮದ ನಿರ್ವಹಣೆ ಮತ್ತು ಅಭಿವೃದ್ಧಿಗೆ ಸಹಕಾರ.',
      descEnglish: 'Ashrama maintenance and infrastructure development.',
      amounts: [5001, 11001, 21001]
    }
  ];

  const BANK_DETAILS = {
    accountName: 'Sri Siddaroodha Swamiji Ashrama Trust',
    accountNumber: 'XXXXXXXXXXXX',
    ifsc: 'XXXXXXXX',
    bank: '[Bank Name], Hubli',
    upiId: 'ashrama@okicici'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Donation submitted:', formData);
      setFormStatus('success');

      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', amount: '' });
        setSelectedAmount(null);
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
            ದಾನ ಮಾಡಿ
          </h1>
          <p className="font-en-heading text-2xl md:text-3xl font-medium text-saffron-light mb-6">
            Support Our Mission
          </p>
          <p className="font-kn-body text-lg text-cream/90 max-w-3xl mx-auto mb-3">
            ನಿಮ್ಮ ಉದಾರ ದಾನದಿಂದ ಆಶ್ರಮದ ಸೇವೆ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಗಳು ಮುಂದುವರಿಯುತ್ತವೆ.
          </p>
          <p className="font-en-body text-base text-cream/70 max-w-2xl mx-auto">
            Your generous contributions help us continue our sacred work of service and spiritual upliftment.
          </p>
        </div>
      </section>

      {/* Ways to Contribute Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-kn-heading text-4xl md:text-5xl font-bold text-earth-brown mb-3">
              ಕೊಡುಗೆ ನೀಡುವ ವಿಧಾನಗಳು
            </h2>
            <p className="font-en-heading text-2xl font-semibold text-saffron mb-2">
              Ways to Contribute
            </p>
            <p className="font-en-body text-lg text-earth-brown/70">
              Choose a cause close to your heart
            </p>
          </div>

          {/* Contribution Cards - Center Aligned Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {CONTRIBUTION_CAUSES.map((cause) => {
              const Icon = cause.icon;
              return (
                <div
                  key={cause.id}
                  className="bg-secondary rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-saffron" />
                  </div>

                  {/* Titles */}
                  <h3 className="font-kn-heading text-xl font-bold text-earth-brown mb-1">
                    {cause.titleKannada}
                  </h3>
                  <p className="font-en-heading text-base font-semibold text-saffron mb-4">
                    {cause.titleEnglish}
                  </p>

                  {/* Descriptions */}
                  <p className="font-kn-body text-sm text-earth-brown/80 mb-2 leading-relaxed">
                    {cause.descKannada}
                  </p>
                  <p className="font-en-body text-xs text-earth-brown/60 mb-6 leading-relaxed">
                    {cause.descEnglish}
                  </p>

                  {/* Suggested Amounts */}
                  <div className="mt-auto w-full">
                    <p className="font-en-body text-xs text-earth-brown/60 mb-2">Suggested Amounts</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {cause.amounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`px-3 py-1.5 rounded-full text-sm font-en-body transition-all ${selectedAmount === amount
                              ? 'bg-saffron text-white'
                              : 'bg-earth-brown/10 text-earth-brown hover:bg-saffron/20'
                            }`}
                        >
                          ₹{amount.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Make a Donation Form Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="font-en-heading text-3xl md:text-4xl font-bold text-earth-brown mb-2">
                Make a Donation
              </h2>
              <p className="font-en-body text-base text-earth-brown/70">
                Every contribution makes a difference
              </p>
            </div>

            {/* Donation Form */}
            <div className="bg-background rounded-2xl p-8 shadow-lg">
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

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block font-en-body text-sm font-medium text-earth-brown mb-2">
                    Donation Amount (₹) *
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="100"
                    className="w-full px-4 py-3 rounded-lg border border-earth-brown/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-colors font-en-body"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron-dark text-white font-en-heading font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-saffron/30"
                >
                  Donate Now
                </button>

                {/* Payment Note */}
                <p className="text-center font-en-body text-sm text-earth-brown/60">
                  Secure payment powered by Razorpay.<br />
                  You will receive a confirmation email.
                </p>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg font-en-body text-sm text-center">
                    Thank you for your generous donation!
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg font-en-body text-sm text-center">
                    Sorry, there was an error processing your donation. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How to Donate Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-kn-heading text-4xl md:text-5xl font-bold text-earth-brown mb-3">
              ದಾನ ಮಾಡುವ ವಿಧಾನ
            </h2>
            <p className="font-en-heading text-2xl font-semibold text-saffron mb-2">
              How to Donate
            </p>
            <p className="font-en-body text-lg text-earth-brown/70">
              Multiple convenient payment options available
            </p>
          </div>

          {/* Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* UPI Payment */}
            <div className="bg-secondary rounded-2xl p-8 shadow-md">
              <h3 className="font-kn-heading text-2xl font-bold text-earth-brown mb-2 text-center">
                ಯುಪಿಐ ಪಾವತಿ
              </h3>
              <p className="font-en-heading text-lg font-semibold text-saffron mb-6 text-center">
                UPI Payment
              </p>

              {/* QR Code Placeholder */}
              <div className="bg-earth-brown/5 rounded-xl p-8 mb-6 flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-earth-brown/20">
                  <p className="font-en-body text-sm text-earth-brown/60 text-center">
                    QR Code<br />Placeholder
                  </p>
                </div>
              </div>

              {/* UPI ID */}
              <div className="mb-6">
                <p className="font-en-body text-sm text-earth-brown/60 mb-2 text-center">UPI ID</p>
                <div className="flex items-center gap-2 bg-earth-brown/5 rounded-lg p-3">
                  <p className="font-en-body text-base text-earth-brown flex-1 text-center font-semibold">
                    {BANK_DETAILS.upiId}
                  </p>
                  <button
                    onClick={() => copyToClipboard(BANK_DETAILS.upiId, 'upi')}
                    className="p-2 hover:bg-earth-brown/10 rounded-lg transition-colors"
                  >
                    {copiedField === 'upi' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-earth-brown/60" />
                    )}
                  </button>
                </div>
              </div>

              {/* Open UPI Button */}
              <button className="w-full bg-saffron hover:bg-saffron-dark text-white font-en-heading font-semibold py-3 px-6 rounded-full transition-all duration-300">
                Open UPI App
              </button>
            </div>

            {/* Bank Transfer */}
            <div className="bg-secondary rounded-2xl p-8 shadow-md">
              <h3 className="font-kn-heading text-2xl font-bold text-earth-brown mb-2 text-center">
                ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ
              </h3>
              <p className="font-en-heading text-lg font-semibold text-saffron mb-6 text-center">
                Bank Transfer
              </p>

              {/* Bank Details */}
              <div className="space-y-4">
                <div>
                  <p className="font-en-body text-xs text-earth-brown/60 mb-1">Account Name</p>
                  <p className="font-en-body text-sm text-earth-brown font-semibold">
                    {BANK_DETAILS.accountName}
                  </p>
                </div>

                <div>
                  <p className="font-en-body text-xs text-earth-brown/60 mb-1">Account Number</p>
                  <div className="flex items-center gap-2 bg-earth-brown/5 rounded-lg p-3">
                    <p className="font-en-body text-sm text-earth-brown flex-1 font-semibold">
                      {BANK_DETAILS.accountNumber}
                    </p>
                    <button
                      onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'account')}
                      className="p-2 hover:bg-earth-brown/10 rounded-lg transition-colors"
                    >
                      {copiedField === 'account' ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-earth-brown/60" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-en-body text-xs text-earth-brown/60 mb-1">IFSC Code</p>
                  <div className="flex items-center gap-2 bg-earth-brown/5 rounded-lg p-3">
                    <p className="font-en-body text-sm text-earth-brown flex-1 font-semibold">
                      {BANK_DETAILS.ifsc}
                    </p>
                    <button
                      onClick={() => copyToClipboard(BANK_DETAILS.ifsc, 'ifsc')}
                      className="p-2 hover:bg-earth-brown/10 rounded-lg transition-colors"
                    >
                      {copiedField === 'ifsc' ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-earth-brown/60" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-en-body text-xs text-earth-brown/60 mb-1">Bank Name & Branch</p>
                  <p className="font-en-body text-sm text-earth-brown font-semibold">
                    {BANK_DETAILS.bank}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Accountability Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-en-heading text-3xl md:text-4xl font-bold text-earth-brown mb-6">
              Transparency & Accountability
            </h2>
            <div className="bg-background rounded-2xl p-8 shadow-md">
              <p className="font-en-body text-base text-earth-brown/80 leading-relaxed">
                All donations are used exclusively for the Ashrama's charitable and spiritual activities.
                We maintain complete transparency in our financial operations, and regular audits are conducted
                to ensure accountability. Donation receipts are provided for tax exemption purposes under
                Section 80G of the Income Tax Act (where applicable).
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
