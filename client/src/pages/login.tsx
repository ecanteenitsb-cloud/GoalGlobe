import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, User, ArrowRight } from "lucide-react";
import bgImage from "@assets/generated_images/dynamic_football_legends_collage_for_login_background.png";

export default function Login() {
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("goscore_user", "true");
      setIsLoading(false);
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
        <img 
          src={bgImage} 
          alt="Football Stars" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-in fade-in duration-1000 zoom-in-50"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-md px-4 animate-in slide-in-from-bottom-10 duration-700">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/20 transform -skew-x-6">
            <span className="text-4xl font-display font-bold text-primary-foreground italic">G</span>
          </div>
          <h1 className="text-5xl font-display font-bold text-white italic tracking-tighter mb-2 drop-shadow-lg">
            GO<span className="text-primary">SCORE</span>
          </h1>
          <p className="text-slate-300 text-lg font-light">Join the world's biggest football community</p>
        </div>

        <Card className="bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-display tracking-wide text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access live scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" placeholder="fan@goscore.com" className="pl-10 bg-background/50 border-white/10 focus:border-primary" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-background/50 border-white/10 focus:border-primary" required />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12 mt-6" 
                disabled={isLoading}
              >
                {isLoading ? (
                  "Signing In..."
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <div className="text-center mt-4">
                <a href="#" className="text-sm text-primary hover:underline">Forgot your password?</a>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 flex justify-center gap-6 opacity-50">
           <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Official Data Partner</div>
        </div>
      </div>
    </div>
  );
}
