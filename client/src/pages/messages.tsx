import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Edit,
  Send, 
  MoreVertical, 
  PaperclipIcon, 
  X, 
  PhoneCall, 
  Video,
  Image,
  File,
  ArrowLeft,
  User2
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: string;
  recipient: string;
  timestamp: string;
  read: boolean;
  outgoing: boolean;
}

interface Conversation {
  id: number;
  participantName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export default function Messages() {
  const { t } = useI18n();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      participantName: "John Smith",
      lastMessage: "I've reviewed the latest designs. They look great!",
      timestamp: "2h ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      participantName: "Sarah Johnson",
      lastMessage: "Can we schedule a call next week?",
      timestamp: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: 3,
      participantName: "Michael Davis",
      lastMessage: "Thank you for sending the invoice.",
      timestamp: "2 days ago",
      unread: 0,
      online: false
    },
    {
      id: 4,
      participantName: "Emily Chang",
      lastMessage: "The project is coming along nicely!",
      timestamp: "3 days ago",
      unread: 1,
      online: true
    },
    {
      id: 5,
      participantName: "Robert Wilson",
      lastMessage: "Let me know when you're available for a meeting.",
      timestamp: "1 week ago",
      unread: 0,
      online: false
    }
  ];

  // Sample messages for selected conversation
  const messages: Message[] = [
    {
      id: 1,
      content: "Hi Alex, how's the website redesign coming along?",
      sender: "John Smith",
      recipient: "Me",
      timestamp: "Tuesday 10:32 AM",
      read: true,
      outgoing: false
    },
    {
      id: 2,
      content: "It's going well! I've completed the homepage and about page designs. Working on the product pages now.",
      sender: "Me",
      recipient: "John Smith",
      timestamp: "Tuesday 10:45 AM",
      read: true,
      outgoing: true
    },
    {
      id: 3,
      content: "That sounds great. When do you think you'll be able to share the designs for review?",
      sender: "John Smith",
      recipient: "Me",
      timestamp: "Tuesday 11:02 AM",
      read: true,
      outgoing: false
    },
    {
      id: 4,
      content: "I should be able to share them by end of day tomorrow. Just need to finalize a few details.",
      sender: "Me",
      recipient: "John Smith",
      timestamp: "Tuesday 11:10 AM",
      read: true,
      outgoing: true
    },
    {
      id: 5,
      content: "Perfect. Looking forward to seeing them. Also, could you include some mobile mockups as well?",
      sender: "John Smith",
      recipient: "Me",
      timestamp: "Today 9:15 AM",
      read: true,
      outgoing: false
    },
    {
      id: 6,
      content: "I've reviewed the latest designs. They look great! Just a few small changes I'd like to discuss when you have time.",
      sender: "John Smith",
      recipient: "Me",
      timestamp: "Today 2:30 PM",
      read: false,
      outgoing: false
    }
  ];

  // Filter conversations based on search input
  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      // Here you would normally send the message to the server
      // and then update the local state
      setMessageInput("");
    }
  };

  // Handle pressing Enter to send a message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle going back to conversation list on mobile
  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="flex h-screen overflow-hidden">
          {/* Conversation List - hidden on mobile when a conversation is selected */}
          <div className={`border-r w-full md:w-80 flex-shrink-0 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
            {/* Conversation List Header */}
            <div className="h-16 border-b px-4 flex items-center justify-between">
              <h1 className="text-xl font-bold">{t('messages')}</h1>
              <Button variant="ghost" size="icon">
                <Edit className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-9"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
            
            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-3 border-b hover:bg-muted/50 cursor-pointer ${selectedConversation === conv.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        <UserAvatar name={conv.participantName} />
                        {conv.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{conv.participantName}</span>
                          <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <Badge variant="default" className="ml-2 h-5 min-w-5 flex items-center justify-center">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No conversations found
                </div>
              )}
            </div>
          </div>
          
          {/* Message Area - shown only when a conversation is selected on mobile */}
          <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
            {/* Message Area Header */}
            <div className="h-16 border-b px-4 flex items-center justify-between">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={handleBackToList}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center">
                  <UserAvatar name="John Smith" />
                  <div className="ml-3">
                    <div className="font-medium">John Smith</div>
                    <div className="text-xs text-muted-foreground">Online</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <PhoneCall className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.outgoing ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex max-w-[70%]">
                      {!message.outgoing && (
                        <UserAvatar name={message.sender} size="sm" className="mr-2 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <div 
                          className={`rounded-lg p-3 ${
                            message.outgoing 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {message.timestamp}
                          {message.outgoing && (
                            <span className="ml-2">{message.read ? 'Read' : 'Delivered'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <User2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Message Input */}
            {selectedConversation && (
              <div className="p-3 border-t">
                <div className="flex items-end">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="min-h-10 py-5"
                    />
                  </div>
                  <div className="flex ml-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <PaperclipIcon className="h-5 w-5" />
                    </Button>
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="h-10 w-10"
                      onClick={handleSendMessage}
                      disabled={messageInput.trim() === ""}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                {/* Attachment Preview (when attachments are selected) */}
                <div className="flex mt-2 flex-wrap gap-2 hidden">
                  <div className="relative bg-muted p-1 rounded w-20 h-20 flex items-center justify-center">
                    <Image className="h-5 w-5" />
                    <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-5 w-5">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="relative bg-muted p-1 rounded w-20 h-20 flex items-center justify-center">
                    <File className="h-5 w-5" />
                    <span className="text-xs mt-1 text-center">document.pdf</span>
                    <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-5 w-5">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
