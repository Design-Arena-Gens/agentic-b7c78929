import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import {
  harmonyPillars,
  herbs,
  journalPrompts,
  miniPlan,
  relaxationPractices,
  tonics,
} from "@/data/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const accentColor = "#3d7c6e";
const gold = "#caa36a";
const ink = "#1d1c1a";

function addSectionHeading(
  doc: PDFKit.PDFDocument,
  heading: string,
  subtitle?: string,
) {
  doc
    .moveDown(1.2)
    .fillColor(gold)
    .fontSize(12)
    .font("Helvetica")
    .text(heading.toUpperCase(), { characterSpacing: 1.6 });

  if (subtitle) {
    doc
      .moveDown(0.15)
      .fillColor(ink)
      .font("Helvetica-Bold")
      .fontSize(18)
      .text(subtitle, { lineGap: 4 });
  }

  doc.moveDown(0.25);
  doc.fillColor("#dddddd").rect(doc.x, doc.y, doc.page.width - 100, 1).fill();
  doc.moveDown(0.8);
}

export async function GET() {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
    info: {
      Title: "Harmony Health Blueprint",
      Author: "Mary's Digital Lab",
      Subject:
        "Minimalist digital wellness guide aligning brain, heart, body, and beauty.",
    },
  });

  const buffers: Buffer[] = [];
  doc.on("data", (chunk) => buffers.push(chunk as Buffer));

  const pdfBufferPromise = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);
  });

  // Cover
  doc
    .rect(0, 0, doc.page.width, doc.page.height)
    .fill("#f6f3ef")
    .fillColor(gold)
    .font("Helvetica")
    .fontSize(12)
    .text("Mary's Digital Lab Presents", 50, 60, {
      characterSpacing: 2,
    });

  doc
    .moveDown(1)
    .fillColor(ink)
    .font("Helvetica-Bold")
    .fontSize(34)
    .text("Harmony Health Blueprint", {
      width: doc.page.width - 100,
      characterSpacing: 1,
    });

  doc
    .moveDown(0.8)
    .font("Helvetica")
    .fontSize(15)
    .fillColor("#4c4b48")
    .text(
      "A minimalist-luxury map to align brain, heart, body, and beauty. Inside: daily harmony ritual, hydration and sleep essentials, breath and movement micro-practices, signature tonics, botanical allies, relaxation scripts, 7-day mini plan, printable planner, shopping checklist, and reflective prompts.",
      { lineGap: 6 },
    );

  doc
    .moveDown(1.5)
    .fillColor(accentColor)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Designed for screens - Ready to print - Sustainable shifts");

  doc.addPage();

  // Daily ritual & pillars
  addSectionHeading(
    doc,
    "Harmony Pillars",
    "Daily ritual, hydration & sleep, movement micro-practices",
  );

  harmonyPillars.forEach((pillar) => {
    doc
      .fillColor(accentColor)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(pillar.title);

    doc
      .moveDown(0.2)
      .fillColor("#4c4b48")
      .font("Helvetica")
      .fontSize(11)
      .text(pillar.description, { lineGap: 4 });

    pillar.steps.forEach((step) => {
      doc
        .moveDown(0.2)
        .font("Helvetica")
        .fontSize(10)
        .fillColor(ink)
        .text(`- ${step}`, { indent: 10, lineGap: 2 });
    });

    doc.moveDown(0.8);
  });

  // Tonics
  doc.addPage();
  addSectionHeading(
    doc,
    "Signature Tonics",
    "Three quick recipes with functional nourishment",
  );

  tonics.forEach((tonic) => {
    doc
      .fillColor(accentColor)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(`${tonic.name} - ${tonic.timing}`);

    doc.moveDown(0.3).fontSize(11).fillColor("#4c4b48").text("Ingredients:");
    tonic.elements.forEach((element) => {
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(ink)
        .text(`- ${element}`, { indent: 15, lineGap: 1.8 });
    });

    doc.moveDown(0.4).fontSize(11).fillColor("#4c4b48").text("Benefits:");
    tonic.benefits.forEach((benefit) => {
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(ink)
        .text(`- ${benefit}`, { indent: 15, lineGap: 1.8 });
    });

    doc.moveDown(1);
  });

  // Herbs
  doc.addPage();
  addSectionHeading(doc, "Herbal Core Six", "Botanical highlights");

  herbs.forEach((herb) => {
    doc
      .fillColor(accentColor)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(herb.name);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gold)
      .text(herb.signature);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#4c4b48")
      .text(`Usage: ${herb.usage}`, { lineGap: 2 });

    doc.moveDown(0.8);
  });

  // Relaxation
  doc.addPage();
  addSectionHeading(
    doc,
    "Guided Relaxation",
    "Concise daily + evening scripts",
  );

  relaxationPractices.forEach((practice) => {
    doc
      .fillColor(accentColor)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(practice.name);

    doc
      .moveDown(0.2)
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#4c4b48")
      .text(practice.description, { lineGap: 4 });

    practice.steps.forEach((step) => {
      doc
        .moveDown(0.2)
        .font("Helvetica")
        .fontSize(10)
        .fillColor(ink)
        .text(`- ${step}`, { indent: 10 });
    });

    doc.moveDown(1);
  });

  // Mini plan
  doc.addPage();
  addSectionHeading(doc, "7-Day Mini Plan", "One elegant shift per day");

  miniPlan.forEach((day) => {
    doc
      .fillColor(accentColor)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(day.day);

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gold)
      .text(day.focus);

    day.actions.forEach((action) => {
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(ink)
        .text(`- ${action}`, { indent: 10, lineGap: 2 });
    });

    doc.moveDown(0.8);
  });

  // Planner + checklist
  doc.addPage();
  addSectionHeading(
    doc,
    "Planner & Checklist",
    "Weekly alignment & apothecary essentials",
  );

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(accentColor)
    .text("Planner Focus Areas");
  doc
    .moveDown(0.4)
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#4c4b48")
    .text(
      "Morning ritual - Hydration - Movement - Nourishment - Beauty practice - Rest & sleep",
      { lineGap: 3 },
    );

  doc.moveDown(0.6).font("Helvetica-Bold").fontSize(11).fillColor(accentColor)
    .text("Shopping Checklist");

  doc
    .moveDown(0.2)
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#4c4b48")
    .text(
      "Apothecary & Herbs: Tulsi - Schisandra - Rhodiola - Nettle leaf - He Shou Wu - Lemon balm",
      { lineGap: 3 },
    )
    .moveDown(0.2)
    .text(
      "Fresh Market: Cucumber - Pear - Citrus - Ginger - Pomegranate - Fresh herbs - Seasonal berries",
      { lineGap: 3 },
    )
    .moveDown(0.2)
    .text(
      "Pantry Staples: Raw honey or yacon syrup - Sea or Celtic salt - Vanilla bean paste - Liquid chlorophyll - Almond/oat milk - Coconut blossom sugar",
      { lineGap: 3 },
    );

  // Journal prompts
  doc.addPage();
  addSectionHeading(doc, "Journal & Tracking", "Prompts + audio note");

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#4c4b48")
    .text(
      "Optional audio bundle: Stream directly inside the web guide or download the WAV files for offline listening. Suggested pairing - Daybreak Reset with morning ritual, Evening Release with Golden Moon latte wind-down.",
      { lineGap: 4 },
    );

  doc
    .moveDown(0.6)
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(accentColor)
    .text("Reflective Prompts");

  journalPrompts.forEach((prompt) => {
    doc
      .moveDown(0.3)
      .font("Helvetica")
      .fontSize(10)
      .fillColor(ink)
      .text(`- ${prompt}`, { lineGap: 3 });
  });

  doc
    .moveDown(1)
    .font("Helvetica-Oblique")
    .fontSize(9)
    .fillColor("#7d7a74")
    .text(
      "Tiny, sustainable shifts compound. Revisit this blueprint weekly, celebrate gradual expansion, and layer practices as life allows.",
      { lineGap: 4 },
    );

  doc.end();

  const pdfBuffer = await pdfBufferPromise;

  return new NextResponse(pdfBuffer as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"Harmony-Health-Blueprint.pdf\"",
      "Cache-Control": "no-store",
    },
  });
}
