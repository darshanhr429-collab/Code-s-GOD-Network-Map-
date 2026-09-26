import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

const CATALOG_DIR = resolve("graphs/catalog");
mkdirSync(CATALOG_DIR, { recursive: true });

const nodeTypes = [
  "function", "class", "module", "service", "endpoint",
  "pipeline", "config", "resource", "table", "schema",
  "domain", "flow", "step", "article", "entity", "topic"
];

const edgeTypes = [
  "calls", "imports", "exports", "contains", "inherits",
  "implements", "subscribes", "publishes", "middleware",
  "reads_from", "writes_to", "transforms", "validates",
  "depends_on", "tested_by", "configures", "routes",
  "defines_schema", "serves", "deploys", "triggers"
];

const domains = [
  "Authentication & IAM", "Core Engine Orchestration", "Data Pipeline & ETL",
  "Distributed Storage & Caching", "API Gateway & Routing", "Event Bus & Messaging",
  "AI Inference & LLM Tooling", "Real-Time Telemetry & Monitoring",
  "Billing & Financial Ledger", "Knowledge Graph Construction"
];

const complexities = ["simple", "moderate", "complex"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateGraphCatalogFile(filename, projectName, description, targetNodeCount) {
  const nodes = [];
  const edges = [];
  const edgeSet = new Set();

  for (let i = 0; i < targetNodeCount; i++) {
    const type = pick(nodeTypes);
    const domain = pick(domains);
    const complexity = pick(complexities);
    const id = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-node-${i}`;
    const name = `${type.toUpperCase()}_${domain.replace(/[^A-Za-z0-9]/g, "")}_${i}`;

    nodes.push({
      id,
      type,
      name,
      filePath: type === "function" || type === "class" || type === "module"
        ? `src/${domain.toLowerCase().replace(/[^a-z0-9]/g, "/")}/${name.toLowerCase()}.ts`
        : undefined,
      summary: `Automated architectural ${type} component handling ${domain.toLowerCase()} requirements within ${projectName}.`,
      tags: [type, domain.toLowerCase().replace(/[^a-z0-9]/g, "-"), complexity],
      complexity,
      domain,
      metadata: {
        layer: `L${(i % 7) + 1}`,
        importance: (i % 10) + 1,
        active: true,
        version: "2.9.7"
      }
    });
  }

  // Create realistic dependency graph with ~1.8 edges per node
  const targetEdgeCount = Math.floor(targetNodeCount * 1.8);
  for (let i = 0; i < targetEdgeCount; i++) {
    const sourceIdx = Math.floor(Math.random() * targetNodeCount);
    let targetIdx = Math.floor(Math.random() * targetNodeCount);
    if (sourceIdx === targetIdx) targetIdx = (targetIdx + 1) % targetNodeCount;

    const source = nodes[sourceIdx].id;
    const target = nodes[targetIdx].id;
    const edgeKey = `${source}->${target}`;

    if (!edgeSet.has(edgeKey)) {
      edgeSet.add(edgeKey);
      const edgeType = pick(edgeTypes);
      edges.push({
        source,
        target,
        type: edgeType,
        weight: (i % 5) + 1,
        direction: "to",
        description: `${nodes[sourceIdx].name} ${edgeType.replace(/_/g, " ")} ${nodes[targetIdx].name}`
      });
    }
  }

  const layers = [
    { id: "layer-1", name: "Edge & API Gateway", description: "Traffic ingress and protocol negotiation", nodeIds: nodes.slice(0, Math.floor(targetNodeCount * 0.15)).map(n => n.id) },
    { id: "layer-2", name: "Core Application Services", description: "Business logic and flow orchestration", nodeIds: nodes.slice(Math.floor(targetNodeCount * 0.15), Math.floor(targetNodeCount * 0.45)).map(n => n.id) },
    { id: "layer-3", name: "Domain & Entity Models", description: "Domain-driven data entities and state validation", nodeIds: nodes.slice(Math.floor(targetNodeCount * 0.45), Math.floor(targetNodeCount * 0.70)).map(n => n.id) },
    { id: "layer-4", name: "Persistence & Infrastructure", description: "Distributed databases, caches, and storage backends", nodeIds: nodes.slice(Math.floor(targetNodeCount * 0.70)).map(n => n.id) },
  ];

  const tour = [
    {
      id: "step-1",
      title: "System Entrypoint",
      description: "Architecture overview and high-level routing boundaries.",
      nodeIds: nodes.slice(0, 5).map(n => n.id)
    },
    {
      id: "step-2",
      title: "Core Processing Pipeline",
      description: "Primary computational logic and distributed task executors.",
      nodeIds: nodes.slice(10, 15).map(n => n.id)
    },
    {
      id: "step-3",
      title: "Resilient Storage Tier",
      description: "Transactional databases and event-log storage systems.",
      nodeIds: nodes.slice(20, 25).map(n => n.id)
    }
  ];

  const graph = {
    version: "1.0",
    project: {
      name: projectName,
      author: "Darshan H R <darshanhr429@gmail.com>",
      repository: "https://github.com/darshanhr429-collab/Code-s-GOD-Network-Map-",
      languages: ["TypeScript", "Python", "Go", "Rust"],
      frameworks: ["React", "FastAPI", "Express", "Kubernetes"],
      description,
      analyzedAt: new Date().toISOString(),
      gitCommitHash: "e3ba60beee9e2d3bbfe2aa253245452d3d9ce459"
    },
    nodes,
    edges,
    layers,
    tour
  };

  const filePath = join(CATALOG_DIR, filename);
  writeFileSync(filePath, JSON.stringify(graph, null, 2), "utf-8");
  console.log(`Generated ${filename}: ${nodes.length} nodes, ${edges.length} edges.`);
}

console.log("Building Code's GOD Network Map Catalog...");

// Generating 5 comprehensive architectural datasets
generateGraphCatalogFile("god-network-master-topology.json", "God Network Master Topology", "Universal master topology network map connecting multi-region distributed nodes.", 2200);
generateGraphCatalogFile("distributed-cloud-mesh.json", "Distributed Cloud Mesh", "High-throughput cloud mesh infrastructure with zero-trust networking.", 2000);
generateGraphCatalogFile("neural-agent-orchestrator.json", "Neural Agent Orchestrator", "Multi-agent autonomous swarm hierarchy and collaborative pipeline topology.", 2000);
generateGraphCatalogFile("enterprise-microservices-matrix.json", "Enterprise Microservices Matrix", "Enterprise-grade event-driven microservices catalog with distributed tracing.", 2000);
generateGraphCatalogFile("multi-language-ast-catalog.json", "Multi-Language AST Catalog", "Cross-language AST syntax dependency catalog spanning 10 programming paradigms.", 1800);

console.log("All catalog datasets created successfully.");
