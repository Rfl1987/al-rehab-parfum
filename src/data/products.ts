export interface Product {
  id: number;
  name: string;
  tagline: string;
  gender: 'Kişi' | 'Qadın' | 'Unisex';
  family: 'Musk' | 'Oud' | 'Çiçəkli' | 'Şərq' | 'Təzə';
  volume: '50ml' | '100ml';
  price: number; // AZN
  inStock: boolean;
  notes: { top: string[]; heart: string[]; base: string[] };
  image: string;
}

export const products: Product[] = [
  { id: 1, name: 'Tooty Musk', tagline: 'Şirin musk və gülün sehrli birləşməsi', gender: 'Qadın', family: 'Musk', volume: '50ml', price: 16, inStock: true, image: '', notes: { top: ['Yasəmən', 'Hibiskus'], heart: ['Gül', 'Musk'], base: ['Əmbrə', 'Vainil'] } },
  { id: 2, name: 'Silver Scent', tagline: 'Təzə və zərif klassika', gender: 'Kişi', family: 'Təzə', volume: '50ml', price: 18, inStock: true, image: '', notes: { top: ['Bergamot', 'Nanə'], heart: ['Lavanda', 'Sərv'], base: ['Ağac musk', 'Əmbrə'] } },
  { id: 3, name: 'Tohfa', tagline: 'Şərqin hədiyyəsi — isti və sirli', gender: 'Qadın', family: 'Şərq', volume: '50ml', price: 17, inStock: true, image: '', notes: { top: ['Zəfəran', 'Darçın'], heart: ['Gül', 'Paçuli'], base: ['Oud', 'Əmbrə'] } },
  { id: 4, name: 'Sultan', tagline: 'Güc və xarizma', gender: 'Kişi', family: 'Oud', volume: '100ml', price: 36, inStock: true, image: '', notes: { top: ['Bergamot', 'Zəncəfil'], heart: ['Oud', 'Dəri'], base: ['Sandal', 'Musk'] } },
  { id: 5, name: 'Sultana', tagline: 'Şirin və cazibədar', gender: 'Qadın', family: 'Çiçəkli', volume: '50ml', price: 20, inStock: true, image: '', notes: { top: ['Armud', 'Nar'], heart: ['Yasəmən', 'Gül'], base: ['Vainil', 'Musk'] } },
  { id: 6, name: 'Red Rose', tagline: 'Təzə gül yarpaqlarının təravəti', gender: 'Qadın', family: 'Çiçəkli', volume: '50ml', price: 15, inStock: true, image: '', notes: { top: ['Qırmızı gül', 'Yasəmən'], heart: ['Musk', 'Paçuli'], base: ['Əmbrə', 'Sandal'] } },
  { id: 7, name: 'White Musk', tagline: 'Təmiz və minimalist', gender: 'Unisex', family: 'Musk', volume: '100ml', price: 27, inStock: true, image: '', notes: { top: ['Pambıq', 'Bergamot'], heart: ['Ağ musk', 'Bənövşə'], base: ['Ağac', 'Əmbrə'] } },
  { id: 8, name: 'Dahn Al Oudh', tagline: 'Saf oudun dərin qoxusu', gender: 'Unisex', family: 'Oud', volume: '100ml', price: 45, inStock: true, image: '', notes: { top: ['Oud', 'Zəfəran'], heart: ['Qatran', 'Dəri'], base: ['Əmbrə', 'Musk'] } },
  { id: 9, name: 'Amber Oud', tagline: 'İsti əmbrə, qızılı oud', gender: 'Unisex', family: 'Şərq', volume: '100ml', price: 43, inStock: true, image: '', notes: { top: ['Əmbrə', 'Nar'], heart: ['Oud', 'Gül'], base: ['Vainil', 'Sandal'] } },
  { id: 10, name: 'Jazzab Silver', tagline: 'Gənclik enerjisi', gender: 'Kişi', family: 'Təzə', volume: '50ml', price: 19, inStock: true, image: '', notes: { top: ['Limona', 'Bergamot'], heart: ['Adaçayı', 'Sərv'], base: ['Ağac', 'Musk'] } },
  { id: 11, name: 'Sharqia', tagline: 'Şərqin sirli imzası', gender: 'Qadın', family: 'Şərq', volume: '50ml', price: 17, inStock: false, image: '', notes: { top: ['Zəfəran'], heart: ['Gül'], base: ['Əmbrə'] } },
  { id: 12, name: 'Musk Al Ghazal', tagline: 'Zərif və məxmər', gender: 'Unisex', family: 'Musk', volume: '50ml', price: 16, inStock: false, image: '', notes: { top: ['Bergamot'], heart: ['Musk'], base: ['Sandal'] } },
  { id: 13, name: 'Lovely Blossom', tagline: 'Bahar çiçəkləri', gender: 'Qadın', family: 'Çiçəkli', volume: '50ml', price: 15, inStock: false, image: '', notes: { top: ['Alça'], heart: ['Yasəmən'], base: ['Musk'] } },
  { id: 14, name: 'Cherry Musk', tagline: 'Albalı və musk', gender: 'Qadın', family: 'Musk', volume: '50ml', price: 15, inStock: false, image: '', notes: { top: ['Albalı'], heart: ['Musk'], base: ['Vainil'] } },
  { id: 15, name: 'Blue Ocean', tagline: 'Okean təravəti', gender: 'Kişi', family: 'Təzə', volume: '50ml', price: 16, inStock: false, image: '', notes: { top: ['Dəniz notları'], heart: ['Lavanda'], base: ['Ağac'] } },
  { id: 16, name: 'Honey Oud', tagline: 'Bal və oud', gender: 'Unisex', family: 'Şərq', volume: '100ml', price: 40, inStock: false, image: '', notes: { top: ['Bal'], heart: ['Oud'], base: ['Əmbrə'] } },
  { id: 17, name: 'Vanilla Soft', tagline: 'Yumşaq vainil', gender: 'Qadın', family: 'Şərq', volume: '50ml', price: 15, inStock: false, image: '', notes: { top: ['Vainil'], heart: ['Karamel'], base: ['Musk'] } },
  { id: 18, name: 'Soft Night', tagline: 'Gecənin məxməri', gender: 'Unisex', family: 'Oud', volume: '100ml', price: 32, inStock: false, image: '', notes: { top: ['Giləmeyvə'], heart: ['Bənövşə'], base: ['Oud'] } },
  { id: 19, name: 'Golden Oud', tagline: 'Qızılı oudun əzəməti', gender: 'Kişi', family: 'Oud', volume: '100ml', price: 47, inStock: false, image: '', notes: { top: ['Zəfəran'], heart: ['Oud'], base: ['Əmbrə'] } },
  { id: 20, name: 'Arabian Nights', tagline: 'Min bir gecə nağılı', gender: 'Unisex', family: 'Şərq', volume: '100ml', price: 38, inStock: false, image: '', notes: { top: ['Ədviyyat'], heart: ['Gül'], base: ['Sandal'] } },
];