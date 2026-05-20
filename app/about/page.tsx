import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default function AboutPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:10 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>من نحن</span>
        </div>
        <h1 style={{ fontSize:38, fontWeight:700, color:"#1a1a1a", marginBottom:6 }}>من نحن</h1>
        <p style={{ color:"#888", fontSize:14, marginBottom:32 }}>فريق آفاق — قصتنا ورسالتنا</p>
      </div>

      {/* Hero */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", marginBottom:40 }}>
        <div style={{ borderRadius:18, overflow:"hidden", height:300, background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center", color:"#fff", fontFamily:F }}>
            <div style={{ fontSize:56, marginBottom:14 }}>🌳</div>
            <div style={{ fontSize:28, fontWeight:700, marginBottom:6 }}>فريق آفاق</div>
            <div style={{ fontSize:12, color:"#aaa", letterSpacing:2 }}>AAFAQTEAM</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px 60px", fontFamily:F }}>
        {/* Mission + Vision */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:28 }}>
          {[
            { icon:"🎯", title:"رسالتنا", text:"فريق آفاق هو فريق إنساني متطوع يعمل على دعم أهالي غزة الصامدين، من خلال حملات توثيق وجمع التبرعات وتقديم المساعدات الميدانية المباشرة. نحن نؤمن بأن كل شخص يستطيع أن يكون جزءاً من الحل." },
            { icon:"👁️", title:"رؤيتنا", text:"نسعى إلى عالم تُصان فيه كرامة الإنسان، وتُرفع فيه المعاناة عن كل نازح ومحاصر. نؤمن بأن التوثيق والشفافية هما أساس الثقة والعمل الإنساني الحقيقي." },
          ].map(c=>(
            <div key={c.title} style={{ background:"#fff", borderRadius:16, padding:"30px", border:"1px solid #e8e8e8" }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{c.icon}</div>
              <h2 style={{ fontSize:19, fontWeight:700, color:"#1a1a1a", marginBottom:12 }}>{c.title}</h2>
              <p style={{ fontSize:14, color:"#666", lineHeight:2 }}>{c.text}</p>
            </div>
          ))}
        </div>

        {/* Numbers */}
        <div style={{ background:"#1a1a1a", borderRadius:18, padding:"40px 28px", marginBottom:28 }}>
          <h2 style={{ fontSize:22, fontWeight:700, color:"#fff", textAlign:"center", marginBottom:30, fontFamily:F }}>إنجازاتنا بالأرقام</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:20 }}>
            {[
              { num:"+500", label:"حالة إنسانية موثقة" },
              { num:"+200", label:"متطوع ومتطوعة" },
              { num:"+50",  label:"حملة توزيع مساعدات" },
              { num:"+30",  label:"دولة مانحة" },
            ].map(s=>(
              <div key={s.label} style={{ textAlign:"center" }}>
                <div style={{ fontSize:34, fontWeight:700, color:"#fff", marginBottom:6 }}>{s.num}</div>
                <div style={{ fontSize:12, color:"#666" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <h2 style={{ fontSize:24, fontWeight:700, color:"#1a1a1a", marginBottom:20 }}>قيمنا</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:18, marginBottom:40 }}>
          {[
            { icon:"🤝", title:"الأمانة والشفافية",   desc:"كل تبرع يصل لمستحقيه مع توثيق كامل وشفاف." },
            { icon:"💪", title:"الصمود والاستمرار",   desc:"لن نتوقف عن العمل ما دامت الحاجة قائمة." },
            { icon:"❤️", title:"الإنسانية أولاً",      desc:"نتعامل مع كل حالة باحترام وكرامة كاملة." },
            { icon:"🌍", title:"التضامن العالمي",      desc:"نبني جسور التواصل بين المانحين حول العالم وأهالي غزة." },
          ].map(v=>(
            <div key={v.title} style={{ background:"#fff", borderRadius:14, padding:"24px", border:"1px solid #e8e8e8" }}>
              <div style={{ fontSize:26, marginBottom:10 }}>{v.icon}</div>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#1a1a1a", marginBottom:8 }}>{v.title}</h3>
              <p style={{ fontSize:13, color:"#888", lineHeight:1.8 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center" }}>
          <Link href="/donate" style={{ display:"inline-block", background:"#1a1a1a", color:"#fff", padding:"15px 40px", borderRadius:100, textDecoration:"none", fontWeight:700, fontSize:16 }}>
            تبرع الآن وكن جزءاً من الأثر ←
          </Link>
        </div>
      </div>

      <Footer />
      <style>{`*{box-sizing:border-box;} @media(max-width:700px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}