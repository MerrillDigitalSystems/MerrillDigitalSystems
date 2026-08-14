/**
 * Barrel for the ServicePageData set. Exists so anything that needs to walk
 * every service page — llms.txt today, guards and audits tomorrow — reads one
 * list instead of 17 imports that silently go stale when a page is added.
 */

import type { ServicePageData } from "../types";

import { BOOKKEEPING_SOFTWARE } from "./bookkeeping-software";
import { CONTRACTOR_WEBSITE_DESIGN_UTAH } from "./contractor-website-design-utah";
import { CUSTOM_SOFTWARE_VS_SERVICETITAN_UTAH } from "./custom-software-vs-servicetitan-utah";
import { ELECTRICIAN_WEBSITE_DESIGN_UTAH } from "./electrician-website-design-utah";
import { FIELD_SERVICE_SOFTWARE } from "./field-service-software";
import { HVAC_WEBSITE_DESIGN_UTAH } from "./hvac-website-design-utah";
import { JOB_MANAGEMENT_SOFTWARE_UTAH } from "./job-management-software-utah";
import { LANDSCAPING_WEBSITE_DESIGN_UTAH } from "./landscaping-website-design-utah";
import { MANAGED_SERVICES } from "./managed-services";
import { OPERATIONS_SOFTWARE } from "./operations-software";
import { PLUMBER_WEBSITE_DESIGN_UTAH } from "./plumber-website-design-utah";
import { ROOFING_WEBSITE_DESIGN_UTAH } from "./roofing-website-design-utah";
import { WEB_DESIGN_OGDEN } from "./web-design-ogden";
import { WEB_DESIGN_PROVO } from "./web-design-provo";
import { WEB_DESIGN_SALT_LAKE_CITY } from "./web-design-salt-lake-city";
import { WEB_DESIGN_UTAH } from "./web-design-utah";
import { WEB_DESIGN_WEST_JORDAN } from "./web-design-west-jordan";

export const SERVICE_PAGES: ServicePageData[] = [
  BOOKKEEPING_SOFTWARE,
  CONTRACTOR_WEBSITE_DESIGN_UTAH,
  CUSTOM_SOFTWARE_VS_SERVICETITAN_UTAH,
  ELECTRICIAN_WEBSITE_DESIGN_UTAH,
  FIELD_SERVICE_SOFTWARE,
  HVAC_WEBSITE_DESIGN_UTAH,
  JOB_MANAGEMENT_SOFTWARE_UTAH,
  LANDSCAPING_WEBSITE_DESIGN_UTAH,
  MANAGED_SERVICES,
  OPERATIONS_SOFTWARE,
  PLUMBER_WEBSITE_DESIGN_UTAH,
  ROOFING_WEBSITE_DESIGN_UTAH,
  WEB_DESIGN_OGDEN,
  WEB_DESIGN_PROVO,
  WEB_DESIGN_SALT_LAKE_CITY,
  WEB_DESIGN_UTAH,
  WEB_DESIGN_WEST_JORDAN,
];
