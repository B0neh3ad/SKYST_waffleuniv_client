import RoomSection from "@/components/room/(roomId)/RoomSection";

type Params = Promise<{
  roomId: string;
}>;

export default async function RoomPage({ params }: { params: Params }) {
  const { roomId } = await params;
  return <RoomSection roomId={roomId} />;
}
