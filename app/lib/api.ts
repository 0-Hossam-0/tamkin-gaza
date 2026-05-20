import { DailyRecord, Publication } from "./types";

export async function fetchCasualties(): Promise<DailyRecord[]> {
  const res = await fetch(
    "https://data.techforpalestine.org/api/v2/casualties_daily.json",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export const getLatest = (d: DailyRecord[]) => d[d.length - 1];
export const fmt = (n: number) => n?.toLocaleString("ar-EG") ?? "0";
export const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
export const daysSince = () =>
  Math.floor((Date.now() - new Date("2023-10-07").getTime()) / 86400000);

export const PUBS: Publication[] = [
  { id:"1", title:"يد تحتضن يداً صغيرة تُعاني في الحضانة جزاء القصف في غزة", category:"حالات إنسانية", excerpt:"حنان في قلب الدمار... ودفءٌ وسط الرماد.", date:"2025-12-29", paid:0, remaining:867, slug:"hand-baby" },
  { id:"2", title:"يدٌ وقُدمٌ تقطعت في غزة من القصف", category:"حالات إنسانية", excerpt:"أعضاءٌ غابت عن الجسد، لكنها لم تُغيب روح.", date:"2025-12-29", paid:0, remaining:234, slug:"limbs-lost" },
  { id:"3", title:"يوم التعلم في غزة", category:"حملات الجمعية", excerpt:"يوم تتجسد فيه إرادة الحياة رغم كل التحديات.", date:"2025-12-29", paid:0, remaining:232, slug:"learning-day" },
  { id:"4", title:"يوم ملأ المياه في غزة", category:"حملات الجمعية", excerpt:"يوم لا لُنَسى حين غمَّ الفرح والارتياح بين الناس بعد انقطاع طويل للمياه.", date:"2025-12-29", paid:0, remaining:300, slug:"water-day" },
  { id:"5", title:"مشهد يومي في غزة", category:"حملات الجمعية", excerpt:"روتين يبدو عادياً... لكنه مليء بالصبر والتحدي.", date:"2025-12-27", paid:0, remaining:150, slug:"daily-scene" },
  { id:"6", title:"وسط الحصار في غزة... معاناة", category:"حملات الجمعية", excerpt:"أنفاسٌ تَختنق بصمت، وأملٌ لا يموت.", date:"2025-12-27", paid:0, remaining:400, slug:"siege" },
  { id:"7", title:"توزيع أحذية لأكثر من 50 طفلاً", category:"إنجازات المؤسسة", excerpt:"توزيع أحذية لأكثر من 50 طفلاً بتاريخ 12/17", date:"2025-12-17", paid:300, remaining:0, slug:"shoes" },
  { id:"8", title:"توزيع ملابس شتوية لـ 48 طفلاً", category:"إنجازات المؤسسة", excerpt:"توزيع ملابس شتوية لـ 48 طفلاً بتاريخ 12/29", date:"2025-12-29", paid:400, remaining:0, slug:"winter-clothes" },
];