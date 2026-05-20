import Link from "next/link";
import logo from "../assets/logo2.png";
import Image from "next/image";
const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a1a", color: "#aaa", direction: "rtl", marginTop: 80 }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "50px 24px 32px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))",
        gap: 40, fontFamily: F,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 45, height: 45, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              <Image src={logo} alt="Afaq Logo" width={56} height={56} style={{ objectFit: "fill" }} />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>فريق آفاق</div>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: 1.5 }}>AAFAQTEAM</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 2, color: "#666" }}>
            فريق إنساني متطوع يعمل على دعم أهالي غزة الصامدين، من خلال حملات توثيق وجمع التبرعات وتقديم المساعدات الميدانية.
          </p>
          <div style={{ marginTop: 16, fontSize: 11, color: "#444" }}>مصدر البيانات: Tech for Palestine</div>
        </div>

        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 16 }}>الصفحات</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 13 }}>
            {[["الصفحة الرئيسية","/"],["من نحن","/about"],["المنشورات","/publications"],["إحصاءات غزة","/statistics"],["تواصل معنا","/contact"],["تبرع الآن","/donate"]].map(([l,h]) => (
              <Link key={h} href={h} style={{ color: "#666", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 16 }}>منشورات آفاق</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 13 }}>
            {["حملات الجمعية","حالات إنسانية","إنجازات المؤسسة"].map(c => (
              <Link key={c} href={`/publications?cat=${encodeURIComponent(c)}`} style={{ color: "#666", textDecoration: "none" }}>{c}</Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 16 }}>تواصل معنا</div>
          <div style={{ fontSize: 13, color: "#666", lineHeight: 2.3 }}>
            <div>📞 ‎+970-567-135-679</div>
            <div>📧 aafaqqteam@gmail.com</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8, marginTop: 4 }}>
              غزة-فلسطين-الرمال-شارع عمرو بن العاص<br/>مقابل مدرسة المامونية خلف معلب فلسطين
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {["📧","📸","👥","🐦"].map((ic,i) => (
              <button key={i} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #333", background: "transparent", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{ic}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2a2a2a", padding: "20px 24px", textAlign: "center", fontSize: 12, color: "#444", fontFamily: F }}>
        جميع الحقوق محفوظة © 2025 — فريق آفاق
      </div>
    </footer>
  );
}