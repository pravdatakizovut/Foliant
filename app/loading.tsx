import { LogoLoader } from "@/components/ui/Loader/LogoLoader";

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white/50">
      <div className="flex flex-col items-center gap-4">
        <LogoLoader />
        <span className="text-sm">Загрузка...</span>
      </div>
    </div>
  );
}
