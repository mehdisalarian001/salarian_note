import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NoteCardProps {
  id: string;
  title: string;
  description?: string;
  color: string;
  priority: 'urgent' | 'important' | 'medium' | 'low';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  urgent: 'border-urgent shadow-[0_0_15px_rgba(255,0,255,0.3)]',
  important: 'border-important shadow-[0_0_15px_rgba(0,240,255,0.3)]',
  medium: 'border-medium shadow-[0_0_15px_rgba(0,255,65,0.3)]',
  low: 'border-low shadow-[0_0_15px_rgba(255,215,0,0.3)]',
};

export const NoteCard = ({ id, title, description, color, priority, onEdit, onDelete }: NoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`relative overflow-hidden bg-card/70 backdrop-blur-lg border-2 ${priorityColors[priority]} transition-all duration-300 hover:shadow-2xl`}
        style={{ borderLeftWidth: '6px', borderLeftColor: color }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground flex items-center justify-between">
            <span className="truncate">{title}</span>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(id)}
                className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(id)}
                className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        {description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          </CardContent>
        )}
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-10 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${color}00, ${color}80)`,
          }}
          whileHover={{ opacity: 0.1 }}
        />
      </Card>
    </motion.div>
  );
};
