import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PubCard from "./components/PubCard";
import Link from "next/link";
import gazaImage from "./assets/gaza.jpg";
import { fetchCasualties, getLatest, fmt, fmtDate, daysSince, PUBS } from "./lib/api";
import Image from "next/image";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default async function Home() {
  const data   = await fetchCasualties();
  const latest = getLatest(data);
  const days   = daysSince();

  const humanCases = PUBS.filter(p => p.category === "حالات إنسانية");
  const campaigns  = PUBS.filter(p => p.category === "حملات الجمعية");
  const newsItems  = PUBS.slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0ee", direction: "rtl" }}>
      <Navbar />

      {/* ════════════ HERO ════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 520 }}>
        <Image src={gazaImage} alt="Gaza" fill priority style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.65) 0%, rgba(0,0,0,.4) 50%, rgba(0,0,0,.72) 100%)" }} />

        {/* Slider arrows — like in screenshots */}
        <button style={{
          position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 5,
          width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.15)",
          border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: 22, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>‹</button>
        <button style={{
          position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 5,
          width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.15)",
          border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: 22, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>›</button>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 960, margin: "0 auto", padding: "80px 24px 36px", textAlign: "center", fontFamily: F }}>
          <h1 style={{ fontSize: "clamp(26px, 4.5vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.55, marginBottom: 14 }}>
            اللهم مدّهم بمدد من عندك<br />اللهم كن لهم عوناً و معيناً
          </h1>
          <p style={{ fontSize: 15, color: "#ddd", lineHeight: 1.9, marginBottom: 6 }}>
            تبرّعك اليوم هو حياةٌ لطفل، دواءٌ لمريض، قوتٌ لجائع، وسكنٌ لمشرّد.
          </p>
          <p style={{ fontSize: 13, color: "#bbb", fontStyle: "italic", marginBottom: 32, lineHeight: 1.8 }}>
            مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً وَاللَّهُ يَقْبِضُ وَيَبْسُطُ وَإِلَيْهِ تُرْجَعُون
          </p>
          <Link href="/donate" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", color: "#1a1a1a", padding: "14px 38px",
            borderRadius: 100, textDecoration: "none", fontWeight: 700, fontSize: 16,
          }}>انقر هنا ←</Link>
        </div>
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <section style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", fontFamily: F }}>
            {[
              { label: "إجمالي الشهداء",   value: fmt(latest.ext_killed_cum),          color: "#dc2626" },
              { label: "إجمالي الجرحى",    value: fmt(latest.ext_injured_cum),         color: "#d97706" },
              { label: "شهداء الأطفال",    value: fmt(latest.ext_killed_children_cum), color: "#7c3aed" },
              { label: "شهداء النساء",     value: fmt(latest.ext_killed_women_cum),    color: "#db2777" },
              { label: "أيام العدوان",     value: fmt(days),                           color: "#1a1a1a" },
            ].map((s, i, a) => (
              <div key={s.label} style={{ textAlign: "center", padding: "22px 10px", borderLeft: i < a.length-1 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURED STORY (like mobile screenshot) ════════════ */}
      <section style={{ maxWidth: 860, margin: "52px auto 0", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 28px rgba(0,0,0,.08)" }}>
          {/* Image with share bar */}
          <div style={{ position: "relative" }}>
            <div style={{
              height: 290, background: "linear-gradient(135deg,#1a1a2e,#16213e)",
              position: "relative", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1602491674275-316d95560fb1?w=900&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: .7 }} />
            </div>
            {/* Share strip */}
            <div style={{ background: "rgba(0,0,0,.72)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 18 }}>
                {["📸","🐦","👥","💬"].map((ic,i) => <button key={i} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#ccc" }}>{ic}</button>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ccc", fontSize: 12, fontFamily: F }}>
                <span style={{ width: 18, height: 18, background: "rgba(255,255,255,.12)", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>🔗</span>
                ساعد بمشاركة المنشور
              </div>
            </div>
          </div>

          <div style={{ padding: "28px 30px 34px", fontFamily: F }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.55, marginBottom: 22 }}>
              وحدة وحزن لا يوصفان، وبراءة تبحث عن أمان وسط الخراب.
            </h2>

            {/* Donate button */}
            <Link href="/donate" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "#2563eb", color: "#fff", padding: "15px 32px", borderRadius: 100,
              textDecoration: "none", fontWeight: 700, fontSize: 16, marginBottom: 16,
            }}>تبرع ←</Link>

            {/* Progress bar */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 8 }}>
              <span>مدفوع <strong style={{ color: "#1a1a1a" }}>300</strong></span>
              <span>متبقي <strong style={{ color: "#1a1a1a" }}>2700</strong></span>
            </div>
            <div style={{ height: 8, background: "#f0f0f0", borderRadius: 100, overflow: "hidden", marginBottom: 26 }}>
              <div style={{ width: "10%", height: "100%", background: "#1a1a1a", borderRadius: 100 }} />
            </div>

            {/* Story text */}
            <p style={{ fontSize: 14, color: "#555", lineHeight: 2 }}>
              في زقاق ضيق من أزقة غزة، طفل صغير أصبح يتيماً فجأة بعد أن فقد والديه في غارة جوية. عيونٌ صغيرة تعكس خوفاً وحيرةً لا لمن عاش تجربة الفقد الكبير. يبقى الطفل الصغير رمزاً للصمود، محتضناً من قبل عائلته الممتدة أو جيرانه، وسط مجتمع يحاول أن يخفف عنه وطأة الخسارة. قصته تذكر العالم بأن وراء كل رقم إحصائي هناك روح بريئة تحتاج إلى الحماية والأمل.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ آخر الأخبار ════════════ */}
      <section style={{ maxWidth: 860, margin: "52px auto 0", padding: "0 24px" }}>
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontFamily: F, fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>آخر الأخبار</h2>
          <div style={{ width: 52, height: 3, background: "#1a1a1a", borderRadius: 2, marginTop: 8 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {newsItems.map(item => (
            <Link key={item.id} href={`/publications/${item.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", display: "flex", border: "1px solid #e8e8e8" }}>
                <div style={{ flex: 1, padding: "16px 18px" }}>
                  <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.6 }}>
                    {item.title.length > 55 ? item.title.slice(0, 55) + "..." : item.title}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: 12, color: "#999", marginBottom: 10, lineHeight: 1.6 }}>{item.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#bbb", fontFamily: F }}>
                    <span>🕐</span> منذ يومين
                  </div>
                </div>
                {/* Thumbnail */}
                <div style={{ width: 115, flexShrink: 0, background: "linear-gradient(135deg,#1a1a2e,#16213e)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 32, opacity: .5 }}>🇵🇸</div>
                  <div style={{ position: "absolute", bottom: 6, left: 4, right: 4, background: "rgba(0,0,0,.5)", borderRadius: 4, padding: "2px 6px", fontFamily: F, fontSize: 8, color: "#ccc", textAlign: "center" }}>فريق آفاق</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/publications" style={{
            display: "inline-block", border: "1.5px solid #ccc", color: "#555",
            padding: "11px 30px", borderRadius: 100, textDecoration: "none",
            fontFamily: F, fontSize: 13, fontWeight: 500, background: "#fff",
          }}>عرض الكل</Link>
        </div>
      </section>

      {/* ════════════ الحالات الإنسانية ════════════ */}
      <section style={{ maxWidth: 1200, margin: "60px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: F, fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>الحالات الإنسانية</h2>
          <Link href="/publications?cat=%D8%AD%D8%A7%D9%84%D8%A7%D8%AA+%D8%A5%D9%86%D8%B3%D8%A7%D9%86%D9%8A%D8%A9" style={{
            border: "1.5px solid #ccc", color: "#555", padding: "9px 22px",
            borderRadius: 100, textDecoration: "none", fontFamily: F, fontSize: 13, background: "#fff",
          }}>عرض الكل</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
          {humanCases.map(p => <PubCard key={p.id} pub={p} />)}
        </div>
      </section>

      {/* ════════════ حملات الجمعية ════════════ */}
      <section style={{ maxWidth: 1200, margin: "60px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: F, fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>حملات الجمعية</h2>
          <Link href="/publications?cat=%D8%AD%D9%85%D9%84%D8%A7%D8%AA+%D8%A7%D9%84%D8%AC%D9%85%D8%B9%D9%8A%D8%A9" style={{
            border: "1.5px solid #ccc", color: "#555", padding: "9px 22px",
            borderRadius: 100, textDecoration: "none", fontFamily: F, fontSize: 13, background: "#fff",
          }}>عرض الكل</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
          {campaigns.map(p => <PubCard key={p.id} pub={p} />)}
        </div>
      </section>

      {/* ════════════ CTA Banner ════════════ */}
      <section style={{ maxWidth: 1200, margin: "60px auto 0", padding: "0 24px" }}>
        <div style={{
          background: "#1a1a1a", borderRadius: 20, padding: "44px 36px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20, fontFamily: F,
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 6, letterSpacing: 1 }}>لا تنتظر... كن أنت البداية 🤍</div>
            <h2 style={{ fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 8 }}>
              ساهم في رسم البسمة على وجوه أطفال غزة
            </h2>
            <p style={{ fontSize: 13, color: "#555" }}>تبرع الآن وكن جزءاً من السعادة</p>
          </div>
          <Link href="/donate" style={{
            background: "#fff", color: "#1a1a1a", padding: "14px 32px",
            borderRadius: 100, textDecoration: "none", fontWeight: 700, fontSize: 15,
          }}>تبرع الآن ←</Link>
        </div>
      </section>

      <Footer />
      <style>{`* { box-sizing: border-box; } @media(max-width:600px){ section > div > div[style*="repeat(5"] { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}