import { db, pool } from "@db";
import { eq, and } from "drizzle-orm";
import { 
  users, 
  User,
  InsertUser
} from "@shared/schema";
import { 
  projects, 
  clients, 
  timeEntries, 
  goals, 
  milestones,
  transactions,
  invoices
} from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects methods
  getProjects(userId: number): Promise<any[]>;
  getProject(id: number): Promise<any | undefined>;
  createProject(project: any): Promise<any>;
  updateProject(id: number, project: any): Promise<any>;
  deleteProject(id: number): Promise<void>;
  
  // Clients methods
  getClients(userId: number): Promise<any[]>;
  getClient(id: number): Promise<any | undefined>;
  createClient(client: any): Promise<any>;
  updateClient(id: number, client: any): Promise<any>;
  deleteClient(id: number): Promise<void>;
  
  // Time entries methods
  getTimeEntries(userId: number): Promise<any[]>;
  getTimeEntry(id: number): Promise<any | undefined>;
  createTimeEntry(timeEntry: any): Promise<any>;
  updateTimeEntry(id: number, timeEntry: any): Promise<any>;
  deleteTimeEntry(id: number): Promise<void>;
  
  // Goals methods
  getGoals(userId: number): Promise<any[]>;
  getGoal(id: number): Promise<any | undefined>;
  createGoal(goal: any): Promise<any>;
  updateGoal(id: number, goal: any): Promise<any>;
  deleteGoal(id: number): Promise<void>;
  
  // Milestones methods
  getMilestones(goalId: number): Promise<any[]>;
  getMilestone(id: number): Promise<any | undefined>;
  createMilestone(milestone: any): Promise<any>;
  updateMilestone(id: number, milestone: any): Promise<any>;
  deleteMilestone(id: number): Promise<void>;
  
  // Finance methods
  getTransactions(userId: number): Promise<any[]>;
  getTransaction(id: number): Promise<any | undefined>;
  createTransaction(transaction: any): Promise<any>;
  updateTransaction(id: number, transaction: any): Promise<any>;
  deleteTransaction(id: number): Promise<void>;
  
  // Invoice methods
  getInvoices(userId: number): Promise<any[]>;
  getInvoice(id: number): Promise<any | undefined>;
  createInvoice(invoice: any): Promise<any>;
  updateInvoice(id: number, invoice: any): Promise<any>;
  deleteInvoice(id: number): Promise<void>;
  
  // Session store
  sessionStore: session.Store;
}

class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Projects methods
  async getProjects(userId: number): Promise<any[]> {
    const result = await db.select().from(projects).where(eq(projects.userId, userId));
    return result;
  }
  
  async getProject(id: number): Promise<any | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }
  
  async createProject(project: any): Promise<any> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }
  
  async updateProject(id: number, project: any): Promise<any> {
    const result = await db.update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }
  
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
  
  // Clients methods
  async getClients(userId: number): Promise<any[]> {
    const result = await db.select().from(clients).where(eq(clients.userId, userId));
    return result;
  }
  
  async getClient(id: number): Promise<any | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0];
  }
  
  async createClient(client: any): Promise<any> {
    const result = await db.insert(clients).values(client).returning();
    return result[0];
  }
  
  async updateClient(id: number, client: any): Promise<any> {
    const result = await db.update(clients)
      .set(client)
      .where(eq(clients.id, id))
      .returning();
    return result[0];
  }
  
  async deleteClient(id: number): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }
  
  // Time entries methods
  async getTimeEntries(userId: number): Promise<any[]> {
    const result = await db.select().from(timeEntries).where(eq(timeEntries.userId, userId));
    return result;
  }
  
  async getTimeEntry(id: number): Promise<any | undefined> {
    const result = await db.select().from(timeEntries).where(eq(timeEntries.id, id)).limit(1);
    return result[0];
  }
  
  async createTimeEntry(timeEntry: any): Promise<any> {
    const result = await db.insert(timeEntries).values(timeEntry).returning();
    return result[0];
  }
  
  async updateTimeEntry(id: number, timeEntry: any): Promise<any> {
    const result = await db.update(timeEntries)
      .set(timeEntry)
      .where(eq(timeEntries.id, id))
      .returning();
    return result[0];
  }
  
  async deleteTimeEntry(id: number): Promise<void> {
    await db.delete(timeEntries).where(eq(timeEntries.id, id));
  }
  
  // Goals methods
  async getGoals(userId: number): Promise<any[]> {
    const result = await db.select().from(goals).where(eq(goals.userId, userId));
    return result;
  }
  
  async getGoal(id: number): Promise<any | undefined> {
    const result = await db.select().from(goals).where(eq(goals.id, id)).limit(1);
    return result[0];
  }
  
  async createGoal(goal: any): Promise<any> {
    const result = await db.insert(goals).values(goal).returning();
    return result[0];
  }
  
  async updateGoal(id: number, goal: any): Promise<any> {
    const result = await db.update(goals)
      .set(goal)
      .where(eq(goals.id, id))
      .returning();
    return result[0];
  }
  
  async deleteGoal(id: number): Promise<void> {
    await db.delete(goals).where(eq(goals.id, id));
  }
  
  // Milestones methods
  async getMilestones(goalId: number): Promise<any[]> {
    const result = await db.select().from(milestones).where(eq(milestones.goalId, goalId));
    return result;
  }
  
  async getMilestone(id: number): Promise<any | undefined> {
    const result = await db.select().from(milestones).where(eq(milestones.id, id)).limit(1);
    return result[0];
  }
  
  async createMilestone(milestone: any): Promise<any> {
    const result = await db.insert(milestones).values(milestone).returning();
    return result[0];
  }
  
  async updateMilestone(id: number, milestone: any): Promise<any> {
    const result = await db.update(milestones)
      .set(milestone)
      .where(eq(milestones.id, id))
      .returning();
    return result[0];
  }
  
  async deleteMilestone(id: number): Promise<void> {
    await db.delete(milestones).where(eq(milestones.id, id));
  }
  
  // Finance methods
  async getTransactions(userId: number): Promise<any[]> {
    const result = await db.select().from(transactions).where(eq(transactions.userId, userId));
    return result;
  }
  
  async getTransaction(id: number): Promise<any | undefined> {
    const result = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
    return result[0];
  }
  
  async createTransaction(transaction: any): Promise<any> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }
  
  async updateTransaction(id: number, transaction: any): Promise<any> {
    const result = await db.update(transactions)
      .set(transaction)
      .where(eq(transactions.id, id))
      .returning();
    return result[0];
  }
  
  async deleteTransaction(id: number): Promise<void> {
    await db.delete(transactions).where(eq(transactions.id, id));
  }
  
  // Invoice methods
  async getInvoices(userId: number): Promise<any[]> {
    const result = await db.select().from(invoices).where(eq(invoices.userId, userId));
    return result;
  }
  
  async getInvoice(id: number): Promise<any | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
    return result[0];
  }
  
  async createInvoice(invoice: any): Promise<any> {
    const result = await db.insert(invoices).values(invoice).returning();
    return result[0];
  }
  
  async updateInvoice(id: number, invoice: any): Promise<any> {
    const result = await db.update(invoices)
      .set(invoice)
      .where(eq(invoices.id, id))
      .returning();
    return result[0];
  }
  
  async deleteInvoice(id: number): Promise<void> {
    await db.delete(invoices).where(eq(invoices.id, id));
  }
}

export const storage = new DatabaseStorage();
