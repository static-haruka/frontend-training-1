import CustomerPageShell from "@/app/components/customer/CustomerPageShell";
import ReservationView from "@/app/components/customer/ReservationView";
import { fetchCustomer } from "@/app/components/customer/mocks";

export default function ReservationPage({ params }: { params: { customerId: string } }) {
  // 既存のモック関数から顧客データを取得
  const customer = fetchCustomer(params.customerId);

  return (
    <CustomerPageShell customer={customer} active="reservation">
      <ReservationView customer={customer} />
    </CustomerPageShell>
  );
}