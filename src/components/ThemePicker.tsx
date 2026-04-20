import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEMES, useTheme, type Theme } from "@/hooks/use-theme";

export const ThemePicker = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          aria-label="اختيار لون التطبيق"
          title="اختيار لون التطبيق"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-display">ألوان التطبيق</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((t) => {
          const active = t.id === theme;
          return (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setTheme(t.id as Theme)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span
                className="h-5 w-5 rounded-full border border-border shadow-soft shrink-0"
                style={{ background: t.swatch }}
                aria-hidden
              />
              <span className="flex-1 font-display">{t.label}</span>
              {active && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
