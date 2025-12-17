"use client";

// import file "user.module.css"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "@/styles/user.module.css";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";

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
  // buat hook useRouter
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/user",
    fetcher
  );

  // buat fungsi untuk hapus data
  const deleteData = async (id: number) => {
    // hapus data dengan axios
    // ref: https://axios-http.com/docs/intro

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/user/${id}`
      );

      // tampilkan sonner (response)
      // ref: https://ui.shadcn.com/docs/components/sonner

      // jika success == true
      if (response.data.meta_data.success) {
        toast.success(response.data.meta_data.message);
      }
      // jika success == false
      else {
        toast.error(response.data.meta_data.message);
      }
    } finally {
      // refresh data
      mutate(data);
    }
  };

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
      {/* buat title */}
      <title>View Data User</title>
      {/* area navigasi tombol */}
      <nav className="flex justify-center md:justify-end sm:justify-start">
        <Link href="/user/add" className={`${styles.btn_primary} rounded-full`}>
          Tambah Data
        </Link>        
      </nav>

      {/* area konten */}
      <article className="mt-5">
        {/* jika error saat pengambilan data dari API */}
        {error ? (
          <div className="text-center">Gagal Ambil Data</div>
        ) : (
          // jika tidak error saat pengambilan data dari API
          // buat komponen tabel dengan shadcn
          // ref: https://ui.shadcn.com/docs/components/table

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
              ) : (
                // tampilkan data
                data &&
                data.user.map((item: ModelUser) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      {/* buat tombol edit */}
                      <button className={styles.btn_edit}>
                        <Pencil size={16} color="#a51c31" />
                      </button>

                      {/* buat tombol hapus */}
                      {/* buat komponen alert dialog */}
                      {/* ref: https://ui.shadcn.com/docs/components/alert-dialog */}

                      <AlertDialog>
                        <AlertDialogTrigger className={styles.btn_delete}>
                          <Trash size={16} color="#fff" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Konfirmasi Hapus Data User
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Nama User : {item.nama} Ingin Dihapus ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteData(item.id);
                              }}>
                              Ya
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell className="text-center">
                      {item.username}
                    </TableCell>
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
