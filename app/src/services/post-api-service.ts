import { autoinject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { ApiService } from "./api-service";

/**
 * Service to manage posts
 */
@autoinject
export class PostApiService extends ApiService {
	private readonly postUrl: string = "posts/";

    constructor(private http: HttpClient) {
        super(http);
    }

    /**
	 * Fetch posts with pagination
     * @param page The page number to fetch
     * @returns CommandExecutionResult containing posts
	 */
	findPosts = async (page?: number, pageSize?: number): Promise<SystaroPlain.PostApiResult> => {
		let results = await this.sendCommand(this.postUrl, "GET", page, pageSize);
        let postApiResult = {} as SystaroPlain.PostApiResult;
        postApiResult.posts = results.result;
        postApiResult.success = results.success;
        postApiResult.totalItems = results.totalItems;
        postApiResult.currentPage = results.currentPage;
        postApiResult.totalPages = results.totalPages;
		return postApiResult;
	}
}
