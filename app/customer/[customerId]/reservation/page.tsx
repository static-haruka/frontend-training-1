import CustomerPageShell from "@/app/components/customer/CustomerPageShell";
import ReservationView from "@/app/components/customer/ReservationView";
import { fetchCustomer } from "@/app/components/customer/mocks";

export default async function ReservationPage(props: { params: Promise<{ customerId: string }> }) {
  const params = await props.params;
  const customer = fetchCustomer(params.customerId);

  return (
    <CustomerPageShell customer={customer} active="reservation">
      <ReservationView customer={customer} />
    </CustomerPageShell>
  );
}