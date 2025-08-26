import { z } from "zod";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const accounts = pgTable ("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
}) //pg represents postgres

export const accountsRelations = relations(accounts, ({ many }) => ({
    transactions: many(transactions),
}))

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable ("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
}) 

export const categoriesRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
}))


export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable ("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date", {mode: "date"}).notNull(),
    accountId: text("account_id").references(() => accounts.id, {
        onDelete: "cascade",
    }).notNull(),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null",
    }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}))

export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date(),
});

export const goals = pgTable("goals", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    targetAmount: integer("target_amount").notNull(),
    currentAmount: integer("current_amount").notNull().default(0),
    targetDate: timestamp("target_date", {mode: "date"}),
    color: text("color").notNull().default("blue"),
    icon: text("icon").notNull().default("Target"),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"}).notNull().defaultNow(),
});

export const goalsRelations = relations(goals, ({ many }) => ({
    goalContributions: many(goalContributions),
}));

export const goalContributions = pgTable("goal_contributions", {
    id: text("id").primaryKey(),
    goalId: text("goal_id").references(() => goals.id, {
        onDelete: "cascade",
    }).notNull(),
    amount: integer("amount").notNull(),
    date: timestamp("date", {mode: "date"}).notNull(),
    note: text("note"),
    userId: text("user_id").notNull(),
});

export const goalContributionsRelations = relations(goalContributions, ({ one }) => ({
    goal: one(goals, {
        fields: [goalContributions.goalId],
        references: [goals.id],
    }),
}));

export const insertGoalSchema = createInsertSchema(goals, {
    targetDate: z.coerce.date().optional(),
});

export const insertGoalContributionSchema = createInsertSchema(goalContributions, {
    date: z.coerce.date(),
});