import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { ServicePage } from "@/components/templates/ServicePage";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { MANAGED_SERVICES as data } from "@/content/pages/managed-services";

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
