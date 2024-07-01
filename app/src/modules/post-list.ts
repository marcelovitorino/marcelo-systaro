import { autoinject, customElement } from 'aurelia-framework';
import { PostApiService } from "services/post-api-service";
import { DialogService } from "aurelia-dialog";
import { PostDetailsDialog } from "../dialogs/post-details-dialog";


const PAGE_SIZE = 20;
const CURRENT_PAGE_DEFAULT = 1;
const TOTAL_PAGE_DEFAULT = 1;

@autoinject
@customElement("post-list")
export class PostList {
  private posts: SystaroPlain.Post[] = [];
  private currentPage: number = CURRENT_PAGE_DEFAULT;
  private totalPages: number = TOTAL_PAGE_DEFAULT;

  constructor(private postApiService: PostApiService,
    private dialogService: DialogService) {}

  async attached() {
    await this.loadPosts(this.currentPage);
  }

  loadPosts = async (page?: number) => {
    if (page < 1 || (this.totalPages && page > this.totalPages)) return;

    const apiResult = await this.postApiService.findPosts(page, PAGE_SIZE) as SystaroPlain.PostApiResult;
    if (apiResult && apiResult.success) {
      this.posts = apiResult.posts;
      this.currentPage = apiResult.currentPage;
      this.totalPages = apiResult.totalPages;
    }
  }

  loadPostDetail = async (post: SystaroPlain.Post) => {
		await this.dialogService.open({
			model: {
				post: post,
			},
			viewModel: PostDetailsDialog,
      lock: false
		})
  }
}
