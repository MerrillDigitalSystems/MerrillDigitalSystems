import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { ServicePage } from "@/components/templates/ServicePage";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { ELECTRICIAN_WEBSITE_DESIGN_UTAH as data } from "@/content/pages/electrician-website-design-utah";

export const metadata: Metadata = buildMeta({
  title: data.title,
  description: data.description,
  path: data.slug,
});

export default function Page() {
  return (
    <ScopeProvider>
      <ServicePage data={data} />
    </ScopeProvider>
  );
}
