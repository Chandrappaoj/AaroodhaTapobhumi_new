</main>

<footer class="bg-[#5D4037] text-[#FFFDD0]">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <!-- About Section -->
            <div class="lg:col-span-1">
                <div class="flex items-center gap-3 mb-4">
                    <img 
                        src="<?php echo get_template_directory_uri(); ?>/assets/ashrama-logo.png" 
                        alt="Ashrama Logo" 
                        class="h-12 w-auto"
                    />
                    <div>
                        <h3 class="text-lg font-bold" style="font-family: 'Noto Sans Kannada', sans-serif;">
                            ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ
                        </h3>
                        <p class="text-sm text-[#FFFDD0]/80" style="font-family: 'Noto Sans Kannada', sans-serif;">
                            ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ
                        </p>
                    </div>
                </div>
                <p class="text-sm text-[#FFFDD0]/70 leading-relaxed">
                    A sacred space dedicated to spiritual growth, selfless service, 
                    and the preservation of ancient Vedic traditions.
                </p>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 class="text-lg font-semibold mb-4 font-serif">Quick Links</h4>
                <ul class="space-y-2">
                    <?php
                    $footer_links = [
                        ["About Ashrama", "/about"],
                        ["Sri Siddaroodha Swamiji", "/swamiji"],
                        ["Seva Activities", "/seva"],
                        ["Upcoming Events", "/events"],
                        ["Photo Gallery", "/gallery"],
                        ["Donate", "/donate"]
                    ];
                    foreach($footer_links as $link) {
                        echo "<li><a href='" . home_url($link[1]) . "' class='text-sm text-[#FFFDD0]/70 hover:text-[#FFCC99] transition-colors'>{$link[0]}</a></li>";
                    }
                    ?>
                </ul>
            </div>

            <!-- Contact Info -->
            <div>
                <h4 class="text-lg font-semibold mb-4 font-serif">Contact Us</h4>
                <ul class="space-y-3">
                    <li class="flex items-start gap-3 text-sm text-[#FFFDD0]/70">
                        <!-- Icon: MapPin -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCC99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>
                            Sri Siddaroodha Swamiji Ashrama,<br />
                            Hubli, Karnataka 580021
                        </span>
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[#FFFDD0]/70">
                        <!-- Icon: Phone -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCC99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span>+91 98765 43210</span>
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[#FFFDD0]/70">
                        <!-- Icon: Mail -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCC99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span>info@siddaroodhaashrama.org</span>
                    </li>
                </ul>
            </div>

            <!-- Visiting Hours -->
            <div>
                <h4 class="text-lg font-semibold mb-4 font-serif">Visiting Hours</h4>
                <div class="flex items-start gap-3 text-sm text-[#FFFDD0]/70">
                    <!-- Icon: Clock -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCC99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <div>
                        <p class="mb-2">
                            <strong class="text-[#FFFDD0]">Morning:</strong><br />
                            5:00 AM - 12:00 PM
                        </p>
                        <p>
                            <strong class="text-[#FFFDD0]">Evening:</strong><br />
                            4:00 PM - 8:30 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-[#FFFDD0]/10">
        <div class="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#FFFDD0]/60">
            <p>© <?php echo date('Y'); ?> Sri Siddaroodha Swamiji Ashrama. All rights reserved.</p>
            <p style="font-family: 'Noto Sans Kannada', sans-serif;">ಓಂ ನಮಃ ಶಿವಾಯ | Om Namah Shivaya</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
