
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HeroContent {
  id: string;
  headline: string;
  tagline_1: string;
  tagline_2: string;
  tagline_3: string;
  background_image_url?: string;
}

export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        setError('Failed to fetch hero content');
        console.error('Error fetching hero content:', error);
        return;
      }

      if (data) {
        setHeroContent(data);
      }
    } catch (err) {
      setError('Failed to fetch hero content');
      console.error('Error fetching hero content:', err);
    } finally {
      setLoading(false);
    }
  };

  return { heroContent, loading, error, refetch: fetchHeroContent };
};
