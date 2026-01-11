# Claude Agent SDK リファレンス

> 最適化エージェント実装時の参照用ドキュメント

## 公式ドキュメント

| トピック | URL |
|---------|-----|
| Skills | https://platform.claude.com/docs/ja/agent-sdk/skills |
| Permissions | https://platform.claude.com/docs/ja/agent-sdk/permissions |
| Hooks | https://platform.claude.com/docs/ja/agent-sdk/hooks |
| Custom Tools | https://platform.claude.com/docs/ja/agent-sdk/custom-tools |
| Subagents | https://platform.claude.com/docs/ja/agent-sdk/subagents |
| Slash Commands | https://platform.claude.com/docs/ja/agent-sdk/slash-commands |

---

## 1. Skills（エージェントスキル）

### 概要
スキルは、Claudeが関連する場合に自律的に呼び出す特殊な機能。`SKILL.md`ファイルとしてパッケージ化。

### 配置場所
- **プロジェクト**: `.claude/skills/*/SKILL.md`
- **ユーザー**: `~/.claude/skills/*/SKILL.md`
- **プラグイン**: インストール済みプラグインにバンドル

### SDKでの使用

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Help me process this PDF document",
  options: {
    cwd: "/path/to/project",
    settingSources: ["user", "project"],  // スキル読み込みに必須
    allowedTools: ["Skill", "Read", "Write", "Bash"]
  }
})) {
  console.log(message);
}
```

```python
from claude_agent_sdk import query, ClaudeAgentOptions

options = ClaudeAgentOptions(
    cwd="/path/to/project",
    setting_sources=["user", "project"],  # スキル読み込みに必須
    allowed_tools=["Skill", "Read", "Write", "Bash"]
)

async for message in query(prompt="Help me process this PDF", options=options):
    print(message)
```

### SKILL.md 構造

```bash
.claude/skills/processing-pdfs/
└── SKILL.md
```

```yaml
---
name: pdf-processor
description: PDFファイルを処理して情報を抽出
allowed-tools: Read, Bash
---

PDFファイルからテキストを抽出し、構造化データに変換します。
```

### 重要ポイント
- `settingSources` を明示的に設定しないとスキルは読み込まれない
- `allowedTools` に `"Skill"` を含める必要あり
- SDK使用時、SKILL.mdの`allowed-tools`フロントマターは適用されない（CLIのみ）

---

## 2. Permissions（パーミッション）

### パーミッションモード

| モード | 説明 |
|--------|------|
| `default` | 標準的なパーミッション動作 |
| `plan` | 計画モード - 読み取り専用ツールのみ |
| `acceptEdits` | ファイル編集を自動承認 |
| `bypassPermissions` | 全パーミッションチェックをバイパス（注意） |

### パーミッションフロー

```
PreToolUse Hook → 拒否ルール → 許可ルール → 質問ルール → モードチェック → canUseTool → 実行
```

### canUseTool コールバック

```typescript
const result = await query({
  prompt: "Help me analyze this codebase",
  options: {
    canUseTool: async (toolName, input) => {
      if (toolName === "Bash" && input.command?.includes("rm")) {
        return {
          behavior: "deny",
          message: "削除コマンドは禁止"
        };
      }
      return { behavior: "allow", updatedInput: input };
    }
  }
});
```

### 動的モード変更（ストリーミング）

```typescript
const q = query({
  prompt: streamInput(),
  options: { permissionMode: 'default' }
});

await q.setPermissionMode('acceptEdits');  // 動的変更
```

---

## 3. Hooks（フック）

### 利用可能なフック

| フックイベント | Python | TypeScript | 説明 |
|---------------|--------|------------|------|
| `PreToolUse` | ✅ | ✅ | ツール実行前（ブロック可能） |
| `PostToolUse` | ✅ | ✅ | ツール実行後 |
| `PostToolUseFailure` | ❌ | ✅ | ツール失敗時 |
| `UserPromptSubmit` | ✅ | ✅ | プロンプト送信時 |
| `Stop` | ✅ | ✅ | エージェント停止時 |
| `SubagentStart` | ❌ | ✅ | サブエージェント開始 |
| `SubagentStop` | ✅ | ✅ | サブエージェント完了 |
| `PreCompact` | ✅ | ✅ | 圧縮前 |
| `SessionStart` | ❌ | ✅ | セッション開始 |
| `SessionEnd` | ❌ | ✅ | セッション終了 |
| `Notification` | ❌ | ✅ | 通知 |

### フック設定例

```typescript
for await (const message of query({
  prompt: "Update the database configuration",
  options: {
    hooks: {
      PreToolUse: [{
        matcher: 'Write|Edit',  // 正規表現パターン
        hooks: [protectEnvFiles],
        timeout: 60  // 秒
      }]
    }
  }
})) {
  console.log(message);
}
```

### フックコールバック

```typescript
const protectEnvFiles: HookCallback = async (input, toolUseID, { signal }) => {
  const filePath = input.tool_input?.file_path as string;

  if (filePath?.endsWith('.env')) {
    return {
      hookSpecificOutput: {
        hookEventName: input.hook_event_name,
        permissionDecision: 'deny',
        permissionDecisionReason: '.envファイルの変更禁止'
      }
    };
  }
  return {};  // 許可
};
```

### 入力変更

```typescript
return {
  hookSpecificOutput: {
    hookEventName: input.hook_event_name,
    permissionDecision: 'allow',
    updatedInput: {
      ...input.tool_input,
      file_path: `/sandbox${originalPath}`
    }
  }
};
```

---

## 4. Custom Tools（カスタムツール）

### ツール定義

```typescript
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const customServer = createSdkMcpServer({
  name: "my-custom-tools",
  version: "1.0.0",
  tools: [
    tool(
      "get_weather",
      "Get current temperature for a location",
      {
        latitude: z.number().describe("緯度"),
        longitude: z.number().describe("経度")
      },
      async (args) => {
        const response = await fetch(`https://api.example.com/weather?lat=${args.latitude}&lon=${args.longitude}`);
        const data = await response.json();
        return {
          content: [{ type: "text", text: `Temperature: ${data.temp}°C` }]
        };
      }
    )
  ]
});
```

```python
from claude_agent_sdk import tool, create_sdk_mcp_server

