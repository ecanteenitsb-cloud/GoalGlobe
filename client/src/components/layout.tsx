import { useLocation, Link } from "wouter";
import { Trophy, Calendar, Newspaper, LogOut, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Check for login
  useEffect(() => {
    const user = localStorage.getItem("goscore_user");
    if (!user && location !== "/login") {
      setLocation("/login");
    }
  }, [location, setLocation]);

  if (location === "/login") {
    return <>{children}</>;
  }

  const NavItem = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"}`}>
          <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
          <span className="font-medium tracking-wide">{label}</span>
        </div>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-border">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-primary-foreground text-xl italic transform -skew-x-12">
          G
        </div>
        <h1 className="text-2xl font-display font-bold tracking-tight italic">
          <span className="text-foreground">GO</span>
          <span className="text-primary">SCORE</span>
        </h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2">
        <div className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase tracking-wider">Menu</div>
        <NavItem href="/" icon={Trophy} label="Matches" />
        <NavItem href="/leagues" icon={Calendar} label="Leagues" />
        <NavItem href="/news" icon={Newspaper} label="News" />
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
           <Avatar className="h-9 w-9 border border-primary/20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">Premium Member</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
          onClick={() => {
            localStorage.removeItem("goscore_user");
            setLocation("/login");
          }}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed h-full z-30">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-primary-foreground text-xl italic transform -skew-x-12">
            G
          </div>
          <span className="font-display font-bold text-xl italic">GOSCORE</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r border-border bg-background">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8">
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
