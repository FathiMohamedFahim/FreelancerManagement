import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Plus,
  Clock, 
  Search, 
  ArrowRight,
  Smartphone 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Define payment form schema
const paymentFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

// Define payment history item type
interface PaymentHistoryItem {
  id: number;
  phoneNumber: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function VodafonePayments() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("payment");
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample payment history data
  const paymentHistory: PaymentHistoryItem[] = [
    {
      id: 1,
      phoneNumber: "+201012345678",
      amount: 50,
      date: "Today, 10:30 AM",
      status: "completed"
    },
    {
      id: 2,
      phoneNumber: "+201123456789",
      amount: 100,
      date: "Yesterday, 3:45 PM",
      status: "completed"
    },
    {
      id: 3,
      phoneNumber: "+201234567890",
      amount: 75,
      date: "Oct 15, 2023, 11:20 AM",
      status: "failed"
    },
    {
      id: 4,
      phoneNumber: "+201098765432",
      amount: 200,
      date: "Oct 10, 2023, 2:15 PM",
      status: "pending"
    }
  ];

  // Filter payment history based on search term
  const filteredHistory = paymentHistory.filter(payment => 
    payment.phoneNumber.includes(searchTerm) ||
    payment.amount.toString().includes(searchTerm) ||
    payment.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Setup form with validation
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: PaymentFormValues) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Payment of $${data.amount} to ${data.phoneNumber} has been processed.`,
      });
      
      form.reset();
    }, 2000);
  };

  // Get status badge for payment history
  const getStatusBadge = (status: PaymentHistoryItem['status']) => {
    switch(status) {
      case 'completed':
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">Completed</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-yellow-500">Pending</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center">
            <XCircle className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500">Failed</span>
          </div>
        );
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
            <h1 className="text-xl font-bold hidden md:block">Vodafone Payments</h1>
            
            {/* Mobile Logo - Shown on mobile, hidden on desktop */}
            <div className="flex items-center md:hidden">
              <span className="text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section with actions */}
            <div className="flex items-center space-x-4">
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                New Payment
              </Button>
              
              {/* Mobile-only add button */}
              <Button size="icon" className="md:hidden h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          <Tabs defaultValue="payment" onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="payment">Make Payment</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="saved">Saved Numbers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle>Vodafone Cash Payment</CardTitle>
                          <CardDescription>Send money to a Vodafone Cash account</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="+201XXXXXXXXX" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Enter the recipient's Vodafone Cash phone number
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="text" 
                                      placeholder="0.00" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Enter the amount you want to send (in EGP)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <span className="mr-2">Processing</span>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </>
                            ) : (
                              <>
                                <span className="mr-2">Send Payment</span>
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>Important details about Vodafone Cash payments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Transaction Limits</p>
                          <p className="text-sm text-muted-foreground">Daily limit: 10,000 EGP</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Processing Time</p>
                          <p className="text-sm text-muted-foreground">Payments are usually processed instantly</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Transaction Fees</p>
                          <p className="text-sm text-muted-foreground">A small fee may be charged by Vodafone for the transaction</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-muted p-4 mt-4">
                        <h3 className="text-sm font-medium mb-2">Need Help?</h3>
                        <p className="text-sm text-muted-foreground">If you have any issues with your Vodafone Cash payments, please contact our support team at support@creatorpro.com or call Vodafone Cash support at 16880.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Payment History</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search payments..."
                    className="pl-10 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm font-medium text-muted-foreground border-b">
                          <th className="p-4">Phone Number</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHistory.length > 0 ? (
                          filteredHistory.map((payment) => (
                            <tr key={payment.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span>{payment.phoneNumber}</span>
                                </div>
                              </td>
                              <td className="p-4 font-medium">${payment.amount}</td>
                              <td className="p-4">{payment.date}</td>
                              <td className="p-4">{getStatusBadge(payment.status)}</td>
                              <td className="p-4 text-right">
                                <Button variant="ghost" size="sm">
                                  Repeat Payment
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-muted-foreground">
                              No payment history found matching your search
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Saved Numbers</h2>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Number
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Personal</CardTitle>
                    <CardDescription>+201012345678</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Last payment: 2 days ago</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Pay</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Business</CardTitle>
                    <CardDescription>+201123456789</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Last payment: 1 week ago</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Pay</Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center h-[160px]">
                    <Button variant="outline" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Number
                    </Button>
                  </CardContent>
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
