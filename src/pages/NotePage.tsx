import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  ExternalLink, 
  Unlink, 
  Network,
  ArrowLeft,
  Link,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockNote = {
  id: 'placeholder-id',
  title: 'The Nature of Consciousness',
  summary: 'An exploration of consciousness from both philosophical and neuroscientific perspectives, examining the hard problem of consciousness and potential solutions.',
  content: `Consciousness remains one of the most profound mysteries in both philosophy and neuroscience. The "hard problem" of consciousness, as formulated by David Chalmers, asks not just how the brain processes information, but why there is subjective experience at all.

From a philosophical standpoint, consciousness involves qualia - the subjective, experiential qualities of mental states. The redness of red, the pain of a headache, the taste of chocolate - these seem to resist purely physical explanation.

Neuroscientific approaches attempt to correlate neural activity with conscious experience. The Global Workspace Theory suggests that consciousness arises when information becomes globally available across different brain regions. Integrated Information Theory proposes that consciousness corresponds to integrated information in a system.

Yet the explanatory gap persists. Even if we can map every neural correlation of consciousness, the question remains: why should any of this feel like anything? This points to fundamental questions about the nature of physical reality itself.

Some propose that consciousness is fundamental, like mass or charge - a basic feature of reality rather than an emergent property. Others suggest that our understanding of the physical world is incomplete, and consciousness might reveal new aspects of reality.

The implications extend beyond philosophy into practical domains: artificial intelligence, ethics of animal consciousness, and medical decisions about consciousness in patients with brain injuries.`,
  tags: ['Philosophy', 'Consciousness', 'Neuroscience', 'Hard Problem', 'Qualia'],
  relatedNotes: [
    { id: '2', title: 'Neural Networks and Artificial Consciousness', tags: ['AI', 'Consciousness'] },
    { id: '3', title: 'Philosophical Zombies', tags: ['Philosophy', 'Thought Experiments'] },
    { id: '4', title: 'Integrated Information Theory', tags: ['Neuroscience', 'Theory'] },
  ],
  created: '2024-01-15',
  updated: '2024-01-15'
};

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(mockNote.title);
  const [tags, setTags] = useState(mockNote.tags);
  const [newTag, setNewTag] = useState("");
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    toast({
      title: "Title updated",
      description: "Note title has been saved.",
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      toast({
        title: "Tag added",
        description: `Tag "${newTag.trim()}" has been added.`,
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    toast({
      title: "Tag removed",
      description: `Tag "${tagToRemove}" has been removed.`,
    });
  };

  const handleUnlinkNote = (noteId: string) => {
    toast({
      title: "Note unlinked",
      description: "Connection has been removed.",
    });
  };

  // Mock search results for link dialog
  const searchResults = [
    { id: '5', title: 'Machine Learning Fundamentals', tags: ['AI', 'ML'] },
    { id: '6', title: 'Ethics of AI', tags: ['AI', 'Ethics'] },
    { id: '7', title: 'Quantum Mechanics', tags: ['Physics', 'Quantum'] },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-mist hover:text-pearl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  {isEditingTitle ? (
                    <div className="flex gap-2">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="neural-input text-2xl font-bold font-heading"
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveTitle()}
                      />
                      <Button onClick={handleSaveTitle} size="sm" className="shrink-0">
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => {
                          setTitle(mockNote.title);
                          setIsEditingTitle(false);
                        }} 
                        size="sm" 
                        variant="ghost"
                        className="shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <h1 className="text-3xl font-bold font-heading text-pearl">
                        {title}
                      </h1>
                      <Button 
                        onClick={() => setIsEditingTitle(true)} 
                        size="sm" 
                        variant="ghost"
                        className="shrink-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-pearl font-heading">
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-silver leading-relaxed">
                    {mockNote.summary}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Full Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-pearl font-heading">
                    Full Text
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    {mockNote.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-silver leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-pearl font-heading">
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} className="tag-chip group">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="neural-input"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button onClick={handleAddTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Notes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg text-pearl font-heading">
                    Related Notes
                  </CardTitle>
                  <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <Link className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-0">
                      <DialogHeader>
                        <DialogTitle className="text-pearl">Link to Note</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mist" />
                          <Input
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="neural-input pl-10"
                          />
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {searchResults.map((note) => (
                            <div key={note.id} className="p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer">
                              <p className="text-silver font-medium">{note.title}</p>
                              <div className="flex gap-1 mt-1">
                                {note.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockNote.relatedNotes.map((note) => (
                    <div key={note.id} className="glass-card p-3 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-silver mb-1">
                            {note.title}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {note.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            onClick={() => navigate(`/note/${note.id}`)}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            onClick={() => navigate(`/graph?focus=${note.id}`)}
                          >
                            <Network className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                            onClick={() => handleUnlinkNote(note.id)}
                          >
                            <Unlink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardContent className="pt-6 space-y-3">
                  <Button 
                    className="w-full btn-cosmic"
                    onClick={() => navigate(`/graph?focus=${id}`)}
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Show in Graph
                  </Button>
                  
                  <div className="text-xs text-mist text-center space-y-1">
                    <p>Created: {mockNote.created}</p>
                    <p>Updated: {mockNote.updated}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;