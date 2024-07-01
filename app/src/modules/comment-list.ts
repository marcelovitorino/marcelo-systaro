import { autoinject, bindable, customElement } from 'aurelia-framework';
import { CommentApiService } from "services/comment-api-service";

const PAGE_SIZE_FACTOR = 2;
const CURRENT_PAGE_DEFAULT = 1;
const TOTAL_PAGE_DEFAULT = 1;

/**
 * Comment list component
 */
@autoinject
@customElement("comment-list")
export class CommentList {
	@bindable post: SystaroPlain.Post;
    private comments: SystaroPlain.Comment[] = [];
    private current_page_size: number = 2;
    private currentPage: number = CURRENT_PAGE_DEFAULT;
    private totalPages: number = TOTAL_PAGE_DEFAULT;

    constructor(private commentApiService: CommentApiService) {}

    async attached() {
        await this.loadComments(this.currentPage);
    }

    async loadComments(page?: number) {
        if (this.post) {
            const apiResult = await this.commentApiService.findComments(this.post.id, page, this.current_page_size);
            if (apiResult && apiResult.success) {
                this.comments = apiResult.comments;
                this.currentPage = apiResult.currentPage;
                this.totalPages = apiResult.totalPages;
            }
        }
    }

    expandComments() {
        this.current_page_size = this.current_page_size + PAGE_SIZE_FACTOR;
        this.loadComments(this.currentPage)
    }

    resetComments() {
        this.current_page_size = PAGE_SIZE_FACTOR;
        this.currentPage = CURRENT_PAGE_DEFAULT;
        this.totalPages = TOTAL_PAGE_DEFAULT;
        this.loadComments(this.currentPage)
    }
}
