import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { LanguageToggle } from '@/components/LanguageToggle';
import { NotesGrid } from '@/components/NotesGrid';
import { NoteDialog } from '@/components/NoteDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Priority = 'urgent' | 'important' | 'medium' | 'low';

interface Note {
  id: string;
  title: string;
  description?: string;
  color: string;
  priority: Priority;
  user_id: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPriority = (searchParams.get('priority') || 'urgent') as Priority;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    fetchNotes();
  }, [currentPriority, i18n.language]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('priority', currentPriority)
      .eq('language', i18n.language)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch notes');
      console.error(error);
    } else {
      setNotes((data || []) as Note[]);
    }
    setLoading(false);
  };

  const handleSaveNote = async (noteData: { title: string; description: string; color: string; priority: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editingNote) {
      const { error } = await supabase
        .from('notes')
        .update({
          title: noteData.title,
          description: noteData.description,
          color: noteData.color,
          priority: noteData.priority,
          language: i18n.language,
        })
        .eq('id', editingNote.id);

      if (error) {
        toast.error('Failed to update note');
      } else {
        toast.success('Note updated!');
        fetchNotes();
      }
    } else {
      const { error } = await supabase
        .from('notes')
        .insert({
          title: noteData.title,
          description: noteData.description,
          color: noteData.color,
          priority: noteData.priority,
          language: i18n.language,
          user_id: user.id,
        });

      if (error) {
        toast.error('Failed to create note');
      } else {
        toast.success('Note created!');
        fetchNotes();
      }
    }

    setEditingNote(null);
  };

  const handleEditNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setEditingNote(note);
      setDialogOpen(true);
    }
  };

  const handleDeleteNote = async () => {
    if (!noteToDelete) return;

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteToDelete);

    if (error) {
      toast.error('Failed to delete note');
    } else {
      toast.success('Note deleted!');
      fetchNotes();
    }

    setNoteToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const priorities: Priority[] = ['urgent', 'important', 'medium', 'low'];

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/30 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-bold glow-text text-primary"
            >
              CyberNotes
            </motion.h1>
            
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                className="border-destructive/50 hover:bg-destructive/20 hover:border-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Priority Tabs */}
          <nav className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {priorities.map((priority) => {
              const isActive = currentPriority === priority;
              const priorityStyles = {
                urgent: isActive ? 'bg-urgent text-background border-urgent shadow-[0_0_20px_rgba(255,0,255,0.5)]' : 'bg-urgent/20 text-urgent border-urgent/50',
                important: isActive ? 'bg-important text-background border-important shadow-[0_0_20px_rgba(0,240,255,0.5)]' : 'bg-important/20 text-important border-important/50',
                medium: isActive ? 'bg-medium text-background border-medium shadow-[0_0_20px_rgba(0,255,65,0.5)]' : 'bg-medium/20 text-medium border-medium/50',
                low: isActive ? 'bg-low text-background border-low shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-low/20 text-low border-low/50',
              };

              return (
                <motion.button
                  key={priority}
                  onClick={() => setSearchParams({ priority })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 border-2 ${priorityStyles[priority]}`}
                >
                  {t(priority)}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => {
              setEditingNote(null);
              setDialogOpen(true);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('addNote')}
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <NotesGrid
            notes={notes}
            onEdit={handleEditNote}
            onDelete={(id) => {
              setNoteToDelete(id);
              setDeleteDialogOpen(true);
            }}
          />
        )}
      </main>

      {/* Dialogs */}
      <NoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-primary/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive glow-text">
              {t('deleteNote')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              {t('deleteConfirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-primary/30">
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
