export interface DailyRecord {
  report_date: string;
  killed: number;
  ext_killed: number;
  ext_killed_cum: number;
  ext_killed_children_cum: number;
  ext_killed_women_cum: number;
  injured_cum: number;
  ext_injured: number;
  ext_injured_cum: number;
  ext_civdef_killed_cum: number;
  med_killed_cum: number;
  ext_med_killed_cum: number;
  press_killed_cum: number;
  ext_press_killed_cum: number;
  ext_massacres_cum: number;
  report_source: string;
  report_period: number;
  killed_cum: number;
}

export interface Publication {
  id: string;
  title: string;
  category: "حالات إنسانية" | "حملات الجمعية" | "إنجازات المؤسسة";
  excerpt: string;
  date: string;
  paid: number;
  remaining: number;
  slug: string;
}