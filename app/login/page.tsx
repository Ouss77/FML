"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // Removed userType selection
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { refreshUser } = useAuth() // Use refreshUser instead of login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        await refreshUser()
        // Redirect based on user type returned from backend
        if (data.user.userType === "replacement") {
          router.push("/dashboard/replacement")
        } else if (data.user.userType === "employer") {
          router.push("/dashboard/employer")
        } else {
          router.push("/dashboard/admin")
        }
      } else {
        setError(data.error || "Erreur de connexion")
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
    {/* Left Side */}
    <div className="hidden md:flex flex-col items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-10 relative">
      <h2 className="text-2xl font-bold text-center w-full absolute top-0 left-0 mt-0 pt-6">
        Bienvenue sur Le Foyer Medical
      </h2>
      <div className="flex-1 flex flex-col justify-center w-full pt-20">
        <img
          src="https://www.praktischarzt.de/wp-content/uploads/2023/03/Becoming-a-medical-doctor-or-physician-in-Germany.jpg"
          alt="Connexion illustration"
          className="mb-4 drop-shadow-2xl rounded-2xl"
        />
        <p className="text-base text-gray-100 text-center max-w-md mx-auto">
          La plateforme qui connecte médecins titulaires et remplaçants partout au Maroc.  
          Accédez à vos missions ou trouvez un remplaçant en toute simplicité.
        </p>
      </div>
    </div>

    {/* Right Side (Form) */}
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-10">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Le Foyer Medical " />
            </div>
          </Link>
          <p className="text-gray-600 text-lg font-bold">Accédez à votre espace personnel</p>
        </div>

        <Card className="rounded-2xl shadow-xl">
            <CardHeader> 
              <CardTitle className="text-xl font-bold text-blue-700">Se connecter</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Connectez-vous à votre espace personnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="py-3 px-4 text-base placeholder:text-base rounded-2xl border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 h-12"
                    style={{ fontSize: "1rem" }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="py-3 px-4 text-base placeholder:text-base rounded-2xl border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 pr-12 h-12"
                      style={{ fontSize: "1rem" }}
                    />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" className="w-full py-3 text-base font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                  S'inscrire
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

  )
}
