# 再利用パターン集

> このファイルはプロジェクトで使用する定型パターンを記録します。

## コードパターン

### P001: テストフィクスチャ

```typescript
// packages/api/src/test-utils/fixtures.ts
export const createSessionFixture = (
  overrides: Partial<Session> = {},
): Session => ({
  sessionId: "sess_test123",
  name: "Test Session",
  workingDir: "/tmp/test",
  status: "idle",
  continueChat: false,
  dangerouslySkipPermissions: false,
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-01T00:00:00Z"),
  ...overrides,
});
```

### P002: Vitest モック

```typescript
// packages/api/src/test-utils/mocks.ts
import { vi } from "vitest";

export const mockClaudeAgent = {
  query: vi.fn().mockResolvedValue({
    content: "Mocked response",
  }),
};

export const resetAllMocks = () => {
  vi.clearAllMocks();
};
```

---

## 命名規則

### ID プレフィックス

| エンティティ | プレフィックス | 例            |
| ------------ | -------------- | ------------- |
| Session      | `sess_`        | `sess_abc123` |
| Message      | `msg_`         | `msg_xyz789`  |
| Summary      | `sum_`         | `sum_def456`  |
| Work Item    | `wi_`          | `wi_123`      |
| Project      | `proj_`        | `proj_456`    |

### ファイル命名

| 種類           | パターン    | 例                |
| -------------- | ----------- | ----------------- |
| コンポーネント | PascalCase  | `SessionList.tsx` |
| ユーティリティ | camelCase   | `formatDate.ts`   |
| テスト         | `*.test.ts` | `session.test.ts` |
| 型定義         | camelCase   | `session.ts`      |

---

## テンプレート

```markdown
### PXXX: [パターン名]

**用途**: [いつ使うか]

\`\`\`typescript
// コード例
\`\`\`

**注意点**:

- [注意点1]
```
