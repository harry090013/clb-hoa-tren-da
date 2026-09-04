import { supabase } from "./supabase";
import { Project, Story, TeamMember, Partner, ImpactStat, FinancialReport } from "@/types";
import { stories as fallbackStories } from "@/data/stories";
import { teamMembers as fallbackTeamMembers } from "@/data/team";
import { impactStats as fallbackImpactStats } from "@/data/stats";
import { partners as fallbackPartners } from "@/data/partners";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (data || []).map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    content: p.content || "",
    coverImage: p.cover_image || "",
    location: p.location || "",
    startDate: p.start_date || "",
    endDate: p.end_date || "",
    status: p.status,
    projectStatus: p.project_status || "upcoming",
    targetAmount: p.target_amount ? Number(p.target_amount) : undefined,
    receivedAmount: p.received_amount ? Number(p.received_amount) : undefined,
    spentAmount: p.spent_amount ? Number(p.spent_amount) : undefined,
    beneficiaryCount: p.beneficiary_count || undefined,
    featured: p.featured,
    publishedAt: p.published_at,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    console.error("Error fetching project by slug:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    content: data.content || "",
    coverImage: data.cover_image || "",
    location: data.location || "",
    startDate: data.start_date || "",
    endDate: data.end_date || "",
    status: data.status,
    projectStatus: data.project_status || "upcoming",
    targetAmount: data.target_amount ? Number(data.target_amount) : undefined,
    receivedAmount: data.received_amount ? Number(data.received_amount) : undefined,
    spentAmount: data.spent_amount ? Number(data.spent_amount) : undefined,
    beneficiaryCount: data.beneficiary_count || undefined,
    featured: data.featured,
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function getStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from("stories")
      .select("*, story_categories(name)")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackStories;
    }

    return data.map((s: any) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      excerpt: s.excerpt || "",
      content: s.content || "",
      coverImage: s.cover_image || "",
      authorName: s.author_name || "",
      storyType: s.story_categories?.name || s.story_type || "",
      projectId: s.project_id || undefined,
      featured: s.featured,
      status: s.status,
      publishedAt: s.published_at,
      createdAt: s.created_at,
      updatedAt: s.updated_at,
    }));
  } catch {
    return fallbackStories;
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const { data, error } = await supabase
      .from("stories")
      .select("*, story_categories(name)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      const fallback = fallbackStories.find((s) => s.slug === slug);
      return fallback || null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || "",
      content: data.content || "",
      coverImage: data.cover_image || "",
      authorName: data.author_name || "",
      storyType: data.story_categories?.name || data.story_type || "",
      projectId: data.project_id || undefined,
      featured: data.featured,
      status: data.status,
      publishedAt: data.published_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch {
    const fallback = fallbackStories.find((s) => s.slug === slug);
    return fallback || null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackTeamMembers;
    }

    return data.map((t: any) => ({
      id: t.id,
      fullName: t.full_name,
      role: t.role || "",
      department: t.department || "",
      bio: t.bio || "",
      avatarUrl: t.avatar_url || "",
      displayOrder: t.display_order,
      active: t.active,
    }));
  } catch {
    return fallbackTeamMembers;
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching partners:", error);
      return fallbackPartners;
    }

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      logoUrl: p.logo_url || "",
      websiteUrl: p.website_url || undefined,
      description: p.description || undefined,
      partnerType: p.partner_type || "",
      displayOrder: p.display_order,
      active: p.active,
    }));
  } catch {
    return fallbackPartners;
  }
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  try {
    const { data, error } = await supabase
      .from("impact_stats")
      .select("*")
      .eq("is_public", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching impact stats:", error);
      return fallbackImpactStats;
    }

    return data.map((i: any) => ({
      id: i.id,
      key: i.key,
      label: i.label,
      value: Number(i.value),
      suffix: i.suffix || undefined,
      displayOrder: i.display_order,
    }));
  } catch {
    return fallbackImpactStats;
  }
}

export async function getFinancialReports(): Promise<FinancialReport[]> {
  // Join query using Supabase relationship: fetch reports, project title, and its transactions
  const { data, error } = await supabase
    .from("financial_reports")
    .select("*, projects(title), financial_transactions(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching financial reports:", error);
    return [];
  }

  return (data || []).map((r: any) => ({
    id: r.id,
    projectId: r.project_id || undefined,
    projectTitle: r.projects?.title || undefined,
    title: r.title,
    reportYear: r.report_year,
    totalReceived: Number(r.total_received),
    totalSpent: Number(r.total_spent),
    remainingBalance: Number(r.total_received) - Number(r.total_spent),
    publicNote: r.public_note || undefined,
    transactions: (r.financial_transactions || [])
      .filter((t: any) => t.is_public)
      .map((t: any) => ({
        id: t.id,
        date: t.transaction_date,
        type: t.transaction_type,
        category: t.category || "",
        amount: Number(t.amount),
        description: t.description || "",
        receiptUrl: t.receipt_url || undefined,
      })),
  }));
}
