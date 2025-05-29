
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AboutContent {
  id: string;
  story_part_1: string;
  story_part_2: string;
  mission: string;
  vision: string;
  image_url?: string;
}

export const useAboutContent = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        setError('Failed to fetch about content');
        console.error('Error fetching about content:', error);
        return;
      }

      if (data) {
        setAboutContent(data);
      }
    } catch (err) {
      setError('Failed to fetch about content');
      console.error('Error fetching about content:', err);
    } finally {
      setLoading(false);
    }
  };

  return { aboutContent, loading, error, refetch: fetchAboutContent };
};
