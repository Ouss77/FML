"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Un email de réinitialisation a été envoyé si l'adresse existe dans notre base.");
      } else {
        setError(data.error || "Erreur lors de la demande de réinitialisation.");
      }
    } catch {
      setError("Erreur lors de la demande de réinitialisation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6">
        <Card className="rounded-2xl shadow-xl bg-gray-900 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-400">Mot de passe oublié</CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && <div className="mb-3 p-3 bg-green-900/20 border border-green-400 rounded-lg text-sm text-green-400">{success}</div>}
            {error && <div className="mb-3 p-3 bg-red-900/20 border border-red-400 rounded-lg text-sm text-red-400">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="py-3 px-4 text-base placeholder:text-base rounded-2xl border-blue-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 h-12"
                />
              </div>
              <Button type="submit" className="w-full py-3 text-base font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-white" disabled={isLoading}>
                {isLoading ? "Envoi..." : "Envoyer le lien"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/login" className="text-blue-400 hover:underline font-semibold text-sm">Retour à la connexion</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
