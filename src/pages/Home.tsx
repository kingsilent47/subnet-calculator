import { useState } from 'react';
import { calculateSubnet, SubnetResult } from '../lib/subnet';

export default function Home() {
  const [ip, setIp] = useState('192.168.1.10');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const cidrNum = parseInt(cidr, 10);
    const res = calculateSubnet(ip, cidrNum);
    if (!res) {
      setError('Invalid IP address or CIDR notation.');
      setResult(null);
    } else {
      setResult(res);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">IPv4 Subnet Calculator</h1>
      
      <div className="bg-white border border-gray-200 p-6 rounded-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">IP Address</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-gray-900"
              placeholder="192.168.1.10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">CIDR</label>
            <input
              type="number"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-gray-900"
              placeholder="24"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
            >
              Calculate
            </button>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      </div>

      {result && (
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <Row label="Network Address" value={result.networkAddress} />
              <Row label="Broadcast Address" value={result.broadcastAddress} />
              <Row label="Subnet Mask" value={result.subnetMask} />
              <Row label="First Usable Host" value={result.firstUsable} />
              <Row label="Last Usable Host" value={result.lastUsable} />
              <Row label="Total Hosts" value={result.totalHosts.toString()} />
              <Row label="Usable Hosts" value={result.usableHosts.toString()} />
              <Row label="IP Class" value={result.ipClass} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">{label}</td>
      <td className="px-4 py-3 font-mono text-gray-900">{value}</td>
    </tr>
  );
}
