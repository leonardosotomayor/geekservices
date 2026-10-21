import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';

export const consultationClicks = pgTable('consultation_clicks', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [index('consultation_clicks_created_at_idx').on(table.createdAt)]);
