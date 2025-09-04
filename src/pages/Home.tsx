import { motion } from "framer-motion";
import { Brain, Network, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quickNote, setQuickNote] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleQuickCapture = async () => {
    if (!quickNote.trim()) return;
    
    setIsCreating(true);
    try {
      // Placeholder API call - will be replaced with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Note captured",
        description: "Your thought has been added to your constellation",
      });
      
      setQuickNote("");
      // Navigate to the note or graph view
      navigate("/graph");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to capture note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const features = [
    {
      icon: Network,
      title: "Auto-Associations",
      description: "AI automatically connects related thoughts and creates meaningful links between your notes.",
    },
    {
      icon: Search,
      title: "Rabbit-Hole Exploration",
      description: "Discover unexpected connections and dive deep into related concepts with semantic search.",
    },
    {
      icon: Zap,
      title: "Constellation Graph",
      description: "Visualize your knowledge as a beautiful, interactive graph of interconnected ideas.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ 
                rotateY: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Brain className="w-16 h-16 text-cosmic-purple mx-auto animate-cosmic-glow" />
            </motion.div>
            
            <h1 className="text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-cosmic-purple via-ethereal-blue to-astral-cyan bg-clip-text text-transparent">
              Your Second Brain
            </h1>
            
            <p className="text-xl text-mist mb-8 max-w-2xl mx-auto">
              Constellation transforms scattered thoughts into an intelligent, interconnected knowledge graph that grows with your curiosity.
            </p>
          </motion.div>

          {/* Quick Capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="glass-card p-6 rounded-2xl neural-glow">
              <div className="flex gap-4">
                <Input
                  placeholder="Paste a thought, idea, or insight..."
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  className="neural-input text-lg py-4"
                  onKeyPress={(e) => e.key === 'Enter' && handleQuickCapture()}
                />
                <Button 
                  onClick={handleQuickCapture}
                  disabled={!quickNote.trim() || isCreating}
                  className="btn-cosmic px-8 text-lg"
                >
                  {isCreating ? "Adding..." : "Add"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold font-heading text-center mb-16 text-pearl"
          >
            Intelligence That Connects
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="neural-glow"
              >
                <Card className="glass-card h-full border-0">
                  <CardHeader className="text-center">
                    <feature.icon className="w-12 h-12 text-cosmic-purple mx-auto mb-4" />
                    <CardTitle className="text-xl text-pearl font-heading">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-mist text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold font-heading mb-6 text-pearl">
              Begin Your Journey
            </h3>
            <p className="text-mist mb-8">
              Start capturing your thoughts and watch as Constellation reveals the hidden connections in your mind.
            </p>
            <Button 
              onClick={() => navigate("/capture")}
              className="btn-cosmic text-lg px-12 py-4"
            >
              Enter the Constellation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;