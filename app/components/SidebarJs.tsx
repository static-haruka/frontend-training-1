'use client';

import { useRef, useState } from 'react';
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
      { label: '入庫サブメニュー' },
      { label: '入庫サブメニュー' },
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
  const wrapRef = useRef<HTMLElement | null>(null);

  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [panelTop, setPanelTop] = useState(0);

  const handleEnter =
    (key: MenuKey) => (e: React.MouseEvent<HTMLElement>) => {
      setActiveMenu(key);

      const itemRect = e.currentTarget.getBoundingClientRect();
      const wrapRect = wrapRef.current?.getBoundingClientRect();
      if (!wrapRect) return;

      setPanelTop(itemRect.top - wrapRect.top);
    };

  return (
    <SidebarWrap
      ref={wrapRef}
      onMouseLeave={() => setActiveMenu(null)} //マウスホバーでon
    >
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
          <SidebarItem href="/user_search" onMouseEnter={handleEnter('purchase')}>
            <SidebarItemText>{MENU.purchase.label}</SidebarItemText>
          </SidebarItem>

          <SidebarItem href="/" onMouseEnter={handleEnter('stock')}>
            <SidebarItemText>{MENU.stock.label}</SidebarItemText>
          </SidebarItem>

          <SidebarItem href="/" onMouseEnter={handleEnter('customer')}>
            <SidebarItemText>{MENU.customer.label}</SidebarItemText>
          </SidebarItem>
        </SidebarNav>
      </SidebarBase>

      {activeMenu && (
        <SubMenuPanel style={{ top: panelTop }}>
          <SubMenuList>
            {MENU[activeMenu].subItems.map((item, index) => ( //マウスホバーで溜まらないように修正
              <SubMenuRow key={`${activeMenu}-${index}-${item.label}`}>
                <SubMenuIcon />
                <SubMenuText>{item.label}</SubMenuText>
              </SubMenuRow>
            ))}
          </SubMenuList>
        </SubMenuPanel>
      )}
    </SidebarWrap>
  );
}

/* ---------- styles ---------- */

const SidebarWrap = styled.aside`
  position: relative;
  display: flex;
`;

const SidebarBase = styled.div`
  width: 72px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
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
    height: 20px;
  }
`;

const SidebarNav = styled.nav``;

const SidebarItem = styled(Link)`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background: #f3f4f6;
  }
`;

const SidebarItemText = styled.span`
  font-size: 12px;
  text-align: center;
  white-space: pre-line;
`;

const SubMenuPanel = styled.div`
  position: absolute;
  left: 72px;
  width: 320px;
  background: #ffffff;
  padding: 16px 12px;
`;

const SubMenuList = styled.div`
  border: 1px solid #e5e7eb;
  background: #ffffff;
`;

const SubMenuRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;

  & + & {
    border-top: 1px solid #e5e7eb;
  }

  &:hover {
    background: #f3f4f6;
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
