import Link from "next/link";
import { Publication } from "../lib/types";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

// Gradient per category
const GRAD: Record<string, string> = {
  "حالات إنسانية":   "linear-gradient(135deg,#1a1a2e,#16213e)",
  "حملات الجمعية":   "linear-gradient(135deg,#0d2137,#1a3a5c)",
  "إنجازات المؤسسة": "linear-gradient(135deg,#1a2e1a,#163a16)",
};

export default function PubCard({ pub }: { pub: Publication }) {
  const total = pub.paid + pub.remaining;
  const pct   = total > 0 ? (pub.paid / total) * 100 : 0;

  return (
    <div style={{
      background: "#fff", borderRadius: 14, overflow: "hidden",
      border: "1px solid #e8e8e8", display: "flex", flexDirection: "column",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    }}>
      {/* Image area */}
      <div style={{
        height: 210, background: GRAD[pub.category] ?? GRAD["حالات إنسانية"],
        position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{ fontSize: 60, opacity: 0.35 }}>🇵🇸</div>
        <div style={{
          position: "absolute", bottom: 8, left: 8, right: 8,
          background: "rgba(0,0,0,.55)", borderRadius: 6, padding: "4px 10px",
          fontFamily: F, fontSize: 9, color: "#ccc", textAlign: "center",
        }}>
          فريق آفاق | أمانة لغاية أملنا في غزة
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", fontFamily: F }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.6, marginBottom: 10 }}>
          {pub.title}
        </h3>
        <span style={{
          display: "inline-block", background: "#1a1a1a", color: "#fff",
          borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 600,
          marginBottom: 10, alignSelf: "flex-start",
        }}>{pub.category}</span>
        <p style={{ fontSize: 12, color: "#888", lineHeight: 1.8, flex: 1 }}>{pub.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#bbb", marginTop: 10, marginBottom: 12 }}>
          <span>🕐</span> منذ يومين
        </div>

        {/* Progress */}
        {total > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 5 }}>
              <span>مدفوع <strong style={{ color: "#1a1a1a" }}>{pub.paid}$</strong></span>
              <span>متبقي <strong style={{ color: "#1a1a1a" }}>{pub.remaining}$</strong></span>
            </div>
            <div style={{ height: 5, background: "#f0f0f0", borderRadius: 100 }}>
              <div style={{ width: `${Math.max(pct > 0 ? pct : 0, pct > 0 ? 2 : 0)}%`, height: "100%", background: "#2563eb", borderRadius: 100 }} />
            </div>
          </div>
        )}

        <Link href="/donate" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          background: "#2563eb", color: "#fff", padding: "12px", borderRadius: 8,
          textDecoration: "none", fontSize: 14, fontWeight: 700,
        }}>تبرع ←</Link>
      </div>
    </div>
  );
}