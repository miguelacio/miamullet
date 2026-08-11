import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { PRODUCTS, CATEGORIES, getProductById, getProductsByCategory, getCategoryBySlug } from '../data/products';

/**
 * Fetch all categories from Supabase (or local fallback)
 */
export async function fetchCategories() {
  if (!isSupabaseConfigured || !supabase) {
    return CATEGORIES;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return CATEGORIES;
    }

    return data;
  } catch (err) {
    console.warn('Error fetching categories from Supabase, using local fallback:', err);
    return CATEGORIES;
  }
}

/**
 * Fetch a single category by slug/ID from Supabase (or local fallback)
 */
export async function fetchCategoryBySlug(slug) {
  if (!isSupabaseConfigured || !supabase) {
    return getCategoryBySlug(slug);
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', slug)
      .single();

    if (error || !data) {
      return getCategoryBySlug(slug);
    }

    return data;
  } catch (err) {
    return getCategoryBySlug(slug);
  }
}

/**
 * Fetch all hero banner slides from Supabase
 */
export async function fetchSlides() {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Supabase error in fetchSlides:', error.message, error.details, error.hint);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error fetching slides from Supabase:', err);
    return null;
  }
}

/**
 * Fetch all products from Supabase (or local fallback)
 */
export async function fetchProducts() {
  if (!isSupabaseConfigured || !supabase) {
    return PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching products from Supabase, using local fallback:', error.message);
      return PRODUCTS;
    }

    return data && data.length > 0 ? data : PRODUCTS;
  } catch (err) {
    console.warn('Supabase fetch exception, using local fallback:', err);
    return PRODUCTS;
  }
}

/**
 * Fetch single product by ID from Supabase (or local fallback)
 */
export async function fetchProductById(id) {
  if (!isSupabaseConfigured || !supabase) {
    return getProductById(id);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return getProductById(id);
    }

    return data;
  } catch (err) {
    return getProductById(id);
  }
}

/**
 * Fetch products by category from Supabase (or local fallback)
 */
export async function fetchProductsByCategory(categorySlug) {
  if (!isSupabaseConfigured || !supabase) {
    return getProductsByCategory(categorySlug);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categorySlug);

    if (error) {
      return getProductsByCategory(categorySlug);
    }

    return data && data.length > 0 ? data : getProductsByCategory(categorySlug);
  } catch (err) {
    return getProductsByCategory(categorySlug);
  }
}
