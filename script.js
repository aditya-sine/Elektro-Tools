// --- NAVIGATION LOGIC ---
function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.calc-section').forEach(el => el.classList.add('hidden'));
    
    // Show selected section
    const target = document.getElementById('tab-' + tabId);
    if(target) {
        target.classList.remove('hidden');
    }

    // Update Active State on Sidebar Buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-slate-300');
    });
    const activeBtn = document.getElementById('btn-' + tabId);
    if(activeBtn) {
        activeBtn.classList.remove('text-slate-300');
        activeBtn.classList.add('bg-blue-600', 'text-white');
    }

    // Close menu on mobile after selection
    if (window.innerWidth < 768) {
        closeMenu();
    }
}

// --- HAMBURGER MENU LOGIC ---
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('mobile-overlay');

function toggleMenu() {
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        openMenu();
    } else {
        closeMenu();
    }
}

function openMenu() {
    sidebar.classList.remove('-translate-x-full');
    // Show overlay
    overlay.classList.remove('hidden', 'invisible');
    overlay.classList.add('opacity-100'); // Ensure opacity transition happens
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
    }, 10);
}

function closeMenu() {
    sidebar.classList.add('-translate-x-full');
    // Hide overlay
    overlay.classList.add('opacity-0');
    setTimeout(() => {
        overlay.classList.add('hidden', 'invisible');
    }, 300); // Wait for transition
}


// --- OHM'S LAW LOGIC ---
let ohmMode = 'v'; // 'v', 'i', 'r'

function setOhmMode(mode) {
    ohmMode = mode;
    const label1 = document.getElementById('ohm-label-1');
    const label2 = document.getElementById('ohm-label-2');
    const unit1 = document.getElementById('ohm-unit-1');
    const unit2 = document.getElementById('ohm-unit-2');
    const resUnit = document.getElementById('ohm-result-unit');
    const btns = document.querySelectorAll('.ohm-mode-btn');

    // Reset buttons style
    btns.forEach(b => {
        b.className = 'ohm-mode-btn py-2 px-4 rounded-lg border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm md:text-base';
    });
    
    // Set active button style
    const activeBtn = document.getElementById('ohm-mode-' + mode);
    activeBtn.className = 'ohm-mode-btn py-2 px-4 rounded-lg border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold transition-all text-sm md:text-base';

    // Configure inputs based on mode
    if (mode === 'v') { // Calculate Voltage
        label1.innerText = "Arus (Ampere)"; unit1.innerText = "A";
        label2.innerText = "Hambatan (Ohm)"; unit2.innerText = "Ω";
        resUnit.innerText = "V";
    } else if (mode === 'i') { // Calculate Current
        label1.innerText = "Tegangan (Volt)"; unit1.innerText = "V";
        label2.innerText = "Hambatan (Ohm)"; unit2.innerText = "Ω";
        resUnit.innerText = "A";
    } else if (mode === 'r') { // Calculate Resistance
        label1.innerText = "Tegangan (Volt)"; unit1.innerText = "V";
        label2.innerText = "Arus (Ampere)"; unit2.innerText = "A";
        resUnit.innerText = "Ω";
    }
    
    // Clear inputs and recalculate
    document.getElementById('ohm-input-1').value = '';
    document.getElementById('ohm-input-2').value = '';
    calculateOhm();
}

function calculateOhm() {
    const v1 = parseFloat(document.getElementById('ohm-input-1').value);
    const v2 = parseFloat(document.getElementById('ohm-input-2').value);
    const resDisplay = document.getElementById('ohm-result-val');

    if (isNaN(v1) || isNaN(v2)) {
        resDisplay.innerText = "0";
        return;
    }

    let result = 0;
    if (ohmMode === 'v') result = v1 * v2;
    else if (ohmMode === 'i') result = (v2 === 0) ? 0 : v1 / v2;
    else if (ohmMode === 'r') result = (v2 === 0) ? 0 : v1 / v2;

    resDisplay.innerText = parseFloat(result.toFixed(4));
}


// --- POWER LOGIC ---
let powerMode = 'p'; // 'p' (Calculate Power), 'v' (Calc Voltage from P&I), 'i' (Calc Current from P&V)

