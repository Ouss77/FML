import { useEffect, useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Download } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function DocumentsSection() {
  const [cv, setCv] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch the latest uploaded CV on mount or after upload
  const fetchCv = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/documents?documentType=cv", { credentials: "include" })
      if (!res.ok) throw new Error("Erreur lors de la récupération du CV")
      const data = await res.json()
      setCv(data.documents && data.documents.length > 0 ? data.documents[0] : null)
    } catch (err: any) {
      setError(err.message || "Erreur lors de la récupération du CV")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCv()
  }, [])

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>Gérez et téléchargez vos documents professionnels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">CV professionnel</span>
              {cv && (
                <div className="flex gap-2 items-center">
                  <a
                    href={cv.file_path}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex items-center gap-2 px-3 py-1 border rounded text-blue-700 border-blue-200 hover:bg-blue-50 transition">
                      <Download className="w-4 h-4" /> Télécharger
                    </button>
                  </a>
                  <button
                    className="flex items-center gap-2 px-3 py-1 border rounded text-red-700 border-red-200 hover:bg-red-50 transition"
                    onClick={async () => {
                      setLoading(true)
                      setError(null)
                      try {
                        const res = await fetch(`/api/documents/${cv.id}`, {
                          method: "DELETE",
                          credentials: "include",
                        })
                        if (!res.ok) throw new Error("Erreur lors de la suppression du CV")
                        setCv(null)
                      } catch (err: any) {
                        setError(err.message || "Erreur lors de la suppression du CV")
                      } finally {
                        setLoading(false)
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
            <FileUpload
              documentType="cv"
              onUploadComplete={() => fetchCv()}
              acceptedTypes={["application/pdf"]}
              className="max-w-md"
            />
            {loading && <p className="text-xs text-gray-500 mt-2">Chargement du CV...</p>}
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            {cv && (
              <p className="text-xs text-gray-500 mt-2">Dernier upload : {new Date(cv.uploaded_at).toLocaleString()}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
 