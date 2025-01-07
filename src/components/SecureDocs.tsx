import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const SecureDocs = () => {
  return (
    <Card className="w-full h-full bg-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold">SecureDocs</CardTitle>
        <CardDescription>
          A blockchain-powered document verification system for secure and tamper-proof document management.
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Blockchain</Badge>
          <Badge variant="outline">Ethereum</Badge>
          <Badge variant="outline">IPFS</Badge>
          <Badge variant="outline">Web3</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Document hashing and blockchain storage</li>
              <li>Secure verification system</li>
              <li>OAuth authentication</li>
              <li>Access control and permissions</li>
              <li>Transparent audit trail</li>
              <li>Decentralized storage with IPFS</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://github.com/yourusername/secure-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              View Source
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://secure-docs-demo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              Live Demo
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureDocs;
