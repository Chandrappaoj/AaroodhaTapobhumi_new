<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <script>
        // Simple Mobile Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }
    </script>
</head>

<body <?php body_class( 'antialiased bg-background text-foreground' ); ?>>
<?php wp_body_open(); ?>

<nav class="bg-cream/95 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
    <div class="container mx-auto px-4 md:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
            <!-- Logo -->
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-3">
                <img 
                    src="<?php echo get_template_directory_uri(); ?>/assets/ashrama-logo.png" 
                    alt="Ashrama Logo" 
                    class="h-16 md:h-20 w-auto"
                />
                <div class="flex flex-col">
                    <span class="text-lg md:text-xl font-bold text-primary leading-tight" style="font-family: 'Noto Sans Kannada', sans-serif;">
                        ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ
                    </span>
                    <span class="text-xs md:text-sm text-muted-foreground" style="font-family: 'Noto Sans Kannada', sans-serif;">
                        ಸುಕ್ಷೇತ್ರ ಖಂಡೇರಾಯನಹಳ್ಳಿ
                    </span>
                </div>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center gap-1">
                <?php
                $links = [
                    ['Home', 'ಮುಖಪುಟ', '/'],
                    ['About', 'ನಮ್ಮ ಬಗ್ಗೆ', '/about'],
                    ['Swamiji', 'ಸ್ವಾಮೀಜಿ', '/swamiji'],
                    ['Seva', 'ಸೇವೆ', '/seva'],
                    ['Events', 'ಕಾರ್ಯಕ್ರಮಗಳು', '/events'],
                    ['Gallery', 'ಗ್ಯಾಲರಿ', '/gallery'],
                    ['Trust', 'ಟ್ರಸ್ಟ್', '/trust'],
                    ['Contact', 'ಸಂಪರ್ಕ', '/contact'],
                ];
                
                foreach ($links as $link) {
                    $name = $link[0];
                    $nameKn = $link[1]; // Not used in desktop view in React, but available
                    $path = $link[2];
                    $current = is_page(trim($path, '/')) || (is_front_page() && $path === '/');
                    $classes = $current ? "bg-primary/10 text-primary" : "text-foreground/80 hover:text-primary hover:bg-primary/5";
                    
                    // Logic to handle "Home" path vs specific pages
                    $href = ($path === '/') ? home_url('/') : home_url($path);
                    
                    echo "<a href='{$href}' class='px-3 py-2 rounded-md text-sm font-medium transition-colors {$classes}'>{$name}</a>";
                }
                ?>
                <a href="<?php echo home_url('/donate'); ?>">
                    <button class="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FF9933] text-white hover:bg-[#CC6600] h-9 px-4 py-2">
                        Donate
                    </button>
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMenu()" class="lg:hidden p-2 rounded-md text-foreground hover:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobile-menu" class="hidden lg:hidden pb-4">
            <div class="flex flex-col gap-1">
                <?php
                foreach ($links as $link) {
                    $name = $link[0];
                    $nameKn = $link[1];
                    $path = $link[2];
                    $href = ($path === '/') ? home_url('/') : home_url($path);
                    
                    echo "<a href='{$href}' class='px-4 py-3 rounded-md text-sm font-medium transition-colors text-foreground/80 hover:text-primary hover:bg-primary/5 flex items-center justify-between'>
                            <span>{$name}</span>
                            <span class='text-xs text-muted-foreground' style='font-family: \"Noto Sans Kannada\", sans-serif;'>{$nameKn}</span>
                          </a>";
                }
                ?>
                <a href="<?php echo home_url('/donate'); ?>" class="mt-2 text-center w-full">
                    <button class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-[#FF9933] text-white hover:bg-[#CC6600] h-10 px-4 py-2">
                        Donate Now
                    </button>
                </a>
            </div>
        </div>
    </div>
</nav>
<main>
