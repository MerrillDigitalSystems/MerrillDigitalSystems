import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { CaseStudyPage } from "@/components/templates/CaseStudyPage";
import { BAYS_BAKED_GOODS as data } from "@/content/work/bays-baked-goods";

export const metadata: Metadata = buildMeta({
  title: data.title,
  description: data.description,
  path: data.slug,
});

export default function Page() {
  return <CaseStudyPage data={data} />;
}
