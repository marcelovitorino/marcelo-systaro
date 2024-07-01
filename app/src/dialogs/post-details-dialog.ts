import { autoinject } from "aurelia-dependency-injection";
import { DialogController, DialogService } from "aurelia-dialog";

/**
 * Dialog for showing post details
 */
@autoinject
export class PostDetailsDialog {
    private post: SystaroPlain.Post;

	constructor(
		private controller: DialogController,
		private dialogService: DialogService
	) {
	}

	/**
	 * Called by the dialog service
	 * @param model
	 */
	async activate(model: {
		post: SystaroPlain.Post
	}) {
		this.post = model.post;
	}

}

