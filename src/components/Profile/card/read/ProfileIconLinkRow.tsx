import type { ComponentType } from "react";

type Props = {
  Icon: ComponentType<{ className?: string; size?: number }>;
  href: string;
};
export function ProfileIconLinkRow({ Icon, href }: Props) {
  return (
    <div className="text-sm flex gap-2">
      <span>
        <Icon className="w-[18px] h-[18px]" size={18} />
      </span>
      <span>
        <a className="underline break-all" href={href} target="_blank">
          {href}
        </a>
      </span>
    </div>
  );
}
