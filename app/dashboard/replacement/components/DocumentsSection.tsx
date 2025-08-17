import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DocumentsSection() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>Gérez et téléchargez vos documents professionnels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span>CV professionnel</span>
            <Button size="sm" variant="outline">Télécharger</Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Diplôme de médecine</span>
            <Button size="sm" variant="outline">Télécharger</Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Attestation d'inscription à l'ordre</span>
            <Button size="sm" variant="outline">Télécharger</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
