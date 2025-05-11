
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import WinCard from "@/components/WinCard";
import EmptyState from "@/components/EmptyState";
import StatsCard from "@/components/StatsCard";
import { getRecentWins, getAllWins } from "@/services/winService";
import { Win } from "@/types/win";
import { Button } from "@/components/ui/button";
import { ChevronRight, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [recentWins, setRecentWins] = useState<Win[]>([]);
  const navigate = useNavigate();
  const hasWins = recentWins.length > 0;

  useEffect(() => {
    setRecentWins(getRecentWins(3));
  }, []);

  const handleWinDelete = () => {
    setRecentWins(getRecentWins(3));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto flex-1 py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Welcome to Daily Wins</h2>
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        
        {getAllWins().length > 0 && (
          <div className="mb-8">
            <StatsCard />
          </div>
        )}
        
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-medium">Recent Wins</h3>
          {hasWins && (
            <Button 
              variant="link" 
              onClick={() => navigate('/history')}
              className="text-primary"
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
        
        {hasWins ? (
          <div className="space-y-4">
            {recentWins.map((win) => (
              <WinCard key={win.id} win={win} onDelete={handleWinDelete} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

export default Index;
