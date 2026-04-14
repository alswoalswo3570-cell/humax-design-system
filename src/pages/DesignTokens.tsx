export function DesignTokens() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Design Tokens</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.
        </p>
      </div>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Colors</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Primary (Brand)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'primary-50', hex: '#eff6ff', class: 'bg-indigo-50', text: 'text-indigo-900' },
                { name: 'primary-100', hex: '#dbeafe', class: 'bg-indigo-100', text: 'text-indigo-900' },
                { name: 'primary-500', hex: '#3b82f6', class: 'bg-indigo-500', text: 'text-white' },
                { name: 'primary-600', hex: '#2563eb', class: 'bg-indigo-600', text: 'text-white' },
                { name: 'primary-900', hex: '#1e3a8a', class: 'bg-indigo-900', text: 'text-white' },
              ].map((color) => (
                <div key={color.name} className="flex flex-col">
                  <div className={`h-24 rounded-lg shadow-inner ${color.class} flex items-end p-3`}>
                    <span className={`text-xs font-medium ${color.text}`}>{color.hex}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900">{color.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Neutral (Grayscale)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'gray-50', hex: '#f9fafb', class: 'bg-gray-50', text: 'text-gray-900', border: 'border border-gray-200' },
                { name: 'gray-200', hex: '#e5e7eb', class: 'bg-gray-200', text: 'text-gray-900' },
                { name: 'gray-500', hex: '#6b7280', class: 'bg-gray-500', text: 'text-white' },
                { name: 'gray-700', hex: '#374151', class: 'bg-gray-700', text: 'text-white' },
                { name: 'gray-900', hex: '#111827', class: 'bg-gray-900', text: 'text-white' },
              ].map((color) => (
                <div key={color.name} className="flex flex-col">
                  <div className={`h-24 rounded-lg shadow-inner ${color.class} ${color.border || ''} flex items-end p-3`}>
                    <span className={`text-xs font-medium ${color.text}`}>{color.hex}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Typography</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-900">Token</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-900">Size / Line Height</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-900">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-4 text-sm font-mono text-indigo-600">text-4xl</td>
                <td className="py-4 px-4 text-sm text-gray-500">36px / 40px</td>
                <td className="py-4 px-4 text-4xl font-bold text-gray-900 tracking-tight">Display Large</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm font-mono text-indigo-600">text-2xl</td>
                <td className="py-4 px-4 text-sm text-gray-500">24px / 32px</td>
                <td className="py-4 px-4 text-2xl font-bold text-gray-900">Heading Medium</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm font-mono text-indigo-600">text-base</td>
                <td className="py-4 px-4 text-sm text-gray-500">16px / 24px</td>
                <td className="py-4 px-4 text-base text-gray-900">Body regular text used for main content.</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm font-mono text-indigo-600">text-sm</td>
                <td className="py-4 px-4 text-sm text-gray-500">14px / 20px</td>
                <td className="py-4 px-4 text-sm text-gray-600">Small body text used for secondary content.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Spacing</h2>
        <div className="space-y-4">
          {[
            { token: 'space-2', rem: '0.5rem', px: '8px', width: 'w-8' },
            { token: 'space-4', rem: '1rem', px: '16px', width: 'w-16' },
            { token: 'space-6', rem: '1.5rem', px: '24px', width: 'w-24' },
            { token: 'space-8', rem: '2rem', px: '32px', width: 'w-32' },
            { token: 'space-12', rem: '3rem', px: '48px', width: 'w-48' },
          ].map((space) => (
            <div key={space.token} className="flex items-center gap-4">
              <div className="w-24 text-sm font-mono text-indigo-600">{space.token}</div>
              <div className="w-24 text-sm text-gray-500">{space.px}</div>
              <div className={`h-8 bg-indigo-200 rounded ${space.width}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Radius */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Border Radius</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { token: 'rounded-sm', px: '2px', class: 'rounded-sm' },
            { token: 'rounded-md', px: '6px', class: 'rounded-md' },
            { token: 'rounded-lg', px: '8px', class: 'rounded-lg' },
            { token: 'rounded-full', px: '9999px', class: 'rounded-full' },
          ].map((radius) => (
            <div key={radius.token} className="flex flex-col items-center">
              <div className={`w-24 h-24 bg-indigo-100 border-2 border-indigo-500 ${radius.class} mb-3`}></div>
              <div className="text-sm font-mono text-indigo-600">{radius.token}</div>
              <div className="text-xs text-gray-500">{radius.px}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Light / Dark Mode */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Theme Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-gray-200">
          {/* Light Mode Example */}
          <div className="bg-white p-8">
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full mb-4">Light Mode</div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h4 className="text-gray-900 font-semibold mb-2">Surface Default</h4>
              <p className="text-gray-600 text-sm mb-4">Text secondary sits on top of the surface background.</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Primary Action
              </button>
            </div>
          </div>
          
          {/* Dark Mode Example */}
          <div className="bg-gray-900 p-8">
            <div className="inline-block px-3 py-1 bg-gray-800 text-gray-200 text-xs font-semibold rounded-full mb-4">Dark Mode</div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-sm">
              <h4 className="text-white font-semibold mb-2">Surface Default</h4>
              <p className="text-gray-400 text-sm mb-4">Text secondary sits on top of the surface background.</p>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Primary Action
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
