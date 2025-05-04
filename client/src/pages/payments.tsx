import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import PayPalButton from "@/components/PayPalButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function PaymentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState("10.00");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleProceedPayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "paypal") {
      setShowPayPalButton(true);
    } else if (paymentMethod === "vodafone") {
      toast({
        title: "Vodafone Cash",
        description: "Vodafone Cash integration is coming soon!",
      });
    } else {
      toast({
        title: "Payment Method",
        description: "Please select a payment method",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Payments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>
              Choose your payment method and enter the amount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="flex">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="ml-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="payment-paypal" />
                  <Label htmlFor="payment-paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vodafone" id="payment-vodafone" />
                  <Label htmlFor="payment-vodafone">Vodafone Cash</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            {!showPayPalButton ? (
              <Button onClick={handleProceedPayment}>Proceed to Payment</Button>
            ) : (
              <div className="w-full">
                <PayPalButton
                  amount={amount}
                  currency={currency}
                  intent="CAPTURE"
                />
              </div>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Your recent payment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No payment history available yet.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}