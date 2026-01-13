<?php
/**
 * Main Template File.
 */

get_header(); ?>

<!-- Generic Header -->
<section class="relative py-20 bg-[#5D4037]">
    <div class="container mx-auto px-4 md:px-8 text-center text-[#FFFDD0]">
        <h1 class="text-4xl md:text-5xl font-bold mb-4" style="font-family: 'Playfair Display', serif;">
            <?php the_title(); ?>
        </h1>
    </div>
</section>

<!-- Content -->
<section class="py-16 md:py-24 bg-[#FFFAFA]">
    <div class="container mx-auto px-4 md:px-8">
        <div class="max-w-4xl mx-auto prose prose-lg prose-orange">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) :
                    the_post();
                    the_content();
                endwhile;
            else :
                echo '<p>No content found.</p>';
            endif;
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
