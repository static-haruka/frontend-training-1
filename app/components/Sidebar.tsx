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
      { label: '新規買取査定',   icon: '/icons/icons8-camera.png' },
      { label: '買取契約の締結', icon: '/icons/icons8-pencil.png' },
      { label: '仮入庫前一覧',   icon: '/icons/icons8-sub.png'    },
      { label: '査定ランク編集', icon: '/icons/icons8-rank.png'   },
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
      { label: '新規顧客登録',       icon: '/icons/icons8-sinki.png' },
      { label: 'Croooober ID検索', icon: '/icons/icons8-id.png'    },
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

        <SidebarChevron
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="メニューを開く"
        >
          <img src="/icons/icons8-chevron-right.png" alt="" />
        </SidebarChevron>

        <SidebarNav>
          {(Object.keys(MENU) as MenuKey[]).map((key) => (
            <SidebarItem key={key}>
              <SidebarItemLink href={key === 'purchase' ? '/user_search' : '/'}>
                <SidebarItemText>{MENU[key].label}</SidebarItemText>
              </SidebarItemLink>

              <SubMenuPanel>
                <SubMenuList>
                  {MENU[key].subItems.map((item, index) => (
                    <SubMenuRow key={`${key}-${index}`}>
                      <SubMenuIcon aria-hidden="true">
                        <img src={item.icon} alt="" />
                      </SubMenuIcon>
                      <SubMenuText>{item.label}</SubMenuText>
                    </SubMenuRow>
                  ))}
                </SubMenuList>
              </SubMenuPanel>
            </SidebarItem>
          ))}
        </SidebarNav>
      </SidebarBase>

      <Overlay $open={isOpen} onClick={() => setIsOpen(false)} />

      <Panel $open={isOpen} role="dialog" aria-label="サイドバー一覧">
        <PanelClose>
          <CloseButton
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="閉じる"
          >
            ×
          </CloseButton>
        </PanelClose>
        <PanelBody>
          {(Object.keys(MENU) as MenuKey[]).map((key) => (
            <PanelSection key={key}>
              <SectionTitle>{MENU[key].label.replace('\n', '')}</SectionTitle>
              <SubMenuList>
                {MENU[key].subItems.map((item, index) => (
                  <SubMenuRow key={`${key}-panel-${index}`}>
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
    </SidebarWrap>
  );
}

/* ---------- styles ---------- */
const SIDEBAR_SIZE = 56;
const HEADER_HEIGHT = 56;

const SidebarWrap = styled.aside`
  display: flex;
`;

const SidebarBase = styled.div`
  width: ${SIDEBAR_SIZE}px;
  min-width: ${SIDEBAR_SIZE}px;
  border-right: 1px solid #e5e7eb;
  background: #fff;
`;

const SidebarTop = styled.div`
  height: ${SIDEBAR_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe000;
`;

const LogoMark = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

const SidebarChevron = styled.button`
  height: ${SIDEBAR_SIZE}px;
  width: ${SIDEBAR_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }

  &:hover { background: #f3f4f6; }
`;

const SidebarNav = styled.nav``;

const SubMenuPanel = styled.div`
  position: absolute;
  left: ${SIDEBAR_SIZE}px;
  top: 0;
  width: 220px;
  opacity: 0;
  pointer-events: none;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  background: #fff;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 50;
  transition: opacity 0.1s;
`;

const SidebarItem = styled.div`
  position: relative;

  &:hover ${SubMenuPanel} {
    opacity: 1;
    pointer-events: auto;
  }
`;

const SidebarItemLink = styled(Link)`
  height: ${SIDEBAR_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;
  text-decoration: none;

  &:hover {
    background: #edf4fa;
    font-weight: 600;
  }
`;

const SidebarItemText = styled.span`
  font-size: 12px;
  white-space: pre-line;
  text-align: center;
  color: #222;
`;

const SubMenuList = styled.div``;

const SubMenuRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;

  &:hover { background: #f3f4f6; }
`;

const SubMenuIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: #0075af;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`;

const SubMenuText = styled.div`
  font-size: 14px;
  color: #222;
`;


const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  opacity: ${(p) => (p.$open ? 1 : 0)};
  pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
  transition: opacity 0.2s;
`;

const Panel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  height: calc(100dvh - ${HEADER_HEIGHT}px);
  width: 260px;
  background: #ffffff;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  z-index: 210;

  display: flex;
  flex-direction: column;

  transform: ${(p) => (p.$open ? 'translateX(0)' : 'translateX(-100%)')};
  visibility: ${(p) => (p.$open ? 'visible' : 'hidden')};
  transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0s ${(p) => (p.$open ? '0s' : '0.22s')};
`;

const PanelClose = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 8px;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  font-size: 20px;
  color: #0075af;
  font-weight: 600;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;

  &:hover { background: #f3f4f6; }
`;

const PanelBody = styled.div`
  padding: 12px;
  overflow-y: auto;
  flex: 1;
  background: #fff;
`;

const PanelSection = styled.div`
  & + & {
    margin-top: 8px;
    padding-top: 8px;
  }
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
  padding-left: 8px;
  color: #555;
`;