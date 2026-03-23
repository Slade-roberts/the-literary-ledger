import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { signIn, isAdmin, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && (isAdmin || isEditor)) {
    navigate("/admin", { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-3xl font-medium text-foreground mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-sm">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="font-body" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-body text-sm">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="font-body" />
          </div>
          <Button type="submit" className="w-full font-body" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
