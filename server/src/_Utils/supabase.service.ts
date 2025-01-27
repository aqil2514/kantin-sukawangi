import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL; 
    const supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }
}
