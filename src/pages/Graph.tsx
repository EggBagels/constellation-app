import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Settings, 
  ExternalLink, 
  Unlink,
  Eye,
  EyeOff,
  RotateCcw
} from "lucide-react";
import CytoscapeComponent from "react-cytoscapejs";

// Mock data for demonstration
const mockNodes = [
  { id: '1', label: 'Machine Learning', tags: ['AI', 'Technology'], connections: 5 },
  { id: '2', label: 'Neural Networks', tags: ['AI', 'Deep Learning'], connections: 4 },
  { id: '3', label: 'Philosophy of Mind', tags: ['Philosophy', 'Consciousness'], connections: 3 },
  { id: '4', label: 'Quantum Computing', tags: ['Quantum', 'Computing'], connections: 2 },
  { id: '5', label: 'Consciousness', tags: ['Philosophy', 'Mind'], connections: 6 },
];

const mockEdges = [
  { id: 'e1', source: '1', target: '2', strength: 0.8 },
  { id: 'e2', source: '1', target: '3', strength: 0.6 },
  { id: 'e3', source: '3', target: '5', strength: 0.9 },
  { id: 'e4', source: '2', target: '4', strength: 0.4 },
];

const Graph = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [neighborDepth, setNeighborDepth] = useState(1);
  const [showNeighborsOnly, setShowNeighborsOnly] = useState(false);
  const cyRef = useRef<any>(null);

  const cytoscapeElements = [
    ...mockNodes.map(node => ({
      data: { 
        id: node.id, 
        label: node.label,
        tags: node.tags,
        connections: node.connections
      }
    })),
    ...mockEdges.map(edge => ({
      data: { 
        id: edge.id, 
        source: edge.source, 
        target: edge.target,
        strength: edge.strength
      }
    }))
  ];

  const cytoscapeStylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': 'hsl(270, 85%, 70%)',
        'border-color': 'hsl(270, 85%, 85%)',
        'border-width': 2,
        'label': 'data(label)',
        'color': 'hsl(240, 8%, 95%)',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'font-family': 'Inter Variable, sans-serif',
        'width': (ele: any) => Math.max(30, ele.data('connections') * 8),
        'height': (ele: any) => Math.max(30, ele.data('connections') * 8),
      }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': 'hsl(210, 100%, 78%)',
        'border-color': 'hsl(210, 100%, 90%)',
        'border-width': 3,
        'overlay-color': 'hsl(210, 100%, 78%)',
        'overlay-opacity': 0.3,
        'overlay-padding': 10,
      }
    },
    {
      selector: 'edge',
      style: {
        'width': (ele: any) => ele.data('strength') * 5,
        'line-color': 'hsl(270, 45%, 35%)',
        'target-arrow-color': 'hsl(270, 45%, 35%)',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'opacity': 0.6,
      }
    },
    {
      selector: 'edge:selected',
      style: {
        'line-color': 'hsl(210, 100%, 78%)',
        'target-arrow-color': 'hsl(210, 100%, 78%)',
        'opacity': 1,
      }
    }
  ];

  const handleNodeClick = (event: any) => {
    const node = event.target;
    const nodeData = node.data();
    setSelectedNode({
      id: nodeData.id,
      title: nodeData.label,
      tags: nodeData.tags || [],
      summary: `This is a summary for ${nodeData.label}. It represents key concepts and insights related to this topic.`,
      relatedNotes: mockNodes.filter(n => n.id !== nodeData.id).slice(0, 3)
    });
  };

  const resetLayout = () => {
    if (cyRef.current) {
      cyRef.current.layout({ name: 'cose' }).run();
    }
  };

  const allTags = Array.from(new Set(mockNodes.flatMap(node => node.tags)));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/10 bg-abyss/50 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-heading text-pearl">
              Knowledge Graph
            </h1>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mist" />
                <Input
                  placeholder="Search nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="neural-input pl-10 w-64"
                />
              </div>

              {/* Controls */}
              <Button
                onClick={resetLayout}
                variant="outline"
                size="sm"
                className="border-white/20 hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Layout
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-mist" />
              <span className="text-sm text-mist">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={filterTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    filterTags.includes(tag) ? 'bg-cosmic-purple text-white' : 'text-mist hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setFilterTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-mist">Depth:</span>
              <Button
                variant={neighborDepth === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setNeighborDepth(1)}
                className="text-xs"
              >
                1
              </Button>
              <Button
                variant={neighborDepth === 2 ? "default" : "outline"}
                size="sm"
                onClick={() => setNeighborDepth(2)}
                className="text-xs"
              >
                2
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNeighborsOnly(!showNeighborsOnly)}
              className="border-white/20 hover:bg-white/10"
            >
              {showNeighborsOnly ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="ml-2 text-xs">
                {showNeighborsOnly ? 'Show All' : 'Neighbors Only'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Graph Canvas */}
        <div className="flex-1 relative">
          <CytoscapeComponent
            elements={cytoscapeElements}
            style={{ width: '100%', height: '100%' }}
            stylesheet={cytoscapeStylesheet}
            layout={{ name: 'cose', animate: true }}
            cy={(cy) => {
              cyRef.current = cy;
              cy.on('tap', 'node', handleNodeClick);
            }}
          />
        </div>

        {/* Right Inspector Panel */}
        <motion.div 
          className="w-80 border-l border-white/10 bg-abyss/50 backdrop-blur-xl"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 h-full overflow-y-auto">
            {selectedNode ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-pearl mb-2">
                    {selectedNode.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedNode.tags.map((tag: string) => (
                      <Badge key={tag} className="tag-chip">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-mist mb-2">Summary</h4>
                  <p className="text-sm text-silver leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h4 className="text-sm font-medium text-mist mb-3">Related Notes</h4>
                  <div className="space-y-2">
                    {selectedNode.relatedNotes.map((note: any) => (
                      <div key={note.id} className="glass-card p-3 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-silver mb-1">
                              {note.label}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {note.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Unlink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="btn-cosmic w-full">
                  Open Note
                </Button>
              </div>
            ) : (
              <div className="text-center text-mist mt-12">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click on a node to explore its connections and details.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Graph;