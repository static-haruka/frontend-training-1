"use client";

import styled from "styled-components";
import TopTabs from "./TopTabs";
import CustomerSidePanel from "./CustomerSidePanel";
import type { Customer } from "./mocks";

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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MainInner = styled.div`
  padding: 24px 24px 16px;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;