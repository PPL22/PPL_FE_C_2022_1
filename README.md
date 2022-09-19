# Frontend Proyek Perangkat Lunak

## Kebutuhan Sistem

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Tech Stack

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Prettier](https://prettier.io/)
- [Axios](https://axios-http.com/)

## Framework CSS

- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/docs)

## Tools Pendukung

- [HTML to JSX](https://magic.reactjs.net/htmltojsx.htm) - Bisa digunakan ketika copas source code dari [Flowbite](https://flowbite.com/docs)
  dan ingin mengubahnya menjadi JSX
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Autocomplete untuk Tailwind CSS
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Format code otomatis
- [ES7 + React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) - Snippet untuk React

## Development

### Using [Netlify](https://www.netlify.com/)

- [Hasil Development](https://frontend-ppl.netlify.app/)

## Instalasi

1. Clone repository ini

```
   git clone https://github.com/PPL22/frontend.git
```

2. Buka terminal di folder hasil clone
3. Jalankan perintah `npm install`
4. Jalankan perintah `npm start`

## Cara Development

1. Pastikan source code lokal sudah terupdate dengan source code di repository ini
   ```
       git pull origin master
   ```
2. Buat branch baru dengan nama sesuai dengan fitur yang akan dikerjakan
   ```
      git checkout -b nama-branch
   ```
3. Kerjakan fitur yang telah ditentukan
4. Commit perubahan yang telah dilakukan
   ```
      git add .
      git commit -m "pesan commit"
   ```
5. Push perubahan ke branch yang telah dibuat
   ```
      git push origin nama-branch
   ```
6. Buat pull request ke branch `master`
7. Tunggu pull request disetujui

## Struktur Folder

- `src` - Folder untuk menyimpan source code
- `public` - Folder untuk menyimpan file yang akan diakses oleh browser
- `node_modules` - Folder untuk menyimpan library yang dibutuhkan oleh aplikasi

## Struktur Source Code

- `App.js` - File untuk mengatur routing
- `/components` - Folder untuk menyimpan komponen-komponen yang digunakan di aplikasi
- `/pages` - Folder untuk menyimpan halaman-halaman yang digunakan di aplikasi
- `/utils` - Folder untuk menyimpan fungsi-fungsi yang digunakan di aplikasi
- `/contexts` - Folder untuk menyimpan context yang digunakan di aplikasi
- `/shared` - Folder untuk menyimpan tema dan konfigurasi aplikasi
