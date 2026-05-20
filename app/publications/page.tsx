"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PubCard from "../components/PubCard";
import Link from "next/link";
import { PUBS } from "../lib/api";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";
const CATS = ["الكل","حالات إنسانية","حملات الجمعية","إنجازات المؤسسة"];

export default function PublicationsPage() {
  const [cat, setCat] = useState("الكل");
  const filtered = cat === "الكل" ? PUBS : PUBS.filter(p => p.category === cat);

  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />

      {/* Header */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:10 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>جميع المنشورات</span>
        </div>
        <h1 style={{ fontSize:38, fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>جميع المنشورات</h1>
        <p style={{ color:"#999", fontSize:13 }}>{PUBS.length} منشور — حملات وحالات وإنجازات</p>
      </div>

      {/* Filter tabs */}
      <div style={{ maxWidth:1200, margin:"20px auto 0", padding:"0 24px", display:"flex", gap:10, flexWrap:"wrap" }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding:"9px 22px", borderRadius:100,
            border:`1.5px solid ${cat===c?"#1a1a1a":"#ddd"}`,
            background: cat===c?"#1a1a1a":"#fff",
            color: cat===c?"#fff":"#666",
            fontFamily:F, fontSize:13, fontWeight:cat===c?600:400, cursor:"pointer",
          }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ maxWidth:1200, margin:"28px auto 60px", padding:"0 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:22 }}>
          {filtered.map(p => <PubCard key={p.id} pub={p} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#aaa", fontFamily:F, fontSize:16 }}>
            لا توجد منشورات في هذه الفئة
          </div>
        )}
      </div>

      <Footer />
      <style>{`*{box-sizing:border-box;}`}</style>
    </div>
  );
}