import { db } from "./index";
import * as schema from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Check if users already exist
    const existingUsers = await db.select().from(schema.users);
    
    // Only seed if no users exist
    if (existingUsers.length === 0) {
      console.log("Seeding users...");
      
      // Create demo user
      const hashedPassword = await hashPassword("password123");
      const [demoUser] = await db.insert(schema.users).values({
        username: "demo",
        password: hashedPassword,
        fullName: "Demo User",
        email: "demo@example.com",
        settings: { theme: "light", language: "en" }
      }).returning();
      
      console.log(`Created demo user with ID: ${demoUser.id}`);
      
      // Create clients
      console.log("Seeding clients...");
      const clients = [
        {
          name: "Acme Inc.",
          company: "Acme Inc.",
          email: "contact@acme.com",
          phone: "(555) 123-4567",
          status: "active",
          notes: "Regular client for web development projects",
          userId: demoUser.id
        },
        {
          name: "TechStart",
          company: "TechStart",
          email: "info@techstart.io",
          phone: "(555) 987-6543",
          status: "active",
          notes: "Startup client, mobile app development",
          userId: demoUser.id
        },
        {
          name: "Global Markets",
          company: "Global Markets Ltd.",
          email: "projects@globalmarkets.com",
          phone: "(555) 555-7890",
          status: "inactive",
          notes: "Marketing campaign client",
          userId: demoUser.id
        },
        {
          name: "DesignHub",
          company: "DesignHub",
          email: "creative@designhub.co",
          phone: "(555) 345-6789",
          status: "prospect",
          notes: "Potential client for design work",
          userId: demoUser.id
        }
      ];
      
      const createdClients = await db.insert(schema.clients).values(clients).returning();
      console.log(`Created ${createdClients.length} clients`);
      
      // Create projects
      console.log("Seeding projects...");
      const projects = [
        {
          name: "Website Redesign",
          description: "Redesign and modernize the company website",
          clientId: createdClients[0].id,
          status: "active",
          dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
          progress: 65,
          userId: demoUser.id
        },
        {
          name: "Mobile App Development",
          description: "Create a native mobile app for both iOS and Android",
          clientId: createdClients[1].id,
          status: "active",
          dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
          progress: 30,
          userId: demoUser.id
        },
        {
          name: "Marketing Campaign",
          description: "Develop and implement digital marketing campaign",
          clientId: createdClients[2].id,
          status: "active",
          dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
          progress: 85,
          userId: demoUser.id
        },
        {
          name: "Logo Design",
          description: "Create a new logo and brand identity",
          clientId: createdClients[3].id,
          status: "completed",
          dueDate: new Date(new Date().setDate(new Date().getDate() - 10)),
          progress: 100,
          userId: demoUser.id
        }
      ];
      
      const createdProjects = await db.insert(schema.projects).values(projects).returning();
      console.log(`Created ${createdProjects.length} projects`);
      
      // Create time entries
      console.log("Seeding time entries...");
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      
      const timeEntries = [
        {
          projectId: createdProjects[0].id,
          description: "Frontend Development",
          startTime: new Date(now.setHours(10, 30, 0, 0)),
          endTime: new Date(now.setHours(12, 45, 0, 0)),
          duration: 135, // 2h 15m in minutes
          billable: true,
          userId: demoUser.id
        },
        {
          projectId: createdProjects[1].id,
          description: "Client Meeting",
          startTime: new Date(now.setHours(14, 0, 0, 0)),
          endTime: new Date(now.setHours(14, 45, 0, 0)),
          duration: 45, // 45m in minutes
          billable: true,
          userId: demoUser.id
        },
        {
          projectId: createdProjects[0].id,
          description: "UI Design",
          startTime: new Date(yesterday.setHours(9, 0, 0, 0)),
          endTime: new Date(yesterday.setHours(12, 30, 0, 0)),
          duration: 210, // 3h 30m in minutes
          billable: true,
          userId: demoUser.id
        }
      ];
      
      const createdTimeEntries = await db.insert(schema.timeEntries).values(timeEntries).returning();
      console.log(`Created ${createdTimeEntries.length} time entries`);
      
      // Create goals
      console.log("Seeding goals...");
      const goals = [
        {
          title: "Acquire 5 New Clients",
          description: "Find and sign contracts with 5 new clients for website development projects",
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          status: "active",
          progress: 60,
          category: "business",
          userId: demoUser.id
        },
        {
          title: "Complete Web Design Course",
          description: "Finish the advanced UI/UX design course to improve skills",
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          status: "active",
          progress: 75,
          category: "professional",
          userId: demoUser.id
        },
        {
          title: "Reach $10,000 Monthly Revenue",
          description: "Increase freelancing income to reach $10k per month consistently",
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)),
          status: "active",
          progress: 40,
          category: "financial",
          userId: demoUser.id
        }
      ];
      
      const createdGoals = await db.insert(schema.goals).values(goals).returning();
      console.log(`Created ${createdGoals.length} goals`);
      
      // Create milestones
      console.log("Seeding milestones...");
      const milestones = [
        {
          goalId: createdGoals[0].id,
          title: "Identify 20 potential clients",
          completed: true
        },
        {
          goalId: createdGoals[0].id,
          title: "Reach out to potential clients",
          completed: true
        },
        {
          goalId: createdGoals[0].id,
          title: "Schedule discovery calls",
          completed: true
        },
        {
          goalId: createdGoals[0].id,
          title: "Send proposals",
          completed: false
        },
        {
          goalId: createdGoals[0].id,
          title: "Sign contracts",
          completed: false
        },
        {
          goalId: createdGoals[1].id,
          title: "Complete modules 1-5",
          completed: true
        },
        {
          goalId: createdGoals[1].id,
          title: "Complete modules 6-10",
          completed: true
        },
        {
          goalId: createdGoals[1].id,
          title: "Complete final project",
          completed: false
        }
      ];
      
      const createdMilestones = await db.insert(schema.milestones).values(milestones).returning();
      console.log(`Created ${createdMilestones.length} milestones`);
      
      // Create transactions
      console.log("Seeding transactions...");
      const transactions = [
        {
          description: "Website Design Payment",
          amount: 2500,
          type: "income",
          category: "Freelance",
          date: new Date(),
          paymentMethod: "PayPal",
          status: "completed",
          userId: demoUser.id
        },
        {
          description: "Adobe Creative Cloud",
          amount: -52.99,
          type: "expense",
          category: "Software",
          date: yesterday,
          paymentMethod: "Credit Card",
          status: "completed",
          userId: demoUser.id
        },
        {
          description: "Mobile App Development",
          amount: 3750,
          type: "income",
          category: "Freelance",
          date: new Date(new Date().setDate(new Date().getDate() - 15)),
          paymentMethod: "Bank Transfer",
          status: "completed",
          userId: demoUser.id
        },
        {
          description: "Office Supplies",
          amount: -125.40,
          type: "expense",
          category: "Office",
          date: new Date(new Date().setDate(new Date().getDate() - 12)),
          paymentMethod: "Credit Card",
          status: "completed",
          userId: demoUser.id
        }
      ];
      
      const createdTransactions = await db.insert(schema.transactions).values(transactions).returning();
      console.log(`Created ${createdTransactions.length} transactions`);
      
      // Create invoices
      console.log("Seeding invoices...");
      const invoices = [
        {
          clientId: createdClients[0].id,
          amount: 2500,
          status: "unpaid",
          issueDate: new Date(new Date().setDate(new Date().getDate() - 5)),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
          items: JSON.stringify([
            { description: "Website Design", quantity: 1, rate: 2500, amount: 2500 }
          ]),
          userId: demoUser.id
        },
        {
          clientId: createdClients[1].id,
          amount: 3750,
          status: "paid",
          issueDate: new Date(new Date().setDate(new Date().getDate() - 15)),
          dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
          items: JSON.stringify([
            { description: "Mobile App Development - Phase 1", quantity: 1, rate: 3750, amount: 3750 }
          ]),
          userId: demoUser.id
        },
        {
          clientId: createdClients[2].id,
          amount: 1200,
          status: "overdue",
          issueDate: new Date(new Date().setDate(new Date().getDate() - 20)),
          dueDate: new Date(new Date().setDate(new Date().getDate() - 5)),
          items: JSON.stringify([
            { description: "Marketing Strategy", quantity: 1, rate: 800, amount: 800 },
            { description: "Campaign Setup", quantity: 1, rate: 400, amount: 400 }
          ]),
          userId: demoUser.id
        }
      ];
      
      const createdInvoices = await db.insert(schema.invoices).values(invoices).returning();
      console.log(`Created ${createdInvoices.length} invoices`);
      
      console.log("Database seeding completed successfully!");
    } else {
      console.log("Database already has users, skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
