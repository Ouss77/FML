"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, File, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  documentType: string
  onUploadComplete?: (document: any) => void
  maxSize?: number
  acceptedTypes?: string[]
  className?: string
}

export function FileUpload({
  documentType,
  onUploadComplete,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"],
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setErrorMessage("Type de fichier non autorisé. Utilisez PDF, JPEG, PNG ou WebP.")
      setUploadStatus("error")
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      setErrorMessage(`Fichier trop volumineux. Taille maximum: ${Math.round(maxSize / 1024 / 1024)}MB`)
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadStatus("idle")
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentType", documentType)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erreur lors de l'upload")
      }

      const result = await response.json()
      setUploadStatus("success")

      if (onUploadComplete) {
        onUploadComplete(result.document)
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle")
        setUploadProgress(0)
      }, 3000)
    } catch (error) {
      console.error("Upload error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Erreur lors de l'upload")
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "success":
        return <Check className="w-8 h-8 text-green-500" />
      case "error":
        return <AlertCircle className="w-8 h-8 text-red-500" />
      default:
        return <Upload className="w-8 h-8 text-gray-400" />
    }
  }

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case "success":
        return "Fichier uploadé avec succès!"
      case "error":
        return errorMessage
      default:
        return `Glissez votre fichier ${documentType} ici ou cliquez pour sélectionner`
    }
  }

  return (
    <Card className={cn("relative", className)}>
      <CardContent className="p-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging && "border-blue-400 bg-blue-50",
            uploadStatus === "success" && "border-green-400 bg-green-50",
            uploadStatus === "error" && "border-red-400 bg-red-50",
            !isDragging && uploadStatus === "idle" && "border-gray-300 hover:border-blue-400",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!isUploading) {
              document.getElementById(`file-input-${documentType}`)?.click()
            }
          }}
        >
          <input
            id={`file-input-${documentType}`}
            type="file"
            className="hidden"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            disabled={isUploading}
          />

          <div className="space-y-4">
            {getStatusIcon()}

            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  uploadStatus === "success" && "text-green-700",
                  uploadStatus === "error" && "text-red-700",
                  uploadStatus === "idle" && "text-gray-700",
                )}
              >
                {getStatusMessage()}
              </p>

              {uploadStatus === "idle" && (
                <p className="text-xs text-gray-500 mt-2">
                  PDF, JPEG, PNG, WebP (max {Math.round(maxSize / 1024 / 1024)}MB)
                </p>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-gray-500">Upload en cours... {uploadProgress}%</p>
              </div>
            )}

            {!isUploading && uploadStatus === "idle" && (
              <Button variant="outline" size="sm">
                <File className="w-4 h-4 mr-2" />
                Sélectionner un fichier
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
