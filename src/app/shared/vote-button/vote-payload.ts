import { VoteType } from '../vote-button/vote-type.enum'

export class VotePayload {
    voteType: VoteType;
    postId: number
}
