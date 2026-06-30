'use client'

export default function AnimatedHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary flex items-center justify-center">
      {/* Full-screen Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      >
        <source
          src="https://media.w3.org/2010/05/sintel/trailer.mp4"
          type="video/mp4"
        />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
}
