import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { BookOpen, Headphones } from "lucide-react";
import { charitreAPI, getImageUrl } from "@/services/api";

interface Chapter {
  id: number;
  chapter_number: number;
  title_kn: string;
  subtitle_kn: string | null;
  audio_file: string | null;
  cover_image: string | null;
}

const CharitreIndex = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const data = await charitreAPI.getAll();
        setChapters(data);
      } catch (error) {
        console.error("Failed to load chapters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <Layout>
      <section className="section-padding bg-background min-h-[70vh]">
        <div className="container-custom max-w-5xl">
          {/* Header Banner */}
          <div className="text-center mb-12 bg-card rounded-3xl p-8 shadow-card border border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-saffron opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              <h1 className="font-kn-heading text-4xl md:text-5xl font-bold text-saffron-dark mb-4">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಚರಿತ್ರೆ
              </h1>
              <h2 className="font-kn-subheading text-xl md:text-2xl text-foreground font-semibold mb-2">
                ಕನ್ನಡ ಚರಿತ್ರೆ
              </h2>
              <p className="font-kn-body text-muted-foreground">
                ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿಗಳ ಪವಿತ್ರ ಜೀವನ ಚರಿತ್ರೆ
              </p>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="mb-6 border-b border-border pb-2">
            <h3 className="font-kn-heading text-2xl font-bold text-foreground">ಅಧ್ಯಾಯಗಳು</h3>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : chapters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground font-kn-body">
              ಯಾವುದೇ ಅಧ್ಯಾಯಗಳು ಲಭ್ಯವಿಲ್ಲ.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {chapters.map((chapter) => (
                <Link
                  to={`/swamiji/charitre/kannada/chapter/${chapter.chapter_number}`}
                  key={chapter.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 flex flex-col"
                >
                  {chapter.cover_image && (
                    <div className="h-40 w-full overflow-hidden">
                      <img 
                        src={getImageUrl(chapter.cover_image)} 
                        alt={chapter.title_kn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="font-kn-heading text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {chapter.title_kn}
                    </h4>
                    <p className="font-kn-body text-sm text-muted-foreground mb-6">
                      ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಚರಿತ್ರೆ
                      {chapter.subtitle_kn && <><br />{chapter.subtitle_kn}</>}
                    </p>
                    <div className="mt-auto flex items-center gap-4 text-sm font-kn-body font-medium">
                      <span className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full">
                        <BookOpen size={16} /> ಓದಿ
                      </span>
                      {chapter.audio_file && (
                        <span className="flex items-center gap-2 text-earth-brown bg-earth-brown/10 px-4 py-2 rounded-full">
                          <Headphones size={16} /> ಕೇಳಿ
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CharitreIndex;
