"use client";

import { Globe, Sparkles } from "lucide-react";

import { AIConfig } from "@/components/dashboard/config/ai-config";
import { LandingConfig } from "@/components/dashboard/config/landing-config";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConfiguracionPage() {
  return (
    <>
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <SectionHeader
          title="Configuración del sistema"
          meta="Datos del landing y comportamiento del agente de IA"
        />

        <Tabs defaultValue="landing" className="space-y-6">
          <TabsList>
            <TabsTrigger value="landing" className="gap-1.5">
              <Globe className="size-4" />
              Landing
            </TabsTrigger>
            <TabsTrigger value="ia" className="gap-1.5">
              <Sparkles className="size-4" />
              IA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="landing">
            <LandingConfig />
          </TabsContent>
          <TabsContent value="ia" className="max-w-3xl">
            <AIConfig />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
