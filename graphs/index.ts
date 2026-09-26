/**
 * Code's GOD Network Map — Topology Catalog Index
 * Maintained and Owned by Darshan H R <darshanhr429@gmail.com>
 *
 * Exposes pre-computed architecture graphs, neural meshes,
 * and multi-language dependency topologies.
 */

export interface CatalogMetadata {
  id: string;
  name: string;
  filename: string;
  description: string;
  nodeCount: number;
  edgeCount: number;
}

export const CATALOG_REGISTRY: CatalogMetadata[] = [
  {
    id: "god-network-master",
    name: "God Network Master Topology",
    filename: "god-network-master-topology.json",
    description: "Universal master topology network map connecting multi-region distributed nodes.",
    nodeCount: 2200,
    edgeCount: 3959
  },
  {
    id: "distributed-cloud-mesh",
    name: "Distributed Cloud Mesh",
    filename: "distributed-cloud-mesh.json",
    description: "High-throughput cloud mesh infrastructure with zero-trust networking.",
    nodeCount: 2000,
    edgeCount: 3599
  },
  {
    id: "neural-agent-orchestrator",
    name: "Neural Agent Orchestrator",
    filename: "neural-agent-orchestrator.json",
    description: "Multi-agent autonomous swarm hierarchy and collaborative pipeline topology.",
    nodeCount: 2000,
    edgeCount: 3596
  },
  {
    id: "enterprise-microservices-matrix",
    name: "Enterprise Microservices Matrix",
    filename: "enterprise-microservices-matrix.json",
    description: "Enterprise-grade event-driven microservices catalog with distributed tracing.",
    nodeCount: 2000,
    edgeCount: 3596
  },
  {
    id: "multi-language-ast-catalog",
    name: "Multi-Language AST Catalog",
    filename: "multi-language-ast-catalog.json",
    description: "Cross-language AST syntax dependency catalog spanning 10 programming paradigms.",
    nodeCount: 1800,
    edgeCount: 3239
  }
];

export default CATALOG_REGISTRY;
