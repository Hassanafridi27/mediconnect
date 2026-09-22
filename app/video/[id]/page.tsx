import { VideoPageClient } from "./VideoPageClient";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VideoPageClient id={id} />;
}
