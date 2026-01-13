<?php
/**
 * Template Name: Full Width (Elementor Ready)
 * Description: A full-width template that displays the header and footer, but leaves the content area completely unstyled and full-width for Elementor.
 */

get_header(); ?>

<!-- Full Width Content Area -->
<div class="site-content w-full">
    <?php
    while ( have_posts() ) :
        the_post();
        the_content();
    endwhile;
    ?>
</div>

<?php get_footer(); ?>
