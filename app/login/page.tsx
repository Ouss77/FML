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
  const [userType, setUserType] = useState("replacement")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { refreshUser } = useAuth() // Use refreshUser instead of login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Starting login process...")
      const response = await fetch("/api/auth/login",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        
        body: JSON.stringify({
          email,
          password,
          userType,
        }),
      })

      console.log("Login API response status:", response.status)
      const data = await response.json()
      console.log("Login API response data:", data)

      if (response.ok) {
        console.log("Login successful, calling refreshUser...")
        try {
          await refreshUser()
          console.log("RefreshUser completed successfully")
        } catch (refreshError) {
          console.error("RefreshUser failed:", refreshError)
          setError("Erreur lors de la mise à jour du profil")
          return
        }
        console.log("Redirecting to dashboard for user type:", data.user.userType)
        // Redirect based on user type
        if (data.user.userType === "replacement") {
          router.push("/dashboard/replacement")
        } else if (data.user.userType === "employer") {
          router.push("/dashboard/employer")
        } else {
          router.push("/dashboard/admin")
        }
      } else {
        console.error("Login failed:", data.error)
        setError(data.error || "Erreur de connexion")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
    {/* Left Side */}
    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-10">
        <h2 className="text-4xl font-bold mb-4 text-center">
        Bienvenue sur Le Foyer Medical
      </h2>
      <img
        src="https://www.praktischarzt.de/wp-content/uploads/2023/03/Becoming-a-medical-doctor-or-physician-in-Germany.jpg"
        alt="Connexion illustration"
        className="  mb-6 drop-shadow-2xl rounded-2xl"
      />

      <p className="text-lg text-gray-100 text-center max-w-md">
        La plateforme qui connecte médecins titulaires et remplaçants partout au Maroc.  
        Accédez à vos missions ou trouvez un remplaçant en toute simplicité.
      </p>
    </div>

    {/* Right Side (Form) */}
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 md:p-14 border border-blue-100">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="Le Foyer Medical " />
            </div>
            <span className="text-xl font-bold text-gray-900"> Le Foyer Medical </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à votre espace personnel</p>
        </div>

        <Card className="bg-white/90 rounded-2xl shadow-xl border border-blue-100">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-700">Se connecter</CardTitle>
            <CardDescription className="text-base text-gray-500">
              Choisissez votre type de compte et connectez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="mb-8">
              <TabsList className="grid w-full grid-cols-3 rounded-xl overflow-hidden pb-12">
                <TabsTrigger value="replacement" className="text-lg py-2">Remplaçant</TabsTrigger>
                <TabsTrigger value="employer" className="text-lg py-2">Employeur</TabsTrigger>
                <TabsTrigger value="admin" className="text-lg py-2">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-base">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="py-6 px-6 text-2xl placeholder:text-xl rounded-2xl border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 h-16"
                    style={{ fontSize: "1.5rem" }}
                  />
              </div>

              <div className="space-y-2">
                <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="py-6 px-6 text-2xl placeholder:text-xl rounded-2xl border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 pr-14 h-16"
                      style={{ fontSize: "1.5rem" }}
                    />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 py-2 hover:bg-transparent"
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
                  className="text-base text-blue-600 hover:underline font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" disabled={isLoading}>
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

            <div className="mt-8 text-center">
              <p className="text-base text-gray-600">
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
