export interface SubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  firstUsable: string;
  lastUsable: string;
  totalHosts: number;
  usableHosts: number;
  cidr: number;
  ipClass: string;
}

function ipToInt(ip: string): number {
  const parts = ip.split('.');
  return (
    ((+parts[0] << 24) |
    (+parts[1] << 16) |
    (+parts[2] << 8) |
    +parts[3]) >>> 0
  );
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  if (cidr < 0 || cidr > 32) return null;
  
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  
  for (const part of parts) {
    const num = parseInt(part, 10);
    if (isNaN(num) || num < 0 || num > 255) return null;
  }

  const ipInt = ipToInt(ip);
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;
  
  const firstUsableInt = cidr >= 31 ? networkInt : (networkInt + 1) >>> 0;
  const lastUsableInt = cidr >= 31 ? broadcastInt : (broadcastInt - 1) >>> 0;

  let ipClass = 'Unknown';
  const firstOctet = parseInt(parts[0], 10);
  if (firstOctet < 128) ipClass = 'A';
  else if (firstOctet < 192) ipClass = 'B';
  else if (firstOctet < 224) ipClass = 'C';
  else if (firstOctet < 240) ipClass = 'D';
  else ipClass = 'E';

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    firstUsable: intToIp(firstUsableInt),
    lastUsable: intToIp(lastUsableInt),
    totalHosts,
    usableHosts,
    cidr,
    ipClass
  };
}
