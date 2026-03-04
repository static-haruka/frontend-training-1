import CustomerTopView from "@/app/components/customer/CustomerTopView";

type PageProps = {
  params: Promise<{ customerId: string }>;
};

export default async function CustomerPage({ params }: PageProps) {
  const { customerId } = await params;
  return <CustomerTopView customerId={customerId} />;
}