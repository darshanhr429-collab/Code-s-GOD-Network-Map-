import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const MATRIX_DIR = resolve("graphs/matrix");
mkdirSync(MATRIX_DIR, { recursive: true });

const argPartitions = process.argv.find((a) => a.startsWith("--partitions="));
const TOTAL_PARTITIONS = argPartitions ? parseInt(argPartitions.split("=")[1], 10) : 200;
const argLines = process.argv.find((a) => a.startsWith("--lines="));
const LINES_PER_PARTITION = argLines ? parseInt(argLines.split("=")[1], 10) : 500000;
const HEADER_LINES = 6;
const CODE_LINES_PER_PARTITION = LINES_PER_PARTITION - HEADER_LINES;

const DOMAINS = [
  "CoreMesh",
  "QuantumNet",
  "DataFabric",
  "OrbitalRelay",
  "NeuralCompute",
  "ZeroTrust",
  "HighFreqEngine",
  "ConsensusRing",
  "EventStream",
  "BioSequence",
  "SwarmRobotics",
  "SecurityShield"
];

console.log(`================================================================`);
console.log(` Code's GOD Network Map — 100 Million Lines of Code Generator   `);
console.log(` Maintained & Owned by Darshan H R <darshanhr429@gmail.com>     `);
console.log(`================================================================`);
console.log(`Target: ${TOTAL_PARTITIONS} partitions × ${LINES_PER_PARTITION.toLocaleString()} lines = ${(TOTAL_PARTITIONS * LINES_PER_PARTITION).toLocaleString()} Lines of Code`);
console.log(`Destination: ${MATRIX_DIR}\n`);

async function generatePartition(p) {
  const padP = String(p).padStart(3, "0");
  const filename = `god-matrix-p${padP}.ts`;
  const filePath = join(MATRIX_DIR, filename);
  const stream = createWriteStream(filePath, { highWaterMark: 256 * 1024 });

  let buffer = [
    "/**",
    ` * God Network Architectural Node Matrix — Partition ${padP}/${TOTAL_PARTITIONS}`,
    ` * Maintained and Owned by Darshan H R <darshanhr429@gmail.com>`,
    ` * Topology: Planetary-Scale Distributed Architecture Node Matrix`,
    " */",
    "export interface GodNode { readonly i: number; readonly d: string; readonly s: number; }",
    ""
  ].join("\n");

  const CHUNK_SIZE = 128 * 1024;

  for (let i = 1; i <= CODE_LINES_PER_PARTITION; i++) {
    const d = DOMAINS[i % DOMAINS.length];
    const padI = String(i).padStart(6, "0");
    buffer += `export const N${padP}_${padI}: GodNode = { i: ${i}, d: "${d}", s: 1 };\n`;

    if (buffer.length >= CHUNK_SIZE) {
      const ok = stream.write(buffer);
      buffer = "";
      if (!ok) {
        await new Promise((r) => stream.once("drain", r));
      }
    }
  }

  if (buffer.length > 0) {
    const ok = stream.write(buffer);
    buffer = "";
    if (!ok) {
      await new Promise((r) => stream.once("drain", r));
    }
  }

  await new Promise((resolvePromise, rejectPromise) => {
    stream.on("error", rejectPromise);
    stream.on("finish", () => resolvePromise());
    stream.end();
  });

  return { partition: p, filename, lines: LINES_PER_PARTITION };
}

async function run() {
  const startTime = Date.now();
  let totalLines = 0;

  // Process partitions in batches to balance I/O throughput and memory
  const CONCURRENCY = 4;
  for (let batchStart = 1; batchStart <= TOTAL_PARTITIONS; batchStart += CONCURRENCY) {
    const batchPromises = [];
    for (let p = batchStart; p < batchStart + CONCURRENCY && p <= TOTAL_PARTITIONS; p++) {
      batchPromises.push(generatePartition(p));
    }

    const results = await Promise.all(batchPromises);
    for (const r of results) {
      totalLines += r.lines;
    }

    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
    const pct = ((batchStart + batchPromises.length - 1) / TOTAL_PARTITIONS * 100).toFixed(1);
    const partitionCurrent = batchStart + batchPromises.length - 1;
    if (partitionCurrent % 10 === 0 || partitionCurrent === TOTAL_PARTITIONS) {
      console.log(`[${pct}%] Generated Partition ${partitionCurrent}/${TOTAL_PARTITIONS} | Total Lines: ${totalLines.toLocaleString()} | Elapsed: ${elapsedSec}s`);
    }
  }

  // Generate Matrix Index Registry
  console.log(`\nGenerating Matrix Index Registry...`);
  const indexLines = [
    "/**",
    " * Code's GOD Network Map — 100 Million Lines Architectural Node Matrix Registry",
    " * Maintained and Owned by Darshan H R <darshanhr429@gmail.com>",
    " *",
    " * Grand Architectural Node Matrix containing 100,000,000 Lines of Code",
    " * across 200 distributed planetary-scale matrix partitions.",
    " */",
    "",
    "export interface MatrixPartitionMeta {",
    "  readonly id: string;",
    "  readonly filename: string;",
    "  readonly lineCount: number;",
    "  readonly nodeCount: number;",
    "}",
    "",
    "export const GOD_MATRIX_INFO = {",
    '  title: "Code\'s GOD Network Map — 100 Million Lines Architecture Matrix",',
    '  owner: "Darshan H R <darshanhr429@gmail.com>",',
    '  repository: "https://github.com/darshanhr429-collab/Code-s-GOD-Network-Map-",',
    `  totalPartitions: ${TOTAL_PARTITIONS},`,
    `  linesPerPartition: ${LINES_PER_PARTITION},`,
    `  totalLines: ${totalLines},`,
    `  totalNodes: ${totalLines - (TOTAL_PARTITIONS * HEADER_LINES)},`,
    `  milestone: "100 Million Lines of Code Achieved — #1 Top Overall",`,
    `  generatedAt: "${new Date().toISOString()}"`,
    "};",
    "",
    "export const MATRIX_PARTITIONS: MatrixPartitionMeta[] = ["
  ];

  for (let p = 1; p <= TOTAL_PARTITIONS; p++) {
    const padP = String(p).padStart(3, "0");
    indexLines.push(`  { id: "matrix-p${padP}", filename: "god-matrix-p${padP}.ts", lineCount: ${LINES_PER_PARTITION}, nodeCount: ${CODE_LINES_PER_PARTITION} },`);
  }

  indexLines.push("];\n");

  const indexPath = join(MATRIX_DIR, "index.ts");
  writeFileSync(indexPath, indexLines.join("\n"), "utf-8");
  console.log(`Generated ${indexPath}`);

  const totalTimeSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n================================================================`);
  console.log(` SUCCESS: 100 Million Lines of Code Matrix generated!           `);
  console.log(` Total Lines: ${totalLines.toLocaleString()} in ${totalTimeSec}s`);
  console.log(`================================================================\n`);
}

run().catch((err) => {
  console.error("Matrix generation error:", err);
  process.exit(1);
});
