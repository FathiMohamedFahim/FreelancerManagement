import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Chatbot } from "@/components/AIChat/Chatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Search, Calculator, Clock, ImageIcon, HelpCircle, CheckCircle2 } from "lucide-react";

export default function AIAssistant() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card md:bg-transparent sticky top-0 z-10 border-b md:border-0 px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Page Title - Hidden on mobile, shown on desktop */}
            <h1 className="text-xl font-bold hidden md:block">{t('aiAssistant')}</h1>
            
            {/* Mobile Logo - Shown on mobile, hidden on desktop */}
            <div className="flex items-center md:hidden">
              <span className="text-lg font-bold">CreatorPro</span>
            </div>
            
            {/* Right section with search and actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10 pr-4 py-2 text-sm rounded-md bg-background border border-input"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="chat" className="flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                {t('chat')}
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center">
                <Calculator className="h-4 w-4 mr-2" />
                {t('tools')}
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                {t('help')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-0">
              <div className="flex flex-col">
                <p className="text-muted-foreground mb-4">{t('aiAssistantDescription')}</p>
                <div className="h-[calc(100vh-220px)]">
                  <Chatbot />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="mt-0">
              <div className="space-y-6">
                <p className="text-muted-foreground mb-4">Use these specialized AI tools to help with specific tasks for your freelance business.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-primary" />
                        {t('projectAnalyzer')}
                      </CardTitle>
                      <CardDescription>
                        {t('projectAnalyzerDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        placeholder="Paste project description here..." 
                        className="mb-4"
                      />
                      <Button className="w-full">
                        {t('analyze')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calculator className="h-4 w-4 mr-2 text-accent" />
                        {t('rateCalculator')}
                      </CardTitle>
                      <CardDescription>
                        {t('rateCalculatorDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        placeholder="Describe your service and requirements..." 
                        className="mb-4"
                      />
                      <Button className="w-full">
                        {t('calculate')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-destructive" />
                        {t('timeEstimator')}
                      </CardTitle>
                      <CardDescription>
                        {t('timeEstimatorDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        placeholder="Describe the project scope..." 
                        className="mb-4"
                      />
                      <Button className="w-full">
                        {t('estimate')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ImageIcon className="h-4 w-4 mr-2 text-secondary" />
                        {t('imageGenerator')}
                      </CardTitle>
                      <CardDescription>
                        {t('imageGeneratorDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        placeholder="Describe the image you want..." 
                        className="mb-4"
                      />
                      <Button className="w-full">
                        {t('generate')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="help" className="mt-0">
              <div className="space-y-6">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('aiAssistantHelp')}</h2>
                  <p className="text-muted-foreground mb-6">{t('aiAssistantHelpDescription')}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{t('howToUseChat')}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('chatUsagePoint1')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('chatUsagePoint2')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('chatUsagePoint3')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('chatUsagePoint4')}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">{t('whatCanAIAssistantDo')}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('aiCapabilityPoint1')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('aiCapabilityPoint2')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('aiCapabilityPoint3')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('aiCapabilityPoint4')}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                          <span>{t('aiCapabilityPoint5')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-lg font-medium mb-2">{t('poweredByOpenAI')}</h3>
                  <p className="text-muted-foreground">
                    The AI assistant is powered by OpenAI's advanced language models, 
                    allowing it to understand and respond to a wide range of freelance 
                    and business related questions with human-like understanding.
                  </p>
                </div>
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
