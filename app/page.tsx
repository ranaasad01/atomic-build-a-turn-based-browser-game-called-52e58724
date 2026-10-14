"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpDown, AlertTriangle, Heart, Info, Sparkles, ArrowUp, ArrowDown, Minus, MapPin } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type CityItem = { name: string; region: string; fact: string };
type FeatureItem = { title: string; description: string };
type MarketItem = { good: string; price: string; trend: "up" | "down" | "stable"; note: string };
type EventItem = { title: string; description: string; effect: string };
type StatItem = { value: string; label: string };

const CITY_IMAGES = [
  "/images/xian-ancient-city-wall.jpg",
  "/images/dunhuang-mogao-caves-desert.jpg",
  "/images/samarkand-registan-square.jpg",
  "/images/antioch-ancient-ruins-turkey.jpg",
  "/images/rome-ancient-forum-ruins.jpg",
];

const FEATURE_ICONS = [ArrowUpDown, AlertTriangle, Heart, Info];
const EVENT_ICONS = [AlertTriangle, Sparkles, ArrowDown, ArrowUp];

function TrendIcon({ trend }: { trend: MarketItem["trend"] }) {
  if (trend === "up") return <ArrowUp className="h-4 w-4 text-primary" aria-hidden="true" />;
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />;
  return <Minus className="h-4 w-4 text-muted-foreground" aria-hidden="true" />;
}

export default function HomePage() {
  const t = useTranslations();

  const cityItemsRaw = t.raw("home.cities.items");
  const cities: (CityItem & { image: string })[] = (Array.isArray(cityItemsRaw) ? cityItemsRaw : []).map(
    (c: CityItem, i: number) => ({ ...c, image: CITY_IMAGES[i] ?? CITY_IMAGES[0] }),
  );

  const featureItemsRaw = t.raw("home.features.items");
  const features: FeatureItem[] = Array.isArray(featureItemsRaw) ? featureItemsRaw : [];

  const marketItemsRaw = t.raw("home.market.items");
  const marketGoods: MarketItem[] = Array.isArray(marketItemsRaw) ? marketItemsRaw : [];

  const eventItemsRaw = t.raw("home.events.items");
  const events: EventItem[] = Array.isArray(eventItemsRaw) ? eventItemsRaw : [];

  const statItemsRaw = t.raw("home.stats.items");
  const stats: StatItem[] = Array.isArray(statItemsRaw) ? statItemsRaw : [];

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
                <span className="text-gradient">{t("home.hero.title")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/game" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
                  {t("home.hero.primaryCta")}
                </Link>
                <Link href="/how-to-play" className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent motion-reduce:transition-none">
                  {t("home.hero.secondaryCta")}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border shadow-glow">
                <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e1d4aa69a40947df924bc799d7f3cbe5.jpg" alt="A merchant caravan of camels crossing desert dunes along the Silk Road" className="h-72 w-full object-cover md:h-96" />
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} className="glass-strong absolute -bottom-6 left-4 right-4 rounded-2xl p-5 sm:left-6 sm:right-auto sm:w-72">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("home.ledger.title")}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t("home.ledger.location")}</p>
                    <p className="mt-0.5 font-semibold">{t("home.ledger.locationValue")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("home.ledger.gold")}</p>
                    <p className="mt-0.5 font-semibold text-primary">{t("home.ledger.goldValue")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("home.ledger.supplies")}</p>
                    <p className="mt-0.5 font-semibold">{t("home.ledger.suppliesValue")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("home.ledger.route")}</p>
                    <p className="mt-0.5 font-semibold">{t("home.ledger.routeValue")}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-1.5" aria-hidden="true">
                  {cities.map((_, i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full ${i === 0 ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>
      {/* Features */}
      <Reveal>
        <section id="features" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("home.features.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {t("home.features.title")}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("home.features.subtitle")}
            </p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? Info;
              return (
                <motion.div key={f.title} variants={fadeInUp} className="surface-elevated rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </Reveal>
      {/* Cities route */}
      <Reveal>
        <section id="route" className="bg-card py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.cities.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {t("home.cities.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("home.cities.subtitle")}
              </p>
            </div>
            <div className="mt-14 space-y-14">
              {cities.map((city, i) => (
                <Reveal key={city.name} delay={i * 0.06}>
                  <div
                    className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}>
                    <div className="overflow-hidden rounded-2xl border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                      <img src={i === 0 ? "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/52e58724-3a04-4c19-8afc-8023089a6df8/a2b5db2e2c3941c3b0a483c9ac3e5972.jpg?v=1791972674931" : city.image} alt={city.name} className="h-64 w-full object-cover" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                        {t("home.cities.stopLabel", { number: i + 1 })}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight">{city.name}</h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">{city.region}</p>
                      <p className="mt-4 leading-relaxed text-muted-foreground">{city.fact}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      {/* Market table */}
      <Reveal>
        <section id="market" className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0">
            <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/332adf1449ad438383cd217d1faed87f.jpg" alt="A bustling Silk Road bazaar with stalls of silk, spices, and pottery" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-background/90" />
          </div>
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.market.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {t("home.market.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("home.market.subtitle")}
              </p>
            </div>
            <div className="glass-strong mt-10 overflow-hidden rounded-2xl">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-4 font-semibold">{t("home.market.headGood")}</th>
                    <th className="px-5 py-4 font-semibold">{t("home.market.headPrice")}</th>
                    <th className="px-5 py-4 font-semibold">{t("home.market.headTrend")}</th>
                    <th className="hidden px-5 py-4 font-semibold sm:table-cell">{t("home.market.headNote")}</th>
                  </tr>
                </thead>
                <tbody>
                  {marketGoods.map((g) => (<tr key={g.good} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-medium">{g.good}</td>
                    <td className="px-5 py-4 text-primary font-semibold">{g.price}</td>
                    <td className="px-5 py-4">
                      <TrendIcon trend={g.trend} />
                    </td>
                    <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{g.note}</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>
      {/* Events */}
      <Reveal>
        <section id="events" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("home.events.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {t("home.events.title")}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("home.events.subtitle")}
            </p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {events.map((ev, i) => {
              const Icon = EVENT_ICONS[i] ?? AlertTriangle;
              return (
                <motion.div key={ev.title} variants={fadeInUp} className="surface-elevated flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ev.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ev.description}</p>
                    <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {ev.effect}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </Reveal>
      {/* Stats */}
      <Reveal>
        <section className="bg-card py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-balance text-center text-2xl font-bold tracking-tight md:text-3xl">
              {t("home.stats.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-center leading-relaxed text-muted-foreground">
              {t("home.stats.subtitle")}
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (<div key={s.label} className="text-center">
                <div className="text-gradient text-3xl font-bold md:text-4xl">{s.value}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>))}
            </div>
          </div>
        </section>
      </Reveal>
      {/* Closing CTA */}
      <Reveal>
        <section id="cta" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="bg-gradient-brand rounded-2xl px-8 py-16 text-center shadow-glow md:px-16">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
              {t("home.cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/game" className="inline-flex items-center justify-center rounded-lg bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
                {t("home.cta.primaryCta")}
              </Link>
              <Link href="/how-to-play" className="glass inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transition-none">
                {t("home.cta.secondaryCta")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}