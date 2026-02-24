import CustomerTopView from "@/app/components/customer/CustomerTopView";

type PageProps = {
  params: { customerId: string };
};

export default function CustomerPage({ params }: PageProps) {
  const { customerId } = params;
  return <CustomerTopView customerId={customerId} />;
}