import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import PayPalButton from '@/components/PayPalButton';
import { 
  CreditCard, 
  DollarSign, 
  Info, 
  Landmark, 
  Send, 
  ShieldCheck, 
  Wallet
} from 'lucide-react';

const PaymentsPage = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVodafonePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Initiated",
        description: "A Vodafone Cash payment for " + formatCurrency(parseFloat(amount), currency) + " has been initiated. Please check your phone for confirmation.",
      });
    }, 2000);
  };

  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate card payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Card Payment Success",
        description: "Your payment of " + formatCurrency(parseFloat(amount), currency) + " was successful.",
      });
    }, 2000);
  };

  const handleBankTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate bank transfer processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Bank Transfer Initiated",
        description: "A bank transfer for " + formatCurrency(parseFloat(amount), currency) + " has been initiated. This may take 1-3 business days to process.",
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-6 overflow-auto ml-0 md:ml-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Payments</h1>
          
          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method to process transactions.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="paypal" onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-1 sm:grid-cols-4 mb-6">
                    <TabsTrigger value="paypal" className="flex items-center gap-2">
                      <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="PayPal" className="h-5" />
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value="vodafone" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Vodafone Cash
                    </TabsTrigger>
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="flex items-center gap-2">
                      <Landmark className="h-4 w-4" />
                      Bank Transfer
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="paypal" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          placeholder="Enter amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        {amount && parseFloat(amount) > 0 ? (
                          <div className="flex justify-center flex-col items-center">
                            <p className="text-2xl font-bold mb-4">
                              {formatCurrency(parseFloat(amount), currency)}
                            </p>
                            <div className="text-center" style={{ maxWidth: '250px' }}>
                              <PayPalButton 
                                amount={amount} 
                                currency={currency} 
                                intent="CAPTURE" 
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground">
                            Enter an amount to continue with PayPal payment
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                      <Info className="h-5 w-5 text-blue-600 mr-2 dark:text-blue-400" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        PayPal allows secure payments and doesn't share your financial information.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vodafone" className="space-y-4">
                    <form onSubmit={handleVodafonePayment}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="v-amount">Amount</Label>
                          <Input
                            id="v-amount"
                            placeholder="Enter amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="vodafone-number">Vodafone Number</Label>
                          <Input
                            id="vodafone-number"
                            placeholder="Enter Vodafone cash number"
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="v-currency">Currency</Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger id="v-currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="EGP">EGP - Egyptian Pound</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button type="submit" disabled={!amount || isProcessing}>
                          {isProcessing ? 'Processing...' : 'Pay with Vodafone Cash'}
                        </Button>
                      </div>
                    </form>
                    
                    <div className="flex items-center rounded-md border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
                      <Info className="h-5 w-5 text-orange-600 mr-2 dark:text-orange-400" />
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        Vodafone Cash payments are processed instantly. Make sure to enter your correct Vodafone number.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="card" className="space-y-4">
                    <form onSubmit={handleCardPayment}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="card-amount">Amount</Label>
                          <Input
                            id="card-amount"
                            placeholder="Enter amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="card-currency">Currency</Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger id="card-currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                              <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button type="submit" disabled={!amount || isProcessing}>
                          {isProcessing ? 'Processing...' : 'Pay with Card'}
                        </Button>
                      </div>
                    </form>
                    
                    <div className="flex items-center rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                      <ShieldCheck className="h-5 w-5 text-green-600 mr-2 dark:text-green-400" />
                      <p className="text-sm text-green-600 dark:text-green-400">
                        All card information is encrypted and securely processed. We never store your full card details.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bank" className="space-y-4">
                    <form onSubmit={handleBankTransfer}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="bank-amount">Amount</Label>
                          <Input
                            id="bank-amount"
                            placeholder="Enter amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="account-name">Account Name</Label>
                          <Input
                            id="account-name"
                            placeholder="Enter account name"
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="account-number">Account Number</Label>
                          <Input
                            id="account-number"
                            placeholder="Enter account number"
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="bank-name">Bank Name</Label>
                          <Input
                            id="bank-name"
                            placeholder="Enter bank name"
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="bank-currency">Currency</Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger id="bank-currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button type="submit" disabled={!amount || isProcessing}>
                          {isProcessing ? 'Processing...' : 'Initiate Bank Transfer'}
                        </Button>
                      </div>
                    </form>
                    
                    <div className="flex items-center rounded-md border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950">
                      <Info className="h-5 w-5 text-purple-600 mr-2 dark:text-purple-400" />
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        Bank transfers typically take 1-3 business days to process. Make sure all your banking information is correct.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex flex-col items-start border-t px-6 py-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Secure Payment
                </h3>
                <p className="text-sm text-muted-foreground">
                  All payment information is securely transmitted using industry-standard encryption.
                </p>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment History
                </CardTitle>
                <CardDescription>
                  View your recent payment transactions.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="text-center p-6">
                  <Send className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No payment history yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Once you make payments, they will appear here for your reference.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;