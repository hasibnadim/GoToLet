'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  Clock,
  CheckCheck,
  User,
  Headphones
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'support';
  message: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'support',
    message: 'Hello! Welcome to Go2Let support. How can I help you today?',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: 2,
    sender: 'user',
    message: 'Hi, I have a question about my current rental payment.',
    timestamp: new Date(Date.now() - 30000),
    status: 'read'
  },
  {
    id: 3,
    sender: 'support',
    message: 'I\'d be happy to help you with your rental payment. Could you please provide your booking ID?',
    timestamp: new Date(Date.now() - 15000),
  }
];

const supportTeam = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    role: 'Customer Support Specialist',
    status: 'online',
    avatar: 'SA'
  },
  {
    id: 2,
    name: 'Rahman Khan',
    role: 'Technical Support',
    status: 'online',
    avatar: 'RK'
  },
  {
    id: 3,
    name: 'Fatima Islam',
    role: 'Billing Support',
    status: 'away',
    avatar: 'FI'
  }
];

const quickReplies = [
  'I need help with payment',
  'Property maintenance issue',
  'Booking confirmation',
  'Account settings',
  'General inquiry'
];

export default function LiveSupportPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(supportTeam[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      setIsTyping(false);
      const supportResponse: Message = {
        id: messages.length + 2,
        sender: 'support',
        message: 'Thank you for your message. Let me check that for you...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, supportResponse]);
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Support</h1>
          <p className="text-gray-600 mt-2">Get instant help from our support team</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Call Support
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Video className="w-4 h-4 mr-2" />
            Video Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Support Team Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Team</h2>
            <div className="space-y-3">
              {supportTeam.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedSupport(member)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedSupport.id === member.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{member.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                    <p className={`text-xs ${
                      member.status === 'online' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {member.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Hours */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Support Hours</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sat - Sun:</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{selectedSupport.avatar}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{selectedSupport.name}</p>
                  <p className="text-sm text-gray-500">{selectedSupport.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && message.status && (
                        <CheckCheck className={`w-3 h-3 ml-1 ${
                          message.status === 'read' ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 order-3 ml-2' 
                      : 'bg-gray-300 order-0 mr-2'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Headphones className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: 'How do I make a rental payment?', a: 'You can make payments through your dashboard or contact support.' },
            { q: 'What if I have a property maintenance issue?', a: 'Report issues directly to your landlord or contact our support team.' },
            { q: 'How do I cancel a booking?', a: 'Cancellations can be made through your current services page.' },
            { q: 'How do I update my profile information?', a: 'Visit the Account section in your dashboard to update your details.' }
          ].map((faq, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}