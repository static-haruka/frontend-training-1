/**
 * Jest の設定ファイル
 *
 * Next.js の設定（module alias など）と相性が良い next/jest を使って
 * Jest を Next プロジェクト向けに初期化する。
 */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/**
 * Jest 独自の設定
 * - testEnvironment: ブラウザDOMがある前提のテスト（Reactコンポーネント）用に jsdom を使用
 * - setupFilesAfterEnv: テスト実行前に jest-dom を読み込んで便利な matcher を使えるようにする
 */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
