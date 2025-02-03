import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, X, MessageSquare, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const personalInfo = {
  name: "Baha Eddin Mselmi",
  email: "bahaeddinmselmi1@gmail.com",
  phone: "+216 56454845",
  location: "Tunisia",
  education: {
    university: "ISTIC University",
    highSchool: "Mouhamed Brahmi Mourouj 6",
    status: "First Year Student"
  },
  personality: "ENTP",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "French", level: "Professional" }
  ],
  projects: [
    {
      name: "Web Security Scanner",
      tech: ["Python", "Django", "React", "TypeScript"]
    },
    {
      name: "AI Image Generator",
      tech: ["React", "TypeScript", "OpenAI API"]
    },
    {
      name: "Crimson Shop",
      tech: ["React", "Node.js", "MongoDB", "Express"]
    }
  ],
  interests: [
    {
      area: "Cybersecurity",
      details: "Passionate about web security and penetration testing"
    },
    {
      area: "AI Development",
      details: "Building AI-powered applications and tools"
    },
    {
      area: "Full-stack Development",
      details: "Creating modern web applications with React and Node.js"
    }
  ]
};

const generateResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase().trim();
  
  // Handle empty or very short inputs
  if (lowercaseInput.length < 2) {
    return "I didn't catch that. Could you please say more?";
  }

  // Greetings
  if (lowercaseInput.match(/^(hi|hey|hello|yo|sup|hii|hiii|hola|greetings|good|morning|afternoon|evening)$/)) {
    return `Hi! I'm ${personalInfo.name}'s AI assistant. Here's what I can tell you about:

1. Background & Education 📚
2. Technical Skills & Certifications 💻
3. Projects & Experience 🚀
4. Languages & Communication 🌐
5. Interests & Specializations 🎯
6. Contact Information 📧

What would you like to know about?`;
  }

  // All Information
  if (lowercaseInput.includes('all') || lowercaseInput.includes('everything') || lowercaseInput.match(/tell.*me/)) {
    return `Here's everything about ${personalInfo.name}:

📚 Background & Education
• Currently studying at ${personalInfo.education.university}
• Previously at ${personalInfo.education.highSchool}
• Status: ${personalInfo.education.status}
• Personality: ${personalInfo.personality}

💻 Technical Skills & Certifications
${personalInfo.certifications.map(cert => `• ${cert}`).join('\n')}

🚀 Key Projects
${personalInfo.projects.map(project => `• ${project.name}
  Technologies: ${project.tech.join(', ')}`).join('\n')}

🌐 Languages
${personalInfo.languages.map(lang => `• ${lang.name}: ${lang.level}`).join('\n')}

🎯 Main Interests
${personalInfo.interests.map(interest => `• ${interest.area}: ${interest.details}`).join('\n')}

📧 Contact
• Email: ${personalInfo.email}
• Phone: ${personalInfo.phone}
• Location: ${personalInfo.location}

Would you like to know more about any specific area?`;
  }

  // Personal Info
  if (lowercaseInput.includes('who') || lowercaseInput.includes('about')) {
    return `${personalInfo.name} is a ${personalInfo.education.status} at ${personalInfo.education.university}, specializing in Cybersecurity and AI Development. With a passion for technology and innovation, he's built several notable projects including a Web Security Scanner and an AI Image Generator.`;
  }

  // Contact
  if (lowercaseInput.includes('contact') || lowercaseInput.includes('email') || lowercaseInput.includes('phone') || lowercaseInput.includes('reach')) {
    return `📧 Contact Information:
• Email: ${personalInfo.email}
• Phone: ${personalInfo.phone}
• Location: ${personalInfo.location}

Feel free to reach out for collaboration or inquiries!`;
  }

  // Education
  if (lowercaseInput.includes('education') || lowercaseInput.includes('study') || lowercaseInput.includes('university') || lowercaseInput.includes('school')) {
    return `📚 Educational Background:
• Currently at ${personalInfo.education.university}
• Previously at ${personalInfo.education.highSchool}
• Status: ${personalInfo.education.status}
• Focus: Cybersecurity & AI Development`;
  }

  // Skills & Certifications
  if (lowercaseInput.includes('skill') || lowercaseInput.includes('certification') || lowercaseInput.includes('tech') || lowercaseInput.includes('stack')) {
    return `💻 Technical Skills & Certifications:

Certifications:
${personalInfo.certifications.map(cert => `• ${cert}`).join('\n')}

Core Technologies:
• Frontend: React, TypeScript, Next.js
• Backend: Node.js, Python, Django
• Database: MongoDB, PostgreSQL
• Cloud: AWS, Docker
• Security: Penetration Testing, Web Security`;
  }

  // Languages
  if (lowercaseInput.includes('language') || lowercaseInput.includes('speak')) {
    return `🌐 Language Proficiency:
${personalInfo.languages.map(lang => `• ${lang.name}: ${lang.level}`).join('\n')}

This multilingual capability enables effective communication across diverse teams and international projects.`;
  }

  // Projects
  if (lowercaseInput.includes('project') || lowercaseInput.includes('work') || lowercaseInput.includes('portfolio')) {
    return `🚀 Notable Projects:

${personalInfo.projects.map(project => `${project.name}
• Technologies: ${project.tech.join(', ')}
• Type: Professional Project
• Status: Completed & Deployed\n`).join('\n')}

Each project showcases practical implementation of various technologies and problem-solving skills.`;
  }

  // Interests
  if (lowercaseInput.includes('interest') || lowercaseInput.includes('hobby') || lowercaseInput.includes('passion')) {
    return `🎯 Areas of Interest:

${personalInfo.interests.map(interest => `${interest.area}
• ${interest.details}`).join('\n\n')}

These interests drive continuous learning and innovation in projects.`;
  }

  // Default response
  return `I can help you learn about ${personalInfo.name}. Here are some topics you can ask about:

1. Background & Education 📚
2. Technical Skills & Certifications 💻
3. Projects & Experience 🚀
4. Languages & Communication 🌐
5. Interests & Specializations 🎯
6. Contact Information 📧

Just ask about any of these topics or type "tell me everything" to see all information!`;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: `Hi! I'm ${personalInfo.name}'s AI assistant. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ right: true, bottom: true });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage = { type: 'bot' as const, content: generateResponse(input) };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const togglePosition = () => {
    setPosition(prev => ({
      right: !prev.right,
      bottom: prev.bottom
    }));
  };

  return (
    <div className={`fixed ${position.bottom ? 'bottom-4' : 'top-4'} ${position.right ? 'right-4' : 'left-4'} z-[100]`}>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[280px] sm:w-[320px] h-[450px] bg-background border rounded-lg shadow-xl flex flex-col relative">
          {/* Header */}
          <div className="p-2 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="font-semibold text-xs">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-primary-foreground/10"
                onClick={togglePosition}
              >
                <ArrowLeftRight className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-2 space-y-2">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[85%] ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {message.type === 'user' ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Bot className="h-3 w-3" />
                    )}
                    <span className="text-[10px] font-medium">
                      {message.type === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p className="whitespace-pre-line text-[11px] leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t bg-muted/50">
            <div className="flex gap-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-xs h-7 min-h-0"
              />
              <Button type="submit" size="icon" className="h-7 w-7" disabled={!input.trim()}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
