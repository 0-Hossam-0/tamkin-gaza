"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";
const AMOUNTS = [20,50,100,500,1000,2000];
const CITIES  = ["غزة","رفح","خان يونس","دير البلح","جباليا","النصيرات"];
const CAMPAIGNS = [
  "وحدة وحزن لا يوصفان، وبراءة تبحث عن أمان وسط الخراب.",
  "يد تحتضن يداً صغيرة تُعاني في الحضانة",
  "يوم ملأ المياه في غزة",
  "توزيع ملابس شتوية",
];
const PAY = [
  { id:"stripe",     label:"stripe",     color:"#635bff" },
  { id:"visa",       label:"VISA",       color:"#1a1f71" },
  { id:"mastercard", label:"Mastercard", color:"#eb001b" },
  { id:"paypal",     label:"PayPal",     color:"#003087" },
];

export default function DonatePage() {
  const [amount, setAmount]   = useState(20);
  const [custom, setCustom]   = useState("");
  const [useCustom, setUC]    = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [showName, setShowName] = useState(false);
  const [pay, setPay]         = useState("stripe");
  const [city, setCity]       = useState("");
  const [campaign, setCampaign] = useState(CAMPAIGNS[0]);
  const [done, setDone]       = useState(false);

  const finalAmt = useCustom && custom ? parseFloat(custom) : amount;

  if (done) return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />
      <div style={{ maxWidth:560, margin:"80px auto", padding:"0 24px", textAlign:"center", fontFamily:F }}>
        <div style={{ background:"#fff", borderRadius:20, padding:"60px 36px", border:"1px solid #e8e8e8" }}>
          <div style={{ fontSize:58, marginBottom:18 }}>✅</div>
          <h2 style={{ fontSize:26, fontWeight:700, color:"#1a1a1a", marginBottom:10 }}>شكراً لتبرعك!</h2>
          <p style={{ fontSize:14, color:"#888", lineHeight:2, marginBottom:28 }}>
            جزاك الله خيراً على دعمك لأهالي غزة.<br/>
            تبرعك بمبلغ <strong style={{ color:"#2563eb" }}>${finalAmt}</strong> سيصل لمن يحتاجه إن شاء الله.
          </p>
          <Link href="/" style={{ display:"inline-block", background:"#1a1a1a", color:"#fff", padding:"13px 32px", borderRadius:100, textDecoration:"none", fontWeight:600 }}>
            العودة للرئيسية
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:10 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>تبرع الآن</span>
        </div>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#1a1a1a" }}>تبرع الآن</h1>
      </div>

      <div style={{ maxWidth:860, margin:"24px auto 60px", padding:"0 24px" }}>
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #e8e8e8", overflow:"hidden" }}>

          {/* ── DONOR DETAILS ── */}
          <div style={{ padding:"34px 34px 0", fontFamily:F }}>
            <h2 style={{ fontSize:22, fontWeight:700, color:"#1a1a1a", textAlign:"center", marginBottom:6 }}>تفاصيل المتبرع</h2>
            <div style={{ width:56, height:3, background:"#1a1a1a", borderRadius:2, margin:"0 auto 28px" }} />

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <input placeholder="اسم المتبرع"          style={inp} />
              <input placeholder="البريد الإلكتروني" type="email" style={inp} />
              <input placeholder="رقم الهاتف"        type="tel"   style={inp} />

              {/* Campaign select */}
              <div style={{ position:"relative" }}>
                <select value={campaign} onChange={e=>setCampaign(e.target.value)} style={{ ...inp, paddingLeft:34, appearance:"none" as const }}>
                  {CAMPAIGNS.map(c=><option key={c}>{c}</option>)}
                </select>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:11, color:"#888", pointerEvents:"none" }}>▾</span>
              </div>

              {/* City select */}
              <div style={{ position:"relative" }}>
                <select value={city} onChange={e=>setCity(e.target.value)} style={{ ...inp, paddingLeft:34, appearance:"none" as const, color:city?"#1a1a1a":"#aaa" }}>
                  <option value="">اختر المدينة</option>
                  {CITIES.map(c=><option key={c}>{c}</option>)}
                </select>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:11, color:"#888", pointerEvents:"none" }}>▾</span>
              </div>

              <textarea placeholder="رسالتك (اختياري)" rows={4} style={{ ...inp, resize:"none", lineHeight:1.8 }} />

              {/* Show name checkbox */}
              <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer", fontSize:13, color:"#555" }}>
                <div onClick={()=>setShowName(!showName)} style={{ width:18, height:18, borderRadius:4, border:"1.5px solid #ccc", background:showName?"#1a1a1a":"#fff", flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                  {showName && <span style={{ color:"#fff", fontSize:11 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontWeight:600, color:"#1a1a1a", marginBottom:2 }}>التعريف بالمتبرع</div>
                  <div style={{ color:"#888", fontSize:12 }}>لا بأس بذكر اسمي في لوائح الشرف والشكر</div>
                </div>
              </label>
            </div>
          </div>

          <div style={{ margin:"28px 34px 0", height:1, background:"#f0f0f0" }} />

          {/* ── AMOUNT ── */}
          <div style={{ padding:"28px 34px 0", fontFamily:F }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:"#1a1a1a", marginBottom:20 }}>اختر المبلغ المراد التبرع به</h3>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
              {AMOUNTS.map(a => (
                <button key={a} onClick={()=>{ setAmount(a); setUC(false); }} style={{
                  padding:"14px", borderRadius:10, border:`1.5px solid ${!useCustom&&amount===a?"#1a1a1a":"#e0e0e0"}`,
                  background:!useCustom&&amount===a?"#f5f5f5":"#fff",
                  fontFamily:F, fontSize:16, fontWeight:600, color:"#1a1a1a", cursor:"pointer", position:"relative",
                }}>
                  ${a}
                  {!useCustom&&amount===a&&(
                    <div style={{ position:"absolute", top:-9, left:-9, width:20, height:20, background:"#1a1a1a", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ color:"#fff", fontSize:11 }}>✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom */}
            <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, cursor:"pointer", fontSize:13, color:"#555" }}>
              <div onClick={()=>setUC(!useCustom)} style={{ width:18, height:18, borderRadius:4, border:"1.5px solid #ccc", background:useCustom?"#1a1a1a":"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                {useCustom&&<span style={{ color:"#fff", fontSize:11 }}>✓</span>}
              </div>
              إضافة مبلغ آخر
            </label>
            {useCustom && (
              <div style={{ display:"flex", alignItems:"center", border:"1.5px solid #e0e0e0", borderRadius:10, overflow:"hidden", marginBottom:12 }}>
                <span style={{ padding:"0 14px", color:"#888", fontSize:16, background:"#f8f8f8", borderLeft:"1px solid #e0e0e0", height:"100%", display:"flex", alignItems:"center", alignSelf:"stretch" }}>$</span>
                <input type="number" placeholder="أدخل المبلغ" value={custom} onChange={e=>setCustom(e.target.value)} style={{ flex:1, padding:"13px 16px", border:"none", fontFamily:F, fontSize:14, outline:"none" }} />
              </div>
            )}

            <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:13, color:"#555" }}>
              <div onClick={()=>setMonthly(!monthly)} style={{ width:18, height:18, borderRadius:4, border:"1.5px solid #ccc", background:monthly?"#1a1a1a":"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                {monthly&&<span style={{ color:"#fff", fontSize:11 }}>✓</span>}
              </div>
              هل تريد أن يكون التبرع شهرياً حسب المبلغ المحدد؟
            </label>
          </div>

          <div style={{ margin:"28px 34px 0", height:1, background:"#f0f0f0" }} />

          {/* ── PAYMENT METHOD ── */}
          <div style={{ padding:"28px 34px 34px", fontFamily:F }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:"#1a1a1a", marginBottom:20 }}>طريقة التبرع</h3>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:28 }}>
              {PAY.map(m => (
                <button key={m.id} onClick={()=>setPay(m.id)} style={{
                  padding:"18px 14px", borderRadius:12, border:`2px solid ${pay===m.id?"#1a1a1a":"#e0e0e0"}`,
                  background:"#fff", cursor:"pointer", position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18, fontWeight:800, color:m.color, letterSpacing:m.id==="stripe"?1:0,
                }}>
                  {m.id==="stripe"&&<span style={{ fontStyle:"italic", letterSpacing:0 }}>stripe</span>}
                  {m.id==="visa"&&<span>VISA</span>}
                  {m.id==="mastercard"&&(
                    <span style={{ display:"flex", gap:2 }}>
                      <span style={{ width:22, height:22, borderRadius:"50%", background:"#eb001b", display:"inline-block" }}/>
                      <span style={{ width:22, height:22, borderRadius:"50%", background:"#f79e1b", display:"inline-block", marginLeft:-10, opacity:.9 }}/>
                    </span>
                  )}
                  {m.id==="paypal"&&<span style={{ color:"#003087" }}>Pay<span style={{ color:"#009cde" }}>Pal</span></span>}
                  {pay===m.id&&(
                    <div style={{ position:"absolute", top:-9, left:-9, width:20, height:20, background:"#1a1a1a", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ color:"#fff", fontSize:11 }}>✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Donate button */}
            <button onClick={()=>setDone(true)} style={{
              width:"100%", padding:"17px", background:"#1a1a1a", color:"#fff",
              border:"none", borderRadius:100, fontFamily:F, fontSize:17, fontWeight:700, cursor:"pointer", marginBottom:22,
            }}>
              تبرع{finalAmt ? ` – $${finalAmt}` : ""}
            </button>

            {/* Trust badges */}
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:13, color:"#aaa", marginBottom:14 }}>موثوق من</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:22, flexWrap:"wrap", marginBottom:18 }}>
                {["🅿️ PayPal","🔒 3D Secure","✅ Verified by VISA","💳 MasterCard SecureCode"].map(b=>(
                  <div key={b} style={{ fontSize:12, color:"#bbb" }}>{b}</div>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
                {[["🔒","Privacy Protected"],["🛡️","Secure Checkout"]].map(([ic,lb])=>(
                  <div key={lb} style={{ display:"flex", alignItems:"center", gap:6, border:"1px solid #e0e0e0", borderRadius:100, padding:"6px 14px", fontSize:11, color:"#aaa" }}>
                    <span>{ic}</span>{lb}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`*{box-sizing:border-box;}`}</style>
    </div>
  );
}

const inp: React.CSSProperties = {
  width:"100%", padding:"13px 16px",
  border:"1.5px solid #e0e0e0", borderRadius:10,
  fontFamily:"IBM Plex Sans Arabic, Arial, sans-serif",
  fontSize:14, color:"#1a1a1a", outline:"none",
  background:"#fff", direction:"rtl",
};