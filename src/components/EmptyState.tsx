
import { Button } from "@/components/ui/button";
import { Trophy, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showAddButton?: boolean;
}

const EmptyState = ({ 
  title = "No wins yet", 
  description = "Start tracking your daily accomplishments by adding your first win.", 
  showAddButton = true 
}: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-muted/50 p-6 rounded-full mb-4">
        <Trophy className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {showAddButton && (
        <Button onClick={() => navigate("/add")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Your First Win
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
