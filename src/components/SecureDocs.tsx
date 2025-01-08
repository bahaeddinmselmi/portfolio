import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, Shield, FileCheck, Share2, Upload, CheckCircle2, Clock } from 'lucide-react';

const SecureDocs = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      title: "Blockchain Security",
      description: "Documents are secured using advanced blockchain technology, ensuring immutability and transparency."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-indigo-500" />,
      title: "Document Verification",
      description: "Instant verification of document authenticity using cryptographic proofs and smart contracts."
    },
    {
      icon: <Share2 className="w-6 h-6 text-indigo-500" />,
      title: "Secure Sharing",
      description: "Share documents securely with role-based access control and encrypted transmission."
    }
  ];

  const demoSteps = [
    {
      icon: <Upload className="w-8 h-8 text-indigo-500" />,
      title: "Upload Document",
      description: "Upload your document to be secured on the blockchain.",
      status: "Completed",
      hash: "0x7f2c3a...",
      time: "2 minutes ago"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
      title: "Document Verified",
      description: "Document hash stored and verified on Ethereum blockchain.",
      status: "Active",
      hash: "0x9e4b1d...",
      time: "1 minute ago"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Verification History",
      description: "Track all verification attempts and access history.",
      status: "Ongoing",
      hash: "0x3f8c2e...",
      time: "Just now"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="w-full aspect-[2/1] bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
        <Lock className="w-24 h-24 text-white" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-4">SecureDocs</h2>
        <p className="text-lg text-muted-foreground mb-6">
          A blockchain-powered document verification system that ensures the integrity and authenticity of digital documents through decentralized technology.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-indigo-500 transition-all duration-300">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-semibold">Live Demo</h3>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
            <div className="space-y-6">
              {demoSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="flex-shrink-0">{step.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{step.title}</h4>
                      <Badge variant={
                        step.status === "Completed" ? "secondary" :
                        step.status === "Active" ? "default" : "outline"
                      }>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">{step.description}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Hash: {step.hash}</span>
                      <span>•</span>
                      <span>{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-opacity-50 text-sm px-3 py-1">Blockchain</Badge>
            <Badge variant="secondary" className="bg-opacity-50 text-sm px-3 py-1">Smart Contracts</Badge>
            <Badge variant="secondary" className="bg-opacity-50 text-sm px-3 py-1">React</Badge>
            <Badge variant="secondary" className="bg-opacity-50 text-sm px-3 py-1">TypeScript</Badge>
            <Badge variant="secondary" className="bg-opacity-50 text-sm px-3 py-1">Solidity</Badge>
            <Badge variant="secondary" className="bg-opacity-50 text-sm px-3 py-1">IPFS</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureDocs;
