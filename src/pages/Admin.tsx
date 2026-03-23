import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import AdminContent from "@/components/admin/AdminContent";
import AdminWorks from "@/components/admin/AdminWorks";
import AdminServices from "@/components/admin/AdminServices";
import AdminTestimonials from "@/components/admin/AdminTestimonials";

const Admin = () => {
  const { isAdmin, isEditor, loading, signOut } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">Loading…</div>;
  if (!isAdmin && !isEditor) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-xl font-semibold text-foreground">Admin Dashboard</h1>
        <Button variant="ghost" size="sm" onClick={signOut} className="font-body gap-2">
          <LogOut size={16} /> Sign Out
        </Button>
      </header>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue={isAdmin ? "content" : "about"}>
          <TabsList className="mb-6">
            {isAdmin && <TabsTrigger value="content" className="font-body">Site Content</TabsTrigger>}
            <TabsTrigger value="about" className="font-body">About</TabsTrigger>
            <TabsTrigger value="works" className="font-body">Portfolio</TabsTrigger>
            {isAdmin && <TabsTrigger value="services" className="font-body">Services</TabsTrigger>}
            {isAdmin && <TabsTrigger value="testimonials" className="font-body">Testimonials</TabsTrigger>}
          </TabsList>
          {isAdmin && <TabsContent value="content"><AdminContent /></TabsContent>}
          <TabsContent value="about"><AdminContent aboutOnly /></TabsContent>
          <TabsContent value="works"><AdminWorks /></TabsContent>
          {isAdmin && <TabsContent value="services"><AdminServices /></TabsContent>}
          {isAdmin && <TabsContent value="testimonials"><AdminTestimonials /></TabsContent>}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
