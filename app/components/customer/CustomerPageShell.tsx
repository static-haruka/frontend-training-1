// 共通部分の外枠を集約

"use client";

import styled from "styled-components";
import TopTabs from "./TopTabs";
import CustomerSidePanel from "./CustomerSidePanel";
import { fetchCustomer } from "./mocks";

type Customer = ReturnType<typeof fetchCustomer>;
type ActiveTab = React.ComponentProps<typeof TopTabs>["active"];

type Props = {
  customer: Customer;
  active: ActiveTab;
  children: React.ReactNode;
};

export default function CustomerPageShell({ customer, active, children }: Props) {
  return (
    <Layout>
      <CustomerSidePanel customer={customer} />

      <Main>
        <TopTabs active={active} />
        <MainInner>{children}</MainInner>
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  min-height: 100%;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainInner = styled.div`
  padding: 24px 24px 16px;
`;