import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
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
import AuthPage from "@/pages/auth-page";
import Payments from "@/pages/payments";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Protected Routes */}
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/projects" component={Projects} />
      <ProtectedRoute path="/clients" component={Clients} />
      <ProtectedRoute path="/time-tracker" component={TimeTracker} />
      <ProtectedRoute path="/messages" component={Messages} />
      <ProtectedRoute path="/files" component={Files} />
      <ProtectedRoute path="/goals" component={Goals} />
      <ProtectedRoute path="/finances" component={Finances} />
      <ProtectedRoute path="/payments" component={Payments} />
      <ProtectedRoute path="/vodafone-payments" component={VodafonePayments} />
      <ProtectedRoute path="/ai-assistant" component={AIAssistant} />
      <ProtectedRoute path="/settings" component={Settings} />
      
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
          <AuthProvider>
            <Router />
            <Toaster />
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
