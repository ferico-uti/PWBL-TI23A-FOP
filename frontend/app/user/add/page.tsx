"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { filterNama, filterPassword, filterUsername } from '@/lib/scripts'
import { API_USER } from '@/lib/strings'
import styles from "@/styles/user.module.css"
import axios from 'axios'
import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AddUserPage() {
  // buat router untuk navigasi antar page
  const router = useRouter();

  // buat state untuk menyimpan data masing2 komponen
  // formNama = untuk menampilkan hasil
  // setFormNama = untuk menyimpan hasil
  const [formNama, setFormNama] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRepassword, setFormRepassword] = useState("");


  // buat state untuk error komponen
  const [errorNama, setErrorNama] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);

  // buat state untuk error password dan repassword (jika karakter < 6)
  const [errorPasswordLength, setErrorPasswordLength] = useState(false);
  const [errorRepasswordLength, setErrorRepasswordLength] = useState(false)

  // buat state untuk error password dan repassword (jika tidak sama)
  const [errorPasswordRepasswordMatch, setErrorPasswordRepasswordMatch] = useState(false);


  // buat fungsi untuk simpan data
  const saveData = async () => {
    const errNama = formNama === "";
    const errUsername = formUsername === "";
    const errPassword = formPassword === "";
    const errRepassword = formRepassword === "";

    // set state error setiap komponen
    setErrorNama(errNama);
    setErrorUsername(errUsername);
    setErrorPassword(errPassword);
    setErrorRepassword(errRepassword);

    // cek error setiap komponen jika tidak diisi
    const hasError =
      errNama ||
      errUsername ||
      errPassword ||
      errRepassword;

    // jika ada salah satu komponen tidak diisi
    if (hasError) {
      return;
    }

    // buat variabel untuk cek password dan repassword (jika karakter < 6)
    const errPasswordLength = formPassword.length < 6
    const errRepasswordLength = formRepassword.length < 6;

    // set state error password dan repassword (jumlah karakter < 6)
    setErrorPasswordLength(errPasswordLength);
    setErrorRepasswordLength(errRepasswordLength);

    // cek error password dan repassword (jumlah karakter < 6)
    const hasErrorLength =
      errPasswordLength || errRepasswordLength;

    // jika password dan repassword < 6 karakter
    if (hasErrorLength) {
      return;
    }

    // buat variabel untuk cek password dan repassword (jika tidak sama)
    const errPasswordRepasswordMatch = formPassword !== formRepassword

    // set state error password dan repassword (jika tidak sama)
    setErrorPasswordRepasswordMatch(errPasswordRepasswordMatch);

    // cek error password dan repassword (jika tidak sama)
    const hasPasswordRepasswordMatch = errPasswordRepasswordMatch;

    // jika password dan repassword (jika tidak sama)
    if (hasPasswordRepasswordMatch) {
      return;
    }

    // jika tidak error (seluruh komponen sudah diisi, password dan repassword (> 6 karakter) dan sama / cocok)
    // kirim data ke service POST (backend)
    // API_USER diambil dari file lib/strings.ts
    const response = await axios.post(API_USER, {
      nama: formNama,
      username: formUsername,
      password: formPassword,
    }, {
      validateStatus: () => true
    });

    // jika success == true
    if (response.data.meta_data.success) {
      toast.success(response.data.meta_data.message);

      // kosongkan isi komponen
      setFormNama("");
      setFormUsername("");
      setFormPassword("");
      setFormRepassword("");
    }
    // jika success == false
    else {
      toast.error(response.data.meta_data.message);
    }
  }

  return (
    // buat section
    <section>
      {/* buat title */}
      <title>Tambah Data User</title>
      {/* buat grid column */}
      <article className='grid sm:grid-cols-2 grid-cols-1 gap-4'>

        {/* area nama */}
        <section>
          <Label htmlFor="txt_nama" className='mb-2.5'>Nama User</Label>
          <Input type="text" id="txt_nama" placeholder="Isi Nama User" maxLength={100}
            value={formNama}
            onChange={(text) => {
              // buat variabel untuk filterNama
              // filterNama diambil dari file lib/scripts.ts
              const result = filterNama(text.target.value);
              // simpan data input ke state
              setFormNama(result);
            }} />

          {/* tampilkan error jika nama user belum diisi */}
          {errorNama && (
            <Label className={styles.error}><Info size={14} /> Nama User Harus Diisi !</Label>
          )}
        </section>

        {/* area username */}
        <section>
          <Label htmlFor="txt_username" className='mb-2.5'>Username User</Label>
          <Input type="text" id="txt_username" placeholder="Isi Username User" maxLength={20}
            value={formUsername}
            onChange={(text) => {
              // buat variabel untuk filterUsername
              // filterUsername diambil dari file lib/scripts.ts
              const result = filterUsername(text.target.value);
              // simpan data input ke state
              setFormUsername(result);
            }} />

          {/* tampilkan error jika username user belum diisi */}
          {errorUsername && (
            <Label className={styles.error}><Info size={14} /> Username User Harus Diisi !</Label>
          )}
        </section>

        {/* area password */}
        <section>
          <Label htmlFor="txt_password" className='mb-2.5'>Password User</Label>
          <Input type="password" id="txt_password" placeholder="Isi Password User" maxLength={60}
            value={formPassword}
            onChange={(text) => {
              // buat variabel untuk filterPassword
              // filterPassword diambil dari file lib/scripts.ts
              const result = filterPassword(text.target.value);
              // simpan data input ke state
              setFormPassword(result);
            }} />

          {/* tampilkan error jika password user belum diisi */}
          {errorPassword && (
            <Label className={styles.error}><Info size={14} /> Password User Harus Diisi !</Label>
          )}

          {/* tampilkan error jika password user < 6 karakter */}
          {errorPasswordLength && (
            <Label className={styles.error}><Info size={14} /> Password Min. 6 Karakter !</Label>
          )}
        </section>

        {/* area konfirmasi password */}
        <section>
          <Label htmlFor="txt_repassword" className='mb-2.5'>Konfirmasi Password User</Label>
          <Input type="password" id="txt_repassword" placeholder="Isi Konfirmasi Password User" maxLength={60}
            value={formRepassword}
            onChange={(text) => {
              // buat variabel untuk filterPassword
              // filterPassword diambil dari file lib/scripts.ts
              const result = filterPassword(text.target.value);
              // simpan data input ke state
              setFormRepassword(result);
            }} />

          {/* tampilkan error jika konfirmasi password user belum diisi */}
          {errorRepassword && (
            <Label className={styles.error}><Info size={14} /> Konfirmasi Password User Harus Diisi !</Label>
          )}

          {/* tampilkan error jika konfirmasi password user < 6 karakter */}
          {errorRepasswordLength && (
            <Label className={styles.error}><Info size={14} /> Konfirmasi Password Min. 6 Karakter !</Label>
          )}

          {/* tampilkan error jika password dan konfirmasi password user tidak sama */}
          {errorPasswordRepasswordMatch && (
            <Label className={styles.error}><Info size={14} /> Password dan Konfirmasi Password Tidak Sama !</Label>
          )}
        </section>

        {/* area button */}
        <section>
          <Button className='rounded-full w-[125px] mr-2.5' onClick={saveData}>Simpan</Button>
          <Button variant="secondary" className='rounded-full w-[125px] ml-2.5' onClick={() => router.back()}>Batal</Button>
        </section>

      </article>
    </section>
  )
}
