type Combinable = string | number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

const result = add('Max', 'Schwarz');
result.split(' '); // ['Max', 'Schwarz']
