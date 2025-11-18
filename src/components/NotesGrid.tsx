import { useTranslation } from 'react-i18next';
import { NoteCard } from './NoteCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
  id: string;
  title: string;
  description?: string;
  color: string;
  priority: 'urgent' | 'important' | 'medium' | 'low';
}

interface NotesGridProps {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotesGrid = ({ notes, onEdit, onDelete }: NotesGridProps) => {
  const { t } = useTranslation();

  if (notes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64 text-center"
      >
        <p className="text-xl text-muted-foreground mb-2">{t('noNotes')}</p>
        <p className="text-sm text-muted-foreground">{t('createFirst')}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <AnimatePresence>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            color={note.color}
            priority={note.priority}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
