/* tslint:disable */

declare namespace SystaroPlain {

    interface BaseCommand {
    }

    interface ErrorMessageDto {
        rawMessage: string;
    }

    interface CommandExecutionResult extends ErrorMessageDto {
        errorReason: string;
        success: boolean;
        result: any;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }

    interface PostApiResult extends CommandExecutionResult {
        posts: Post[]
    }

    interface CommentApiResult extends CommandExecutionResult {
        comments: Comment[]
    }

    interface PostApi {
        postId: number;
    }

    interface FindCommentsApi extends PostApi {
    }

    interface Post {
        userId: number,
        id: number,
        title: string,
        body: string
    }

    interface Comment {
        postId: number,
        id: number,
        name: string,
        email: string,
        body: string
    }

    type EndpointMethod = "GET" | "POST" | "PUT" | "DELETE";

}