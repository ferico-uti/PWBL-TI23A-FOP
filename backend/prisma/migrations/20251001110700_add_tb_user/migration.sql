-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" CHAR(60) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);
