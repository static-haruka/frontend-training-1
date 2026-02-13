'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';

type MenuKey = 'purchase' | 'stock' | 'customer';

type SubItem = {
  label: string;
  icon: string;
};

const MENU: Record<MenuKey, { label: string; subItems: SubItem[] }> = {
  purchase: {
    label: '買取\n査定',
    subItems: [
      { label: '新規買取査定', icon: '/icons/icons8-camera.png' },
      { label: '買取契約の締結', icon: '/icons/icons8-pencil.png' },
      { label: '仮入庫前一覧', icon: '/icons/icons8-sub.png' },
      { label: '査定ランク編集', icon: '/icons/icons8-rank.png' },
    ],
  },
  stock: {
    label: '入庫',
    subItems: [
      { label: '入庫サブメニュー', icon: '/icons/icons8-sub.png' },
      { label: '入庫サブメニュー', icon: '/icons/icons8-sub.png' },
    ],
  },
  customer: {
    label: '顧客\n情報',
    subItems: [
      { label: '新規顧客登録', icon: '/icons/icons8-sinki.png' },
      { label: 'Croooober ID検索', icon: '/icons/icons8-id.png' },
    ],
  },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarWrap>
      <SidebarBase>
        <SidebarTop>
          <LogoMark>
            <img src="/icons/icons8-u-red.png" alt="" />
          </LogoMark>
        </SidebarTop>

        <SidebarChevron type="button" onClick={() => setIsOpen(true)} aria-label="">
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
                    <SubMenuIcon aria-hidden="true">
                      <img src={item.icon} alt="" />
                    </SubMenuIcon>
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
                    <SubMenuIcon aria-hidden="true">
                      <img src={item.icon} alt="" />
                    </SubMenuIcon>
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
                    <SubMenuIcon aria-hidden="true">
                      <img src={item.icon} alt="" />
                    </SubMenuIcon>
                    <SubMenuText>{item.label}</SubMenuText>
                  </SubMenuRow>
                ))}
              </SubMenuList>
            </SubMenuPanel>
          </SidebarItem>
        </SidebarNav>
      </SidebarBase>

      <Overlay $open={isOpen}>
        <Panel $open={isOpen} role="dialog" aria-label="サイドバー一覧">
          <PanelHeader>
            <CloseButton type="button" onClick={() => setIsOpen(false)} aria-label="閉じる">
              ×
            </CloseButton>
          </PanelHeader>

          <PanelBody>
            {(Object.keys(MENU) as MenuKey[]).map((key) => (
              <PanelSection key={key}>
                <SectionTitle>{MENU[key].label.replace('\n', '')}</SectionTitle>

                <SubMenuList>
                  {MENU[key].subItems.map((item, index) => (
                    <SubMenuRow key={`${key}-${index}-${item.label}`}>
                      <SubMenuIcon aria-hidden="true">
                        <img src={item.icon} alt="" />
                      </SubMenuIcon>
                      <SubMenuText>{item.label}</SubMenuText>
                    </SubMenuRow>
                  ))}
                </SubMenuList>
              </PanelSection>
            ))}
          </PanelBody>
        </Panel>
      </Overlay>


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

const SidebarChevron = styled.button`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;

  img {
    width: 20px;
  }

  width: 72px;
`;

const SidebarNav = styled.nav``;

const SubMenuPanel = styled.div`
  position: absolute;
  left: 72px;
  top: 0px;
  width: 300px;
  opacity: 0;
  pointer-events: none;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
`;

const SidebarItem = styled.div`
  position: relative;

  &:hover ${SubMenuPanel} {
  opacity: 1;
  pointer-events: auto;
  }
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

const SubMenuList = styled.div`
`;

const SubMenuRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;


  & + & {
    border-top: none;
  }
`;

const SubMenuIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: #0075af;
  // margin-left: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  }
`;

const SubMenuText = styled.div`
  font-size: 14px;
`;

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
`;

const Panel = styled.div<{ $open: boolean }>`
  position: absolute;
  margin-top: 56px;
  top: 0;
  height: 100vh;
  width: 210px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 2px;

  transform: ${(p) => (p.$open ? 'translateX(0)' : 'translateX(-100%)')};

  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  margin-left: auto;
  width: 32px;
  font-size: 20px;
  color: #0075af;
  font-weight: 600;

  &:hover {
    background: #f3f4f6;
  }
`;

const PanelBody = styled.div`
  padding: 12px;
`;

const PanelSection = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  padding-left: 14px;
`;

