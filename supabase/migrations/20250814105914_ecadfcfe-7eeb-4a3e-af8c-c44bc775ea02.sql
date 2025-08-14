-- Create the wishes table for storing birthday wishes
CREATE TABLE public.wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  wish TEXT NOT NULL,
  site_idea TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (though not strictly needed for this use case)
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert wishes (no auth required)
CREATE POLICY "Anyone can insert wishes" 
ON public.wishes 
FOR INSERT 
WITH CHECK (true);

-- Create a policy that allows anyone to view wishes (if needed later)
CREATE POLICY "Anyone can view wishes" 
ON public.wishes 
FOR SELECT 
USING (true);