const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.*)/);

if (!urlMatch || !keyMatch) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(urlMatch[1].trim(), keyMatch[1].trim());

async function sync() {
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: 'hoatrenda@gmail.com',
    password: 'ADiDaPhat=1309'
  });
  if (authErr) {
    console.log("Auth err (Supabase might be paused):", authErr.message);
    return;
  }

  const { stories } = require('../src/data/stories');
  for (const s of stories) {
    const { error } = await supabase
      .from('stories')
      .update({
        title: s.title,
        content: s.content,
        excerpt: s.excerpt,
        author_name: s.authorName
      })
      .eq('slug', s.slug);

    if (error) {
      console.log(`Failed to update ${s.slug}:`, error.message);
    } else {
      console.log(`Updated clean prose for ${s.slug}`);
    }
  }
}

sync();
