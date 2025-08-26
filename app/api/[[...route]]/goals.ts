import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { goals, goalContributions, insertGoalSchema, insertGoalContributionSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, desc, eq, sum } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const data = await db
            .select({
                id: goals.id,
                name: goals.name,
                description: goals.description,
                targetAmount: goals.targetAmount,
                currentAmount: goals.currentAmount,
                targetDate: goals.targetDate,
                color: goals.color,
                icon: goals.icon,
                createdAt: goals.createdAt,
                updatedAt: goals.updatedAt,
            })
            .from(goals)
            .where(eq(goals.userId, auth.userId))
            .orderBy(desc(goals.createdAt));

        return c.json({ data });
    })
    .get("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string(),
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");

        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const [data] = await db
            .select()
            .from(goals)
            .where(and(eq(goals.userId, auth.userId), eq(goals.id, id)));

        if (!data) {
            return c.json({ error: "Not found" }, 404);
        }

        return c.json({ data });
    })
    .post("/", clerkMiddleware(), zValidator("json", insertGoalSchema.omit({
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
    })), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");

        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const [data] = await db.insert(goals).values({
            id: createId(),
            userId: auth.userId,
            ...values,
        }).returning();

        return c.json({ data });
    })
    .post("/:id/contribute", clerkMiddleware(), zValidator("param", z.object({
        id: z.string(),
    })), zValidator("json", z.object({
        amount: z.number().int().positive(),
        note: z.string().optional(),
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");
        const { amount, note } = c.req.valid("json");

        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        // Check if goal exists and belongs to user
        const [goal] = await db
            .select()
            .from(goals)
            .where(and(eq(goals.userId, auth.userId), eq(goals.id, id)));

        if (!goal) {
            return c.json({ error: "Goal not found" }, 404);
        }

        // Add contribution
        const [contribution] = await db.insert(goalContributions).values({
            id: createId(),
            goalId: id,
            amount,
            note,
            date: new Date(),
            userId: auth.userId,
        }).returning();

        // Update goal current amount
        const newCurrentAmount = goal.currentAmount + amount;
        await db
            .update(goals)
            .set({ 
                currentAmount: newCurrentAmount,
                updatedAt: new Date(),
            })
            .where(eq(goals.id, id));

        return c.json({ data: contribution });
    })
    .patch("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string(),
    })), zValidator("json", insertGoalSchema.omit({
        id: true,
        userId: true,
        createdAt: true,
    }).partial()), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");
        const values = c.req.valid("json");

        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const [data] = await db
            .update(goals)
            .set({
                ...values,
                updatedAt: new Date(),
            })
            .where(and(eq(goals.userId, auth.userId), eq(goals.id, id)))
            .returning();

        if (!data) {
            return c.json({ error: "Not found" }, 404);
        }

        return c.json({ data });
    })
    .delete("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string(),
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");

        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const [data] = await db
            .delete(goals)
            .where(and(eq(goals.userId, auth.userId), eq(goals.id, id)))
            .returning({
                id: goals.id,
            });

        if (!data) {
            return c.json({ error: "Not found" }, 404);
        }

        return c.json({ data });
    });

export default app;