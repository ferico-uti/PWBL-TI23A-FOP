import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";
import bcrypt from "bcrypt";

// buat variabel untuk prisma (PrismaClient)
const prisma = new PrismaClient();

// buat service GET (detail data)
export const GET = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    // return NextResponse.json(params.slug)

    // tampilkan data user berdasarkan slug (id)
    const data = await prisma.tb_user.findUnique({
        where: {
            // ubah slug menjadi number
            id: Number(params.slug)
        }
    });
    // jika data tidak ditemukan
    if (!data) {
        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data User Tidak Ditemukan !",
                status: 400
            },
        }, {
            status: 400
        });
    }
    // jika data ditemukan
    else {
        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Tampil Data User",
                status: 200
            },
            user: data,
        }, {
            status: 200
        });
    }
}

// buat service "DELETE" (hapus data)
export const DELETE = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    // check data user berdasarkan slug (id)
    const check = await prisma.tb_user.findUnique({
        where: {
            // ubah slug menjadi number
            id: Number(params.slug)
        }
    });
    // jika data tidak ditemukan
    if (!check) {
        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data User Tidak Ditemukan !",
                status: 400
            },
        }, {
            status: 400
        });
    }
    // jika data ditemukan
    else {
        // hapus data user berdasarkan slug
        await prisma.tb_user.delete({
            where: {
                // ubah slug menjadi number
                id: Number(params.slug)
            }
        });
        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data User Berhasil Dihapus",
                status: 200
            },
        }, {
            status: 200
        });
    }
}

// buat service "PUT" (edit data)
export const PUT = async (request: NextRequest,
    { params }: { params: { slug: string } }) => {
    // check data user berdasarkan slug (id)
    const check = await prisma.tb_user.findUnique({
        where: {
            // ubah slug menjadi number
            id: Number(params.slug)
        }
    });
    // jika data tidak ditemukan
    if (!check) {
        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data User Tidak Ditemukan !",
                status: 400
            },
        }, {
            status: 400
        });
    }
    // jika data ditemukan
    else {



        // buat variabel untuk nilai (request)
        const user = await request.json();
        // cek apakah username sudah ada / belum
        // lakukan penyesuaian dengan data slug
        const check_username = await prisma.tb_user.findFirst({
            where: {
                username: user.username,
                id: {
                    not: Number(params.slug),
                }
            }
        })
        // jika data tidak ditemukan
        if (!check_username) {
            // jika password tidak diubah
            // asumsikan jika password tidak diubah nilainya = *****
            if (user.password == "*****") {
                // ubah data (tanpa password)
                // tampilkan response
                await prisma.tb_user.update({
                    data: {
                        nama: user.nama,
                        username: user.username,
                    },
                    where: {
                        // ubah slug menjadi number
                        id: Number(params.slug)
                    }
                });
            }
            // jika password diubah
            else {
                // proses hashing password dengan bcrypt
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(user.password, salt);
                // ubah data (dengan password)
                await prisma.tb_user.update({
                    data: {
                        nama: user.nama,
                        username: user.username,
                        password: hash
                    },
                    where: {
                        // ubah slug menjadi number
                        id: Number(params.slug)
                    }
                });
            }

            // tampilkan response
            return NextResponse.json({
                meta_data: {
                    success: true,
                    message: "Data User Berhasil Diubah",
                    status: 200
                },
            }, {
                status: 200
            });

        }
        // jika data ditemukan
        else {
            // tampilkan response
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data User Gagal Diubah (Username Sudah Ada) !",
                    status: 400
                },
            }, {
                status: 400
            });
        }
    }
}
