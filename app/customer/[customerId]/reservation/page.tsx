import CustomerPageShell from "@/app/components/customer/CustomerPageShell";
import ReservationView from "@/app/components/customer/ReservationView";
import { fetchCustomer } from "@/app/components/customer/mocks";
import { notFound } from "next/navigation";

export default async function ReservationPage(props: { params: Promise<{ customerId: string }> }) {

  const params = await props.params;
  const customerId = params.customerId;

  console.log("params.customerId:", customerId);

  const customer = fetchCustomer(customerId);
  console.log("fetched customer:", customer);

  if (!customer) {
    return notFound();
  }

  return (
    <CustomerPageShell customer={customer} active="reservation">
      <ReservationView customer={customer} />
    </CustomerPageShell>
  );
}