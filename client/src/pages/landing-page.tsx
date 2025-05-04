import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

const LandingPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">CreatorPro</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="rounded-full px-4">Go to Dashboard</Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth">
                  <Button variant="outline" className="rounded-full px-4">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="rounded-full px-4">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-24 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  The Ultimate Platform for Freelancers & Creators
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Manage your projects, track time, handle clients, and get paid with our all-in-one solution.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth">
                  <Button size="lg" className="rounded-full px-8">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -left-4 top-0 h-72 w-72 rotate-45 bg-primary/20 blur-3xl"></div>
              <div className="absolute -right-4 bottom-0 h-72 w-72 -rotate-45 bg-secondary/20 blur-3xl"></div>
              <div className="rounded-lg border bg-background p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="h-40 rounded-md bg-primary/10"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-3/4 rounded-md bg-muted"></div>
                    <div className="h-4 w-1/2 rounded-md bg-muted"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -top-12 rounded-lg border bg-background p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="h-20 rounded-md bg-secondary/10"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-20 rounded-md bg-muted"></div>
                    <div className="h-4 w-10 rounded-md bg-muted"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-12 -left-4 rounded-lg border bg-background p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="h-20 rounded-md bg-primary/10"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-20 rounded-md bg-muted"></div>
                    <div className="h-4 w-10 rounded-md bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-muted/40 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything You Need in One Place
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our platform offers all the tools freelancers and creators need to run a successful business.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4 mt-8">
            {features.map((feature) => (
              <div key={feature.title} className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-full flex-col justify-between rounded-md p-6">
                  <div className="space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Start Using CreatorPro Today
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of freelancers and creators who are growing their businesses with our platform.
            </p>
            <Link href="/auth">
              <Button size="lg" className="mt-4 rounded-full px-8">
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-sm text-muted-foreground md:text-center">
              &copy; {new Date().getFullYear()} CreatorPro. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm underline underline-offset-4">
              Terms of Service
            </a>
            <a href="#" className="text-sm underline underline-offset-4">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: 'Project Management',
    description: 'Manage all your client projects with ease. Set milestones, deadlines, and track progress.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 8h7" />
        <path d="M8 12h6" />
        <path d="M11 16h4" />
      </svg>
    ),
  },
  {
    title: 'Time Tracking',
    description: 'Track time spent on projects and tasks. Generate detailed reports for billing.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Client Management',
    description: 'Organize client information, communication history, and project details in one place.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Invoicing & Payments',
    description: 'Create and send professional invoices. Accept payments via multiple methods.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Goal Tracking',
    description: 'Set business goals and track your progress. Stay motivated and focused.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4Z" />
      </svg>
    ),
  },
  {
    title: 'File Management',
    description: 'Store and organize all your project files, client documents, and resources.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  },
  {
    title: 'Communication Tools',
    description: 'Built-in messaging system to communicate with clients and team members.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'AI Assistant',
    description: 'Get help with project quotes, estimates, and business advice from our AI assistant.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
        <path d="M10 10v3a2 2 0 0 1-2 2v3" />
        <path d="M14 13a2 2 0 0 0 2-2V6" />
        <path d="M18 9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" />
        <path d="M18 22a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3" />
        <path d="M4 18a2 2 0 0 0 2 2h6" />
      </svg>
    ),
  },
];

export default LandingPage;