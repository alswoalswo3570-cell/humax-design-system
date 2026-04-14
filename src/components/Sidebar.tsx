import { Layout, Palette, Component, Blocks, Accessibility, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'tokens', label: 'Design Tokens', icon: Palette },
    { id: 'components', label: 'Components', icon: Component },
    { id: 'patterns', label: 'Patterns', icon: Blocks },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-4 md:hidden flex justify-end">
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="mb-4 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Documentation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Need help?</h4>
              <p className="text-xs text-gray-500 mb-3">Contact the design system team on Slack.</p>
              <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                #design-system
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
