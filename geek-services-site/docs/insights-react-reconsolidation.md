# Insights Section Reconsolidation

## Objective

Define a cleaner React + Tailwind implementation plan for an `Insights` section that fits the Geek Services site and supports future growth.

This is not the final code. It is the recommended structure before implementation.

## High-Level Recommendation

Your draft is directionally correct. The route structure, post model, featured post pattern, and category filtering all make sense.

The main improvements I recommend are:

1. tighten the content model
2. separate presentation from content formatting
3. design for future CMS migration
4. keep the first implementation intentionally simple

## Recommended Routes

- `/insights`
- `/insights/:slug`

Optional later:

- `/insights/category/:category`

Do not add category routes yet unless SEO for categories becomes a real requirement.

## Recommended File Structure

```text
src/
  pages/
    InsightsPage.tsx
    InsightPostPage.tsx
  components/
    insights/
      InsightsHero.tsx
      FeaturedInsight.tsx
      PostCard.tsx
      CategoryFilter.tsx
      EmptyState.tsx
  data/
    posts.ts
  lib/
    formatPostDate.ts
    getRelatedPosts.ts
  types/
    post.ts
```

## Recommended Type Model

Your current type is close. I would expand it slightly so we do not have to refactor immediately when the section grows.

```ts
export type PostCategory =
  | "Marketing"
  | "Websites"
  | "Automation"
  | "Local Business"
  | "Strategy"
  | "Founder Notes";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  tags: string[];
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}
```

## Category Recommendation

I would not lead with `AI` as a top-level category.

Reason:

- you already decided the business should not feel dependent on AI buzzwords
- `AI` can still appear inside posts and tags
- the business-facing positioning is broader now

Recommended categories:

- Marketing
- Websites
- Automation
- Local Business
- Strategy
- Founder Notes

If you still want AI content, use:

- category: `Automation` or `Strategy`
- tag: `AI`

That keeps the site aligned with your broader brand direction.

## Content Model Recommendation

Do not keep long-term post content as inline strings in a TypeScript file if you expect to publish often.

Recommended rollout:

### Phase 1

Use `posts.ts` exactly as a lightweight static content source.

### Phase 2

Move posts into MDX or markdown-driven content once you have more than 5-8 posts.

Reason:

- easier editing
- cleaner formatting
- better long-form content authoring
- easier migration later

## Component Recommendations

### `InsightsHero`

Responsibilities:

- page title
- short section description
- possibly 1 CTA

Do not overload this with too much copy.

### `FeaturedInsight`

Responsibilities:

- display one high-priority post
- act as the top attention block

This should visually feel different from the standard grid cards.

### `CategoryFilter`

Responsibilities:

- render categories
- update local state

Keep it simple and client-side for now.

### `PostCard`

Responsibilities:

- title
- category
- excerpt
- read time
- tags
- link to detail page

### `InsightPostPage`

Responsibilities:

- post body
- metadata
- back link
- optional related posts section later

## UX Recommendations

### Homepage integration

Do not bury `Insights`.

Best homepage integration:

- add one short teaser section on the homepage later:
  - heading
  - 2 recent posts
  - link to `/insights`

### Post length

Keep initial posts short and readable.

Ideal first version:

- 400-800 words per post
- practical, structured
- clear takeaway

### Empty state

If a category has no posts, show a friendly empty state rather than a blank grid.

## SEO Recommendations

For the React version, each post page should eventually have:

- unique title
- unique meta description
- canonical URL
- Open Graph metadata

Not required in the first draft, but plan for it.

## Design Direction

This section should feel:

- cleaner than the founder page
- lighter than the homepage hero
- more editorial than sales-driven

Reference feeling:

- modern editorial SaaS blog
- structured, readable, calm

Avoid:

- overly technical dashboard look
- heavy AI branding
- cluttered tag overload

## Recommended First Posts

The draft topics are strong. I would slightly refine them to match the broader business tone:

1. Why Local Businesses Lose Leads Through Weak Follow-Up
2. What a Small Business Website Should Actually Do
3. Where Automation Helps Small Businesses Most
4. Simple Marketing Metrics Small Business Owners Should Watch
5. Why Clear Positioning Matters More Than More Content

## Implementation Notes

Your draft code is viable, but I would make these changes before building:

1. rename `PostPage` to `InsightPostPage`
2. rename `FeaturedPost` to `FeaturedInsight`
3. extract date formatting into a helper
4. add empty-state handling for filtered categories
5. avoid making `AI` the primary category structure

## Consultant View

The `Insights` section is worth building because it supports:

- trust
- SEO
- founder credibility
- clearer explanation of how you think

But it only works if the writing stays practical and business-relevant.

If it turns into generic thought leadership, it will dilute the site.

## Open Questions For Implementation

These should be answered before building:

1. Will this section be branded as `Insights`, `Resources`, or `Articles`?
2. Do you want your name visible on posts, or should they publish under `Geek Services LLC`?
3. Should `AI` stay visible as a topic, or only appear indirectly under automation/strategy?
4. Do you want the first version to be read-only blog content, or should it include a lead CTA inside every article?
5. Will posts be short business insights, longer founder essays, or a mix?
