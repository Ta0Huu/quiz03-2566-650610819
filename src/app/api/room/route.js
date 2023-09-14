import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { size } from "lodash";
import { string } from "zod";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    //totalRooms: DB.rooms.size,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  // const role = payload.role;
  // if (role === "ADMIN" || role === "SUPER_ADMIN")
  const rooom = DB.rooms.find((x) => x.roomName === DB.rooms.roomName);
  if (rooom)
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );

  const roomId = nanoid();
  DB.rooms.push({
    roomId,
  });
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId: roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
