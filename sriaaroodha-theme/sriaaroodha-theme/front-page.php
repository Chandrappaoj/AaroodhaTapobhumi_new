<?php
/**
 * Template Name: Home Page
 */

get_header(); ?>

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/hero-ashrama.jpg');"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-[#5D4037]/80 via-[#5D4037]/60 to-[#5D4037]/90"></div>
    <div class="relative z-10 container mx-auto px-4 md:px-8 text-center py-20">
        <div class="animate-fade-in">
            <span class="inline-block text-lg md:text-xl text-[#FFCC99] mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">
                ಶ್ರೀ ಸಿದ್ಧರೂಢ ಸ್ವಾಮೀಜಿ ಆಶ್ರಮ
            </span>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-[#FFFDD0] mb-6 leading-tight" style="font-family: 'Playfair Display', serif;">
                Sri Siddaroodha
                <br />
                <span class="text-[#FFCC99]">Swamiji Ashrama</span>
            </h1>
            <p class="text-lg md:text-xl text-[#FFFDD0]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                A sacred sanctuary of peace, spirituality, and selfless service.
                Experience divine grace and ancient wisdom in the footsteps of
                Sri Siddaroodha Swamiji.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="<?php echo home_url('/about'); ?>">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FF9933] text-white hover:bg-[#CC6600] h-12 px-6 py-3 text-lg">
                        Explore Ashrama
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                </a>
                <a href="<?php echo home_url('/donate'); ?>">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#FFFDD0]/30 text-[#FFFDD0] hover:bg-[#FFFDD0]/10 hover:text-[#FFFDD0] bg-transparent h-12 px-6 py-3 text-lg">
                        Support Our Mission
                    </button>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- About Preview Section -->
<section class="py-16 md:py-24 bg-[#FFFAFA]">
    <div class="container mx-auto px-4 md:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
                <span class="text-[#FF9933] text-sm block mb-2" style="font-family: 'Noto Sans Kannada', sans-serif;">
                    ನಮ್ಮ ಬಗ್ಗೆ
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-[#333333] mb-6" style="font-family: 'Playfair Display', serif;">
                    A Legacy of
                    <br />
                    <span class="text-[#FF9933]">Spiritual Wisdom</span>
                </h2>
                <p class="text-gray-500 leading-relaxed mb-6">
                    Sri Siddaroodha Swamiji Ashrama stands as a beacon of spiritual
                    enlightenment in Karnataka. Founded on the principles of
                    devotion, service, and self-realization, the Ashrama continues
                    to guide seekers on their spiritual journey.
                </p>
                <p class="text-gray-500 leading-relaxed mb-8">
                    Nestled in the sacred city of Hubli, the Ashrama preserves the
                    teachings and traditions established by the revered Sri
                    Siddaroodha Swamiji, offering devotees a sanctuary for prayer,
                    meditation, and selfless service.
                </p>
                <a href="<?php echo home_url('/about'); ?>">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FF9933] text-white hover:bg-[#CC6600] h-10 px-4 py-2">
                        Learn Our History
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                </a>
            </div>
            <div class="order-1 lg:order-2 relative">
                <img
                    src="<?php echo get_template_directory_uri(); ?>/assets/temple-interior.jpg"
                    alt="Temple interior"
                    class="rounded-2xl shadow-xl w-full"
                />
            </div>
        </div>
    </div>
</section>

<!-- Daily Timings Section -->
<section class="py-16 md:py-24 bg-[#FFFDD0]/30">
    <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#333333] mb-3" style="font-family: 'Playfair Display', serif;">Visiting Hours</h2>
            <div class="font-kannada text-[#FF9933] text-lg mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ಭೇಟಿ ಸಮಯ</div>
            <div class="h-1 w-20 bg-[#FF9933] mx-auto rounded-full mb-6"></div>
            <p class="text-gray-500 max-w-2xl mx-auto">Experience the divine atmosphere of the Ashrama during these sacred hours</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <!-- Morning -->
            <div class="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9933" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="text-[#FF9933] font-semibold mb-2">5:00 AM - 6:30 AM</div>
                <h3 class="text-lg font-semibold text-[#333333]" style="font-family: 'Playfair Display', serif;">Morning Prayers</h3>
                <p class="text-sm text-gray-400" style="font-family: 'Noto Sans Kannada', sans-serif;">ಬೆಳಗಿನ ಪ್ಾರ್ಥನೆ</p>
                <p class="text-sm text-gray-500 mt-2">Suprabhatam & Morning Aarti</p>
            </div>

            <!-- Afternoon -->
            <div class="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9933" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="text-[#FF9933] font-semibold mb-2">12:00 PM</div>
                <h3 class="text-lg font-semibold text-[#333333]" style="font-family: 'Playfair Display', serif;">Afternoon Aarti</h3>
                <p class="text-sm text-gray-400" style="font-family: 'Noto Sans Kannada', sans-serif;">ಮಧ್ಯಾಹ್ನದ ಆರತಿ</p>
                <p class="text-sm text-gray-500 mt-2">Noon prayers and blessings</p>
            </div>

            <!-- Evening -->
            <div class="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9933" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="text-[#FF9933] font-semibold mb-2">6:00 PM - 8:30 PM</div>
                <h3 class="text-lg font-semibold text-[#333333]" style="font-family: 'Playfair Display', serif;">Evening Prayers</h3>
                <p class="text-sm text-gray-400" style="font-family: 'Noto Sans Kannada', sans-serif;">ಸಂಜೆ ಪ್ರಾರ್ಥನೆ</p>
                <p class="text-sm text-gray-500 mt-2">Sandhya Aarti & Bhajans</p>
            </div>
        </div>
    </div>
</section>

<!-- Upcoming Events Section -->
<section class="py-16 md:py-24 bg-[#FFFAFA]">
    <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#333333] mb-3" style="font-family: 'Playfair Display', serif;">Upcoming Events</h2>
            <div class="font-kannada text-[#FF9933] text-lg mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು</div>
            <div class="h-1 w-20 bg-[#FF9933] mx-auto rounded-full mb-6"></div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Event 1 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#FF9933]/10 hover:shadow-xl transition-all duration-300">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-[#FFFDD0] text-[#FF9933] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Feb 26
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">
                        Maha Shivaratri
                    </h3>
                    <p class="text-sm text-[#FF9933] mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ಮಹಾ ಶಿವರಾತ್ರಿ</p>
                    
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-[#FF9933]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            All Day & Night
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-[#FF9933]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            Main Temple Hall
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm line-clamp-3">
                        Special all-night vigil with continuous bhajans, abhishekam, and spiritual discourses.
                    </p>
                </div>
            </div>
            
            <!-- Event 2 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#FF9933]/10 hover:shadow-xl transition-all duration-300">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-[#FFFDD0] text-[#FF9933] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Mar 15
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">
                        Swamiji Jayanti
                    </h3>
                    <p class="text-sm text-[#FF9933] mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ಸ್ವಾಮೀಜಿ ಜಯಂತಿ</p>
                    <div class="space-y-2 mb-4">
                         <div class="flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-[#FF9933]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            6:00 AM onwards
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm">
                        Annual celebration of Sri Siddaroodha Swamiji's birth anniversary.
                    </p>
                </div>
            </div>

            <!-- Event 3 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#FF9933]/10 hover:shadow-xl transition-all duration-300">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-[#FFFDD0] text-[#FF9933] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Weekly
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-[#333333] mb-1 leading-tight" style="font-family: 'Playfair Display', serif;">
                        Weekly Satsang
                    </h3>
                    <p class="text-sm text-[#FF9933] mb-4" style="font-family: 'Noto Sans Kannada', sans-serif;">ಸಾಪ್ತಾಹಿಕ ಸತ್ಸಂಗ</p>
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-[#FF9933]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            Every Sunday, 5pm
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm">
                        Regular spiritual gathering with bhajans and meditation.
                    </p>
                </div>
            </div>
        </div>

        <div class="text-center mt-10">
            <a href="<?php echo home_url('/events'); ?>">
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FF9933] text-white hover:bg-[#CC6600] h-11 px-8">
                    View All Events
                </button>
            </a>
        </div>
    </div>
</section>

<!-- Donation CTA -->
<section class="py-16 md:py-24 bg-gradient-to-br from-[#FF9933] to-[#CC6600] text-[#FFFDD0]">
    <div class="container mx-auto px-4 md:px-8 text-center">
        <span class="text-[#FFCC99] text-sm block mb-2" style="font-family: 'Noto Sans Kannada', sans-serif;">
            ದಾನ ಮಾಡಿ
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style="font-family: 'Playfair Display', serif;">
            Support Our Sacred Mission
        </h2>
        <p class="text-lg text-[#FFFDD0]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your generous contributions help us continue the noble work of
            Annadanam, spiritual programs, and social service. Every donation,
            big or small, makes a meaningful difference.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="<?php echo home_url('/donate'); ?>">
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-white text-[#FF9933] hover:bg-white/90 h-12 px-6 py-3 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    Donate Now
                </button>
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
