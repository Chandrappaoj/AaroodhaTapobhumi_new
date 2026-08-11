import { useState, useEffect } from "react";
import { LazyImage } from "@/components/common/LazyImage";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import heroImage from "@/assets/hero-ashrama.jpg";
import { galleryAPI, videosAPI, getImageUrl } from "@/services/api";

interface GalleryImage {
  id: number;
  image_url: string;
  title_english?: string;
  title_kannada?: string;
  category: string;
  display_order?: number;
  is_active?: number;
  created_at?: string;
}

interface Video {
  id: number;
  video_url: string;
  title_english?: string;
  title_kannada?: string;
  description_english?: string;
  description_kannada?: string;
  created_at?: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState("all");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentImagePage, setCurrentImagePage] = useState(1);
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [imagesData, videosData] = await Promise.all([
          galleryAPI.getAll(),
          videosAPI.getAll()
        ]);
        setImages(imagesData.data || imagesData.images || []);
        setVideos(videosData.data || videosData.videos || []);
      } catch (err) {
        setError('Failed to load gallery');
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getVideoEmbed = (video: Video) => {
    const { video_url, title_kannada, title_english } = video;
    const title = title_kannada || title_english;
    let posterImage = '';

    // Detect if it's a YouTube video from URL
    const isYouTube = video_url.includes('youtube.com') || video_url.includes('youtu.be');

    if (isYouTube) {
      const videoId = video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&]+)/)?.[1];
      if (videoId) {
        posterImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    return (
      <div
        className="relative w-full h-full bg-black group cursor-pointer"
        onClick={() => setSelectedVideo(video)}
      >
        <div className="relative w-full h-full">
          <img
            src={posterImage || '/placeholder-video.jpg'}
            alt={title || 'Video thumbnail'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
            <div className="w-20 h-20 rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 flex items-center justify-center transition-all">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-semibold">{title}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const categories = [
    "all",
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "all": "ಎಲ್ಲಾ (All)",
      "events": "ಕಾರ್ಯಕ್ರಮಗಳು (Events)",
      "seva": "ಸೇವೆ (Seva)",
      "festivals": "ಹಬ್ಬಗಳು (Festivals)",
      "ashrama": "ಆಶ್ರಮ (Ashrama)",
    };
    return labels[category.toLowerCase()] || category;
  };


  const filteredImages =
    filter === "all"
      ? images
      : images.filter((img) => img.category === filter);

  const imagesPerPage = 12;
  const videosPerPage = 3;

  const totalImagePages = Math.ceil(filteredImages.length / imagesPerPage);
  const currentImages = filteredImages.slice((currentImagePage - 1) * imagesPerPage, currentImagePage * imagesPerPage);

  const totalVideoPages = Math.ceil(videos.length / videosPerPage);
  const currentVideos = videos.slice((currentVideoPage - 1) * videosPerPage, currentVideoPage * videosPerPage);

  const renderPagination = (currentPage: number, totalPages: number, setPage: (page: number) => void) => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${currentPage === i + 1
              ? "bg-primary text-primary-foreground"
              : "border border-primary/20 text-primary hover:bg-primary/10"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    );
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
          <span className="font-kn-body text-saffron-light text-lg block mb-3">
            ಗ್ಯಾಲರಿ
          </span>
          <h2 className="font-en-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-cream/90 mb-6">
            Gallery
          </h2>
          <p className="font-kn-body text-lg text-cream/90 max-w-2xl mx-auto mb-2">
            ಪವಿತ್ರ ಸ್ಥಳಗಳು ಮತ್ತು ಸ್ಮರಣೀಯ ಕ್ಷಣಗಳ ಅನುಭವ
          </p>
          <p className="font-en-body text-base text-cream/75 max-w-2xl mx-auto">
            Explore the sacred spaces and memorable moments
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Gallery"
            titleKn="ನಮ್ಮ ಗ್ಯಾಲರಿ"
            subtitle="Explore the sacred spaces and memorable moments"
          />

          {loading ? (
            <div className="text-center py-12">
              <p className="font-en-body text-muted-foreground">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="font-en-body text-red-600">{error}</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-en-body text-muted-foreground">No images in gallery yet.</p>
            </div>
          ) : (
            <>
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => { setFilter(category); setCurrentImagePage(1); }}
                    className={`px-4 py-2 rounded-full text-sm font-kn-body font-medium transition-all ${filter === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                      }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentImages.map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square overflow-hidden rounded-xl group cursor-pointer"
                    onClick={() => setSelectedImage(getImageUrl(image.image_url))}
                  >
                    <LazyImage
                      src={getImageUrl(image.image_url)}
                      alt={image.title_kannada || image.title_english || 'Gallery image'}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Image Pagination */}
              {renderPagination(currentImagePage, totalImagePages, setCurrentImagePage)}
            </>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="Videos"
            titleKn="ವೀಡಿಯೊಗಳು"
            subtitle="ಆಶ್ರಮದ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಉಪದೇಶಗಳ ದಾಖಲಾತಿಗಳು | Watch recordings of our events and spiritual programs"
          />
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-en-body text-muted-foreground">No videos available yet.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Video Grid (Single Row style constrained to 3 columns max per row) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                {currentVideos.map((video) => (
                  <div key={video.id} className="w-full">
                    <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
                      {getVideoEmbed(video)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Pagination */}
              {renderPagination(currentVideoPage, totalVideoPages, setCurrentVideoPage)}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 z-50 w-10 h-10 rounded-full bg-earth-brown/80 text-cream flex items-center justify-center hover:bg-earth-brown"
          >
            <X size={24} />
          </button>
          {selectedImage && (
            <LazyImage
              src={selectedImage}
              alt="Gallery image"
              containerClassName="h-[80vh] flex items-center justify-center"
              className="h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-5xl bg-black border-none shadow-none p-0">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-2 right-2 z-50 w-10 h-10 rounded-full bg-earth-brown/80 text-cream flex items-center justify-center hover:bg-earth-brown"
          >
            <X size={24} />
          </button>
          {selectedVideo && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {(selectedVideo.video_url.includes('youtube.com') || selectedVideo.video_url.includes('youtu.be')) ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&]+)/)?.[1]}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedVideo.video_url.includes('vimeo.com') ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://player.vimeo.com/video/${selectedVideo.video_url.match(/vimeo\.com\/(\d+)/)?.[1]}?autoplay=1`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="absolute top-0 left-0 w-full h-full"
                  controls
                  autoPlay
                >
                  <source src={selectedVideo.video_url} type="video/mp4" />
                  <source src={selectedVideo.video_url} type="video/webm" />
                  <source src={selectedVideo.video_url} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
