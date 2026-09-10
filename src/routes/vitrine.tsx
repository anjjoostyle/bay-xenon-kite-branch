import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/vitrine")({
  beforeLoad: () => {
    throw redirect({ to: "/loja" });
  },
});
