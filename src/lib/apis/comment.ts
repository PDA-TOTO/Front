import { commentInstance } from "./api";

export async function getCommentByCommunityId(communityId: number) {
  return await commentInstance.get("/list/" + communityId);
}
