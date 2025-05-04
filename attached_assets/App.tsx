import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import NotFound from "@/pages/not-found";

// Pages
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import Clients from "@/pages/clients";
import TimeTracker from "@/pages/time-tracker";
import Messages from "@/pages/messages";
import Files from "@/pages/files";
import Goals from "@/pages/goals";
import Finances from "@/pages/finances";
import VodafonePayments from "@/pages/vodafone-payments";
import Settings from "@/pages/settings";
import AIAssistant from "@/pages/ai-assistant";
import Login from "@/pages/login";
import Register from "@/pages/register";
// Use login page as the landing page for now

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* User Dashboard Pages */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/projects" component={Projects} />
      <Route path="/clients" component={Clients} />
      <Route path="/time-tracker" component={TimeTracker} />
      <Route path="/messages" component={Messages} />
      <Route path="/files" component={Files} />
      <Route path="/goals" component={Goals} />
      <Route path="/finances" component={Finances} />
      <Route path="/vodafone-payments" component={VodafonePayments} />
      <Route path="/ai-assistant" component={AIAssistant} />
      <Route path="/settings" component={Settings} />
      
      {/* Admin Pages will be added later */}
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <Router />
          <Toaster />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
