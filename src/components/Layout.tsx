import { Link, useLocation } from "react-router-dom";
import { BookOpen, Palette, Component, Smartphone, Menu, Moon, Sun, LayoutTemplate, Layers, PanelLeft, Accessibility } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import lightTokens from "../../tokens/light.json";
import darkTokens from "../../tokens/dark.json";
import baseTokens from "../../tokens/base.json";

const navigation = [
  { name: "Overview", href: "/", icon: BookOpen },
  { name: "Design Tokens", href: "/tokens", icon: Palette },
  { name: "Layout & Grid", href: "/layout", icon: LayoutTemplate },
  { name: "Adaptive Navigation", href: "/adaptive-navigation", icon: PanelLeft },
  { name: "Input & Accessibility", href: "/input-accessibility", icon: Accessibility },
  { name: "Components", href: "/components", icon: Component },
  { name: "Patterns", href: "/patterns", icon: Layers },
  { name: "Flutter Reference", href: "/flutter", icon: Smartphone },
];

function flattenTokens(obj: any, prefix = ''): Record<string, string> {
  let result: Record<string, string> = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flattenTokens(obj[key], `${prefix}${key}-`));
    } else {
      result[`${prefix}${key}`] = obj[key];
    }
  }
  return result;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Generate CSS variables from tokens
  const lightVars = flattenTokens(lightTokens.color, '--color-');
  const darkVars = flattenTokens(darkTokens.color, '--color-');
  const baseVars = {
    ...flattenTokens(baseTokens.space, '--space-'),
    ...flattenTokens(baseTokens.radius, '--radius-'),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          ${Object.entries(lightVars).map(([k, v]) => `${k}: ${v};`).join('\n          ')}
          ${Object.entries(baseVars).map(([k, v]) => `${k}: ${v};`).join('\n          ')}
        }
        .dark {
          ${Object.entries(darkVars).map(([k, v]) => `${k}: ${v};`).join('\n          ')}
        }
      `}} />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 font-semibold text-lg text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">UX</span>
            </div>
            Guide
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-700 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-semibold text-gray-900 dark:text-white ml-2">UX Guide</div>
          </div>
          <div className="hidden lg:block"></div>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
