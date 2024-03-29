import { commentInstance } from "./api";

export async function getCommentByCommunityId(communityId: number) {
  return await commentInstance.get("/list/" + communityId);
}

export async function saveComment(communityId: number, content: string) {
  const data = {
    communityId: communityId,
    content: content,
  };
  return await commentInstance.post("/", data);
}
