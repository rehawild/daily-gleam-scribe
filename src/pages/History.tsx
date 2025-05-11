
import { useState } from "react";
import Header from "@/components/Header";
import WinCard from "@/components/WinCard";
import EmptyState from "@/components/EmptyState";
import { getAllWins, getWinsByDate } from "@/services/winService";
import { Win } from "@/types/win";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";

const History = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [wins, setWins] = useState<Win[]>(getAllWins());

  // Filter wins by selected date when it changes
  const filteredWins = selectedDate ? getWinsByDate(selectedDate) : [];
  
  // Generate dates that have wins for calendar highlighting
  const getDatesWithWins = () => {
    const allWins = getAllWins();
    const datesMap = new Map<string, number>();
    
    allWins.forEach(win => {
      const date = new Date(win.timestamp);
      date.setHours(0, 0, 0, 0);
      const dateString = date.toISOString();
      datesMap.set(dateString, (datesMap.get(dateString) || 0) + 1);
    });
    
    return datesMap;
  };
  
  const datesWithWins = getDatesWithWins();
  
  // Force refresh when a win is deleted
  const handleWinDelete = () => {
    setWins(getAllWins());
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="container max-w-4xl mx-auto flex-1 py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Win History</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 md:col-span-1">
            <div className="flex items-center mb-3">
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              <h3 className="text-lg font-medium">Select Date</h3>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasWins: (date) => {
                  const dateString = new Date(date).toISOString().split('T')[0];
                  return Array.from(datesWithWins.keys()).some(key => key.startsWith(dateString));
                }
              }}
              modifiersClassNames={{
                hasWins: "bg-primary/20 font-bold text-primary",
              }}
            />
          </Card>
          
          <div className="md:col-span-2">
            {selectedDate && (
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Wins for {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                {filteredWins.length > 0 && (
                  <Badge variant="outline" className="bg-primary/10">
                    {filteredWins.length} {filteredWins.length === 1 ? "win" : "wins"}
                  </Badge>
                )}
              </div>
            )}
            
            {filteredWins.length > 0 ? (
              <div className="space-y-4">
                {filteredWins.map((win) => (
                  <WinCard key={win.id} win={win} onDelete={handleWinDelete} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No wins on this date" 
                description={selectedDate 
                  ? `You don't have any wins recorded for ${format(selectedDate, "MMMM d, yyyy")}.` 
                  : "Select a date to view your wins."}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
