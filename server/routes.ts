import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { createAIResponse } from "./openai";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // API prefix for all routes
  const apiPrefix = "/api";

  // AI Chat endpoint
  app.post(`${apiPrefix}/ai/chat`, async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request. Messages array is required." });
      }
      
      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({
          error: "OpenAI API key not configured",
          message: {
            role: "assistant",
            content: "I'm sorry, but the AI assistant is currently unavailable. The system administrator needs to configure the OpenAI API key.",
            timestamp: new Date().toISOString()
          }
        });
      }
      
      const response = await createAIResponse(messages);
      
      return res.status(200).json({
        message: {
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Error in AI chat endpoint:", error);
      
      // Check for quota exceeded errors
      const errorMessage = error instanceof Error ? error.toString() : String(error);
      if (errorMessage.includes("quota") || errorMessage.includes("429") || errorMessage.includes("limit")) {
        return res.status(429).json({
          error: "API rate limit exceeded",
          message: {
            role: "assistant",
            content: "I'm sorry, but the AI assistant has reached its usage limit. Please try again later or contact the administrator to update the API quota.",
            timestamp: new Date().toISOString()
          }
        });
      }
      
      return res.status(500).json({ 
        error: "Failed to generate AI response", 
        message: {
          role: "assistant",
          content: "I'm currently experiencing some technical difficulties. Please try again later.",
          timestamp: new Date().toISOString()
        }
      });
    }
  });

  // Projects endpoints
  app.get(`${apiPrefix}/projects`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const projects = await storage.getProjects(req.user.id);
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post(`${apiPrefix}/projects`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const project = await storage.createProject({ ...req.body, userId: req.user.id });
      return res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ error: "Failed to create project" });
    }
  });

  // Clients endpoints
  app.get(`${apiPrefix}/clients`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const clients = await storage.getClients(req.user.id);
      return res.status(200).json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.post(`${apiPrefix}/clients`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const client = await storage.createClient({ ...req.body, userId: req.user.id });
      return res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      return res.status(500).json({ error: "Failed to create client" });
    }
  });

  // Time tracking endpoints
  app.get(`${apiPrefix}/time-entries`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const timeEntries = await storage.getTimeEntries(req.user.id);
      return res.status(200).json(timeEntries);
    } catch (error) {
      console.error("Error fetching time entries:", error);
      return res.status(500).json({ error: "Failed to fetch time entries" });
    }
  });

  app.post(`${apiPrefix}/time-entries`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const timeEntry = await storage.createTimeEntry({ ...req.body, userId: req.user.id });
      return res.status(201).json(timeEntry);
    } catch (error) {
      console.error("Error creating time entry:", error);
      return res.status(500).json({ error: "Failed to create time entry" });
    }
  });

  // Goals endpoints
  app.get(`${apiPrefix}/goals`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const goals = await storage.getGoals(req.user.id);
      return res.status(200).json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      return res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  app.post(`${apiPrefix}/goals`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const goal = await storage.createGoal({ ...req.body, userId: req.user.id });
      return res.status(201).json(goal);
    } catch (error) {
      console.error("Error creating goal:", error);
      return res.status(500).json({ error: "Failed to create goal" });
    }
  });

  // Milestones endpoints
  app.get(`${apiPrefix}/milestones`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const goalId = req.query.goalId as string;
      if (!goalId) {
        return res.status(400).json({ error: "Goal ID is required" });
      }
      
      const milestones = await storage.getMilestones(parseInt(goalId));
      return res.status(200).json(milestones);
    } catch (error) {
      console.error("Error fetching milestones:", error);
      return res.status(500).json({ error: "Failed to fetch milestones" });
    }
  });

  app.post(`${apiPrefix}/milestones`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const milestone = await storage.createMilestone(req.body);
      return res.status(201).json(milestone);
    } catch (error) {
      console.error("Error creating milestone:", error);
      return res.status(500).json({ error: "Failed to create milestone" });
    }
  });

  // Finances endpoints
  app.get(`${apiPrefix}/transactions`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const transactions = await storage.getTransactions(req.user.id);
      return res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post(`${apiPrefix}/transactions`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const transaction = await storage.createTransaction({ ...req.body, userId: req.user.id });
      return res.status(201).json(transaction);
    } catch (error) {
      console.error("Error creating transaction:", error);
      return res.status(500).json({ error: "Failed to create transaction" });
    }
  });

  // Invoices endpoints
  app.get(`${apiPrefix}/invoices`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const invoices = await storage.getInvoices(req.user.id);
      return res.status(200).json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      return res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post(`${apiPrefix}/invoices`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const invoice = await storage.createInvoice({ ...req.body, userId: req.user.id });
      return res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      return res.status(500).json({ error: "Failed to create invoice" });
    }
  });
  
  // PayPal endpoints
  app.get(`${apiPrefix}/paypal/setup`, async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post(`${apiPrefix}/paypal/order`, async (req, res) => {
    // Request body should contain: { intent, amount, currency }
    await createPaypalOrder(req, res);
  });

  app.post(`${apiPrefix}/paypal/order/:orderID/capture`, async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
