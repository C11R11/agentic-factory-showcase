export const format = (n) => n ? n.toLocaleString() : '0';

// INDUSTRIAL RATES
export const calculateUSD = (p, r, o) => {
    return (p / 1000000 * 5.00) + ((r + o) / 1000000 * 37.00);
};

const SSD_ORDER = ['foundations', 'specs', 'planning', 'implementation', 'validation'];
const PHASE_CONFIG = {
    foundations: { color: 'border-slate-600', icon: '🏗️', label: 'Foundations' },
    specs: { color: 'border-blue-600', icon: '📋', label: 'Master Specs' },
    planning: { color: 'border-indigo-500', icon: '🎯', label: 'Planning' },
    implementation: { color: 'border-emerald-500', icon: '⚙️', label: 'Implementation' },
    validation: { color: 'border-amber-400', icon: '🧪', label: 'Validation' }
};

export function renderPhaseFlow(phases, lifeTotal) {
    const container = document.getElementById('phase-details-container');
    if (!container) return;

    container.innerHTML = SSD_ORDER.map(phaseId => {
        const stat = phases[phaseId] || { prompt: 0, reasoning: 0, output: 0, total: 0 };
        const cfg = PHASE_CONFIG[phaseId];
        const cost = calculateUSD(stat.prompt, stat.reasoning, stat.output);

        return `
            <div class="bg-slate-900 border border-slate-800 p-6 rounded-lg border-l-4 ${cfg.color} flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">${cfg.label}</span>
                        <span>${cfg.icon}</span>
                    </div>
                    <div class="text-2xl font-bold text-white mb-4">$${cost.toFixed(2)}</div>
                    <div class="space-y-2 bg-slate-950/50 p-3 rounded border border-slate-800/50 mb-4">
                        <div class="flex justify-between items-center text-[9px] font-mono"><span class="text-slate-600 font-bold">P</span><span class="text-white">${format(stat.prompt)}</span></div>
                        <div class="flex justify-between items-center text-[9px] font-mono"><span class="text-blue-600 font-bold">R</span><span class="text-blue-400">${format(stat.reasoning)}</span></div>
                        <div class="flex justify-between items-center text-[9px] font-mono"><span class="text-emerald-600 font-bold">O</span><span class="text-emerald-400">${format(stat.output)}</span></div>
                    </div>
                </div>
                <div class="w-full bg-slate-950 h-1 rounded-full overflow-hidden flex border border-slate-800">
                    <div style="width: ${stat.total > 0 ? (stat.prompt / stat.total * 100) : 0}%" class="bg-slate-600 h-full"></div>
                    <div style="width: ${stat.total > 0 ? (stat.reasoning / stat.total * 100) : 0}%" class="bg-blue-600 h-full"></div>
                    <div style="width: ${stat.total > 0 ? (stat.output / stat.total * 100) : 0}%" class="bg-emerald-500 h-full"></div>
                </div>
            </div>`;
    }).join('');
}

export function renderMetrics(meta, slices) {
    const f = meta.global_finops;
    const life = f.project_total_cost;

    document.getElementById('total-usd').innerText = `$${calculateUSD(life.prompt, life.reasoning, life.output).toFixed(2)}`;
    document.getElementById('lifecycle-total').innerHTML = `${format(life.total)} <span class="text-xs text-slate-600">TOKENS</span>`;
    document.getElementById('life-p').innerText = format(life.prompt);
    document.getElementById('life-r').innerText = format(life.reasoning);
    document.getElementById('life-o').innerText = format(life.output);

    const prodTokens = slices.reduce((acc, s) => acc + (s.token_usage?.total || 0), 0);
    const efficiency = life.total > 0 ? ((prodTokens / life.total) * 100).toFixed(2) : 0;
    document.getElementById('efficiency-score').innerText = `${efficiency}%`;

    document.getElementById('bar-life-p').style.width = (life.total > 0 ? (life.prompt / life.total * 100) : 0) + '%';
    document.getElementById('bar-life-r').style.width = (life.total > 0 ? (life.reasoning / life.total * 100) : 0) + '%';
    document.getElementById('bar-life-o').style.width = (life.total > 0 ? (life.output / life.total * 100) : 0) + '%';

    renderPhaseFlow(f.phase_stats, life.total);
}

export function renderTable(slices) {
    const container = document.getElementById('registry-table-body');
    if (!container) return;

    container.innerHTML = slices.map(s => {
        const u = s.token_usage || { prompt: 0, reasoning: 0, output: 0, total: 0 };
        const cost = calculateUSD(u.prompt, u.reasoning, u.output);
        return `
            <tr class="hover:bg-slate-800/40 transition-all text-[11px]">
                <td class="px-6 py-6 font-bold text-white italic uppercase tracking-tighter">${s.id}</td>
                <td class="px-6 py-6">
                    <div class="text-slate-300 font-bold">${s.title}</div>
                    <div class="text-[9px] text-slate-500 uppercase mt-1 tracking-widest">${s.phase}</div>
                </td>
                <td class="px-6 py-6 text-right">
                    <div class="text-emerald-400 font-bold text-base">$${cost.toFixed(2)}</div>
                    <div class="text-[8px] text-slate-600 uppercase font-bold tracking-tighter">Unit Value</div>
                </td>
            </tr>`;
    }).join('');
}

async function init() {
    try {
        const res = await fetch('.factory/index.json');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        renderMetrics(data.metadata, data.slices);
        renderTable(data.slices);
    } catch (e) {
        console.error("Sync Failure:", e);
        document.getElementById('status-tag').innerText = "Telemetry: Offline";
        document.getElementById('status-tag').classList.add('text-red-500');
    }
}

// Allow harness to inject data via PostMessage
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_DATA') {
        const data = event.data.payload;
        renderMetrics(data.metadata, data.slices);
        renderTable(data.slices);
        document.getElementById('status-tag').innerText = "Telemetry: Mocked";
        document.getElementById('status-tag').classList.remove('text-slate-500');
        document.getElementById('status-tag').classList.add('text-amber-500');
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
