import {
  InstagramIcon,
  MessengerIcon,
  TelegramIcon,
  TikTokIcon,
  WhatsappIcon,
} from "@/components/brand/icons";
import { channelMeta } from "@/features/chat/data";
import type { Channel } from "@/features/chat/types";
import { cn } from "@/lib/utils";

const icons: Record<Channel, (p: { className?: string }) => React.ReactNode> = {
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  messenger: MessengerIcon,
  telegram: TelegramIcon,
  tiktok: TikTokIcon,
};

/** Small brand glyph identifying a conversation's channel. */
export function ChannelGlyph({
  channel,
  className,
}: {
  channel: Channel;
  className?: string;
}) {
  const Icon = icons[channel];
  return <Icon className={cn("size-4", className)} />;
}

/** Circular corner badge to overlay on a conversation avatar. */
export function ChannelDot({ channel }: { channel: Channel }) {
  const Icon = icons[channel];
  const { color, label } = channelMeta[channel];
  return (
    <span
      className="grid size-5 place-items-center rounded-full bg-card shadow-sm ring-1 ring-border"
      title={label}
      style={{ color }}
    >
      <Icon className="size-3" />
    </span>
  );
}

export function ChannelLabel({ channel }: { channel: Channel }) {
  const { color, label } = channelMeta[channel];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span style={{ color }}>
        <ChannelGlyph channel={channel} className="size-3.5" />
      </span>
      {label}
    </span>
  );
}
