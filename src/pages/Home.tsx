import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { LogoCloudDark } from "@/components/ui/logo-cloud-dark";

const navLinks = [
  { label: "INÍCIO", path: "/" },
  { label: "SERVIÇOS", path: "/servicos" },
  { label: "PROCESSO", path: "/projetos" },
  { label: "SOBRE", path: "/sobre" },
  { label: "CONTATO", path: "/contato" },
];

const serviceTags = [
  "Engenharia Técnica",
  "Laudos Periciais",
  "Regularização",
  "AVCB / CLCB",
  "Obras Hospitalares",
  "Consultoria",
];

// Timing (video 4s original, played at 0.6x)
const PLAYBACK_RATE = 0.6;
const LIGHT_ON_AT = 2.3;   // sync with video light — slight delay so content appears right as light turns on
const PAUSE_AT = 3.85;     // freeze just before video ends

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  const [phase, setPhase] = useState(0); // 0=dark, 1=lit, 2=done
  const [ready, setReady] = useState(false);

  const isLit = phase >= 1;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.playbackRate = PLAYBACK_RATE;

    const startPlayback = () => {
      v.play().catch(() => {});
    };

    if (v.readyState >= 3) {
      startPlayback();
    } else {
      v.addEventListener("canplaythrough", startPlayback, { once: true });
    }

    const sync = () => {
      const t = v.currentTime;

      if (t >= PAUSE_AT && phase !== 2) {
        v.pause();
        setPhase(2);
      } else if (t >= LIGHT_ON_AT && phase === 0) {
        setPhase(1);
      }

      if (phase !== 2) {
        rafRef.current = requestAnimationFrame(sync);
      }
    };

    rafRef.current = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  return (
    <section className="relative w-screen h-screen overflow-hidden" style={{ background: "#0C0A09" }}>
      {/* Video background */}
      <video
        ref={videoRef}
        src="/home-hero.mp4"
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
        onLoadedData={() => setReady(true)}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(12,10,9,0.35) 0%, rgba(12,10,9,0.08) 40%, rgba(12,10,9,0.08) 65%, rgba(12,10,9,0.45) 100%)",
        }}
      />

      {/* Floating nav */}
      <nav
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center gap-1 md:gap-3 px-3 md:px-10 py-4 md:py-8"
        style={{ pointerEvents: isLit ? "auto" : "none", flexWrap: "nowrap" }}
      >
        {navLinks.map((link) => (
          <BlurFade key={link.path} trigger={isLit} delay={0} duration={0.6} yOffset={-12} blur="4px">
            <button
              onClick={() => navigate(link.path)}
              className="px-2 py-2 md:px-6 md:py-3 rounded-full font-semibold uppercase cursor-pointer"
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontSize: "clamp(9px, 1.8vw, 14px)",
                letterSpacing: "clamp(0.02em, 0.1vw, 0.15em)",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.borderColor = "rgba(217,119,6,0.5)";
                e.currentTarget.style.background = "rgba(217,119,6,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              {link.label}
            </button>
          </BlurFade>
        ))}
      </nav>

      {/* Hero content - centered */}
      <div
        className="relative z-20 flex flex-col items-center justify-center h-full px-5 md:px-10"
        style={{ paddingBottom: "clamp(100px, 14vh, 160px)", paddingTop: "clamp(56px, 8vh, 120px)", gap: "clamp(8px, 1.5vh, 16px)" }}
      >
        {/* Logo + DOKMOS ENGENHARIA — um elemento unico */}
        <BlurFade trigger={isLit} delay={0} duration={0.9} yOffset={20} blur="12px">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: "clamp(8px, 1.2vh, 16px)" }}>
            <img
              src="/logo-dokmos-white.png"
              alt=""
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 0 30px rgba(217,119,6,0.4))",
                marginBottom: "clamp(8px, 1.5vh, 18px)",
              }}
            />
            <h1
              className="m-0 leading-none"
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontSize: "clamp(48px, 15vw, 90px)",
                fontWeight: 800,
                color: "#FFFFFF",
                animation: isLit ? "glow-pulse 3s ease-in-out infinite 0.5s" : "none",
                textShadow: "0 0 40px rgba(217,119,6,0.5), 0 0 90px rgba(217,119,6,0.2), 0 4px 25px rgba(0,0,0,0.6)",
                letterSpacing: "0.05em",
                lineHeight: 1.05,
              }}
            >
              DOKMOS
            </h1>
            <p
              className="m-0 text-center"
              style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontSize: "clamp(15px, 3.8vw, 22px)",
                fontWeight: 600,
                fontStyle: "normal",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "clamp(0.18em, 0.6vw, 0.3em)",
                textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                marginTop: "clamp(6px, 1vh, 12px)",
              }}
            >
              ENGENHARIA
            </p>
          </div>
        </BlurFade>

        {/* Divider */}
        <BlurFade trigger={isLit} delay={0} duration={0.6} yOffset={10} blur="8px">
          <div
            className="mx-auto"
            style={{
              width: "clamp(50px, 10vw, 80px)",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #F59E0B, #D97706, #F59E0B, transparent)",
              margin: "clamp(6px, 1.5vh, 16px) 0",
              boxShadow: "0 0 12px rgba(217,119,6,0.4)",
            }}
          />
        </BlurFade>

        {/* Description */}
        <BlurFade trigger={isLit} delay={0} duration={0.7} yOffset={12} blur="8px">
          <p
            className="text-center max-w-2xl m-0 px-4"
            style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontSize: "clamp(15px, 2.4vw, 17px)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.6,
              textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              marginBottom: "clamp(6px, 1.5vh, 16px)",
            }}
          >
            Engenharia estratégica para operações que não podem parar.
            Soluções técnicas, regulamentares e periciais com excelência.
          </p>
        </BlurFade>

        {/* Tags */}
        <BlurFade trigger={isLit} delay={0} duration={0.6} yOffset={10} blur="6px">
          <div
            className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-1.5 max-w-2xl px-4"
            style={{ marginBottom: "clamp(8px, 2vh, 20px)" }}
          >
            {serviceTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5"
                style={{
                  fontFamily: "'Montserrat', 'Inter', sans-serif",
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: "#F59E0B", fontSize: "8px" }}>●</span>
                {tag}
              </span>
            ))}
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade trigger={isLit} delay={0} duration={0.6} yOffset={10} blur="6px">
          <Link
            to="/contato"
            className="btn-primary inline-flex items-center gap-2"
            style={{
              padding: "clamp(10px, 2vh, 16px) clamp(16px, 4vw, 32px)",
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontSize: "clamp(11px, 1.8vw, 14px)",
              letterSpacing: "0.08em",
              boxShadow: "0 4px 24px rgba(217,119,6,0.35), 0 0 60px rgba(217,119,6,0.15)",
            }}
          >
            SOLICITAR ORÇAMENTO
            <ArrowRight size={14} />
          </Link>
        </BlurFade>
      </div>

      {/* Partners slider - bottom of screen, synced with video */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          opacity: isLit ? 1 : 0,
          transform: isLit ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <LogoCloudDark
          logos={[
            { src: "/1.png", alt: "Sankara" },
            { src: "/2.png", alt: "Invasive" },
            { src: "/3.png", alt: "P&Q Granito" },
            { src: "/4.png", alt: "Hapvida" },
            { src: "/5.png", alt: "Aceni" },
            { src: "/6.png", alt: "JM Fundações" },
            { src: "/7.png", alt: "Hemac" },
            { src: "/8.png", alt: "Unimed Ribeirão Preto" },
            { src: "/10.png", alt: "São Francisco Village" },
            { src: "/11.png", alt: "Hospital São Paulo" },
            { src: "/18.png", alt: "Soluções Digitais" },
          ]}
        />

        {/* Label */}
        <div className="text-center pb-3 md:pb-4">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(9px, 2.2vw, 11px)",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Nossos Parceiros
          </span>
        </div>
      </div>
    </section>
  );
}
