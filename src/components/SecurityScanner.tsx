import React, { useState } from 'react';
import { AlertCircle, Check, Play, AlertTriangle, StopCircle, Settings, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const SecurityScanner = () => {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  const startScan = () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    setScanning(true);
    setProgress(0);
    setError(null);
    setResults(null);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          // Simulate scan results
          setResults({
            vulnerabilities: [
              { type: 'XSS', severity: 'High', url: url + '/page1', details: 'Reflected XSS found in search parameter' },
              { type: 'SQL Injection', severity: 'Critical', url: url + '/api/users', details: 'SQL error message exposed' },
              { type: 'Open Redirect', severity: 'Medium', url: url + '/redirect', details: 'Unvalidated redirect parameter' }
            ],
            serverInfo: {
              server: 'Apache/2.4.41',
              powered_by: 'PHP/7.4.3',
              ssl_grade: 'B'
            },
            discoveredUrls: [
              url + '/page1',
              url + '/api/users',
              url + '/redirect',
              url + '/admin'
            ]
          });
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Web Security Scanner</CardTitle>
          <CardDescription>
            Scan web applications for security vulnerabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter target URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={scanning}
            />
            <Button
              onClick={startScan}
              disabled={scanning}
              className="whitespace-nowrap"
            >
              {scanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Scan
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {scanning && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scan in progress...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                <TabsTrigger value="urls">Discovered URLs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Server Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="font-medium">Server:</dt>
                          <dd>{results.serverInfo.server}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">Powered By:</dt>
                          <dd>{results.serverInfo.powered_by}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">SSL Grade:</dt>
                          <dd>{results.serverInfo.ssl_grade}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="vulnerabilities">
                <div className="space-y-4">
                  {results.vulnerabilities.map((vuln, index) => (
                    <Alert key={index}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className={getSeverityColor(vuln.severity)}>
                        {vuln.type} - {vuln.severity}
                      </AlertTitle>
                      <AlertDescription>
                        <p className="mt-1">{vuln.details}</p>
                        <p className="mt-1 text-sm text-gray-500">{vuln.url}</p>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="urls">
                <div className="space-y-2">
                  {results.discoveredUrls.map((url, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>{url}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SecurityScanner;
