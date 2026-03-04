import { notFound } from "next/navigation";
import PurchaseHistoryDetailView from "@/app/components/customer/PurchaseHistoryDetailView";
import { MOCK_PURCHASE_HISTORY } from "@/app/components/customer/purchaseMocks";

type Props = {
  params: Promise<{
    customerId: string;
    purchaseId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { customerId, purchaseId } = await params;

  const exists = MOCK_PURCHASE_HISTORY.some((x) => x.id === purchaseId);
  if (!exists) notFound();

  return <PurchaseHistoryDetailView customerId={customerId} purchaseId={purchaseId} />;
}