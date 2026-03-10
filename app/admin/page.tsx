import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Admin — Fernando Atiye',
  robots: { index: false, follow: false },
};

interface ClickData {
  clicks: number;
  lastClick: string | null;
}

const productNames: Record<string, string> = {
  alioli: 'Alioli Artesanal',
  chile: 'Chile de Árbol en Polvo Premium',
  matcha: 'Salsa Matcha Estilo Fusión',
  ajo_perejil: 'Sazonador Ajo con Perejil',
};

function getClickData(): Record<string, ClickData> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'productClicks.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const data = getClickData();
  const entries = Object.entries(data);
  const totalClicks = entries.reduce((sum, [, v]) => sum + v.clicks, 0);

  return (
    <section className="py-12 lg:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="section-label mb-3">Panel interno</p>
          <h1 className="text-3xl md:text-4xl mb-2">Admin Dashboard</h1>
          <p className="text-dark/50 text-sm">
            Tracking de clics en productos (Fake Door Testing)
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-cream rounded-lg p-5 text-center">
            <p className="text-3xl font-bicyclette text-primary">{totalClicks}</p>
            <p className="text-xs text-dark/50 font-bicyclette uppercase tracking-wider mt-1">
              Total Clics
            </p>
          </div>
          {entries.map(([key, value]) => (
            <div key={key} className="bg-cream rounded-lg p-5 text-center">
              <p className="text-3xl font-bicyclette text-forest">{value.clicks}</p>
              <p className="text-xs text-dark/50 font-bicyclette uppercase tracking-wider mt-1">
                {productNames[key] ? productNames[key].split(' ')[0] : key}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-cream/50">
                  <th className="text-left py-4 px-6 text-xs font-bicyclette uppercase tracking-wider text-dark/60">
                    Producto
                  </th>
                  <th className="text-center py-4 px-6 text-xs font-bicyclette uppercase tracking-wider text-dark/60">
                    Total Clics
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bicyclette uppercase tracking-wider text-dark/60">
                    Último Clic
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium text-dark">
                        {productNames[key] || key}
                      </p>
                      <p className="text-xs text-dark/40 mt-0.5">ID: {key}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bicyclette">
                        {value.clicks}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-dark/60">
                      {formatDate(value.lastClick)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-dark/30 text-center">
          Los datos se almacenan localmente en data/productClicks.json · Sin autenticación
        </p>
      </div>
    </section>
  );
}
