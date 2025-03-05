"use client";

import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useUser, useClerk } from "@clerk/nextjs";
import {  useEffect, useState } from "react";

const SettingsPage = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Theme Toggle Section */}
                    <div className="flex flex-col space-y-2 pb-4 border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Mode</h3>
                            </div>
                            {mounted && (
                                <Button 
                                    variant="outline" 
                                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                >
                                    {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Logout Section */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Manage Account</h3>
                            </div>
                            <Button 
                                className="text-white bg-blue-500 hover:bg-blue-600" 
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card> 
    </div>
  );
}

export default SettingsPage;
