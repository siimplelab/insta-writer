import { graph } from "./client";

type Token = { token: string; igUserId: string };

export async function sendDM(t: Token, recipientId: string, text: string) {
  return graph(`/${t.igUserId}/messages`, {
    token: t.token,
    method: "POST",
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
      messaging_type: "RESPONSE",
    }),
  });
}

export async function sendDMWithQuickReplies(
  t: Token,
  recipientId: string,
  text: string,
  quickReplies: { title: string; payload: string }[],
) {
  return graph(`/${t.igUserId}/messages`, {
    token: t.token,
    method: "POST",
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: {
        text,
        quick_replies: quickReplies.map((q) => ({
          content_type: "text",
          title: q.title,
          payload: q.payload,
        })),
      },
      messaging_type: "RESPONSE",
    }),
  });
}
