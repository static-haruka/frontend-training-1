'use client';

import Link from 'next/link';
import styled from 'styled-components';

type MenuKey = 'purchase' | 'stock' | 'customer';

type SubItem = {
  label: string;
};

const MENU: Record<MenuKey, { label: string; subItems: SubItem[] }> = {
  purchase: {
    label: '買取\n査定',
    subItems: [
      { label: '新規買取査定' },
      { label: '買取契約の締結' },
      { label: '仮入庫前一覧' },
      { label: '査定ランク編集' },
    ],
  },
  stock: {
    label: '入庫',
    subItems: [
      { label: '入庫サブメニュー1' },
      { label: '入庫サブメニュー2' },
    ],
  },
  customer: {
    label: '顧客\n情報',
    subItems: [
      { label: '新規顧客登録' },
      { label: 'Croooober ID検索' },
    ],
  },
};

export default function Sidebar() {
  return (
    <SidebarWrap>
      <SidebarBase>
        <SidebarTop>
          <LogoMark>
            <img src="/icons/icons8-u-red.png" alt="" />
          </LogoMark>
        </SidebarTop>

        <SidebarChevron>
          <img src="/icons/icons8-chevron-right.png" alt="" />
        </SidebarChevron>

        <SidebarNav>
          <SidebarItem>
            <SidebarItemLink href="/user_search">
              <SidebarItemText>{MENU.purchase.label}</SidebarItemText>
            </SidebarItemLink>

            <SubMenuPanel>
              <SubMenuList>
                {MENU.purchase.subItems.map((item, index) => (
                  <SubMenuRow key={`purchase-${index}-${item.label}`}>
                    <SubMenuIcon aria-hidden="true" />
                    <SubMenuText>{item.label}</SubMenuText>
                  </SubMenuRow>
                ))}
              </SubMenuList>
            </SubMenuPanel>
          </SidebarItem>

          <SidebarItem>
            <SidebarItemLink href="/">
              <SidebarItemText>{MENU.stock.label}</SidebarItemText>
            </SidebarItemLink>

            <SubMenuPanel>
              <SubMenuList>
                {MENU.stock.subItems.map((item, index) => (
                  <SubMenuRow key={`stock-${index}-${item.label}`}>
                    <SubMenuIcon aria-hidden="true" />
                    <SubMenuText>{item.label}</SubMenuText>
                  </SubMenuRow>
                ))}
              </SubMenuList>
            </SubMenuPanel>
          </SidebarItem>

          <SidebarItem>
            <SidebarItemLink href="/">
              <SidebarItemText>{MENU.customer.label}</SidebarItemText>
            </SidebarItemLink>

            <SubMenuPanel>
              <SubMenuList>
                {MENU.customer.subItems.map((item, index) => (
                  <SubMenuRow key={`customer-${index}-${item.label}`}>
                    <SubMenuIcon aria-hidden="true" />
                    <SubMenuText>{item.label}</SubMenuText>
                  </SubMenuRow>
                ))}
              </SubMenuList>
            </SubMenuPanel>
          </SidebarItem>
        </SidebarNav>
      </SidebarBase>
    </SidebarWrap>
  );
}

/* ---------- styles ---------- */

const SidebarWrap = styled.aside`
  display: flex;
`;

const SidebarBase = styled.div`
  width: 72px;
  border-right: 1px solid #e5e7eb;
`;

const SidebarTop = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe000;
`;

const LogoMark = styled.div`
  width: 30px;
`;

const SidebarChevron = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;

  img {
    width: 20px;
  }
`;

const SidebarNav = styled.nav``;

const SidebarItem = styled.div`
  position: relative;
`;

const SidebarItemLink = styled(Link)`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background: #EDF4FA;
    font-weight: 600;
  }

  &:hover + div {
    opacity: 1;
  }
`;

const SidebarItemText = styled.span`
  font-size: 12px;
  white-space: pre-line;
`;

const SubMenuPanel = styled.div`
  position: absolute;
  left: 72px;
  top: 0;
  width: 320px;
  opacity: 0;
`;

const SubMenuList = styled.div`
  border: 1px solid #e5e7eb;
`;

const SubMenuRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;

  & + & {
    border-top: none;
  }
`;

const SubMenuIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: #0075af;
`;

const SubMenuText = styled.div`
  font-size: 14px;
`;
