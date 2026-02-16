import CustomerTopView from "@/app/components/customer/CustomerTopView";

type PageProps = {
  params: { customerId: string };
};

export default function CustomerPage({ params }: PageProps) {
  return <CustomerTopView customerId={params.customerId} />;
}
