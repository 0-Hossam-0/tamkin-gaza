"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../assets/logo.png";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [afaqOpen, setAfaqOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <nav style={{
        background: "#fff", borderBottom: "1px solid #e5e5e5",
        position: "sticky", top: 0, zIndex: 100, direction: "rtl",
        fontFamily: F,
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center", height: 68,
          justifyContent: "space-between", gap: 16,
        }}>

          {/* ── RIGHT: Logo ── */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 46, height: 46, borderRadius: "50%",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22,
            }}>
              <Image src={logo} alt="Afaq Logo" width={56} height={56} />
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>فريق آفاق</div>
              <div style={{ fontSize: 9, color: "#aaa", letterSpacing: 1.5 }}>AAFAQTEAM</div>
            </div>
          </Link>

          {/* ── CENTER: Nav links (desktop) ── */}
          <div className="nav-desktop" style={{
            display: "flex", alignItems: "center", gap: 20,
            fontSize: 13, flex: 1, justifyContent: "center",
          }}>
            <Link href="/" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
              الصفحة الرئيسية
            </Link>
            <Link href="/about" style={{ color: "#555", textDecoration: "none", whiteSpace: "nowrap" }}>
              من نحن
            </Link>
            <Link href="/publications" style={{ color: "#555", textDecoration: "none", whiteSpace: "nowrap" }}>
              المنشورات
            </Link>

            {/* منشورات آفاق dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setAfaqOpen(true)}
              onMouseLeave={() => setAfaqOpen(false)}
            >
              <button style={{
                background: "none", border: "none", fontFamily: F, fontSize: 13,
                color: "#555", cursor: "pointer", display: "flex", alignItems: "center",
                gap: 5, whiteSpace: "nowrap", padding: "4px 0",
              }}>
                منشورات آفاق <span style={{ fontSize: 10 }}>▾</span>
              </button>
              {afaqOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "#1a1a1a", borderRadius: 10, padding: "6px 0",
                  minWidth: 170, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", zIndex: 300,
                }}>
                  {[
                    { label: "حملات الجمعية", cat: "حملات الجمعية" },
                    { label: "حالات إنسانية", cat: "حالات إنسانية" },
                    { label: "إنجازات المؤسسة", cat: "إنجازات المؤسسة" },
                  ].map(item => (
                    <Link key={item.cat}
                      href={`/publications?cat=${encodeURIComponent(item.cat)}`}
                      style={{ display: "block", padding: "11px 20px", color: "#eee", textDecoration: "none", fontSize: 13, whiteSpace: "nowrap" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* انضم إلينا dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setJoinOpen(true)}
              onMouseLeave={() => setJoinOpen(false)}
            >
              <button style={{
                background: "none", border: "none", fontFamily: F, fontSize: 13,
                color: "#555", cursor: "pointer", display: "flex", alignItems: "center",
                gap: 5, whiteSpace: "nowrap", padding: "4px 0",
              }}>
                انضم إلينا <span style={{ fontSize: 10 }}>▾</span>
              </button>
              {joinOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "#1a1a1a", borderRadius: 10, padding: "6px 0",
                  minWidth: 160, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", zIndex: 300,
                }}>
                  {["تطوع معنا", "شارك في حملة", "كن سفيراً"].map(item => (
                    <Link key={item} href="/contact"
                      style={{ display: "block", padding: "11px 20px", color: "#eee", textDecoration: "none", fontSize: 13, whiteSpace: "nowrap" }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" style={{ color: "#555", textDecoration: "none", whiteSpace: "nowrap" }}>
              تواصل معنا
            </Link>
            <Link href="/statistics" style={{ color: "#555", textDecoration: "none", whiteSpace: "nowrap" }}>
              الإحصائيات
            </Link>
          </div>

          {/* ── LEFT: Search + Donate + Burger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  width: 40, height: 40, borderRadius: "50%", background: "#f5f5f5",
                  border: "none", cursor: "pointer", fontSize: 17,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >🔍</button>
              {searchOpen && (
                <div style={{
                  position: "absolute", left: 0, top: "calc(100% + 10px)",
                  background: "#fff", borderRadius: 12, padding: "10px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)", width: 290,
                  border: "1px solid #eee", zIndex: 300,
                }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      autoFocus
                      value={searchVal}
                      onChange={e => setSearchVal(e.target.value)}
                      placeholder="ابحث هنا..."
                      style={{
                        flex: 1, padding: "9px 14px", borderRadius: 8,
                        border: "1.5px solid #e5e5e5", fontSize: 13, outline: "none", direction: "rtl",
                      }}
                    />
                    <button style={{ padding: "9px 14px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>🔍</button>
                  </div>
                </div>
              )}
            </div>

            {/* Donate CTA */}
            <Link href="/donate" style={{
              background: "#1a1a1a", color: "#fff", padding: "11px 20px",
              borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
            }}>
              <span>🤍</span> تبرع الآن
            </Link>

            {/* Mobile burger */}
            <button
              className="burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none", background: "transparent",
                border: "1.5px solid #ddd", borderRadius: 8,
                width: 40, height: 40, cursor: "pointer",
                alignItems: "center", justifyContent: "center", fontSize: 18,
              }}
            >☰</button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: "#fff", borderTop: "1px solid #eee",
            padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14,
          }}>
            {[
              ["الصفحة الرئيسية", "/"],
              ["من نحن", "/about"],
              ["المنشورات", "/publications"],
              ["الإحصائيات", "/statistics"],
              ["تواصل معنا", "/contact"],
              ["تبرع الآن", "/donate"],
            ].map(([label, href]) => (
              <Link key={href} href={href}
                onClick={() => setMobileOpen(false)}
                style={{ color: "#1a1a1a", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
              >{label}</Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}