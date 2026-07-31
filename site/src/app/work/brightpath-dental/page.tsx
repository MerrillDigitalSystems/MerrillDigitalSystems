import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { CaseStudyPage } from "@/components/templates/CaseStudyPage";
import { BRIGHTPATH_DENTAL as data } from "@/content/work/brightpath-dental";

export const metadata: Metadata = buildMeta({
  title: data.title,
  description: data.description,
  path: data.slug,
});

export default function Page() {
  return <CaseStudyPage data={data} />;
}
