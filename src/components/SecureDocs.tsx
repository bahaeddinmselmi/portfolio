import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, Shield, FileCheck, Share2 } from 'lucide-react';

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
