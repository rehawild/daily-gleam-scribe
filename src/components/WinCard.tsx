
import { Win } from "@/types/win";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Trash2, Award } from "lucide-react";
import { format } from "date-fns";
import { deleteWin } from "@/services/winService";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface WinCardProps {
  win: Win;
  onDelete?: () => void;
  showActions?: boolean;
}

const WinCard = ({ win, onDelete, showActions = true }: WinCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteWin(win.id);
    toast({
      title: "Win deleted",
      description: "Your win has been deleted successfully.",
    });
    if (onDelete) onDelete();
    setIsDeleting(false);
  };

  const formattedDate = format(new Date(win.timestamp), "MMM d, yyyy 'at' h:mm a");
  
  return (
    <Card className="border-l-4 border-l-primary hover:shadow-md transition-all animate-fade-in">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Award className="text-primary h-5 w-5" />
            <CardTitle className="text-lg font-medium">{win.title}</CardTitle>
          </div>
          {win.category && (
            <Badge variant="outline" className="bg-accent/20 text-secondary">
              {win.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm">{win.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
        {showActions && (
          <button 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-full hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WinCard;
