import { fetchCasualties, getLatest, fmt, fmtDate, daysSince } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default async function StatsPage() {
  const data   = await fetchCasualties();
  const latest = getLatest(data);
  const days   = daysSince();
  const avgK   = (latest.ext_killed_cum / days).toFixed(1);
  const avgI   = (latest.ext_injured_cum / days).toFixed(1);
  const childP = ((latest.ext_killed_children_cum / latest.ext_killed_cum)*100).toFixed(1);
  const womenP = ((latest.ext_killed_women_cum    / latest.ext_killed_cum)*100).toFixed(1);

  const TABS = [
    { label:"الإجمالي",        href:"/statistics",        active:true  },
    { label:"الرسوم البيانية", href:"/statistics/charts", active:false },
    { label:"اليومي",          href:"/statistics/daily",  active:false },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:8 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>الإحصائيات</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:34, fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>الإحصائيات الإجمالية</h1>
            <p style={{ fontSize:13, color:"#888" }}>آخر تحديث: {fmtDate(latest.report_date)} — {days} يوماً على العدوان</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {TABS.map(t=>(
              <Link key={t.href} href={t.href} style={{ padding:"9px 20px", borderRadius:100, textDecoration:"none", fontSize:13, fontWeight:t.active?600:400, background:t.active?"#1a1a1a":"#fff", color:t.active?"#fff":"#666", border:t.active?"none":"1px solid #e0e0e0" }}>{t.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"26px auto", padding:"0 24px", fontFamily:F }}>
        {/* Big cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:16, marginBottom:20 }}>
          {[
            { label:"إجمالي الشهداء",  value:fmt(latest.ext_killed_cum),          sub:`معدل ${avgK} يومياً`,      color:"#dc2626", bg:"#fff5f5", border:"#fecaca", icon:"🩸" },
            { label:"إجمالي الجرحى",   value:fmt(latest.ext_injured_cum),         sub:`معدل ${avgI} يومياً`,      color:"#d97706", bg:"#fffbeb", border:"#fde68a", icon:"🏥" },
            { label:"شهداء الأطفال",   value:fmt(latest.ext_killed_children_cum), sub:`${childP}% من الإجمالي`,  color:"#7c3aed", bg:"#f5f3ff", border:"#ddd6fe", icon:"👶" },
            { label:"شهداء النساء",    value:fmt(latest.ext_killed_women_cum),    sub:`${womenP}% من الإجمالي`,  color:"#db2777", bg:"#fdf2f8", border:"#fbcfe8", icon:"👩" },
          ].map(c=>(
            <div key={c.label} style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:16, padding:"24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ fontSize:26 }}>{c.icon}</span>
                <span style={{ fontSize:11, color:c.color, background:"rgba(255,255,255,.7)", border:`1px solid ${c.border}`, borderRadius:100, padding:"3px 12px", fontWeight:600 }}>{c.label}</span>
              </div>
              <div style={{ fontSize:36, fontWeight:700, color:c.color, lineHeight:1, marginBottom:8 }}>{c.value}</div>
              <div style={{ fontSize:12, color:"#888" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Two col */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {/* Breakdown bars */}
          <div style={{ background:"#fff", border:"1px solid #e8e8e8", borderRadius:16, overflow:"hidden" }}>
            <div style={{ padding:"17px 22px", borderBottom:"1px solid #f0f0f0", fontWeight:700, fontSize:15, color:"#1a1a1a" }}>📊 تفصيل حسب الفئة</div>
            <div style={{ padding:"22px" }}>
              {[
                { label:"الصحفيون",        value:latest.ext_press_killed_cum,    color:"#2563eb" },
                { label:"الكوادر الطبية",  value:latest.ext_med_killed_cum,      color:"#059669" },
                { label:"الدفاع المدني",   value:latest.ext_civdef_killed_cum,   color:"#d97706" },
                { label:"الأطفال",         value:latest.ext_killed_children_cum, color:"#7c3aed" },
                { label:"النساء",          value:latest.ext_killed_women_cum,    color:"#db2777" },
              ].map(item=>{
                const pct = Math.min(100,(item.value/latest.ext_killed_cum)*100);
                return (
                  <div key={item.label} style={{ marginBottom:18 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:13, color:"#555" }}>{item.label}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:"#1a1a1a" }}>{fmt(item.value)}</span>
                    </div>
                    <div style={{ height:6, background:"#f3f4f6", borderRadius:100 }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:item.color, borderRadius:100 }} />
                    </div>
                    <div style={{ fontSize:11, color:"#bbb", marginTop:3 }}>{pct.toFixed(2)}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Facts + dark card */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:"#fff", border:"1px solid #e8e8e8", borderRadius:16, overflow:"hidden" }}>
              <div style={{ padding:"17px 22px", borderBottom:"1px solid #f0f0f0", fontWeight:700, fontSize:15, color:"#1a1a1a" }}>⚡ أرقام بارزة</div>
              <div style={{ padding:"18px 22px" }}>
                {[
                  { label:"عدد المجازر",         value:fmt(latest.ext_massacres_cum), color:"#dc2626" },
                  { label:"أيام العدوان",         value:fmt(days),                    color:"#1a1a1a" },
                  { label:"معدل شهداء يومياً",   value:avgK,                         color:"#d97706" },
                  { label:"معدل جرحى يومياً",    value:avgI,                         color:"#2563eb" },
                ].map(item=>(
                  <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:"1px solid #f8f8f8" }}>
                    <span style={{ fontSize:13, color:"#666" }}>{item.label}</span>
                    <span style={{ fontSize:20, fontWeight:700, color:item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"#1a1a1a", borderRadius:16, padding:"22px", flex:1 }}>
              <div style={{ fontSize:11, color:"#555", marginBottom:4 }}>منذ السابع من أكتوبر ٢٠٢٣</div>
              <div style={{ fontSize:32, fontWeight:700, color:"#dc2626", marginBottom:4 }}>{fmt(latest.ext_killed_cum)}</div>
              <div style={{ fontSize:12, color:"#555", marginBottom:16 }}>شهيداً وشهيدة</div>
              <div style={{ height:1, background:"#2a2a2a", marginBottom:16 }} />
              <div style={{ fontSize:32, fontWeight:700, color:"#d97706", marginBottom:4 }}>{fmt(latest.ext_injured_cum)}</div>
              <div style={{ fontSize:12, color:"#555" }}>جريحاً وجريحة</div>
            </div>
          </div>
        </div>

        {/* Explore */}
        <div style={{ marginTop:20, background:"#fff", border:"1px solid #e8e8e8", borderRadius:16, padding:"24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:"#1a1a1a", marginBottom:5 }}>استكشف البيانات تفاعلياً</h3>
            <p style={{ fontSize:13, color:"#888" }}>رسوم بيانية وجداول يومية مفصلة</p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/statistics/charts" style={{ background:"#1a1a1a", color:"#fff", padding:"12px 24px", borderRadius:100, textDecoration:"none", fontWeight:600, fontSize:14 }}>الرسوم البيانية ←</Link>
            <Link href="/statistics/daily"  style={{ background:"#fff", color:"#1a1a1a", padding:"12px 24px", borderRadius:100, textDecoration:"none", fontSize:14, border:"1.5px solid #e0e0e0" }}>البيانات اليومية</Link>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`*{box-sizing:border-box;} @media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}