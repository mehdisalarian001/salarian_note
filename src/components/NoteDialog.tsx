import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (note: { title: string; description: string; color: string; priority: string }) => void;
  editingNote?: { id: string; title: string; description?: string; color: string; priority: string } | null;
}

const colorOptions = [
  '#00f0ff', // Cyan
  '#ff00ff', // Magenta
  '#00ff41', // Green
  '#ffd700', // Yellow
  '#ff4444', // Red
  '#4444ff', // Blue
];

export const NoteDialog = ({ open, onOpenChange, onSave, editingNote }: NoteDialogProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(colorOptions[0]);
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description || '');
      setColor(editingNote.color);
      setPriority(editingNote.priority);
    } else {
      setTitle('');
      setDescription('');
      setColor(colorOptions[0]);
      setPriority('medium');
    }
  }, [editingNote, open]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, description, color, priority });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold glow-text text-primary">
            {editingNote ? t('editNote') : t('addNote')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">{t('title')}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('enterTitle')}
              className="border-primary/30 bg-input/50 backdrop-blur-sm focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">{t('description')}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('enterDescription')}
              rows={4}
              className="border-primary/30 bg-input/50 backdrop-blur-sm focus:border-primary resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-foreground">{t('priority')}</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="border-primary/30 bg-input/50 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30">
                <SelectItem value="urgent">{t('priorityUrgent')}</SelectItem>
                <SelectItem value="important">{t('priorityImportant')}</SelectItem>
                <SelectItem value="medium">{t('priorityMedium')}</SelectItem>
                <SelectItem value="low">{t('priorityLow')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">{t('color')}</Label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                    color === c ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: c,
                    boxShadow: color === c ? `0 0 15px ${c}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-primary/30"
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
