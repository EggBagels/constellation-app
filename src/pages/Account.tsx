import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Calendar, 
  BarChart3, 
  Settings, 
  Download,
  Trash2,
  LogOut
} from "lucide-react";

// Mock user data
const mockUser = {
  email: "user@example.com",
  created: "2024-01-01",
  stats: {
    totalNotes: 127,
    totalConnections: 284,
    tagsUsed: 45,
    lastActive: "2024-01-15"
  }
};

const Account = () => {
  const [email, setEmail] = useState(mockUser.email);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleUpdateEmail = () => {
    setIsEditing(false);
    toast({
      title: "Email updated",
      description: "Your email address has been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Your data export will be sent to your email shortly.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

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
          <User className="w-12 h-12 text-cosmic-purple mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-heading text-pearl mb-4">
            Account Settings
          </h1>
          <p className="text-mist text-lg">
            Manage your Constellation profile and preferences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl text-pearl font-heading flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-mist mb-2 block">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="neural-input"
                      />
                      <Button onClick={handleUpdateEmail} size="sm">
                        Save
                      </Button>
                      <Button 
                        onClick={() => {
                          setEmail(mockUser.email);
                          setIsEditing(false);
                        }} 
                        size="sm" 
                        variant="ghost"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-mist mr-2" />
                        <span className="text-silver">{email}</span>
                      </div>
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        size="sm" 
                        variant="ghost"
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm text-mist mb-2 block">
                    Member Since
                  </label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-mist mr-2" />
                    <span className="text-silver">{mockUser.created}</span>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <Button 
                    onClick={handleExportData}
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl text-pearl font-heading flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Your Constellation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/20">
                    <div className="text-2xl font-bold text-cosmic-purple mb-1">
                      {mockUser.stats.totalNotes}
                    </div>
                    <div className="text-sm text-mist">Total Notes</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-ethereal-blue/10 border border-ethereal-blue/20">
                    <div className="text-2xl font-bold text-ethereal-blue mb-1">
                      {mockUser.stats.totalConnections}
                    </div>
                    <div className="text-sm text-mist">Connections</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-astral-cyan/10 border border-astral-cyan/20">
                    <div className="text-2xl font-bold text-astral-cyan mb-1">
                      {mockUser.stats.tagsUsed}
                    </div>
                    <div className="text-sm text-mist">Tags Used</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-white/10 border border-white/20">
                    <div className="text-sm font-medium text-pearl mb-1">
                      Last Active
                    </div>
                    <div className="text-xs text-mist">{mockUser.stats.lastActive}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-mist mb-3">
                    Account Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Active
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-mist">
                      Free Plan
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="glass-card border-0 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-red-400 font-heading flex items-center">
                <Trash2 className="w-5 h-5 mr-2" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pearl font-medium mb-1">
                    Delete Account
                  </p>
                  <p className="text-mist text-sm">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
                <Button 
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  className="shrink-0"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;