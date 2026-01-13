<?php
/**
 * Template Name: About Page
 */

get_header(); ?>

<!-- Hero Section -->
<section class="relative py-20 md:py-32 overflow-hidden">
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/hero-ashrama.jpg');"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-[#5D4037]/85 to-[#5D4037]/95"></div>
    <div class="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <span class="text-[#FFCC99] text-lg block mb-3" style="font-family: 'Noto Sans Kannada', sans-serif;">
            ನಮ್ಮ ಬಗ್ಗೆ
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFDD0] mb-6" style="font-family: 'Playfair Display', serif;">
            About the Ashrama
        </h1>
        <p class="text-lg text-[#FFFDD0]/80 max-w-2xl mx-auto">
            A sacred sanctuary dedicated to spiritual growth, selfless service,
            and the preservation of ancient Vedic traditions.
        </p>
    </div>
</section>

<!-- History Section -->
<section class="py-16 md:py-24 bg-[#FFFAFA]">
    <div class="container mx-auto px-4 md:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-3xl md:text-4xl font-bold text-[#333333] mb-3" style="font-family: 'Playfair Display', serif;">Our History</h2>
                <div class="font-kannada text-[#FF9933] text-lg mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ನಮ್ಮ ಇತಿಹಾಸ</div>
                <div class="h-1 w-20 bg-[#FF9933] mb-6"></div>
                <div class="space-y-4 text-gray-500 leading-relaxed">
                    <p>
                        Sri Siddaroodha Swamiji Ashrama was established in the sacred
                        city of Hubli, Karnataka, by the devoted followers of the
                        great saint Sri Siddaroodha Swamiji. The Ashrama stands as a
                        living monument to his teachings and continues his mission of
                        spiritual upliftment and selfless service.
                    </p>
                    <p>
                        For over a century, the Ashrama has been a beacon of hope and
                        spiritual guidance for millions of devotees from across India
                        and around the world. The sacred premises continue to radiate
                        the divine energy and blessings of Sri Siddaroodha Swamiji.
                    </p>
                    <p>
                        What began as a humble place of worship has grown into a
                        comprehensive spiritual center offering daily prayers,
                        Annadanam (free food service), educational support, and
                        various social welfare activities.
                    </p>
                </div>
            </div>
            <div class="relative">
                <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/temple-interior.jpg"
                    alt="Temple interior"
                    class="rounded-2xl shadow-xl w-full"
                />
            </div>
        </div>
    </div>
</section>

<!-- Values Section -->
<section class="py-16 md:py-24 bg-[#FFFDD0]/30">
    <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#333333] mb-3" style="font-family: 'Playfair Display', serif;">Our Values</h2>
            <div class="font-kannada text-[#FF9933] text-lg mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ನಮ್ಮ ಮೌಲ್ಯಗಳು</div>
            <div class="h-1 w-20 bg-[#FF9933] mx-auto rounded-full mb-6"></div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Compassion -->
            <div class="text-center p-6 rounded-xl bg-white shadow-lg transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4 text-[#FF9933]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <h4 class="text-lg font-semibold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">Compassion</h4>
                <p class="text-sm text-[#FF9933] mb-2" style="font-family: 'Noto Sans Kannada', sans-serif;">ಕರುಣೆ</p>
                <p class="text-sm text-gray-500">Serving all beings with love and empathy</p>
            </div>

             <!-- Wisdom -->
             <div class="text-center p-6 rounded-xl bg-white shadow-lg transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4 text-[#FF9933]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <h4 class="text-lg font-semibold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">Wisdom</h4>
                <p class="text-sm text-[#FF9933] mb-2" style="font-family: 'Noto Sans Kannada', sans-serif;">ಜ್ಞಾನ</p>
                <p class="text-sm text-gray-500">Pursuing and sharing spiritual knowledge</p>
            </div>

            <!-- Devotion -->
            <div class="text-center p-6 rounded-xl bg-white shadow-lg transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4 text-[#FF9933]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <h4 class="text-lg font-semibold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">Devotion</h4>
                <p class="text-sm text-[#FF9933] mb-2" style="font-family: 'Noto Sans Kannada', sans-serif;">ಭಕ್ತಿ</p>
                <p class="text-sm text-gray-500">Unwavering faith in the Divine</p>
            </div>

             <!-- Service -->
             <div class="text-center p-6 rounded-xl bg-white shadow-lg transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4 text-[#FF9933]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h4 class="text-lg font-semibold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">Service</h4>
                <p class="text-sm text-[#FF9933] mb-2" style="font-family: 'Noto Sans Kannada', sans-serif;">ಸೇವೆ</p>
                <p class="text-sm text-gray-500">Selfless action for the welfare of all</p>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
