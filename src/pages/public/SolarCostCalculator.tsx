// SolarCostCalculator.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SolarCalculationResult {
  monthlyConsumption: number;
  annualConsumption: number;
  requiredKw: number;
  recommendedKw: number;
  systemCost: number;
  subsidyAmount: number;
  netCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
}

export function SolarCostCalculator() {
  // State for form inputs
  const [connectionType, setConnectionType] = useState<'domestic' | 'commercial' | 'agriculture'>('domestic');
  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<SolarCalculationResult | null>(null);

  // Rate per unit based on connection type
  const getRatePerUnit = (type: string): number => {
    switch (type) {
      case 'domestic':
        return 5.5;
      case 'commercial':
        return 7;
      case 'agriculture':
        return 2;
      default:
        return 5.5;
    }
  };

  // Main calculation function using the exact logic from the example
  const calculateSolarEstimate = () => {
    const ratePerUnit = getRatePerUnit(connectionType);
    
    // Step 1: Calculate Monthly Consumption
    // Monthly Consumption = Monthly Bill ÷ Rate per Unit
    const monthlyConsumptionValue = monthlyBill / ratePerUnit;
    
    // Step 2: Calculate Annual Consumption
    // Annual Consumption = Monthly Consumption × 12
    const annualConsumptionValue = monthlyConsumptionValue * 12;
    
    // Step 3: Calculate Required Solar System Size
    // 1 kW solar panel generates 4 units per day
    // Annual Generation of 1 kW = 4 units × 365 days = 1460 units/year
    const annualGenerationPerKw = 4 * 365; // 1460 units per year
    const requiredKw = annualConsumptionValue / annualGenerationPerKw;
    
    // Step 4: Round up to the nearest 0.5 or 1 kW for practical system sizing
    // For the example: 4.48 kW → 5 kW
    let recommendedKw = Math.ceil(requiredKw);
    // If it's very close to the next half, round up to half
    if (requiredKw - Math.floor(requiredKw) > 0.3 && requiredKw - Math.floor(requiredKw) < 0.5) {
      recommendedKw = Math.floor(requiredKw) + 0.5;
    }
    // If it's more than half, round up to next whole
    if (requiredKw - Math.floor(requiredKw) >= 0.5) {
      recommendedKw = Math.ceil(requiredKw);
    }
    // Ensure minimum 1 kW system
    if (recommendedKw < 1) recommendedKw = 1;
    
    // NEW: Cost calculation (₹70,000 per kW)
    const costPerKw = 70000;
    const systemCost = recommendedKw * costPerKw;
    
    // NEW: Subsidy calculation - ₹1,38,000 maximum for domestic connections
    let subsidyAmount = 0;
    if (connectionType === 'domestic') {
      // Maximum subsidy is ₹1,38,000 under PM Surya Ghar Yojana
      // Subsidy = minimum of ₹1,38,000 and System Cost
      subsidyAmount = Math.min(138000, systemCost);
    }
    // For commercial and agriculture, subsidy remains ₹0
    
    const netCost = systemCost - subsidyAmount;
    
    // Monthly savings (70% of current bill)
    const monthlySavingsAmount = monthlyBill * 0.7;
    const annualSavingsAmount = monthlySavingsAmount * 12;
    
    // Payback period in years - prevent division by zero
    let paybackYears = 0;
    if (annualSavingsAmount > 0) {
      paybackYears = netCost / annualSavingsAmount;
    }
    
    setResults({
      monthlyConsumption: monthlyConsumptionValue,
      annualConsumption: annualConsumptionValue,
      requiredKw,
      recommendedKw,
      systemCost,
      subsidyAmount,
      netCost,
      monthlySavings: monthlySavingsAmount,
      annualSavings: annualSavingsAmount,
      paybackYears,
    });
    
    setShowResults(true);
  };

  // Clear all fields and results
  const clearAll = () => {
    setConnectionType('domestic');
    setMonthlyBill(0);
    setShowResults(false);
    setResults(null);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with 2 decimal places
  const formatNumber = (num: number): string => {
    return num.toFixed(2);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🧮 Solar Cost Calculator</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Calculate your solar requirements based on your electricity consumption pattern.
          </p>
          <p className="mt-2 text-sm bg-gradient-to-r from-yellow-100 to-green-100 inline-block px-4 py-2 rounded-full shadow">
            💡 1 kW solar panel generates ~4 units (kWh) per day
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white to-yellow-50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); calculateSolarEstimate(); }}>
              {/* Connection Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">🔌 Electric Connection Type</label>
                <select
                  value={connectionType}
                  onChange={(e) => setConnectionType(e.target.value as 'domestic' | 'commercial' | 'agriculture')}
                  className="mt-2 w-full rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition"
                >
                  <option value="domestic">Domestic</option>
                  <option value="commercial">Commercial</option>
                  <option value="agriculture">Agriculture</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Select your electricity connection type</p>
              </div>

              {/* Monthly Bill */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">💰 Monthly Electricity Bill (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  placeholder="e.g. 3000"
                  className="mt-2 w-full rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition"
                />
                <p className="mt-1 text-xs text-gray-500">Enter your monthly electricity bill amount : (Domestic) equal or greater than 1400</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🔍</span> Calculate Estimate
                </button>
                
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🗑️</span> Clear
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className={`rounded-3xl border-2 border-gray-200 p-8 shadow-xl transition-all duration-500 ${
            showResults ? 'bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}>
            {showResults && results ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 text-white p-4 rounded-2xl text-center">
                  <div className="text-sm font-semibold">📊 Your Solar Estimate</div>
                  <div className="text-2xl font-bold mt-1">{connectionType.charAt(0).toUpperCase() + connectionType.slice(1)} Connection</div>
                </div>

                {/* Monthly Consumption */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-blue-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>📊</span> Monthly Consumption</h3>
                  <p className="mt-2 text-gray-700 font-bold text-2xl">{formatNumber(results.monthlyConsumption)} Units</p>
                  <p className="text-sm text-gray-500">Monthly Bill ÷ Rate per Unit</p>
                  <div className="mt-1 text-xs bg-blue-50 p-1 rounded">
                    {monthlyBill} ÷ {getRatePerUnit(connectionType)} = {formatNumber(results.monthlyConsumption)}
                  </div>
                </div>

                {/* Annual Consumption */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-green-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>📈</span> Annual Consumption</h3>
                  <p className="mt-2 text-gray-700 font-bold text-2xl">{formatNumber(results.annualConsumption)} Units</p>
                  <p className="text-sm text-gray-500">Monthly Consumption × 12</p>
                  <div className="mt-1 text-xs bg-green-50 p-1 rounded">
                    {formatNumber(results.monthlyConsumption)} × 12 = {formatNumber(results.annualConsumption)}
                  </div>
                </div>

                {/* Required System Size */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-yellow-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>⚡</span> Required System Size</h3>
                  <p className="mt-2 text-green-700 font-bold text-2xl">{formatNumber(results.recommendedKw)} kW</p>
                  <p className="text-sm text-gray-500">Annual Consumption ÷ 1460 Units/year</p>
                  <div className="mt-2 text-xs bg-gradient-to-r from-yellow-50 to-green-50 p-2 rounded-lg space-y-1">
                    <p>📐 {formatNumber(results.annualConsumption)} ÷ 1460 = {formatNumber(results.requiredKw)} kW</p>
                    <p>📐 1460 Units = 1 kW × 4 Units/day × 365 days</p>
                    <p className="mt-2 text-green-700 font-bold text-2xl">✅ Recommended System: {formatNumber(results.recommendedKw)} kW</p>
                  </div>
                </div>

                {/* System Cost - UPDATED */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-blue-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>💵</span> System Cost</h3>
                  <p className="mt-2 text-gray-700 font-bold text-xl">{formatCurrency(results.systemCost)}</p>
                  <p className="text-sm text-gray-500">₹70,000 per kW</p>
                  <div className="mt-1 text-xs bg-blue-50 p-1 rounded">
                    {formatNumber(results.recommendedKw)} × ₹70,000 = {formatCurrency(results.systemCost)}
                  </div>
                </div>

                {/* Subsidy - UPDATED */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-orange-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>🏛️</span> Estimated Subsidy</h3>
                  <p className="mt-2 text-gray-700 font-bold text-xl">{formatCurrency(results.subsidyAmount)}</p>
                  <p className="text-sm text-gray-500">₹1,38,000 maximum under PM Surya Ghar Yojana</p>
                  {connectionType === 'domestic' && results.systemCost > 138000 && (
                    <div className="mt-1 text-xs bg-orange-50 p-1 rounded">
                      Max subsidy applied: ₹1,38,000
                    </div>
                  )}
                  {connectionType === 'domestic' && results.systemCost <= 138000 && results.subsidyAmount > 0 && (
                    <div className="mt-1 text-xs bg-orange-50 p-1 rounded">
                      Full system cost covered: {formatCurrency(results.systemCost)}
                    </div>
                  )}
                  {connectionType !== 'domestic' && (
                    <div className="mt-1 text-xs bg-gray-50 p-1 rounded text-gray-500">
                      Subsidy available only for Domestic connections
                    </div>
                  )}
                </div>

                {/* Net Cost */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-purple-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>💰</span> Net Investment</h3>
                  <p className="mt-2 text-gray-700 font-bold text-xl">{formatCurrency(results.netCost)}</p>
                  <p className="text-sm text-gray-500">System Cost - Subsidy</p>
                  <div className="mt-1 text-xs bg-purple-50 p-1 rounded">
                    {formatCurrency(results.systemCost)} - {formatCurrency(results.subsidyAmount)} = {formatCurrency(results.netCost)}
                  </div>
                </div>

                {/* Monthly Savings */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-green-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>💡</span> Monthly Savings</h3>
                  <p className="mt-2 text-gray-700 font-bold text-xl">{formatCurrency(results.monthlySavings)}</p>
                  <p className="text-sm text-gray-500">~70% of your current bill</p>
                  <div className="mt-1 text-xs bg-green-50 p-1 rounded">
                    {monthlyBill} × 70% = {formatCurrency(results.monthlySavings)}
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-teal-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>📊</span> Annual Savings</h3>
                  <p className="mt-2 text-gray-700 font-bold text-xl">{formatCurrency(results.annualSavings)}</p>
                  <p className="text-sm text-gray-500">Monthly Savings × 12</p>
                  <div className="mt-1 text-xs bg-teal-50 p-1 rounded">
                    {formatCurrency(results.monthlySavings)} × 12 = {formatCurrency(results.annualSavings)}
                  </div>
                </div>

                {/* Payback Period */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-red-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>⏱️</span> Payback Period</h3>
                  <p className="mt-2 text-gray-700 font-bold text-2xl">
                    {results.paybackYears > 0 ? results.paybackYears.toFixed(1) : '0.0'} Years
                  </p>
                  <p className="text-sm text-gray-500">Net Investment ÷ Annual Savings</p>
                  <div className="mt-1 text-xs bg-red-50 p-1 rounded">
                    {results.paybackYears > 0 ? (
                      `${formatCurrency(results.netCost)} ÷ ${formatCurrency(results.annualSavings)} = ${results.paybackYears.toFixed(1)} Years`
                    ) : (
                      'Annual savings is zero'
                    )}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="block w-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white text-center p-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  💡 Get a personalized quote from our experts!
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-700">Enter your details</h3>
                <p className="mt-2">Fill in the form and click "Calculate Estimate" to see your personalized solar savings.</p>
                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 text-left w-full">
                  <p className="text-sm font-semibold text-gray-700">📋 Example:</p>
                  <p className="text-sm text-gray-600">Monthly Bill = ₹3,000</p>
                  <p className="text-sm text-gray-600">Domestic Rate = ₹5.5/unit</p>
                  <p className="text-sm text-gray-600 mt-1">Monthly Consumption = 3000 ÷ 5.5 = 545.45 units</p>
                  <p className="text-sm text-gray-600">Annual Consumption = 545.45 × 12 = 6,545.45 units</p>
                  <p className="text-sm text-gray-600">Required Solar = 6,545.45 ÷ 1,460 = 4.48 kW ≈ 5 kW</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}