function setPowerMode(mode) {
    powerMode = mode;
    const label1 = document.getElementById('p-label-1');
    const label2 = document.getElementById('p-label-2');
    const resUnit = document.getElementById('p-result-unit');
    const btns = document.querySelectorAll('.p-mode-btn');

    // Reset btns
    btns.forEach(b => b.className = 'p-mode-btn flex-1 py-2 px-3 rounded-lg border-2 border-slate-200 text-slate-600 hover:bg-slate-50 text-sm');
    document.getElementById('p-mode-' + mode).className = 'p-mode-btn flex-1 py-2 px-3 rounded-lg border-2 border-amber-500 bg-amber-50 text-amber-700 font-bold text-sm';

    if (mode === 'p') {
        label1.innerText = "Tegangan (V)";
        label2.innerText = "Arus (I)";
        resUnit.innerText = "W";
    } else if (mode === 'v') {
        label1.innerText = "Daya (W)";
        label2.innerText = "Arus (I)";
        resUnit.innerText = "V";
    } else if (mode === 'i') {
        label1.innerText = "Daya (W)";
        label2.innerText = "Tegangan (V)";
        resUnit.innerText = "A";
    }
    calculatePower();
}

function calculatePower() {
    const val1 = parseFloat(document.getElementById('p-input-1').value);
    const val2 = parseFloat(document.getElementById('p-input-2').value);
    const resEl = document.getElementById('p-result-val');

    if (isNaN(val1) || isNaN(val2)) { resEl.innerText = "0"; return; }

    let result = 0;
    if (powerMode === 'p') result = val1 * val2; // P = V * I
    else if (powerMode === 'v') result = (val2 === 0) ? 0 : val1 / val2; // V = P / I
    else if (powerMode === 'i') result = (val2 === 0) ? 0 : val1 / val2; // I = P / V

    resEl.innerText = parseFloat(result.toFixed(4));
}

// --- RESISTOR LOGIC ---
const colors = [
    { name: 'Black', hex: '#000000', val: 0, mul: 1 },
    { name: 'Brown', hex: '#8B4513', val: 1, mul: 10, tol: 1 },
    { name: 'Red', hex: '#DC2626', val: 2, mul: 100, tol: 2 },
    { name: 'Orange', hex: '#F97316', val: 3, mul: 1000 },
    { name: 'Yellow', hex: '#EAB308', val: 4, mul: 10000 },
    { name: 'Green', hex: '#16A34A', val: 5, mul: 100000, tol: 0.5 },
    { name: 'Blue', hex: '#2563EB', val: 6, mul: 1000000, tol: 0.25 },
    { name: 'Violet', hex: '#7C3AED', val: 7, mul: 10000000, tol: 0.1 },
    { name: 'Grey', hex: '#6B7280', val: 8, tol: 0.05 },
    { name: 'White', hex: '#FFFFFF', val: 9 },
    { name: 'Gold', hex: '#FFD700', mul: 0.1, tol: 5 },
    { name: 'Silver', hex: '#C0C0C0', mul: 0.01, tol: 10 }
];

let bandCount = 4;

function initResistor() {
    // Populate Selects
    const selects = ['select-band-1', 'select-band-2', 'select-band-3', 'select-band-mul', 'select-band-tol'];
    selects.forEach(id => {
        const el = document.getElementById(id);
        colors.forEach((c, index) => {
            // Filter logic: Not all colors are valid for all positions
            if (id.includes('band-1') && ['Black', 'Gold', 'Silver'].includes(c.name)) return;
            if (id.includes('band-2') && ['Gold', 'Silver'].includes(c.name)) return;
            if (id.includes('band-3') && ['Gold', 'Silver'].includes(c.name)) return;
            if (id.includes('mul') && ['Black', 'Grey', 'White'].includes(c.name) && !c.mul) return; 
            if (id.includes('tol') && !c.tol) return;

            const option = document.createElement('option');
            option.value = index;
            option.text = c.name;
            option.style.backgroundColor = c.hex;
            option.style.color = ['Black', 'Blue', 'Violet', 'Brown', 'Red'].includes(c.name) ? 'white' : 'black';
            el.appendChild(option);
        });
    });

    // Set Defaults
    document.getElementById('select-band-1').value = 1; // Brown
    document.getElementById('select-band-2').value = 0; // Black
    document.getElementById('select-band-3').value = 0; // Black
    document.getElementById('select-band-mul').value = 2; // Red (x100)
    document.getElementById('select-band-tol').value = 10; // Gold (5%)

    updateResistor();
}

function setResistorBands(n) {
    bandCount = n;
    const b3Cont = document.getElementById('select-band-3-container');
    const b3Vis = document.getElementById('band-3');
    const btn4 = document.getElementById('btn-band-4');
    const btn5 = document.getElementById('btn-band-5');

    if (n === 5) {
        b3Cont.classList.remove('hidden');
        b3Vis.classList.remove('hidden');
        btn5.classList.add('bg-white', 'shadow', 'text-slate-800');
        btn5.classList.remove('text-slate-500');
        btn4.classList.remove('bg-white', 'shadow', 'text-slate-800');
        btn4.classList.add('text-slate-500');
    } else {
        b3Cont.classList.add('hidden');
        b3Vis.classList.add('hidden');
        btn4.classList.add('bg-white', 'shadow', 'text-slate-800');
        btn4.classList.remove('text-slate-500');
        btn5.classList.remove('bg-white', 'shadow', 'text-slate-800');
        btn5.classList.add('text-slate-500');
    }
    updateResistor();
}

