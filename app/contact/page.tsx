"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default function ContactPage() {
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent]     = useState(false);

  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />

      {/* Breadcrumb + title */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:10 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>تواصل معنا</span>
        </div>
        <h1 style={{ fontSize:38, fontWeight:700, color:"#1a1a1a", marginBottom:28 }}>اتصل بنا</h1>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px 60px" }}>
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #e8e8e8", overflow:"hidden" }}>
          <div style={{
            display:"grid", gridTemplateColumns:"1fr 1fr",
          }}>
            {/* ── LEFT: Contact info ── */}
            <div style={{ padding:"44px 40px", borderLeft:"1px solid #f0f0f0" }}>
              <h2 style={{ fontSize:22, fontWeight:700, color:"#1a1a1a", textAlign:"center", marginBottom:6 }}>
                معلومات التواصل
              </h2>
              <div style={{ width:56, height:3, background:"#1a1a1a", borderRadius:2, margin:"0 auto 34px" }} />

              <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
                {/* Phone */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                  <span style={{ fontSize:14, color:"#444", fontFamily:F }}>اتصل الآن‎+970-567-135-679</span>
                  <div style={{ width:40, height:40, background:"#2563eb", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, color:"#fff", flexShrink:0 }}>📞</div>
                </div>
                {/* Email */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                  <span style={{ fontSize:14, color:"#444", fontFamily:F }}>aafaqqteam@gmail.com</span>
                  <div style={{ width:40, height:40, background:"#2563eb", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, color:"#fff", flexShrink:0 }}>📧</div>
                </div>
                {/* Address */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                  <span style={{ fontSize:13, color:"#555", lineHeight:1.9, fontFamily:F }}>
                    غزة-فلسطين-الرمال-شارع عمرو بن العاص<br/>
                    مقابل مدرسة المامونية خلف معلب<br/>
                    فلسطين
                  </span>
                  <div style={{ width:40, height:40, background:"#e8e8e8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>📍</div>
                </div>
              </div>

              {/* Social icons */}
              <div style={{ display:"flex", gap:12, marginTop:38, justifyContent:"center" }}>
                {[["📧","Email"],["📸","Instagram"],["👥","Facebook"],["🐦","Twitter"]].map(([ic,lb])=>(
                  <button key={lb} title={lb} style={{ width:42, height:42, borderRadius:"50%", border:"1.5px solid #e0e0e0", background:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>{ic}</button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div style={{ padding:"44px 40px", fontFamily:F }}>
              {sent ? (
                <div style={{ textAlign:"center", paddingTop:60 }}>
                  <div style={{ fontSize:52, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontSize:22, fontWeight:700, color:"#1a1a1a", marginBottom:8 }}>تم إرسال رسالتك!</h3>
                  <p style={{ fontSize:13, color:"#888" }}>سنتواصل معك في أقرب وقت ممكن.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <input placeholder="الاسم كامل" style={fi} />
                    <input placeholder="البريد الإلكتروني" type="email" style={fi} />
                  </div>
                  <textarea placeholder="رسالتك" rows={7} style={{ ...fi, resize:"none", lineHeight:1.8 }} />

                  <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:13, color:"#555" }}>
                    <div onClick={()=>setAgreed(!agreed)} style={{ width:18, height:18, borderRadius:4, border:"1.5px solid #ccc", background:agreed?"#1a1a1a":"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
                      {agreed&&<span style={{ color:"#fff", fontSize:11 }}>✓</span>}
                    </div>
                    أوافق على سياسة الخصوصية
                  </label>

                  <button onClick={()=>agreed&&setSent(true)} style={{
                    width:"100%", padding:"15px", background:agreed?"#1a1a1a":"#ccc",
                    color:"#fff", border:"none", borderRadius:10,
                    fontFamily:F, fontSize:16, fontWeight:700,
                    cursor:agreed?"pointer":"not-allowed",
                  }}>إرسال</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`*{box-sizing:border-box;} @media(max-width:700px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

const fi: React.CSSProperties = {
  width:"100%", padding:"13px 16px", border:"1.5px solid #e0e0e0",
  borderRadius:10, fontFamily:"IBM Plex Sans Arabic, Arial, sans-serif",
  fontSize:14, color:"#1a1a1a", outline:"none", background:"#fff", direction:"rtl",
};