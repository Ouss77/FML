import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProposalsSection({ pendingProposals, handleProposalResponse, getUrgencyColor }: {
  pendingProposals: any[],
  handleProposalResponse: (id: number, response: "accept" | "decline") => void,
  getUrgencyColor: (urgency: string) => string
}) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Propositions reçues</CardTitle>
        <CardDescription>Répondez rapidement aux nouvelles propositions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingProposals.map((proposal) => (
            <div key={proposal.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg">{proposal.hospital}</div>
                <div className="text-gray-600">{proposal.location} - {proposal.specialty}</div>
                <div className="text-gray-500 text-sm">{proposal.description}</div>
                <div className="text-xs mt-1">
                  <Badge className={getUrgencyColor(proposal.urgency)}>{proposal.urgency}</Badge>
                  <span className="ml-2">{proposal.startDate} - {proposal.endDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Button size="sm" onClick={() => handleProposalResponse(proposal.id, "accept")}>Accepter</Button>
                <Button size="sm" variant="destructive" onClick={() => handleProposalResponse(proposal.id, "decline")}>Refuser</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
