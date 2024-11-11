let koin = []; // array untuk menyimpan objek koin

function setup() {
  createCanvas(400, 600);
  fill(240);
  noStroke();
}

function draw() {
  background('rgb(0,0,0)');
  let t = frameCount / 60; // perbarui waktu

  // buat sejumlah koin acak setiap frame
  for (let i = 0; i < random(5); i++) {
    koin.push(new Koin()); // tambahkan objek koin
  }

  // loop melalui koin dengan loop for..of
  for (let k of koin) {
    k.update(t); // perbarui posisi koin
    k.display(); // gambar koin
  }
}

// kelas koin
function Koin() {
  // inisialisasi koordinat
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(10, 30); // ukuran yang bervariasi

  // radius spiral koin
  // dipilih sehingga koin tersebar secara merata dalam area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // posisi x mengikuti lingkaran
    let w = 0.6; // kecepatan sudut
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // koin ukuran berbeda jatuh pada kecepatan y yang sedikit berbeda
    this.posY += pow(this.size, 0.5);

    // hapus koin jika melewati akhir layar
    if (this.posY > height) {
      let index = koin.indexOf(this);
      koin.splice(index, 1);
    }
  };

  this.display = function() {
    // Gambar bentuk koin
    fill(255, 215, 0); // warna kuning untuk koin
    ellipse(this.posX, this.posY, this.size);
    // Gambar simbol dollar pada koin
    fill(0); // warna hitam untuk simbol
    textSize(this.size * 0.8); // set ukuran teks relatif terhadap ukuran koin
    textAlign(CENTER, CENTER); // ratakan teks ke tengah elips
    text("$", this.posX, this.posY); // gambar simbol dollar
  };
}
