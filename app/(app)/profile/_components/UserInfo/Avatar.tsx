import Image from "next/image";

interface AvatarProps {
  src: string | null;
  username: string | null;
}

export function Avatar({ src, username }: AvatarProps) {
  const initial = (username || "П").charAt(0).toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover border border-border-input"
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-full bg-accent-primary/10 border border-border-input flex items-center justify-center text-3xl font-bold text-accent-primary">
      {initial}
    </div>
  );
}
