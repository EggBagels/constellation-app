import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search as SearchIcon, 
  ExternalLink, 
  Network, 
  Sparkles,
  FileText,
  Brain
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock search results
const mockKeywordResults = [
  {
    id: '1',
    title: 'The Nature of Consciousness',
    snippet: 'Consciousness remains one of the most profound mysteries in both philosophy and neuroscience. The "hard problem" of consciousness...',
    tags: ['Philosophy', 'Consciousness', 'Neuroscience'],
    score: 0.95,
    type: 'keyword'
  },
  {
    id: '2',
    title: 'Neural Networks and Artificial Consciousness',
    snippet: 'As neural networks become more sophisticated, questions arise about whether they could develop genuine consciousness...',
    tags: ['AI', 'Consciousness', 'Neural Networks'],
    score: 0.87,
    type: 'keyword'
  }
];

const mockSemanticResults = [
  {
    id: '3',
    title: 'Philosophical Zombies',
    snippet: 'The zombie argument challenges physicalism by proposing beings identical to conscious humans but lacking inner experience...',
    tags: ['Philosophy', 'Thought Experiments', 'Consciousness'],
    score: 0.78,
    type: 'semantic'
  },
  {
    id: '4',
    title: 'Integrated Information Theory',
    snippet: 'IIT proposes that consciousness corresponds to integrated information (Φ) in a system, providing a mathematical framework...',
    tags: ['Neuroscience', 'Theory', 'Consciousness'],
    score: 0.72,
    type: 'semantic'
  },
  {
    id: '5',
    title: 'Machine Learning and Emergence',
    snippet: 'Complex behaviors and patterns can emerge from simple rules in machine learning systems, similar to consciousness emerging...',
    tags: ['AI', 'Complexity', 'Emergence'],
    score: 0.65,
    type: 'semantic'
  }
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [keywordResults, setKeywordResults] = useState<any[]>([]);
  const [semanticResults, setSemanticResults] = useState<any[]>([]);
  const navigate = useNavigate();

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(false);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock results based on query
      const filteredKeyword = mockKeywordResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.snippet.toLowerCase().includes(query.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      const filteredSemantic = mockSemanticResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.snippet.toLowerCase().includes(query.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setKeywordResults(filteredKeyword);
      setSemanticResults(filteredSemantic);
      setHasSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const ResultCard = ({ result, icon: Icon }: { result: any, icon: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="glass-card border-0 neural-glow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-cosmic-purple" />
              <h3 className="text-lg font-semibold text-pearl font-heading">
                {result.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-mist">
              <span className="font-mono">{Math.round(result.score * 100)}%</span>
            </div>
          </div>
          
          <p className="text-silver mb-4 leading-relaxed">
            {result.snippet}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag: string) => (
                <Badge key={tag} className="tag-chip text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigate(`/note/${result.id}`)}
                className="border-white/20 hover:bg-white/10"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Open
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigate(`/graph?focus=${result.id}`)}
                className="border-white/20 hover:bg-white/10"
              >
                <Network className="w-3 h-3 mr-1" />
                Graph
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Brain className="w-12 h-12 text-cosmic-purple mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-heading text-pearl mb-4">
            Search Your Constellation
          </h1>
          <p className="text-mist text-lg">
            Find connections across your knowledge graph with keyword and semantic search.
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mist" />
                  <Input
                    id="search-input"
                    placeholder="Search your thoughts and ideas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="neural-input text-lg py-4 pl-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-white/10 rounded text-xs text-mist">
                    ⌘K
                  </kbd>
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={!query.trim() || isSearching}
                  className="btn-cosmic px-8 text-lg"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search Results */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SearchIcon className="w-8 h-8 text-cosmic-purple mx-auto mb-4 animate-pulse" />
            <p className="text-mist">Searching your constellation...</p>
          </motion.div>
        )}

        {hasSearched && !isSearching && (
          <>
            {/* Keyword Results */}
            {keywordResults.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-ethereal-blue" />
                  <h2 className="text-2xl font-bold font-heading text-pearl">
                    Keyword Matches
                  </h2>
                  <Badge variant="outline" className="text-ethereal-blue border-ethereal-blue">
                    {keywordResults.length}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {keywordResults.map((result) => (
                    <ResultCard key={result.id} result={result} icon={FileText} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Semantic Results */}
            {semanticResults.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: keywordResults.length > 0 ? 0.2 : 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-astral-cyan" />
                  <h2 className="text-2xl font-bold font-heading text-pearl">
                    Semantic Matches
                  </h2>
                  <Badge variant="outline" className="text-astral-cyan border-astral-cyan">
                    {semanticResults.length}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {semanticResults.map((result) => (
                    <ResultCard key={result.id} result={result} icon={Sparkles} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* No Results */}
            {keywordResults.length === 0 && semanticResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <SearchIcon className="w-12 h-12 text-mist mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-pearl mb-2">
                  No results found
                </h3>
                <p className="text-mist">
                  Try different keywords or add more notes to your constellation.
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!hasSearched && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <FileText className="w-8 h-8 text-ethereal-blue mx-auto mb-2" />
                    <CardTitle className="text-lg text-pearl font-heading">
                      Keyword Search
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-mist text-sm">
                      Find exact matches in titles, content, and tags.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <Sparkles className="w-8 h-8 text-astral-cyan mx-auto mb-2" />
                    <CardTitle className="text-lg text-pearl font-heading">
                      Semantic Search
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-mist text-sm">
                      Discover conceptually related notes using AI embeddings.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-mist">
                Start typing to search across your entire knowledge constellation.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;