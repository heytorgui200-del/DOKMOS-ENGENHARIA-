import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "INÍCIO", path: "/" },
  { label: "SERVIÇOS", path: "/servicos" },
  { label: "PROCESSO", path: "/projetos" },
  { label: "SOBRE", path: "/sobre" },
  { label: "CONTATO", path: "/contato" },
];

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "64px",
          background: "rgba(250, 250, 249, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(28, 25, 23, 0.06)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between h-full px-5 md:px-10"
          style={{ maxWidth: "1280px" }}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5"
            style={{ textDecoration: "none" }}
          >
            <img
              src="/logo-dokmos.png"
              alt="DOKMOS ENGENHARIA"
              style={{ width: "36px", height: "36px", objectFit: "contain" }}
            />
            <div className="flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#1C1917",
                }}
              >
                DOKMOS
              </span>
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#78716C",
                  marginTop: "1px",
                }}
              >
                ENGENHARIA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: isActive ? "#D97706" : "#1C1917",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                    background: isActive
                      ? "rgba(217,119,6,0.08)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#D97706";
                      e.currentTarget.style.background =
                        "rgba(217,119,6,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#1C1917";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid rgba(28, 25, 23, 0.1)",
              background: "rgba(217, 119, 6, 0.08)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <Menu size={24} color="#D97706" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay — Portal outside PageTransition to avoid transform clipping */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(12, 10, 9, 0.98)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} color="#FFF" />
              </motion.button>

              {/* Logo in menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-6"
              >
                <img
                  src="/logo-dokmos-white.png"
                  alt="DOKMOS"
                  style={{ width: "48px", height: "48px", objectFit: "contain" }}
                />
              </motion.div>

              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 0.08 * i }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="block text-center py-3 px-8"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: isActive ? "22px" : "18px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#F59E0B" : "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        borderBottom: isActive ? "2px solid #D97706" : "2px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Footer text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em",
                }}
              >
                DOKMOS ENGENHARIA LTDA — 2026
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#F5F5F4",
        padding: "32px 20px",
        borderTop: "1px solid rgba(28, 25, 23, 0.06)",
      }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-3"
        style={{ maxWidth: "1280px" }}
      >
        <div className="flex items-center gap-2.5">
          <img
            src="/logo-dokmos.png"
            alt="DOKMOS ENGENHARIA"
            style={{ width: "28px", height: "28px", objectFit: "contain" }}
          />
          <div className="flex flex-col leading-tight">
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1C1917",
              }}
            >
              DOKMOS
            </span>
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#78716C",
              }}
            >
              ENGENHARIA
            </span>
          </div>
        </div>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "13px",
            color: "#78716C",
          }}
        >
          &copy; 2026 Todos os direitos reservados.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="/politica-privacidade.html"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              color: "#78716C",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D97706")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#78716C")}
          >
            Política de Privacidade
          </a>
          <a
            href="/politica-cookies.html"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              color: "#78716C",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D97706")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#78716C")}
          >
            Política de Cookies
          </a>
          <a
            href="/termos-de-servico.html"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              color: "#78716C",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D97706")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#78716C")}
          >
            Termos de Serviço
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".sr, .sr-left, .sr-right").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF9",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
