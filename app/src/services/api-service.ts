import { autoinject } from "aurelia-dependency-injection";
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApiService } from "./base-api-service";

/**
 * Service to issue commands from the client to the server
 */
@autoinject
export abstract class ApiService extends BaseApiService {

	constructor(httpClient: HttpClient) {
		super("/api/", httpClient);
	}

	/**
	 * Send a command to a certain endpoint
	 * @param endpoint Endpoint path
	 * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
	 * @param params Optional parameters object for query string parameters like pagination
	 * @returns CommandExecutionResult
	 */
	sendCommand = async (endpoint: string, method: string, page?: number, pageSize?: number): Promise<SystaroPlain.CommandExecutionResult> => {
		const result = await super.sendCommand(endpoint, method, page, pageSize);
		return result;
	}
}
