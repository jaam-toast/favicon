import { getFavicon } from "./getFavicon";

test("getFavicon", async () => {
  const testUrl = "https://nextjs.org/";
  const faviconPath = await getFavicon({ url: testUrl });

  expect(faviconPath).toBe(
    "https://nextjs.org/static/favicon/apple-touch-icon.png"
  );
});
