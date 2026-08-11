import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight, List } from "lucide-react";
import { charitreAPI, getImageUrl } from "@/services/api";

interface ChapterDetail {
  id: number;
  chapter_number: number;
  title_kn: string;
  subtitle_kn: string | null;
  content_kn: string;
  audio_file: string | null;
  cover_image: string | null;
  prev_chapter: number | null;
  next_chapter: number | null;
}

const CharitreReader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Audio Player State
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      setIsLoading(true);
      setError("");
      // Reset audio state
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      
      try {
        const data = await charitreAPI.getChapter(Number(id));
        setChapter(data);
        
        // Update SEO
        document.title = `ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಚರಿತ್ರೆ – ${data.title_kn} | ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", `ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಚರಿತ್ರೆಯ ${data.title_kn} ಅನ್ನು ಓದಿ ಮತ್ತು ಆಲಿಸಿ.`);
        }
      } catch (err) {
        console.error("Failed to load chapter:", err);
        setError("ಅಧ್ಯಾಯ ಲಭ್ಯವಿಲ್ಲ (Chapter not found)");
      } finally {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    };
    
    if (id) fetchChapter();
  }, [id]);

  // Audio Handlers
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (Number(e.target.value) / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error || !chapter) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <h2 className="font-kn-heading text-2xl text-destructive">{error}</h2>
          <button onClick={() => navigate('/swamiji/charitre/kannada')} className="text-primary hover:underline font-kn-body">
            ಎಲ್ಲಾ ಅಧ್ಯಾಯಗಳಿಗೆ ಹಿಂತಿರುಗಿ
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
        <div className="container-custom max-w-3xl">
          
          {/* Top Navigation */}
          <div className="mb-8 flex items-center text-sm font-kn-body text-muted-foreground">
            <Link to="/swamiji/charitre/kannada" className="hover:text-primary transition-colors flex items-center gap-1">
              <List size={16} /> ಎಲ್ಲಾ ಅಧ್ಯಾಯಗಳು
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{chapter.title_kn}</span>
          </div>

          {/* Chapter Header */}
          <div className="text-center mb-10">
            <h1 className="font-kn-heading text-3xl md:text-4xl font-bold text-saffron-dark mb-3">
              ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಚರಿತ್ರೆ
            </h1>
            <h2 className="font-kn-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {chapter.title_kn}
            </h2>
            {chapter.subtitle_kn && (
              <h3 className="font-kn-subheading text-lg text-muted-foreground mb-6">
                {chapter.subtitle_kn}
              </h3>
            )}
            
            {chapter.cover_image && (
              <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-elevated mb-8 border border-border/50">
                <img 
                  src={getImageUrl(chapter.cover_image)} 
                  alt={chapter.title_kn} 
                  className="w-full h-auto object-cover max-h-[300px]"
                />
              </div>
            )}
          </div>

          {/* Audio Player */}
          {chapter.audio_file && (
            <div className="bg-white rounded-2xl p-6 shadow-card border border-border/40 mb-10 sticky top-24 z-40">
              <h4 className="font-kn-heading text-lg font-bold text-earth-brown mb-4 flex items-center gap-2">
                <Headphones size={20} className="text-primary" /> ಅಧ್ಯಾಯವನ್ನು ಕೇಳಿ
              </h4>
              
              <audio 
                ref={audioRef} 
                src={getImageUrl(chapter.audio_file)} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-md hover:scale-105"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress || 0}
                    onChange={handleSeek}
                    className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs font-en-body text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <button onClick={toggleMute} className="text-muted-foreground hover:text-earth-brown transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          )}

          {/* Reader Content */}
          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-soft border border-border/30 mb-12">
            <h3 className="font-kn-heading text-xl font-bold text-center text-primary/80 mb-8 border-b border-border/50 pb-4">
              ಕನ್ನಡ ಚರಿತ್ರೆ
            </h3>
            
            <div 
              className="charitre-content text-foreground leading-relaxed"
              style={{
                fontFamily: '"Noto Serif Kannada", serif',
                fontSize: 'clamp(18px, 4vw, 22px)',
                lineHeight: '2.1'
              }}
              dangerouslySetInnerHTML={{ __html: chapter.content_kn }}
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-8 border-t border-border">
            <div className="w-full sm:w-1/3 flex justify-start">
              {chapter.prev_chapter ? (
                <Link 
                  to={`/swamiji/charitre/kannada/chapter/${chapter.prev_chapter}`}
                  className="flex items-center gap-2 text-earth-brown font-kn-heading font-semibold hover:text-primary transition-colors"
                >
                  <ArrowLeft size={20} /> ಹಿಂದಿನ ಅಧ್ಯಾಯ
                </Link>
              ) : (
                <span className="flex items-center gap-2 text-muted font-kn-heading font-semibold cursor-not-allowed">
                  <ArrowLeft size={20} /> ಹಿಂದಿನ ಅಧ್ಯಾಯ
                </span>
              )}
            </div>
            
            <div className="w-full sm:w-1/3 flex justify-center">
              <Link 
                to="/swamiji/charitre/kannada"
                className="font-kn-heading font-bold text-primary hover:underline"
              >
                ಎಲ್ಲಾ ಅಧ್ಯಾಯಗಳು
              </Link>
            </div>
            
            <div className="w-full sm:w-1/3 flex justify-end">
              {chapter.next_chapter ? (
                <Link 
                  to={`/swamiji/charitre/kannada/chapter/${chapter.next_chapter}`}
                  className="flex items-center gap-2 text-earth-brown font-kn-heading font-semibold hover:text-primary transition-colors"
                >
                  ಮುಂದಿನ ಅಧ್ಯಾಯ <ArrowRight size={20} />
                </Link>
              ) : (
                <span className="flex items-center gap-2 text-muted font-kn-heading font-semibold cursor-not-allowed">
                  ಮುಂದಿನ ಅಧ್ಯಾಯ <ArrowRight size={20} />
                </span>
              )}
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Add custom styles for paragraph spacing in the injected content */}
      <style>{`
        .charitre-content p {
          margin-bottom: 1.5em;
          text-align: left;
        }
        .charitre-content p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </Layout>
  );
};

export default CharitreReader;
