import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import bcrypt from "bcrypt";

// buat variabel untuk prisma (PrismaClient)
const prisma = new PrismaClient();

// buat service GET (ambil data)
export async function GET() {
    // return new NextResponse("Test API")
    // return NextResponse.json({
    //     message: "Test API",
    //     success: true,
    //     status: 200
    // })

    // tampilkan data dari tb_user
    const data = await prisma.tb_user.findMany();

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

// buat service POST (simpan data)
export const POST = async (request: NextRequest) => {

    // buat variabel untuk nilai (request)
    const user = await request.json();

    // cek apakah username sudah ada / belum
    const check = await prisma.tb_user.findFirst({
        where: {
            username: user.username
        }
    })

    // 1. jika username ditemukan
    if (check) {
        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: false,
                message: "Data User Gagal Disimpan ! (Username Sudah Ada !)",
                status: 409
            },
        }, {
            status: 409
        });
    }

    // 2. jika username tidak ditemukan
    else {

        // proses hashing password dengan bcrypt
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);

        // simpan data
        await prisma.tb_user.create({
            data: {
                nama: user.nama,
                username: user.username,
                password: hash
            }
        });

        // tampilkan response
        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data User Berhasil Disimpan",
                status: 201
            },
        }, {
            status: 201
        });
    }

}