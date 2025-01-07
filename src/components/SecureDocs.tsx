import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Lock } from 'lucide-react';

const SecureDocs = () => {
  return (
    <div className="space-y-4">
      <div className="w-full aspect-[2/1] bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
        <Lock className="w-16 h-16 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">SecureDocs</h2>
        <p className="text-muted-foreground mt-1">
          A blockchain-powered document verification system for secure and tamper-proof document management.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="bg-opacity-50">Blockchain</Badge>
          <Badge variant="secondary" className="bg-opacity-50">React</Badge>
          <Badge variant="secondary" className="bg-opacity-50">TypeScript</Badge>
        </div>
      </div>
    </div>
  );
};

export default SecureDocs;
