import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Shield, 
  Save,
  LogOut,
  Moon,
  Sun,
  Smartphone,
  Check,
  Palette
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { t } = useI18n();
  const { lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Subscription plan state
  const [currentPlan] = useState("free");
  
  // Form states
  const [fullName, setFullName] = useState(user?.username || "");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [mobileNotifications, setMobileNotifications] = useState(false);
  
  // Handle saving profile
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated.",
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('settings')}</h1>
            
            {/* Mobile Logo - Shown on mobile, hidden on desktop */}
            <div className="flex items-center md:hidden">
              <span className="text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section */}
            <div className="flex items-center space-x-4">
              <Button onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                {t('signOut')}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
              <div className="md:w-64 mb-6 md:mb-0">
                <div className="flex flex-col space-y-1">
                  <h2 className="text-xl font-semibold mb-3">{t('settings')}</h2>
                  <TabsList className="flex flex-col h-auto">
                    <TabsTrigger value="profile" className="justify-start w-full">
                      <User className="h-4 w-4 mr-2" />
                      {t('yourProfile')}
                    </TabsTrigger>
                    <TabsTrigger value="password" className="justify-start w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Password
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="justify-start w-full">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="justify-start w-full">
                      <Palette className="h-4 w-4 mr-2" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger value="language" className="justify-start w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      Language
                    </TabsTrigger>
                    <TabsTrigger value="subscription" className="justify-start w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Subscription
                    </TabsTrigger>
                    <TabsTrigger value="security" className="justify-start w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="flex-1">
                <TabsContent value="profile" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('yourProfile')}</CardTitle>
                      <CardDescription>Manage your personal information and profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <Label>Profile Picture</Label>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col items-center md:items-start space-y-4">
                            <UserAvatar name={fullName || user?.username || "User"} size="lg" />
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Change Photo</Button>
                              <Button variant="ghost" size="sm">Remove</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                      <Separator />
                    
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <Label htmlFor="fullName">Full Name</Label>
                        </div>
                        <div className="flex-1">
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <Label htmlFor="email">Email</Label>
                        </div>
                        <div className="flex-1">
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <Label htmlFor="phone">Phone Number</Label>
                        </div>
                        <div className="flex-1">
                          <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <Label htmlFor="timezone">Timezone</Label>
                        </div>
                        <div className="flex-1">
                          <Select defaultValue="utc-5">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select your timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                              <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                              <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                              <SelectItem value="utc+0">UTC</SelectItem>
                              <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                              <SelectItem value="utc+2">Eastern European Time (UTC+2)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="password" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <Button>Update Password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage how you want to receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Project Updates</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications about projects you're working on</p>
                          </div>
                          <Switch 
                            checked={emailNotifications} 
                            onCheckedChange={setEmailNotifications} 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Client Messages</Label>
                            <p className="text-sm text-muted-foreground">Receive email notifications when clients send you messages</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Payment Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications about payments and invoices</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Mobile Notifications</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Enable push notifications on your mobile device</p>
                          </div>
                          <Switch 
                            checked={mobileNotifications} 
                            onCheckedChange={setMobileNotifications} 
                          />
                        </div>
                        
                        {mobileNotifications && (
                          <div className="rounded-lg bg-muted p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Smartphone className="h-5 w-5 text-primary" />
                              <span className="font-medium">Mobile Device</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              You need to link your mobile device to receive push notifications
                            </p>
                            <Button variant="outline" size="sm">Link Device</Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Cancel</Button>
                      <Button>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize the look and feel of the application</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Theme</h3>
                        <div className="flex flex-col space-y-4">
                          <RadioGroup defaultValue={theme} onValueChange={(value) => value !== theme && toggleTheme()}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="light" />
                              <Label htmlFor="light" className="flex items-center space-x-2 cursor-pointer">
                                <Sun className="h-5 w-5" />
                                <span>Light</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <Label htmlFor="dark" className="flex items-center space-x-2 cursor-pointer">
                                <Moon className="h-5 w-5" />
                                <span>Dark</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Accent Color</h3>
                        <div className="grid grid-cols-5 gap-4">
                          <div className="flex flex-col items-center">
                            <button className="h-10 w-10 rounded-full bg-blue-500 mb-1 ring-2 ring-offset-2 ring-blue-500"></button>
                            <span className="text-xs">Blue</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <button className="h-10 w-10 rounded-full bg-green-500 mb-1"></button>
                            <span className="text-xs">Green</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <button className="h-10 w-10 rounded-full bg-purple-500 mb-1"></button>
                            <span className="text-xs">Purple</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <button className="h-10 w-10 rounded-full bg-orange-500 mb-1"></button>
                            <span className="text-xs">Orange</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <button className="h-10 w-10 rounded-full bg-pink-500 mb-1"></button>
                            <span className="text-xs">Pink</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="mr-2">Reset to Default</Button>
                      <Button>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="language" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Language</CardTitle>
                      <CardDescription>Choose your preferred language for the interface</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div 
                            className={`border rounded-lg p-4 cursor-pointer ${lang === 'en' ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                            onClick={() => setLang('en')}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">English</span>
                                <span className="text-xs text-muted-foreground">(US)</span>
                              </div>
                              {lang === 'en' && <Check className="h-5 w-5 text-primary" />}
                            </div>
                            <p className="text-sm text-muted-foreground">English language (United States)</p>
                          </div>
                          
                          <div 
                            className={`border rounded-lg p-4 cursor-pointer ${lang === 'ar' ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                            onClick={() => setLang('ar')}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">العربية</span>
                                <span className="text-xs text-muted-foreground">(Arabic)</span>
                              </div>
                              {lang === 'ar' && <Check className="h-5 w-5 text-primary" />}
                            </div>
                            <p className="text-sm text-muted-foreground">Arabic language</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">
                        More languages coming soon. Want to help translate? <a href="#" className="text-primary">Contact us</a>.
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="subscription" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscription Plan</CardTitle>
                      <CardDescription>Manage your subscription and billing information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Current Plan</h3>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-lg font-semibold">Free Plan</h4>
                                <Badge variant="outline" className="bg-primary/10 text-primary">Current</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">The basics for freelancers just getting started</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">$0</p>
                              <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">5 active projects</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Basic time tracking</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Up to 3 clients</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Available Plans</h3>
                        
                        <div className="border rounded-lg p-4 mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-lg font-semibold">Pro Plan</h4>
                              <p className="text-sm text-muted-foreground mt-1">For professional freelancers who need more features</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">$19</p>
                              <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Unlimited projects</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Advanced time tracking</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Unlimited clients</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Invoice generation</span>
                            </div>
                          </div>
                          
                          <Button className="w-full mt-4">Upgrade to Pro</Button>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-lg font-semibold">Business Plan</h4>
                              <p className="text-sm text-muted-foreground mt-1">For teams and agencies with advanced needs</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">$49</p>
                              <p className="text-sm text-muted-foreground">per month</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Everything in Pro</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Team collaboration</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Analytics and reports</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-accent mr-2" />
                              <span className="text-sm">Priority support</span>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full mt-4">Contact Sales</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Enable 2FA</Label>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Session Management</h3>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Current Session</h4>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">Chrome on Windows</p>
                              <p className="text-xs text-muted-foreground">Active now</p>
                            </div>
                            <Badge variant="outline">Current</Badge>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Sign Out of All Other Sessions
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Account Protection</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Login Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive email alerts for new logins to your account</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
