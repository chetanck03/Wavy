import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Cloud } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser, useClerk } from '@clerk/clerk-react';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const { signOut } = useClerk();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleSignOut = () => {
    signOut();
  };
  
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure your आदित्य system</p>
          </div>
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        
        {/* Settings Tabs */}
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            {/* <TabsTrigger value="profile" className="flex gap-2 items-center">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger> */}
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            {/* <TabsTrigger value="security" className="flex gap-2 items-center">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger> */}
            <TabsTrigger value="system" className="flex gap-2 items-center">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex gap-2 items-center">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>
          
          {/* <TabsContent value="profile" className="mt-6 space-y-4 max-w-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.fullName || ''} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.primaryEmailAddress?.emailAddress || ''} readOnly />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="SolarTech Inc" />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </TabsContent> */}
          
          <TabsContent value="notifications" className="mt-6 space-y-4 max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="critical-alerts">Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for critical system issues</p>
                </div>
                <Switch id="critical-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders for scheduled maintenance</p>
                </div>
                <Switch id="maintenance-reminders" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="performance-reports">Performance Reports</Label>
                  <p className="text-sm text-muted-foreground">Weekly email reports on system performance</p>
                </div>
                <Switch id="performance-reports" defaultChecked />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </TabsContent>
          
          {/* <TabsContent value="security" className="mt-6 space-y-4 max-w-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch id="two-factor" />
              </div>
              
              <Button onClick={handleSaveSettings}>Update Password</Button>
            </div>
          </TabsContent> */}
          
          <TabsContent value="system" className="mt-6 space-y-4 max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-updates">Automatic Updates</Label>
                  <p className="text-sm text-muted-foreground">Keep system software up to date</p>
                </div>
                <Switch id="auto-updates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for interface</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-collection">Advanced Data Collection</Label>
                  <p className="text-sm text-muted-foreground">Collect detailed system metrics</p>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="mt-6 space-y-4 max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cloud-backup">Cloud Backup</Label>
                  <p className="text-sm text-muted-foreground">Automatically backup system data to cloud</p>
                </div>
                <Switch id="cloud-backup" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <select id="backup-frequency" className="w-full p-2 rounded-md border">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <div className="space-y-2 bg-blue-50 p-4 rounded-md border border-blue-100">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  <p className="font-medium">Data Storage</p>
                </div>
                <p className="text-sm">Using 2.4 GB of 10 GB</p>
                <div className="w-full h-2 bg-blue-100 rounded-full">
                  <div className="w-[24%] h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Settings;
