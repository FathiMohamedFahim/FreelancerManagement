import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  CreditCard, 
  Search, 
  Plus, 
  ChevronsUpDown, 
  CircleDollarSign, 
  DollarSign, 
  ArrowDownCircle, 
  ArrowUpCircle,
  BarChart,
  Download
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "income" | "expense";
  category: string;
  paymentMethod: string;
}

interface Invoice {
  id: number;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue";
}

export default function Finances() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("month");
  
  // Sample transactions data
  const transactions: Transaction[] = [
    {
      id: 1,
      description: "Website Design Payment",
      amount: 2500,
      date: "Today",
      status: "completed",
      type: "income",
      category: "Freelance",
      paymentMethod: "PayPal"
    },
    {
      id: 2,
      description: "Adobe Creative Cloud",
      amount: -52.99,
      date: "Yesterday",
      status: "completed",
      type: "expense",
      category: "Software",
      paymentMethod: "Credit Card"
    },
    {
      id: 3,
      description: "Mobile App Development",
      amount: 3750,
      date: "Oct 15, 2023",
      status: "completed",
      type: "income",
      category: "Freelance",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 4,
      description: "Office Supplies",
      amount: -125.40,
      date: "Oct 12, 2023",
      status: "completed",
      type: "expense",
      category: "Office",
      paymentMethod: "Credit Card"
    },
    {
      id: 5,
      description: "Domain Renewal",
      amount: -29.99,
      date: "Oct 10, 2023",
      status: "completed",
      type: "expense",
      category: "Hosting",
      paymentMethod: "PayPal"
    },
    {
      id: 6,
      description: "Logo Design",
      amount: 850,
      date: "Oct 5, 2023",
      status: "completed",
      type: "income",
      category: "Freelance",
      paymentMethod: "PayPal"
    },
    {
      id: 7,
      description: "Co-working Space",
      amount: -200,
      date: "Oct 1, 2023",
      status: "completed",
      type: "expense",
      category: "Rent",
      paymentMethod: "Bank Transfer"
    }
  ];

  // Sample invoices data
  const invoices: Invoice[] = [
    {
      id: 1,
      client: "Acme Inc.",
      amount: 2500,
      date: "Oct 15, 2023",
      dueDate: "Oct 30, 2023",
      status: "unpaid"
    },
    {
      id: 2,
      client: "TechStart",
      amount: 3750,
      date: "Oct 5, 2023",
      dueDate: "Oct 20, 2023",
      status: "paid"
    },
    {
      id: 3,
      client: "Global Markets",
      amount: 1200,
      date: "Sep 28, 2023",
      dueDate: "Oct 12, 2023",
      status: "overdue"
    },
    {
      id: 4,
      client: "DesignHub",
      amount: 850,
      date: "Sep 20, 2023",
      dueDate: "Oct 5, 2023",
      status: "paid"
    }
  ];

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const balance = totalIncome - totalExpenses;

  // Get status badge for transactions
  const getTransactionStatusBadge = (status: Transaction['status']) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-tag">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-tag">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-tag">Failed</Badge>;
      default:
        return null;
    }
  };

  // Get status badge for invoices
  const getInvoiceStatusBadge = (status: Invoice['status']) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-tag">Paid</Badge>;
      case 'unpaid':
        return <Badge className="bg-yellow-tag">Unpaid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-tag">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('finances')}</h1>
            
            {/* Mobile Logo - Shown on mobile, hidden on desktop */}
            <div className="flex items-center md:hidden">
              <span className="text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section with search and actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 w-[220px] text-sm rounded-md bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="hidden md:flex">
                    <Plus className="mr-2 h-4 w-4" />
                    New
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ArrowDownCircle className="mr-2 h-4 w-4" />
                    Record Income
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpCircle className="mr-2 h-4 w-4" />
                    Record Expense
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Create Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile-only add button */}
              <Button size="icon" className="md:hidden h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                  <span>Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${balance >= 0 ? 'text-accent' : 'text-destructive'}`}>
                  {formatCurrency(balance)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Current balance
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ArrowDownCircle className="h-5 w-5 mr-2 text-accent" />
                  <span>Income</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">
                  {formatCurrency(totalIncome)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  This {timeRange}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ArrowUpCircle className="h-5 w-5 mr-2 text-destructive" />
                  <span>Expenses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">
                  {formatCurrency(totalExpenses)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  This {timeRange}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Financial Overview</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Income vs. Expenses</CardTitle>
              <CardDescription>Financial summary for this {timeRange}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Chart visualization would be displayed here</p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Transactions and Invoices */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="paymentMethods">Payment Methods</TabsTrigger>
            </TabsList>
            
            {/* Transactions Tab */}
            <TabsContent value="transactions" className="mt-0">
              <div className="relative md:hidden mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                          <th className="p-4">Description</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.length > 0 ? (
                          filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">
                                <div className="font-medium">{transaction.description}</div>
                                <div className="text-sm text-muted-foreground">{transaction.paymentMethod}</div>
                              </td>
                              <td className="p-4">{transaction.date}</td>
                              <td className={`p-4 font-medium ${transaction.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                              </td>
                              <td className="p-4">{transaction.category}</td>
                              <td className="p-4">
                                {getTransactionStatusBadge(transaction.status)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                              No transactions found matching your search criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Invoices Tab */}
            <TabsContent value="invoices" className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Invoices</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                          <th className="p-4">Invoice #</th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Due Date</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">INV-{invoice.id.toString().padStart(4, '0')}</td>
                            <td className="p-4">{invoice.client}</td>
                            <td className="p-4 font-medium">{formatCurrency(invoice.amount)}</td>
                            <td className="p-4">{invoice.date}</td>
                            <td className="p-4">{invoice.dueDate}</td>
                            <td className="p-4">
                              {getInvoiceStatusBadge(invoice.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Methods Tab */}
            <TabsContent value="paymentMethods" className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>PayPal</CardTitle>
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Connected Account</p>
                    <p className="text-sm text-muted-foreground mb-4">user@example.com</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Primary</Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Bank Account</CardTitle>
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Connected Account</p>
                    <p className="text-sm text-muted-foreground mb-4">**** 5678</p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed flex items-center justify-center p-6">
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Method
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