function updateResistor() {
    const b1Idx = document.getElementById('select-band-1').value;
    const b2Idx = document.getElementById('select-band-2').value;
    const b3Idx = document.getElementById('select-band-3').value;
    const mulIdx = document.getElementById('select-band-mul').value;
    const tolIdx = document.getElementById('select-band-tol').value;

    // Update Visuals
    document.getElementById('band-1').style.backgroundColor = colors[b1Idx].hex;
    document.getElementById('band-2').style.backgroundColor = colors[b2Idx].hex;
    if (bandCount === 5) document.getElementById('band-3').style.backgroundColor = colors[b3Idx].hex;
    document.getElementById('band-mul').style.backgroundColor = colors[mulIdx].hex;
    document.getElementById('band-tol').style.backgroundColor = colors[tolIdx].hex;

    // Calculate
    let baseVal = 0;
    if (bandCount === 4) {
        baseVal = (colors[b1Idx].val * 10) + colors[b2Idx].val;
    } else {
        baseVal = (colors[b1Idx].val * 100) + (colors[b2Idx].val * 10) + colors[b3Idx].val;
    }

    const total = baseVal * colors[mulIdx].mul;
    const tol = colors[tolIdx].tol;

    document.getElementById('resistor-value').innerText = formatOhm(total);
    document.getElementById('resistor-tolerance').innerText = `± ${tol}%`;
}

function formatOhm(val) {
    if (val >= 1000000) return (val / 1000000).toFixed(2).replace(/\.00$/, '') + " MΩ";
    if (val >= 1000) return (val / 1000).toFixed(2).replace(/\.00$/, '') + " kΩ";
    return val.toFixed(2).replace(/\.00$/, '') + " Ω";
}

// --- VOLTAGE DIVIDER LOGIC ---
function calcDivider() {
    const vin = parseFloat(document.getElementById('div-vin').value);
    const r1 = parseFloat(document.getElementById('div-r1').value) * parseFloat(document.getElementById('div-r1-unit').value);
    const r2 = parseFloat(document.getElementById('div-r2').value) * parseFloat(document.getElementById('div-r2-unit').value);
    const out = document.getElementById('div-vout');

    if (isNaN(vin) || isNaN(r1) || isNaN(r2) || (r1 + r2) === 0) {
        out.innerText = "0.00";
        return;
    }

    const vout = vin * (r2 / (r1 + r2));
    out.innerText = vout.toFixed(2);
}

// --- CURRENT DIVIDER LOGIC ---
function calcCurrent() {
    const iIn = parseFloat(document.getElementById('curr-in').value);
    const r1 = parseFloat(document.getElementById('curr-r1').value) * parseFloat(document.getElementById('curr-r1-unit').value);
    const r2 = parseFloat(document.getElementById('curr-r2').value) * parseFloat(document.getElementById('curr-r2-unit').value);
    
    const out1 = document.getElementById('curr-i1');
    const out2 = document.getElementById('curr-i2');

    if (isNaN(iIn) || isNaN(r1) || isNaN(r2) || (r1 + r2) === 0) {
        out1.innerText = "0.00";
        out2.innerText = "0.00";
        return;
    }

    // Current Divider Formula
    const i1 = iIn * (r2 / (r1 + r2));
    const i2 = iIn * (r1 / (r1 + r2));

    out1.innerText = parseFloat(i1.toFixed(3)); 
    out2.innerText = parseFloat(i2.toFixed(3));
}

// --- SERIES / PARALLEL LOGIC ---
function calcSP() {
    const input = document.getElementById('sp-input').value;
    const mode = document.querySelector('input[name="sp-mode"]:checked').value;
    const resEl = document.getElementById('sp-result');

    if (!input.trim()) { resEl.innerText = "0"; return; }

    const resistors = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0);

    if (resistors.length === 0) { resEl.innerText = "0"; return; }

    let total = 0;
    if (mode === 'series') {
        total = resistors.reduce((a, b) => a + b, 0);
    } else {
        let inverseSum = resistors.reduce((a, b) => a + (1/b), 0);
        total = (inverseSum === 0) ? 0 : 1 / inverseSum;
    }

    resEl.innerText = parseFloat(total.toFixed(3));
}

// Initialize Resistor Calculator on Load
initResistor();