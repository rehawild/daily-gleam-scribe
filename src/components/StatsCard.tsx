
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllWins } from "@/services/winService";
import { format, subDays } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StatsCard = () => {
  const wins = getAllWins();
  
  // Calculate stats
  const totalWins = wins.length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const winsToday = wins.filter(win => {
    const winDate = new Date(win.timestamp);
    winDate.setHours(0, 0, 0, 0);
    return winDate.getTime() === today.getTime();
  }).length;
  
  // Generate data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    date.setHours(0, 0, 0, 0);
    
    const winsOnDay = wins.filter(win => {
      const winDate = new Date(win.timestamp);
      winDate.setHours(0, 0, 0, 0);
      return winDate.getTime() === date.getTime();
    }).length;
    
    return {
      date: format(date, "EEE"),
      wins: winsOnDay,
    };
  }).reverse();
  
  // Get the most common category
  const categoryCount: Record<string, number> = {};
  wins.forEach(win => {
    if (win.category) {
      categoryCount[win.category] = (categoryCount[win.category] || 0) + 1;
    }
  });
  
  let mostCommonCategory = "None";
  let maxCount = 0;
  
  Object.entries(categoryCount).forEach(([category, count]) => {
    if (count > maxCount) {
      mostCommonCategory = category;
      maxCount = count;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Your Win Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{totalWins}</p>
            <p className="text-sm text-muted-foreground">Total Wins</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{winsToday}</p>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
          <div className="text-center">
            <p className="text-md font-bold text-primary truncate">{mostCommonCategory}</p>
            <p className="text-sm text-muted-foreground">Top Category</p>
          </div>
        </div>
        
        <div className="h-40 mt-4">
          <p className="text-sm font-medium mb-2">Last 7 Days</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7Days}>
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide={true} />
              <Tooltip 
                formatter={(value) => [`${value} wins`, 'Wins']}
                contentStyle={{ fontSize: '12px' }}
              />
              <Bar 
                dataKey="wins" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
