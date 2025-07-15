import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-bg-secondary">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">
              Just Do It.
            </h2>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
              Não importa o seu nível, não importa o seu objetivo. Se você tem um corpo, você é um atleta.
            </p>
            <button className="btn-shine relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-accent text-secondary text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg">
              <span>Nossa História</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          
          {/* Video Player */}
          <div className="video-player group">
            <div className="relative aspect-video overflow-hidden cursor-pointer">
              <img src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800&h=600" alt="Nike Video Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-2xl text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                <i className="fas fa-play ml-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;