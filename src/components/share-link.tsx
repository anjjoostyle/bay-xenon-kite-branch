import { useEffect, useRef, useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { appUrl, copyText, whatsappHref } from "@/lib/share";
import { syncPublicPages } from "@/lib/publish";

export function ShareLinkBox({
  path,
  title,
  description,
  message,
}: {
  path: string;
  title: string;
  description: string;
  message: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(() =>
    typeof window === "undefined" ? path : appUrl(path),
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(appUrl(path));
    void syncPublicPages().catch(() => undefined);
  }, [path]);

  async function handleCopy() {
    const ok = await copyText(url, inputRef.current);
    if (ok) {
      setCopied(true);
      toast.success("Link copiado.");
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      inputRef.current?.select();
      toast.message("Selecione o endereço e copie.", {
        description: "No teste do Grok o copiar automático costuma ser bloqueado.",
      });
    }
  }

  const wa = `${message}\n${url}`;

  return (
    <Card className="p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Input
        ref={inputRef}
        readOnly
        value={url}
        className="mt-3 font-mono text-xs"
        aria-label={title}
        onFocus={(e) => e.currentTarget.select()}
      />
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Button type="button" onClick={() => void handleCopy()}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copiado" : "Copiar link"}
        </Button>
        <Button variant="outline" asChild>
          <a href={whatsappHref(wa)} target="_blank" rel="noreferrer">
            <MessageCircle />
            Enviar no WhatsApp
          </a>
        </Button>
      </div>
    </Card>
  );
}
