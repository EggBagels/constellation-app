import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Brain, Mail, CheckCircle } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const handleMagicLink = async () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Placeholder - will be replaced with Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEmailSent(true);
      toast({
        title: "Magic link sent",
        description: "Check your email for the login link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send magic link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
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
          
          <h1 className="text-3xl font-bold font-heading mb-4 bg-gradient-to-r from-cosmic-purple via-ethereal-blue to-astral-cyan bg-clip-text text-transparent">
            Enter Constellation
          </h1>
          
          <p className="text-mist">
            Your personal knowledge graph awaits. Sign in to continue your journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass-card border-0 neural-glow">
            <CardHeader>
              <CardTitle className="text-xl text-pearl font-heading text-center">
                {isEmailSent ? "Check Your Email" : "Magic Link Sign In"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isEmailSent ? (
                <>
                  <div>
                    <label className="text-sm text-mist mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mist" />
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="neural-input pl-10"
                        onKeyPress={(e) => e.key === 'Enter' && handleMagicLink()}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleMagicLink}
                    disabled={!email.trim() || isLoading}
                    className="btn-cosmic w-full text-lg py-3"
                  >
                    {isLoading ? "Sending Magic Link..." : "Send Magic Link"}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-mist">
                      We'll send you a secure link to sign in without a password.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                  <div>
                    <p className="text-pearl font-medium mb-2">
                      Magic link sent!
                    </p>
                    <p className="text-mist text-sm leading-relaxed">
                      We've sent a secure login link to <strong className="text-pearl">{email}</strong>. 
                      Click the link in your email to access your constellation.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail("");
                    }}
                    variant="outline"
                    className="border-white/20 hover:bg-white/10"
                  >
                    Use Different Email
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-mist">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;