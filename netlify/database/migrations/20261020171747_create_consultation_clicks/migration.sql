CREATE TABLE "consultation_clicks" (
	"id" serial PRIMARY KEY,
	"path" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "consultation_clicks_created_at_idx" ON "consultation_clicks" ("created_at");