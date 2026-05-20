"use client";
import { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { DailyRecord } from "../../lib/types";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";

export default function DailyPage() {
  const [data,setData]   = useState<DailyRecord[]>([]);
  const [load,setLoad]   = useState(true);
  const [search,setSrch] = useState("");
  const [page,setPage]   = useState(1);
  const PER = 30;

  useEffect(()=>{
    fetch("https://data.techforpalestine.org/api/v2/casualties_daily.json")
      .then(r=>r.json()).then((d:DailyRecord[])=>{ setData([...d].reverse()); setLoad(false); });
  },[]);

  const filtered = useMemo(()=>search?data.filter(d=>d.report_date.includes(search)):data,[data,search]);
  const totalPg  = Math.ceil(filtered.length/PER);
  const paged    = filtered.slice((page-1)*PER,page*PER);
  const fD = (s:string) => new Date(s).toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"});
  const fN = (n:number|undefined) => n===undefined?"—":n.toLocaleString("ar-EG");

  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />
      <div style={{ maxWidth:1300, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:8 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><Link href="/statistics" style={{ color:"#999", textDecoration:"none" }}>الإحصائيات</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>البيانات اليومية</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <h1 style={{ fontSize:34, fontWeight:700, color:"#1a1a1a" }}>البيانات اليومية</h1>
          <div style={{ display:"flex", gap:8 }}>
            {[{l:"الإجمالي",h:"/statistics"},{l:"الرسوم البيانية",h:"/statistics/charts"},{l:"اليومي",h:"/statistics/daily",a:true}].map(t=>(
              <Link key={t.h} href={t.h} style={{ padding:"9px 20px", borderRadius:100, textDecoration:"none", fontSize:13, fontWeight:t.a?600:400, background:t.a?"#1a1a1a":"#fff", color:t.a?"#fff":"#666", border:t.a?"none":"1px solid #e0e0e0" }}>{t.l}</Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1300, margin:"22px auto", padding:"0 24px", fontFamily:F }}>
        {load ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#888" }}>
            <div style={{ fontSize:36, marginBottom:14 }}>⌛</div>جاري تحميل البيانات...
          </div>
        ):(
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:12 }}>
              <div style={{ fontSize:13, color:"#888" }}>{filtered.length.toLocaleString("ar-EG")} سجل</div>
              <input type="text" placeholder="بحث بالتاريخ (مثال: 2024-06)" value={search} onChange={e=>{setSrch(e.target.value);setPage(1);}} style={{ padding:"10px 16px", borderRadius:100, border:"1.5px solid #e0e0e0", fontFamily:F, fontSize:13, width:260, outline:"none", background:"#fff", direction:"rtl" }} />
            </div>

            <div style={{ background:"#fff", border:"1px solid #e8e8e8", borderRadius:16, overflow:"hidden", marginBottom:18 }}>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", minWidth:720 }}>
                  <thead>
                    <tr style={{ background:"#fafafa" }}>
                      {["التاريخ","شهداء اليوم","الشهداء التراكمي","جرحى اليوم","الجرحى التراكمي","الأطفال (تراكمي)","النساء (تراكمي)","الصحفيون (تراكمي)"].map(h=>(
                        <th key={h} style={{ padding:"13px 14px", textAlign:"right", fontSize:11, color:"#888", fontWeight:600, borderBottom:"1px solid #f0f0f0", whiteSpace:"nowrap", borderLeft:"1px solid #f5f5f5" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((row,idx)=>(
                      <tr key={row.report_date} style={{ background:idx%2===0?"#fff":"#fafafa" }}>
                        <td style={{ padding:"11px 14px", fontSize:13, color:"#555", fontWeight:600, whiteSpace:"nowrap", borderLeft:"1px solid #f5f5f5" }}>{fD(row.report_date)}</td>
                        <td style={{ padding:"11px 14px", textAlign:"center", borderLeft:"1px solid #f5f5f5" }}><span style={{ color:"#dc2626", fontWeight:700, fontSize:13 }}>{fN(row.ext_killed)}</span></td>
                        <td style={{ padding:"11px 14px", textAlign:"center", borderLeft:"1px solid #f5f5f5" }}><span style={{ color:"#dc2626", fontWeight:600, fontSize:13 }}>{fN(row.ext_killed_cum)}</span></td>
                        <td style={{ padding:"11px 14px", textAlign:"center", borderLeft:"1px solid #f5f5f5" }}><span style={{ color:"#d97706", fontWeight:700, fontSize:13 }}>{fN(row.ext_injured)}</span></td>
                        <td style={{ padding:"11px 14px", textAlign:"center", borderLeft:"1px solid #f5f5f5" }}><span style={{ color:"#d97706", fontWeight:600, fontSize:13 }}>{fN(row.ext_injured_cum)}</span></td>
                        <td style={{ padding:"11px 14px", textAlign:"center", borderLeft:"1px solid #f5f5f5" }}><span style={{ color:"#7c3aed", fontSize:13 }}>{fN(row.ext_killed_children_cum)}</span></td>
                        <td style={{ padding:"11px 14px", textAlign:"center", borderLeft:"1px solid #f5f5f5" }}><span style={{ color:"#db2777", fontSize:13 }}>{fN(row.ext_killed_women_cum)}</span></td>
                        <td style={{ padding:"11px 14px", textAlign:"center" }}><span style={{ color:"#2563eb", fontSize:13 }}>{fN(row.ext_press_killed_cum)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPg>1&&(
              <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", alignItems:"center" }}>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ padding:"9px 18px", borderRadius:100, border:"1px solid #e0e0e0", background:page===1?"#f5f5f5":"#fff", color:page===1?"#ccc":"#1a1a1a", cursor:page===1?"default":"pointer", fontFamily:F, fontSize:13 }}>السابق</button>
                {Array.from({length:Math.min(5,totalPg)},(_,i)=>{
                  const pg = Math.max(1,Math.min(page-2,totalPg-4))+i;
                  return pg<=totalPg?<button key={pg} onClick={()=>setPage(pg)} style={{ width:38,height:38,borderRadius:"50%",border:pg===page?"none":"1px solid #e0e0e0",background:pg===page?"#1a1a1a":"#fff",color:pg===page?"#fff":"#555",cursor:"pointer",fontFamily:F,fontSize:13,fontWeight:pg===page?700:400 }}>{pg}</button>:null;
                })}
                <button onClick={()=>setPage(p=>Math.min(totalPg,p+1))} disabled={page===totalPg} style={{ padding:"9px 18px", borderRadius:100, border:"1px solid #e0e0e0", background:page===totalPg?"#f5f5f5":"#fff", color:page===totalPg?"#ccc":"#1a1a1a", cursor:page===totalPg?"default":"pointer", fontFamily:F, fontSize:13 }}>التالي</button>
                <span style={{ fontSize:12, color:"#aaa" }}>صفحة {page} من {totalPg}</span>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
      <style>{`*{box-sizing:border-box;}`}</style>
    </div>
  );
}