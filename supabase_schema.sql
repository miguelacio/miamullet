-- ========================================================
-- CLEANUP / RESET SCRIPT (OPTIONAL: RUN TO DELETE OLD TABLES)
-- ========================================================
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.slides CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TYPE IF EXISTS product_category CASCADE;

-- ========================================================
-- SUPABASE DATABASE SCHEMA FOR MIAMULLET
-- ========================================================

-- 1. Create ENUM type for product categories
CREATE TYPE product_category AS ENUM ('blouses', 'accessories', 'skirts');

-- 2. Create Categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY, -- 'blouses', 'skirts', 'accessories'
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Products table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    category product_category NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    composition TEXT,
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}'::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Slide table (Hero Carousel Banners)
CREATE TABLE IF NOT EXISTS public.slides (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    subtitle TEXT,
    cta_text TEXT DEFAULT 'Explore Collection',
    cta_nav TEXT DEFAULT 'Blouses',
    image TEXT NOT NULL,
    alt TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

-- 6. RLS Read Policies (Public access to fetch data)
CREATE POLICY "Allow public read access on categories" 
    ON public.categories FOR SELECT USING (true);

CREATE POLICY "Allow public read access on products" 
    ON public.products FOR SELECT USING (true);

CREATE POLICY "Allow public read access on slides" 
    ON public.slides FOR SELECT USING (true);

-- 7. RLS Write Policies (Restricted to authenticated admin users)
CREATE POLICY "Allow write access on categories for authenticated users" 
    ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow write access on products for authenticated users" 
    ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow write access on slides for authenticated users" 
    ON public.slides FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Trigger for automatic updated_at timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_slides_updated_at
    BEFORE UPDATE ON public.slides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- SAMPLE SEED DATA
-- ========================================================

-- Insert Hero Carousel Slides
INSERT INTO public.slides (id, title, subtitle, cta_text, cta_nav, image, alt, display_order, is_active) VALUES
(
    'slide-1',
    'Minimalist Elegance',
    'Embracing purity of form and structure for the contemporary wardrobe.',
    'Explore Collection',
    'Blouses',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBliaydC9YNBdZ8usGINXDjcQYXPkegtA44r8atV9RL2nedwV_uP3Ikno14PJ8fNMYaSqYvCjF3zQMpYPNpCk8QUuntRvimHws2-M3WoilsDS8chMJ4K7O8z9MBboMp3XX8H6c6q5LW0dxqnAJW3fJ4FTg1bcTaAW1HdG4mFCnAFCNbG4E_WxTIsisL2xoYt2S8zgmmi974G9hE8fgkgfKTNQ-0aUqsdYOwgE3lbNXYmbvenPvoZzAK',
    'Editorial photograph of model in avant-garde blouse in minimalist studio',
    1,
    true
),
(
    'slide-2',
    'Fluid Dynamics',
    'Movement captured in exquisite textiles and effortless draping.',
    'View Skirts',
    'Skirts',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRw8pIaIoGpGJs_10KiPR0yYjv6jSgeszGwjCCiCsg584t2R7K8nHz96qv6P3yaHizQrqJ-WoNbyCf7TKVyFnsKpPAA-Rzx_BJPf-QdOR3Po9De8WWm1CD2KPzApM087Yw2MPokhZ8lqtyeqlu-i2HxV6x3XKDGNDyCu1NL0UvzSLy1a47_1qzhzZ62-KnOWmIty3RHjceF0gHQUNY5KLMy5MJmruxTTCT6Zq-4jy05T1lCENucFoB',
    'Elegant monochromatic fashion shot with flowing skirt in minimalist space',
    2,
    true
);

-- Insert Categories
INSERT INTO public.categories (id, name, description, cover_image, display_order) VALUES
(
    'blouses',
    'Blouses',
    'Haute couture silk blouses with architectural cuts and fluid drapes.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuByNH9M3n_XMicM3GMWbcqqfmSqcK6KZq7PolHkUj2LVUnKQNERdtY7GPkoxjC3hIlQaCBtikvYIL6umwO8ddxPeF_uPU5hJz2h66T7A6OCaJ_EVoE1FOs_IRcXOMQ0ZWLYvfw5mm4E9W7VjHDnmEu25FNU7ONqR6eRFLqxdrVpDu_SwkUPXVmHOVWEASDWMnN_p0gjVGCJ9bA2Gu4qG0FOPGYQIjsioHwZjrGdYsnnIxu08z99LFdR',
    1
),
(
    'skirts',
    'Skirts',
    'Structured pleated midi skirts tailored in Italian virgin wool and silk blends.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGEP_R7KgsIV5eGg-0MdWMD7vrg8XfQlY5eR4KIpNCWosvXEVsvUZ9P6n62S1yA03iwPjiop9JmFKwS59zqBzPP773Bg4kx__xeiSbu89TBXdfLqknEZBHff6pts0LqsHXjYHEgJBXRMC13Qtw6cgcOhH9pLvdviBsBY9U4H2HUbYMq4Zkxsj_tfg_aEik1GdWxW8pjOGrdTHL-ktw5Fo_hBSMhmElbrWm1EkjCtdmSvvxgBGWlDf',
    2
),
(
    'accessories',
    'Accessories',
    'Hand-forged brass earrings dipped in 18K gold and organic sculptural forms.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_g_r5cUyG8dRQppl2fTSvmYvL145-hBQyxBbGAozo-bt366uJhicfM2Rh6dsQlPKcmWq5C7HftPJGfJ5q0kJzESQE3rxkYwy6Q137ryFy6E6RcjeDLKBfj8InRBDQ6wMlJcO6TaZyWArVp3Xe90nWEUnniesNPZ7gEhiWh-gfNGs6sUyvEagKyRxCW9XoGcsESb4qHiHG--11_kHQdnDOGtpiP_SCDwA6JHKJly-84tc6ON1dfBO',
    3
);

-- Insert Products
INSERT INTO public.products (id, category, category_id, title, price, description, composition, image, gallery) VALUES
(
    'minnus',
    'blouses',
    'blouses',
    'The Minnus',
    450.00,
    'Crafted from heavyweight double georgette silk, this blouse offers a fluid drape and a matte finish. Featuring an elongated pointed collar and concealed placket, it represents the pinnacle of understated elegance. Made ethically in Italy.',
    '100% Organic Double Georgette Silk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuByNH9M3n_XMicM3GMWbcqqfmSqcK6KZq7PolHkUj2LVUnKQNERdtY7GPkoxjC3hIlQaCBtikvYIL6umwO8ddxPeF_uPU5hJz2h66T7A6OCaJ_EVoE1FOs_IRcXOMQ0ZWLYvfw5mm4E9W7VjHDnmEu25FNU7ONqR6eRFLqxdrVpDu_SwkUPXVmHOVWEASDWMnN_p0gjVGCJ9bA2Gu4qG0FOPGYQIjsioHwZjrGdYsnnIxu08z99LFdR',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAkBwQ7DMrb6gClUCcC3_zpCHyafbXRCM0LRPRb-0rH3hxCoBzYF8XHsZde94UyD8T50v9L0a-mdG9P0V-AodzaOA2xX9LF6UFPiNJBIPleRSpqHvFhOaA6KIFU7QuQpzq38y1TcrSi6V4lTxaFY_IvZWWneKHo0WxVHdWpcGMJBTOWQSoTWfHyofx6asZn2-kGMIcZNx0tzovPriKbd6cAPvrb6mIpxzvvy9CBBDL3Lc8c_jTZr5OS',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8DpRdglknXmK29iaCfUSTeYfveK_6XFBLD4XFMWFP-jDRpW8-86FT-LouuymXKQ8wrZjagBxLKF4TEhukkqXXeYjUNVqdgu70JURc5xnScn0QTTkXBnMazMMrzWfumaS8PCvT270jgUG1B3Tif2AbiYY2IA74MkCJGmh-2uxp-WK4_EHZMrNcf-tsHJ1nfEcFJYmyro19m5aueWdIIGgXbRXClIt58FGbj2oj4OUxIoCa6E69N9l'
    ]
),
(
    'sculptural-forms',
    'accessories',
    'accessories',
    'Sculptural Forms',
    320.00,
    'Hand-crafted brass earrings with a brushed gold finish. Each pair is uniquely shaped through hand forging, reflecting light in organic geometries.',
    'Recycled Brass dipped in 18K Gold',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_g_r5cUyG8dRQppl2fTSvmYvL145-hBQyxBbGAozo-bt366uJhicfM2Rh6dsQlPKcmWq5C7HftPJGfJ5q0kJzESQE3rxkYwy6Q137ryFy6E6RcjeDLKBfj8InRBDQ6wMlJcO6TaZyWArVp3Xe90nWEUnniesNPZ7gEhiWh-gfNGs6sUyvEagKyRxCW9XoGcsESb4qHiHG--11_kHQdnDOGtpiP_SCDwA6JHKJly-84tc6ON1dfBO',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_g_r5cUyG8dRQppl2fTSvmYvL145-hBQyxBbGAozo-bt366uJhicfM2Rh6dsQlPKcmWq5C7HftPJGfJ5q0kJzESQE3rxkYwy6Q137ryFy6E6RcjeDLKBfj8InRBDQ6wMlJcO6TaZyWArVp3Xe90nWEUnniesNPZ7gEhiWh-gfNGs6sUyvEagKyRxCW9XoGcsESb4qHiHG--11_kHQdnDOGtpiP_SCDwA6JHKJly-84tc6ON1dfBO'
    ]
),
(
    'structured-pleats',
    'skirts',
    'skirts',
    'Structured Pleats',
    580.00,
    'High-waisted pleated midi skirt in wool-crepe blend. Features sharp permanent pleating and a concealed side zipper for a seamless architectural silhouette.',
    '70% Virgin Wool, 30% Silk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGEP_R7KgsIV5eGg-0MdWMD7vrg8XfQlY5eR4KIpNCWosvXEVsvUZ9P6n62S1yA03iwPjiop9JmFKwS59zqBzPP773Bg4kx__xeiSbu89TBXdfLqknEZBHff6pts0LqsHXjYHEgJBXRMC13Qtw6cgcOhH9pLvdviBsBY9U4H2HUbYMq4Zkxsj_tfg_aEik1GdWxW8pjOGrdTHL-ktw5Fo_hBSMhmElbrWm1EkjCtdmSvvxgBGWlDf',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGEP_R7KgsIV5eGg-0MdWMD7vrg8XfQlY5eR4KIpNCWosvXEVsvUZ9P6n62S1yA03iwPjiop9JmFKwS59zqBzPP773Bg4kx__xeiSbu89TBXdfLqknEZBHff6pts0LqsHXjYHEgJBXRMC13Qtw6cgcOhH9pLvdviBsBY9U4H2HUbYMq4Zkxsj_tfg_aEik1GdWxW8pjOGrdTHL-ktw5Fo_hBSMhmElbrWm1EkjCtdmSvvxgBGWlDf'
    ]
);
