
import { Win } from "../types/win";
import { toast } from "@/components/ui/use-toast";

const STORAGE_KEY = "daily-wins";

export const saveWin = (win: Win): void => {
  try {
    const wins = getAllWins();
    wins.unshift(win); // Add to beginning of array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wins));
  } catch (error) {
    console.error("Error saving win:", error);
    toast({
      title: "Error saving win",
      description: "Your win couldn't be saved. Please try again.",
      variant: "destructive",
    });
  }
};

export const getAllWins = (): Win[] => {
  try {
    const winsJson = localStorage.getItem(STORAGE_KEY);
    return winsJson ? JSON.parse(winsJson) : [];
  } catch (error) {
    console.error("Error getting wins:", error);
    toast({
      title: "Error loading wins",
      description: "Your wins couldn't be loaded. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

export const deleteWin = (id: string): void => {
  try {
    const wins = getAllWins();
    const filteredWins = wins.filter(win => win.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredWins));
  } catch (error) {
    console.error("Error deleting win:", error);
    toast({
      title: "Error deleting win",
      description: "Your win couldn't be deleted. Please try again.",
      variant: "destructive",
    });
  }
};

export const getWinsByDate = (date: Date): Win[] => {
  const wins = getAllWins();
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return wins.filter(win => {
    const winDate = new Date(win.timestamp);
    winDate.setHours(0, 0, 0, 0);
    return winDate.getTime() === targetDate.getTime();
  });
};

export const getRecentWins = (count: number): Win[] => {
  const wins = getAllWins();
  return wins.slice(0, count);
};
