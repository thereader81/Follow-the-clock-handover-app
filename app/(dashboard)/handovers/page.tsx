import PageHeader from "@/components/PageHeader";
import HandoverTable from "@/components/HandoverTable";

export default function HandoversPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Handover Intelligence"
        subtitle="Search, filter, and review every global handover with AI summaries and audit trails." 
      />
      <HandoverTable />
    </div>
  );
}
