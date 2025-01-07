import React, { useState, useEffect } from 'react';
import { Globe2, Search, MapPin, Info, Wifi } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const IpTracker = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [activeTab, setActiveTab] = useState('lookup');
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.4056, -122.0775]);

  const demoIpInfo: IpInfo = {
    ip: "8.8.8.8",
    city: "Mountain View",
    region: "California",
    country: "US",
    loc: "37.4056,-122.0775",
    org: "Google LLC",
    postal: "94043",
    timezone: "America/Los_Angeles"
  };

  const handleLookup = () => {
    if (!ipAddress && !loading) {
      setError('Please enter an IP address');
      return;
    }

    setError(null);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIpInfo(demoIpInfo);
      const [lat, lng] = demoIpInfo.loc.split(',').map(Number);
      setMapCenter([lat, lng]);
    }, 1500);
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <Tabs defaultValue="lookup" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lookup">IP Lookup</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="lookup">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="h-6 w-6" />
              IP Address Tracker
            </CardTitle>
            <CardDescription>
              Track any IP address and get detailed information about its location and network.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter IP address (e.g., 8.8.8.8)"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleLookup} disabled={loading}>
                  {loading ? (
                    <>
                      <Globe2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Lookup
                    </>
                  )}
                </Button>
              </div>

              {ipInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <MapPin className="h-4 w-4" />
                        Location Information
                      </div>
                      <div className="space-y-2">
                        <p><span className="font-semibold">City:</span> {ipInfo.city}</p>
                        <p><span className="font-semibold">Region:</span> {ipInfo.region}</p>
                        <p><span className="font-semibold">Country:</span> {ipInfo.country}</p>
                        <p><span className="font-semibold">Postal:</span> {ipInfo.postal}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Wifi className="h-4 w-4" />
                        Network Information
                      </div>
                      <div className="space-y-2">
                        <p><span className="font-semibold">IP:</span> {ipInfo.ip}</p>
                        <p><span className="font-semibold">ISP:</span> {ipInfo.org}</p>
                        <p><span className="font-semibold">Timezone:</span> {ipInfo.timezone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="aspect-square rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <MapContainer
                      center={mapCenter}
                      zoom={13}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={mapCenter}>
                        <Popup>
                          {ipInfo.city}, {ipInfo.region}
                        </Popup>
                      </Marker>
                      <MapUpdater center={mapCenter} />
                    </MapContainer>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="map">
          <CardHeader>
            <CardTitle>Location Map</CardTitle>
            <CardDescription>
              Visualize the IP address location on an interactive map.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {ipInfo && (
                  <Marker position={mapCenter}>
                    <Popup>
                      {ipInfo.city}, {ipInfo.region}
                    </Popup>
                  </Marker>
                )}
                <MapUpdater center={mapCenter} />
              </MapContainer>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default IpTracker;
