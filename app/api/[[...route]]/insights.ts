import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { transactions, categories, accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, desc, eq, gte, lt, sql, sum } from "drizzle-orm";
import { differenceInDays, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        // Get current month and previous month data
        const currentMonth = new Date();
        const previousMonth = subMonths(currentMonth, 1);
        
        const currentMonthStart = startOfMonth(currentMonth);
        const currentMonthEnd = endOfMonth(currentMonth);
        const previousMonthStart = startOfMonth(previousMonth);
        const previousMonthEnd = endOfMonth(previousMonth);

        // Get current month expenses
        const currentMonthExpenses = await db
            .select({
                total: sql<number>`cast(sum(case when amount < 0 then amount else 0 end) as int)`,
                count: sql<number>`cast(count(case when amount < 0 then 1 end) as int)`
            })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .where(
                and(
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, currentMonthStart),
                    lt(transactions.date, currentMonthEnd)
                )
            );

        // Get previous month expenses  
        const previousMonthExpenses = await db
            .select({
                total: sql<number>`cast(sum(case when amount < 0 then amount else 0 end) as int)`,
            })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .where(
                and(
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, previousMonthStart),
                    lt(transactions.date, previousMonthEnd)
                )
            );

        // Get current month income
        const currentMonthIncome = await db
            .select({
                total: sql<number>`cast(sum(case when amount > 0 then amount else 0 end) as int)`,
            })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .where(
                and(
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, currentMonthStart),
                    lt(transactions.date, currentMonthEnd)
                )
            );

        // Get top spending categories this month
        const topCategories = await db
            .select({
                category: categories.name,
                total: sql<number>`cast(sum(case when amount < 0 then abs(amount) else 0 end) as int)`,
                count: sql<number>`cast(count(*) as int)`
            })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .leftJoin(categories, eq(transactions.categoryId, categories.id))
            .where(
                and(
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, currentMonthStart),
                    lt(transactions.date, currentMonthEnd),
                    sql`amount < 0`
                )
            )
            .groupBy(categories.name)
            .orderBy(sql`sum(case when amount < 0 then abs(amount) else 0 end) desc`)
            .limit(3);

        // Calculate insights
        const currentExpenses = Math.abs(currentMonthExpenses[0]?.total || 0);
        const previousExpenses = Math.abs(previousMonthExpenses[0]?.total || 0);
        const currentIncome = currentMonthIncome[0]?.total || 0;
        const expenseChange = previousExpenses > 0 ? ((currentExpenses - previousExpenses) / previousExpenses) * 100 : 0;
        const savingsRate = currentIncome > 0 ? ((currentIncome - currentExpenses) / currentIncome) * 100 : 0;

        const insights = [];

        // Spending comparison insight
        if (expenseChange < -5) {
            insights.push({
                type: "success",
                title: "🎉 Great Progress!",
                message: `Your spending is ${Math.abs(expenseChange).toFixed(1)}% lower than last month. Keep up the excellent budgeting!`,
                priority: 1
            });
        } else if (expenseChange > 15) {
            insights.push({
                type: "warning",
                title: "⚠️ Spending Alert",
                message: `Your spending increased by ${expenseChange.toFixed(1)}% this month. Consider reviewing your expenses.`,
                priority: 2
            });
        }

        // Savings rate insight
        if (savingsRate > 20) {
            insights.push({
                type: "success",
                title: "💰 Excellent Savings!",
                message: `You're saving ${savingsRate.toFixed(1)}% of your income. Consider investing some of your surplus.`,
                priority: 1
            });
        } else if (savingsRate < 10 && currentIncome > 0) {
            insights.push({
                type: "info",
                title: "📈 Savings Opportunity",
                message: `Try to increase your savings rate to at least 20% for better financial health.`,
                priority: 3
            });
        }

        // Category spending insight
        if (topCategories.length > 0) {
            const topCategory = topCategories[0];
            if (topCategory.total > currentExpenses * 0.3) {
                insights.push({
                    type: "info",
                    title: "📊 Spending Pattern",
                    message: `${topCategory.category} accounts for ${((topCategory.total / currentExpenses) * 100).toFixed(1)}% of your expenses this month.`,
                    priority: 3
                });
            }
        }

        // Emergency fund recommendation
        const monthlyExpenses = currentExpenses;
        if (monthlyExpenses > 0) {
            const recommendedEmergencyFund = monthlyExpenses * 6;
            insights.push({
                type: "info",
                title: "🛡️ Emergency Fund Goal",
                message: `Based on your spending, consider building an emergency fund of $${(recommendedEmergencyFund / 100).toFixed(0)}.`,
                priority: 4
            });
        }

        // Sort insights by priority and limit to top 3
        insights.sort((a, b) => a.priority - b.priority);
        
        return c.json({ 
            data: {
                insights: insights.slice(0, 3),
                metrics: {
                    currentMonthExpenses: currentExpenses,
                    previousMonthExpenses,
                    expenseChange,
                    savingsRate,
                    topCategories
                }
            }
        });
    });

export default app;