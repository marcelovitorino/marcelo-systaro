import { autoinject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { ApiService } from "./api-service";

/**
 * Service to manage comments
 */
@autoinject
export class CommentApiService extends ApiService {
    private readonly commentUrl: string = "comments/";

    constructor(private http: HttpClient) {
        super(http);
    }

    /**
	 * Find comments for the given post with pagination
     * @param postId The ID of the post to fetch comments for
     * @param page The page number to fetch
     * @returns CommandExecutionResult containing comments
	 */
	findComments = async (postId: number, page?: number, pageSize?: number): Promise<SystaroPlain.CommentApiResult> => {
        let results = await this.sendCommand(`${this.commentUrl}?postId=${postId}`, "GET", page, pageSize);
        let commentApiResult = {} as SystaroPlain.CommentApiResult;
        commentApiResult.comments = results.result;
        commentApiResult.success = results.success;
        commentApiResult.totalItems = results.totalItems;
        commentApiResult.currentPage = results.currentPage;
        commentApiResult.totalPages = results.totalPages;
		return commentApiResult;
	}
}
