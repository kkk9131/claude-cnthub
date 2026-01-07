/**
 * レート制限ミドルウェアのテスト
 */

import { describe, test, expect, beforeEach } from "vitest";
import { Hono } from "hono";
import { rateLimit, _clearRateLimitHistory } from "./rateLimit";

describe("rateLimit middleware", () => {
  beforeEach(() => {
    _clearRateLimitHistory();
  });

  test("制限内のリクエストは通過する", async () => {
    const app = new Hono();
    app.use("*", rateLimit({ maxRequests: 5, windowMs: 1000 }));
    app.get("/", (c) => c.text("OK"));

    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(res.headers.get("X-RateLimit-Limit")).toBe("5");
    expect(res.headers.get("X-RateLimit-Remaining")).toBe("4");
  });

  test("制限を超えると429を返す", async () => {
    const app = new Hono();
    app.use("*", rateLimit({ maxRequests: 3, windowMs: 10000 }));
    app.get("/", (c) => c.text("OK"));

    // 3回までは成功
    for (let i = 0; i < 3; i++) {
      const res = await app.request("/");
      expect(res.status).toBe(200);
    }

    // 4回目は制限
    const res = await app.request("/");
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();

    const body = (await res.json()) as { error: string };
    expect(body.error).toBe("Rate limit exceeded");
  });

  test("カスタムメッセージが設定できる", async () => {
    const app = new Hono();
    app.use(
      "*",
      rateLimit({
        maxRequests: 1,
        windowMs: 10000,
        message: "Custom rate limit message",
      })
    );
    app.get("/", (c) => c.text("OK"));

    await app.request("/"); // 1回目は成功
    const res = await app.request("/"); // 2回目は制限

    expect(res.status).toBe(429);
    const body = (await res.json()) as { message: string };
    expect(body.message).toBe("Custom rate limit message");
  });

  test("時間経過後はリセットされる", async () => {
    const app = new Hono();
    app.use("*", rateLimit({ maxRequests: 2, windowMs: 50 }));
    app.get("/", (c) => c.text("OK"));

    // 2回リクエスト
    await app.request("/");
    await app.request("/");

    // 3回目は制限
    let res = await app.request("/");
    expect(res.status).toBe(429);

    // 時間経過を待つ
    await new Promise((resolve) => setTimeout(resolve, 60));

    // リセット後は成功
    res = await app.request("/");
    expect(res.status).toBe(200);
  });
});
