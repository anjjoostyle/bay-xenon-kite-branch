import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/conta/$token")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/c/$code",
      params: { code: params.token },
    });
  },
});
