"use client";

import React from "react";
// import file "user.module.css"
import styles from "@/styles/user.module.css";
import useSWR from "swr";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

// buat fetcher (variabel untuk ambil data dari API)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// buat interface (untuk definisi data dari tb_user)
interface ModelUser {
  id: number;
  nama: string;
  username: string;
  password: string;
}

export default function ViewUserPage() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/user",
    fetcher
  );

  // buat variabel
  // const jurusan = "TI";
  // const kelas = "23 A"

  return (
    // <div>
    //   <div>Halaman Tampil User</div>
    //   <div>{jurusan} TEKNOKRAT SANG JUARA</div>
    //   <div>{"Jurusan : "+jurusan+" Kelas : " +kelas}</div>
    //   <div>{`Jurusan : ${jurusan} Kelas : ${kelas}`}</div>
    // </div>

    // buat section
    <section>
      {/* area navigasi tombol */}
      <nav className="flex justify-center md:justify-end sm:justify-start">
        <button className={`${styles.btn_primary} rounded-full`}>
          Tambah Data
        </button>
      </nav>

      {/* area konten */}
      <article className="mt-5">
        {/* jika error saat pengambilan data dari API */}
        {error ? (
          <div className="text-center">Gagal Ambil Data</div>
        ) : 
        // jika tidak error saat pengambilan data dari API
        (
          <Table>
            {/* buat judul tabel */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[10%]">Aksi</TableHead>
                <TableHead className="text-center w-auto">Nama</TableHead>
                <TableHead className="text-center w-[20%]">Username</TableHead>
                <TableHead className="text-center w-[10%]">Password</TableHead>
              </TableRow>
            </TableHeader>
            {/* buat isi tabel */}
            <TableBody>
              {/* menunggu pangambilan data */}
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Mohon Tunggu ...
                  </TableCell>
                </TableRow>
              ) : 
              // tampilkan data
              (
                data &&
                data.user.map((item: ModelUser) => (                  
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      {/* buat tombol edit */}
                      <button className={styles.btn_edit}>
                        <Pencil size={16} color="#a51c31" />
                      </button>

                      {/* buat tombol hapus */}
                      <button className={styles.btn_delete}>
                        <Trash size={16} color="#fff" />
                      </button>
                    </TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell className="text-center">{item.username}</TableCell>
                    <TableCell className="text-center">**********</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </article>
    </section>
  );
}