@tool("get_weather", "Get current temperature", {"latitude": float, "longitude": float})
async def get_weather(args: dict) -> dict:
    # API呼び出し
    return {
        "content": [{"type": "text", "text": f"Temperature: {temp}°C"}]
    }

custom_server = create_sdk_mcp_server(
    name="my-custom-tools",
    version="1.0.0",
    tools=[get_weather]
)
```

### ツール使用

```typescript
async function* generateMessages() {
  yield {
    type: "user" as const,
    message: { role: "user" as const, content: "What's the weather?" }
  };
}

for await (const message of query({
  prompt: generateMessages(),  // ストリーミング入力必須
  options: {
    mcpServers: { "my-custom-tools": customServer },
    allowedTools: ["mcp__my-custom-tools__get_weather"]
  }
})) {
  console.log(message);
}
```

### ツール名形式
- パターン: `mcp__{server_name}__{tool_name}`
- 例: `mcp__my-custom-tools__get_weather`

---

## 5. Subagents（サブエージェント）

### 利点
1. **コンテキスト管理**: 分離されたコンテキストで情報過多を防止
2. **並列化**: 複数サブエージェントの同時実行
3. **専門化**: タスク特化のプロンプトとツール制限
4. **ツール制限**: 意図しない動作のリスク軽減

### プログラム的定義（推奨）

```typescript
const result = query({
  prompt: "認証モジュールのセキュリティ問題をレビュー",
  options: {
    agents: {
      'code-reviewer': {
        description: 'コードレビュー専門家。品質・セキュリティレビューに使用。',
        prompt: `あなたはセキュリティ専門のコードレビュアーです。
セキュリティ脆弱性を特定し、改善を提案してください。`,
        tools: ['Read', 'Grep', 'Glob'],
        model: 'sonnet'
      }
    }
  }
});
```

### AgentDefinition 設定

| フィールド | タイプ | 必須 | 説明 |
|-----------|--------|------|------|
| `description` | string | ✅ | 使用タイミングの説明 |
| `prompt` | string | ✅ | システムプロンプト |
| `tools` | string[] | ❌ | 許可ツール（省略時は全継承） |
| `model` | 'sonnet'/'opus'/'haiku'/'inherit' | ❌ | モデル指定 |

### ファイルシステムベース定義

```markdown
<!-- .claude/agents/code-reviewer.md -->
---
name: code-reviewer
description: エキスパートコードレビュー専門家
tools: Read, Grep, Glob, Bash
---

サブエージェントのシステムプロンプトがここに入ります。
```

### ツール制限パターン

```typescript
// 読み取り専用
tools: ['Read', 'Grep', 'Glob']

// テスト実行
tools: ['Bash', 'Read', 'Grep']

// コード変更
tools: ['Read', 'Edit', 'Write', 'Grep', 'Glob']
```

---

## 6. Slash Commands（スラッシュコマンド）

### 組み込みコマンド

| コマンド | 説明 |
|---------|------|
| `/compact` | 会話履歴を圧縮 |
| `/clear` | 会話をクリア |
| `/help` | ヘルプ表示 |

### コマンド実行

```typescript
for await (const message of query({
  prompt: "/compact",
  options: { maxTurns: 1 }
})) {
  if (message.type === "system" && message.subtype === "compact_boundary") {
    console.log("Compaction completed");
  }
}
```

### カスタムコマンド作成

配置場所:
- **プロジェクト**: `.claude/commands/*.md`
- **ユーザー**: `~/.claude/commands/*.md`

```markdown
<!-- .claude/commands/security-check.md -->
---
allowed-tools: Read, Grep, Glob
description: セキュリティ脆弱性スキャン
model: claude-3-5-sonnet-20241022
---

以下を含むセキュリティ脆弱性についてコードベースを分析：
- SQLインジェクション
- XSS脆弱性
- 露出した認証情報
```

### 引数とプレースホルダー

```markdown
<!-- .claude/commands/fix-issue.md -->
---
argument-hint: [issue-number] [priority]
description: GitHubの問題を修正
---

優先度$2で問題#$1を修正します。
```

使用: `/fix-issue 123 high`

### 動的コンテンツ

```markdown
## コンテキスト

- 現在のステータス: !`git status`
- 設定ファイル: @package.json
```

- `!`バッククォート`: bashコマンド実行結果を挿入
- `@ファイル名`: ファイル内容を挿入

---

## 最適化エージェント実装での活用

### 推奨アーキテクチャ

```
/cnthub:optimize
├── Skills 分析 → Subagent (読み取り専用)
├── 最適化プラン生成 → Custom Tool
├── ユーザー承認 → canUseTool callback
├── 変更実行 → PreToolUse Hook でバックアップ
└── ロールバック → Slash Command
```

### 実装チェックリスト

- [ ] `setting_sources` を設定してスキル読み込み
- [ ] 分析用サブエージェントは読み取り専用ツール制限
- [ ] 変更前にPreToolUseフックでバックアップ
- [ ] canUseToolで重要操作のユーザー確認
- [ ] ロールバック用スラッシュコマンド作成
