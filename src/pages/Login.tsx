import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back!');
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <ParticlesBackground />
      
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/30 bg-card/50 backdrop-blur-xl shadow-2xl glow-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center glow-text text-primary">
              {t('login')}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              CyberNotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-primary/30 bg-input/50 backdrop-blur-sm focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-primary/30 bg-input/50 backdrop-blur-sm focus:border-primary transition-colors"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold relative overflow-hidden group"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Loading...' : t('login')}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {t('dontHaveAccount')}{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline font-semibold"
                >
                  {t('signup')}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
