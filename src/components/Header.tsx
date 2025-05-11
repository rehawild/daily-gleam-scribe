
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleNavigation = (path: string) => {
    navigate(path);
    setCurrentPath(path);
  };

  return (
    <header className="sticky top-0 z-10 bg-gradient-wins text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={() => handleNavigation("/")} role="button">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-secondary font-bold text-lg">W</span>
            </div>
            <h1 className="text-xl font-bold ml-2">Daily Wins</h1>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={currentPath === "/history" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => handleNavigation("/history")}
            className="text-white hover:text-white hover:bg-secondary/80"
          >
            <CalendarDays className="w-4 h-4 mr-1" />
            History
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            onClick={() => handleNavigation("/add")}
            className="bg-accent text-secondary hover:bg-accent/90"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Win
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
