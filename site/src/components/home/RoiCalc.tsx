"use client";

import { useState } from "react";
import { Btn } from "@/components/ui/Btn";
import { ROI } from "@/content/home";
import { PRICING } from "@/lib/site";
import { trackOnce } from "@/lib/analytics";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function Slider({
  label,
  value,
  min,
  max,
  valueText,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  valueText: string;
  display: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`roi-${label}`} className="eyebrow text-neutral-700">
          {label}
        </label>
        <output className="text-[20px] font-extrabold tracking-[-.03em]">
          {display}
        </output>
      </div>
      <input
        id={`roi-${label}`}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => {
          onChange(Number(e.target.value));
          trackOnce("roi_calc_use");
        }}
        className="roi-slider mt-3 w-full"
      />
    </div>
  );
}

export function RoiCalc() {
  const [emp, setEmp] = useState(10);
  const [hrs, setHrs] = useState(5);
  const [rate, setRate] = useState(25);

  const monthly = emp * hrs * rate * 4.333;
  const annual = emp * hrs * rate * 52;
  const paybackMonths = PRICING.roiBuildBaseline / monthly;
  const payback =
    paybackMonths < 1 ? "Under 1 month" : `${paybackMonths.toFixed(1)} months`;
  const barWidth = Math.min(100, Math.max(3, (monthly / 30000) * 100));

  return (
    <div className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-2">
      <div className="flex flex-col gap-8">
        <Slider
          label="EMPLOYEES"
          value={emp}
          min={1}
          max={80}
          display={String(emp)}
          valueText={`${emp} employees`}
          onChange={setEmp}
        />
        <Slider
          label="ADMIN HOURS / PERSON / WEEK"
          value={hrs}
          min={1}
          max={30}
          display={String(hrs)}
          valueText={`${hrs} hours per week`}
          onChange={setHrs}
        />
        <Slider
          label="AVERAGE HOURLY RATE"
          value={rate}
          min={12}
          max={120}
          display={`$${rate}`}
          valueText={`$${rate} per hour`}
          onChange={setRate}
        />
      </div>

      <div className="border-2 border-ink bg-bg p-[clamp(18px,2.4vw,34px)]">
        <p className="eyebrow text-neutral-700">BURNED ON BUSYWORK — PER MONTH</p>
        <p
          className="mt-3 font-extrabold leading-none tracking-[-.035em] text-accent"
          style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
        >
          {money(monthly)}
        </p>

        <div
          className="mt-5 h-[8px] bg-neutral-300"
          role="presentation"
        >
          <div
            className="h-full bg-accent"
            style={{
              width: `${barWidth}%`,
              transition: "width 420ms cubic-bezier(.16,1,.3,1)",
            }}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-[2px] bg-ink">
          <div className="bg-bg pr-4 pt-5">
            <p className="eyebrow text-neutral-700">PER YEAR</p>
            <p className="mt-2 text-[clamp(20px,2.4vw,30px)] font-extrabold tracking-[-.03em]">
              {money(annual)}
            </p>
          </div>
          <div className="bg-bg pl-4 pt-5">
            <p className="eyebrow text-neutral-700">PAYBACK ON A BUILD</p>
            <p className="mt-2 text-[clamp(20px,2.4vw,30px)] font-extrabold tracking-[-.03em]">
              {payback}
            </p>
          </div>
        </div>

        <ul className="mt-6 flex flex-col gap-[10px] border-t-2 border-t-ink pt-6">
          {ROI.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3 text-[14px] leading-[1.55]">
              <span aria-hidden="true" className="text-accent-700">
                —
              </span>
              {outcome}
            </li>
          ))}
        </ul>

        <Btn href="#contact" block className="mt-6">
          {ROI.cta}
        </Btn>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-700">
          {ROI.caption}
        </p>
      </div>
    </div>
  );
}
