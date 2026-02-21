import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant gold jewelry"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-xl space-y-6 md:space-y-8">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground font-light animate-fade-in">
            Handcrafted in Morocco
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-light leading-[1.1] tracking-tight text-foreground animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Elegant &<br />
            Affordable<br />
            <span className="italic text-primary">Jewelry</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light max-w-md animate-fade-in" style={{ animationDelay: "0.3s" }}>
            The perfect gift for every moment.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <a
              href="#collection"
              className="inline-block px-8 py-3.5 bg-foreground text-background text-sm tracking-[0.2em] uppercase rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
